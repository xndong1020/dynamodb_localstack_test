import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const create = (): DocumentClient => {
  const credentials = new AWS.SharedIniFileCredentials({
    profile: "default",
  });

  AWS.config.update({ region: "ap-southeast-2" });
  AWS.config.credentials = credentials;

  const ep = new AWS.Endpoint("http://0.0.0.0:4566");

  const documentClient = new AWS.DynamoDB.DocumentClient({
    endpoint: ep,
    apiVersion: "2012-08-10",
  });
  return documentClient;
};

export default create;
