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

  listTables = async (params: ListTablesInput = {}) => {
    return this.dynamodb.listTables(params).promise();
  };

  describeTable = async (params: DescribeTableInput) => {
    return this.dynamodb.describeTable(params).promise();
  };

  createTable = async (createTableInput: CreateTableInput) => {
    return this.dynamodb.createTable(createTableInput).promise();
  };

  deleteTable = async (deleteTableInput: DeleteTableInput) => {
    return this.dynamodb.deleteTable(deleteTableInput).promise();
  };
}
