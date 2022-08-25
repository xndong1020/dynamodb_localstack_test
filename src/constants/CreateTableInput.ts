import { CreateTableInput } from "aws-sdk/clients/dynamodb";

export const createTableInput: CreateTableInput = {
  TableName: "td_notes_sdk",
  AttributeDefinitions: [
    { AttributeName: "user_id", AttributeType: "S" },
    { AttributeName: "timestamp", AttributeType: "N" },
    { AttributeName: "note_id", AttributeType: "S" },
    { AttributeName: "title", AttributeType: "S" },
    { AttributeName: "cat", AttributeType: "S" },
    // { AttributeName: "username", AttributeType: "S" },
    // { AttributeName: "content", AttributeType: "S" },
  ],
  KeySchema: [
    {
      AttributeName: "user_id",
      KeyType: "HASH",
    },
    {
      AttributeName: "timestamp",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  LocalSecondaryIndexes: [
    {
      IndexName: "user_id_title_index",
      KeySchema: [
        {
          AttributeName: "user_id",
          KeyType: "HASH",
        },
        {
          AttributeName: "title",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
    },
    {
      IndexName: "user_id_cat_index",
      KeySchema: [
        {
          AttributeName: "user_id",
          KeyType: "HASH",
        },
        {
          AttributeName: "cat",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "note_id_index",
      KeySchema: [
        {
          AttributeName: "note_id",
          KeyType: "HASH",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
  StreamSpecification: {
    StreamEnabled: false,
  },
  Tags: [{ Key: "Creator", Value: "JG" }],
};
