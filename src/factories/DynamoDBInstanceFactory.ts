import AWS from "aws-sdk";

const create = () => {
  // Loading Credentials in Node.js from the Shared Credentials File
  const credentials = new AWS.SharedIniFileCredentials({
    profile: "yahoo",
  });

  AWS.config.update({ region: "ap-southeast-2" });
  AWS.config.credentials = credentials;

  const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  return dynamodb;
};

export default create;
