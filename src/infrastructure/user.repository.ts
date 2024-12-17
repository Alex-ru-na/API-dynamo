import { DynamoDBClientSingleton } from "../config/dynamoDB.client";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

export class UserDal implements UserRepository {
  private readonly tableName = "Users";
  private readonly dynamoDB = DynamoDBClientSingleton.getInstance();

  async findById(id: string): Promise<User | null> {
    const params = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await this.dynamoDB.send(params);

    if (!result.Item) return null;

    return new User(result.Item.id, result.Item.name, result.Item.email);
  }

  async create(user: User): Promise<void> {
    const params = new PutCommand({
      TableName: this.tableName,
      Item: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    await this.dynamoDB.send(params);
  }
}
