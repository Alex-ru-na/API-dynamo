import express, { Application } from "express";
import { userRouter } from "../modules/user/http.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRouter);

export { app };
