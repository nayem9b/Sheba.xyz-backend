import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';


const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const resolvers = {
  Query: {
  me: async () => {
      // Implement your authentication logic here
      return null;
    },
    users: async () => {
      return await prisma.user.findMany();
    },
  user: async (_parent, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
  signup: async (_parent, { name, email, password, bio }) => {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password, // Note: Make sure to hash the password in a real application
          bio,
        },
      });

      const token = sign({ userId: user.id }, JWT_SECRET);

      return {
        token,
        user,
      };
    },
  signin: async (_parent, { email }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('No such user found');
      }

      // In a real app, verify the password hash
      const valid = true; // Replace with actual password verification
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = sign({ userId: user.id }, JWT_SECRET);

      return {
        token,
        user,
      };
    },
  },
};
