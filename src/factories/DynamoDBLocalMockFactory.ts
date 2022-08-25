import AWS from "aws-sdk";

const create = () => {
  const credentials = new AWS.SharedIniFileCredentials({
    profile: "default",
  });

  AWS.config.update({ region: "ap-southeast-2" });
  AWS.config.credentials = credentials;

  const ep = new AWS.Endpoint("http://0.0.0.0:4566");

  const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: ep });
  return dynamodb;
};

export default create;
