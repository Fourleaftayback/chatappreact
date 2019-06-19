const AWS = require("aws-sdk");
const uniqid = require("uniqid");

const BUCKET_NAME = process.env.S3NAME;
const IAM_USER_KEY = process.env.S3IAMUSER;
const IAM_USER_SECRET = process.env.S3IAMSECRET;

const uploadToS3 = file => {
  return new Promise((resolve, reject) => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: `profileimage/${uniqid("profile-image-")}`,
        Body: file.data,
        ACL: "public-read"
      };
      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  });
};

module.exports = uploadToS3;