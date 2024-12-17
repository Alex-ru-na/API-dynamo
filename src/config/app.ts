import express, { Application } from "express";
import { UserService } from "../application/user.service";
import { UserDal } from "../infrastructure/user.repository";
import { UserController } from "../adapters/user.controller";

const app: Application = express();
app.use(express.json());

// Dependency Injection
const userRepository = new UserDal();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
app.get("/users/:id", userController.getUser.bind(userController));
app.post("/users", userController.createUser.bind(userController));

export { app };
