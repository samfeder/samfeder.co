const instagramUrl

function putObjectToS3(Bucket, Key, Body){
  var s3 = new AWS.S3();
  const params = {
    Bucket, Key, Body, ContentType: 'text/html; charset=utf-8'
  }

  return s3.putObject(params).promise();
}

function writeStory(html) {
  return putObjectToS3(BUCKET_NAME, INDEX_NAME, html)
}

module.exports = {writeStory};
