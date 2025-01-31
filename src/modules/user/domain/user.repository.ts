import { User } from "./user.entity";

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    create(user: User): Promise<void>;
  }