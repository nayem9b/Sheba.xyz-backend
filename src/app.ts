import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to Sheba.xyz");
});

export default app;
