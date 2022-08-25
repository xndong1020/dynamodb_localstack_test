import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const create = (): DocumentClient => {
  // Loading Credentials in Node.js from the Shared Credentials File
  const credentials = new AWS.SharedIniFileCredentials({
    profile: "yahoo",
  });

  AWS.config.update({ region: "ap-southeast-2" });
  AWS.config.credentials = credentials;

  const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
  });
  return documentClient;
};

export default create;
