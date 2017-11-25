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

  $('title').text('Sam Feder');

  addMeta($);
  return $.html();
}

function addMeta($) {
  $('meta').remove();

  const description = $('.job.has-tooltip').text();

  $('head').append('<meta name="twitter:card" content="summary">');
  $('head').append('<meta name="twitter:domain" content="samfeder.co">');
  $('head').append('<meta property="og:type" content="website">');
  $('head').append('<meta property="og:image" itemprop="image primaryImageOfPage" content="https://i.stack.imgur.com/QgqKs.jpg">');
  $('head').append('<meta name="twitter:title" property="og:title" itemprop="title name" content="Sam Feder">');
  $('head').append(`<meta name="twitter:description" property="og:description" itemprop="description" content="${description}">`);
  $('head').append('<meta property="og:url" content="https://samfeder.co">');
}

module.exports = getUrl;
