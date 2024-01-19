import express from "express";
import todoRoutes from "./routes/todos-routes";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "./models/http-error";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
});

app.use("/api", todoRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("could not find this route.", 404);
  throw error;
});

mongoose
  .connect('mongodb://127.0.0.1:27017/todos')
  .then(() => {
    app.listen(5000);
    //console.log("server is running")
  })
  .catch((err) => {
    console.log(err);
  });
