import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  // Get the image data from the event body
  const imageData = Buffer.from(event.body, 'base64');

  // Generate a unique filename for the image
  const filename = uuidv4();

  // Store the image in the S3 bucket
  await s3.putObject({
    Bucket: 'motorsportgallerybucket',
    Key: filename,
    Body: imageData,
    ContentType: 'image/jpeg'
  }).promise();

  // Store metadata about the image in the DynamoDB table
  await dynamoDB.put({
    TableName: 'Image',
    Item: {
      filename,
      uploadDate: new Date().toISOString()
      // Add any other metadata you want to track here
    }
  }).promise();

  // Return a success response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Image uploaded successfully' })
  };
};