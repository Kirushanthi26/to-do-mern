import express from "express";
import todoRoutes from "./routes/todos-routes";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "./models/http-error";

const app = express();

app.use(bodyParser.json());

app.use("/api", todoRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("could not find this route.", 404);
  throw error;
});

app.listen(5000);
