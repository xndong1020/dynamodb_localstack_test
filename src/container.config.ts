import Container from "typedi";
import createDocumentClient from "./factories/DynamoDBDocumentClientInstanceFactory";
import createMockDocumentClient from "./factories/DynamoDBDocumentClientMockFactory";
import createInstance from "./factories/DynamoDBInstanceFactory";
import createMockInstance from "./factories/DynamoDBLocalMockFactory";

const isLocal = process.env.JEST_WORKER_ID !== undefined;

// Setup scope of the container
const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
const container = Container.of(String(requestId));

container.set(
  "dynamoDBInstance",
  isLocal ? createMockInstance() : createInstance()
);
container.set(
  "dynamoDbDocumentClient",
  isLocal ? createMockDocumentClient() : createDocumentClient()
);

export default container;
