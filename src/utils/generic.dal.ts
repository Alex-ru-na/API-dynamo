import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClientSingleton } from "../config/dynamoDB.client";
import { GenericRepository } from "./generic.repository";

export class GenericDal<T extends Record<string, any>> implements GenericRepository<T> {
  private readonly tableName: string;
  private readonly dynamoDB: DynamoDBDocumentClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.dynamoDB = DynamoDBClientSingleton.getInstance();
  }

  async findById(id: string): Promise<T | null> {
    const params = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await this.dynamoDB.send(params);
    return result.Item as T || null;
  }

  async create(item: T): Promise<void> {
    const params = new PutCommand({
      TableName: this.tableName,
      Item: item,
    });

    await this.dynamoDB.send(params);
  }

  async update(id: string, updates: Partial<T>): Promise<void> {
    const updateExpressionParts: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    for (const key of Object.keys(updates)) {
      updateExpressionParts.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = (updates as any)[key];
    }

    const params = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    await this.dynamoDB.send(params);
  }

  async delete(id: string): Promise<void> {
    const params = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });

    await this.dynamoDB.send(params);
  }
}
