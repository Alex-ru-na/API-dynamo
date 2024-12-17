import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(name: string, email: string): Promise<User> {
    const user = new User(Date.now().toString(), name, email);
    await this.userRepository.create(user);
    return user;
  }
}
