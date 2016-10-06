
var expect = require('chai').expect;
var hackernews = require('./hackernews');
var parse = hackernews.parse;
var hackernewsPage = require('../test/fixtures/hackernewsPage').page
describe('hackerNews#parse', function() {
  it('returns an array of metaData', function() {
    const metaDataArray = parse(hackernewsPage);
    expect(metaDataArray).to.have.length(30)
  });
  it('parses a hackernews item correctly', function() {
    const metaDataArray = parse(hackernewsPage);

    expect(metaDataArray[0]).to.deep.eq({ rank: 1,
      site: 'HN',
      title: 'Google Noto Fonts',
      url: 'https://www.google.com/get/noto/',
      points: 408,
      username: 'bpierre',
      comments: 3,
      comments_link: 'https://news.ycombinator.com/item?id=12654499',
    })
  });
});

