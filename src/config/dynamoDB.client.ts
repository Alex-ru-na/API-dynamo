import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class DynamoDBClientSingleton {
  private static instance: DynamoDBDocumentClient;

  private constructor() { }

  public static getInstance(): DynamoDBDocumentClient {
    if (!DynamoDBClientSingleton.instance) {
      const client = new DynamoDBClient({
        region: "us-west-2",
        endpoint: "http://localhost:8000", // Local DynamoDB endpoint
        credentials: {
          accessKeyId: "fakeMyKeyId",
          secretAccessKey: "fakeSecretAccessKey",
        },
      });

      console.log("DB connected", client.config.serviceId)

      DynamoDBClientSingleton.instance = DynamoDBDocumentClient.from(client);
    }

    return DynamoDBClientSingleton.instance;
  }
}
