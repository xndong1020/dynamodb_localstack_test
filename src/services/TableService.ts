import { Inject, Service } from "typedi";
import { DynamoDB } from "aws-sdk";
import {
  CreateTableInput,
  DeleteTableInput,
  DescribeTableInput,
  ListTablesInput,
} from "aws-sdk/clients/dynamodb";

@Service()
export class TableService {
  constructor(@Inject("dynamoDBInstance") private dynamodb: DynamoDB) {}

  listTables = (params: ListTablesInput = {}) => {
    return this.dynamodb.listTables(params).promise();
  };

  describeTable = (params: DescribeTableInput) => {
    return this.dynamodb.describeTable(params).promise();
  };

  createTable = (createTableInput: CreateTableInput) => {
    return this.dynamodb.createTable(createTableInput).promise();
  };

  deleteTable = (deleteTableInput: DeleteTableInput) => {
    return this.dynamodb.deleteTable(deleteTableInput).promise();
  };
}
