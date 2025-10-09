"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./routes/route"));
const metrics_utils_1 = require("./metrics/metrics_utils");
const promClient = require('prom-client');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use("/api/v1", route_1.default);
// Define an async function that simulates a task taking random time
const simulateAsyncTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomTime = Math.random() * 5; // Random time between 0 and 5 seconds
    return new Promise((resolve) => setTimeout(resolve, randomTime * 1000));
});
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000; // Duration in seconds
        const { method, url } = req;
        const statusCode = res.statusCode; // Get the actual HTTP status code
        metrics_utils_1.httpRequestCounter.labels({ method, path: url, status_code: statusCode }).inc();
        metrics_utils_1.requestDurationHistogram.labels({ method, path: url, status_code: statusCode }).observe(duration);
        metrics_utils_1.requestDurationSummary.labels({ method, path: url, status_code: statusCode }).observe(duration);
    });
    next();
});
// Expose metrics for Prometheus to scrape
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', promClient.register.contentType);
    res.end(yield promClient.register.metrics());
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to Sheba.xyz");
}));
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Server is healthy");
}));
// GraphQL endpoint info
app.get("/api/graphql", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "GraphQL API is available",
        endpoint: "/graphql",
        playground: "Visit /graphql in your browser for GraphQL Playground",
        queries: {
            users: "query { users { id name email role } }",
            categories: "query { categories { id title image } }",
            services: "query { services { id name price details } }"
        }
    });
}));
app.get('/example', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const endGauge = metrics_utils_1.gauge.startTimer({ method: req.method, status: res.statusCode });
    yield simulateAsyncTask();
    endGauge();
    res.send('Async task completed');
}));
exports.default = app;
