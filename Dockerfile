# ============================================================
# Stage 1 — Builder
# ============================================================
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency manifests first (better caching)
COPY package.json yarn.lock ./

# Install all dependencies (including dev) for build, lint, etc.
RUN yarn install --frozen-lockfile --non-interactive --no-progress

# Copy the full source
COPY . .

# Run build script (TypeScript / Prisma / etc.)
# Add your own build pipeline inside package.json
RUN yarn clean && yarn lint || true && yarn typecheck || true && yarn build

# ============================================================
# Stage 2 — Pruner (for dependency slimming)
# ============================================================
FROM node:24-alpine AS pruner

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules

# Reinstall only production deps
RUN yarn install --frozen-lockfile --non-interactive --production=true --prefer-offline && \
    yarn cache clean

# ============================================================
# Stage 3 — Runner (Production)
# ============================================================
FROM node:24-alpine AS runner

# Create non-root user for security
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy essential runtime assets
COPY --from=pruner /app/package.json ./
COPY --from=pruner /app/yarn.lock ./
COPY --from=pruner /app/node_modules ./node_modules

# If TypeScript compiled → copy /dist
COPY --from=builder /app/dist ./dist

# Optional: if Prisma or migrations needed
# COPY --from=builder /app/prisma ./prisma
# RUN npx prisma generate --no-engine

# Clean up any dev/test docs, reduce image size
RUN find node_modules -type d \( -name "test" -o -name "tests" -o -name "example*" -o -name "docs" \) -exec rm -rf {} + || true

# Expose app port

EXPOSE 3000
EXPOSE 4000

# Healthcheck (optional but recommended)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

# Final command — Production Start
CMD ["yarn", "start"]

# ============================================================
# Stage 4 — Dev Environment (Optional)
# ============================================================
FROM node:24-alpine AS dev

WORKDIR /app
COPY . .
RUN yarn install && yarn global add nodemon
EXPOSE 5000
EXPOSE 3000
EXPOSE 4000
CMD ["yarn", "run", "dev"]
