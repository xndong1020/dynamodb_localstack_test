import Container from "typedi";
import createInstance from "./factories/DynamoDBInstanceFactory";
import createMock from "./factories/DynamoDBLocalMockFactory";

const isLocal = process.env.JEST_WORKER_ID !== undefined;

// Setup scope of the container
const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
const container = Container.of(String(requestId));

container.set("dynamoDBInstance", isLocal ? createMock() : createInstance());

export default container;
