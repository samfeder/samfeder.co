'use strict';

const getStory = require('./services/story-grabber');
const awsService = require('./services/aws-service');

function handleError(err) {
  return {
    statusCode: 500,
    body: err
  };
}

module.exports.home = (event, context, callback) => {
  console.log('getting homepage for samfeder.co');

  getStory().then(body => {
    awsService.writeStory(body).then(() => {
      console.log('writing homepage for samfeder.co');


      const headers = {
        'content-type': 'text/html; charset=utf-8'
      }
      const response = {
        statusCode: 200,
        headers,
        body
      };

      callback(null, response);
    }).catch(err => callback(null, handleError(err)));
  })
};
