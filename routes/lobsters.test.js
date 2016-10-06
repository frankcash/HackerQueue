var expect = require('chai').expect;
var lobsters = require('./lobsters');
var parse = lobsters.parse;
var lobstersPage = require('../test/lobstersPage').page

describe('lobsters#parse', function() {
  it(' returns an array with length of 25', function() {
    var metaDataArray = parse(lobstersPage)
    expect(metaDataArray).to.have.length(25);
  })
  it('parses a lobster link correctly', function() {
    var metaDataArray = parse(lobstersPage)
    expect(metaDataArray[0]).to.deep.eq({ 
      site: 'lobste.rs',
        title: '\n        Meet the Man Behind ‘Solarized,’ the Most Important Color Scheme in Computer History\n    ',
        url: 'http://observer.com/2015/02/meet-the-man-behind-solarized-the-most-important-color-scheme-in-computer-history/',
        comments: '23',
        comments_link: 'https://lobste.rs/s/vdhwll/meet_man_behind_solarized_most_important',
        points: '22' 
    })
  })
})

