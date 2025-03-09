const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3();
const BUCKET_NAME = "uuid-storage";

exports.handler = async () => {
    const uuids = Array.from({ length: 10 }, () => uuidv4());
    const timestamp = new Date().toISOString();
    const fileName = `uuids-${timestamp}.json`;

    const fileContent = JSON.stringify({ ids: uuids });

    await s3.putObject({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
        ContentType: "application/json"
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "UUIDs stored successfully", file: fileName })
    };
};
