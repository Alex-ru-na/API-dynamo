import { Request, Response } from "express";
import { UserService } from "../application/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    const user = await this.userService.createUser(name, email);
    res.status(201).json(user);
  }
}
