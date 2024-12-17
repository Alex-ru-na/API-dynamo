import { Router } from "express";
import { UserService } from "./application/user.service";
import { UserDal } from "./infrastructure/user.dal";
import { UserController } from "./adapters/user.controller";

const userRouter = Router();

// Dependency Injection
const userRepository = new UserDal();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// routes
userRouter.get("/:id", userController.getUser.bind(userController));
userRouter.post("/", userController.createUser.bind(userController));

export { userRouter };
