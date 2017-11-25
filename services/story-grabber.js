const cheerio = require('cheerio');
const rp = require('request-promise');

const uri = 'https://stackoverflow.com/story/samfeder';

function getUrl() {
  const options = {
    uri,
    transform: body => {
      const $ = cheerio.load(body);

      return parseBody($);
    }
  };

  return rp(options)
    .then(link => link)
    .catch(err => {
      console.log(`error: ${err}`)
      return null;
    });
}

function parseBody($) {
  $('.timeline-public-header').remove();
  $('.last-seen').remove();
  $('.network-accounts').remove();
  $('.footer-notice').remove();

  return $.html();
}

module.exports = getUrl;
