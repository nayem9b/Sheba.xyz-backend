import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import router from "./routes/route";
import { gauge, httpRequestCounter, requestDurationHistogram, requestDurationSummary } from "./metrics/metrics_utils";
const promClient = require('prom-client');

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/v1", router);



// Define an async function that simulates a task taking random time
const simulateAsyncTask = async () => {
    const randomTime = Math.random() * 5; // Random time between 0 and 5 seconds
    return new Promise((resolve) => setTimeout(resolve, randomTime * 1000));
};

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000; // Duration in seconds
        const { method, url } = req;
        const statusCode = res.statusCode; // Get the actual HTTP status code
        httpRequestCounter.labels({ method, path: url, status_code: statusCode }).inc();
        requestDurationHistogram.labels({ method, path: url, status_code: statusCode }).observe(duration);
        requestDurationSummary.labels({ method, path: url, status_code: statusCode }).observe(duration);
    });
    next();
});


// Expose metrics for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Sheba.xyz");
});

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// GraphQL endpoint info
app.get("/api/graphql", async (req: Request, res: Response) => {
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
});


app.get('/example', async (req, res) => {
    const endGauge = gauge.startTimer({ method: req.method, status: res.statusCode });
    await simulateAsyncTask();
    endGauge();
    res.send('Async task completed');
});

export default app;
