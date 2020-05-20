const AWS = require('aws-sdk');
const credentials = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
AWS.config.update({credentials, region:'us-east-1'});
AWS.config.setPromisesDependency(require('bluebird'));

const BUCKET_NAME = 'samfeder.co';
const INDEX_NAME = 'index.html';

function putObjectToS3(Bucket, Key, Body){
  const s3 = new AWS.S3();
  const params = {
    Bucket, Key, Body, ContentType: 'text/html; charset=utf-8'
  }

  return s3.putObject(params).promise();
}

function writeStory(html) {
  return putObjectToS3(BUCKET_NAME, INDEX_NAME, html)
}

module.exports = {writeStory};
