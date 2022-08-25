import { Inject, Service } from "typedi";
import {
  BatchGetItemInput,
  BatchWriteItemInput,
  DeleteItemInput,
  DocumentClient,
  GetItemInput,
  PutItemInput,
  QueryInput,
  ScanInput,
  UpdateItemInput,
} from "aws-sdk/clients/dynamodb";

@Service()
export class TableItemService {
  constructor(
    @Inject("dynamoDbDocumentClient") private documentClient: DocumentClient
  ) {}

  put = (params: PutItemInput) => {
    return this.documentClient.put(params).promise();
  };

  update = (params: UpdateItemInput) => {
    return this.documentClient.update(params).promise();
  };

  get = (params: GetItemInput) => {
    return this.documentClient.get(params).promise();
  };

  batchGet = (params: BatchGetItemInput) => {
    return this.documentClient.batchGet(params).promise();
  };

  batchWrite = (params: BatchWriteItemInput) => {
    return this.documentClient.batchWrite(params).promise();
  };

  query = (params: QueryInput) => {
    return this.documentClient.query(params).promise();
  };

  scan = (params: ScanInput) => {
    return this.documentClient.scan(params).promise();
  };

  delete = (params: DeleteItemInput) => {
    return this.documentClient.delete(params).promise();
  };
}
