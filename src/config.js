import AWS from 'aws-sdk';

const config = {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_SECRET_KEY,
  region: process.env.REACT_APP_REGION_NAME,
};

AWS.config.update(config);

export const dynamoDB = new AWS.DynamoDB();
