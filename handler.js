'use strict';

const story = require('./services/story-grabber');

module.exports.home = (event, context, callback) => {
  console.log('getting homepage for samfeder.co');
  story().then(body => {
    const headers = {
      'content-type': 'text/html; charset=utf-8'
    }

    const response = {
      statusCode: 200,
      headers,
      body
    };

    callback(null, response);
  })
};
