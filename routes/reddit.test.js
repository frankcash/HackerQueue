var expect = require('chai').expect;
var reddit = require('./reddit');
var parse = reddit.parse;
var redditPage = require('../test/fixtures/redditPage').page;

describe('reddit#parse', function() {
  it(' returns an array with length of 25', function() {
    var metaDataArray = parse(redditPage);
    expect(metaDataArray).to.have.length(25);
  });
  it('parses a reddit link correctly', function() {
    var metaDataArray = parse(redditPage);
    expect(metaDataArray[0]).to.deep.eq({ 
      site: 'r/programming',
      title: 'Unix as an IDE',
      url: 'https://sanctum.geek.nz/arabesque/series/unix-as-ide/',
      comments: 307,
      comments_link: 'https://www.reddit.com/r/programming/comments/5652tc/unix_as_an_ide/',
      points: '364',
    });
  });
});

