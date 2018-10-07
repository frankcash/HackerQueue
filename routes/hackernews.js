let request = require('request');
let cheerio = require('cheerio');
const db = require('../db');
const getTimeDiffFromString = require('../lib/time');

function parse(html, source){
  let metadataArray = [ ];
  let $ = cheerio.load(html);
  $('.athing').each(function(){
    let $storylink = $(this).find('.storylink');
    const rank = $(this).find('.rank').text();
    const title = $storylink.text();
    const url = $storylink.attr('href');
    let $subtext = $(this).next();
    const points = $subtext.find('.score').text();
    const age = $subtext.find('.age').text();
    const username = $subtext.find('.hnuser').text();
    let $comments = $subtext.find('a').last();
    const comments = $comments.text();
    const YCOMB_COMMENT_URL = "https://news.ycombinator.com/";
    const comments_link = YCOMB_COMMENT_URL + $comments.attr('href');
    const published_at = getTimeDiffFromString(age);
    const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at", "published_at") VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING;';
    db.query(QUERY,[url, source, title, comments_link, new Date(),  published_at], function (err) {

      if (err) {
        console.log(err);
        return err;
      }
    });

    let metadata = { // creates a new object
      rank: parseInt(rank),
      site: "HN",
      title: title,
      url: url,
      points: parseInt(points),
      username: username,
      comments: parseInt(comments),
      comments_link: comments_link,
      published_at: published_at,
    };
    metadataArray.push(metadata); // pushes the object
  });
  return metadataArray;
}

exports.htop = function(req,res){
  request('https://news.ycombinator.com', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(parse(html, "news.ycombinator.com"));
      }
  });

};

exports.hnew = function(req,res){
  request('https://news.ycombinator.com/newest', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(parse(html, "news.ycombinator.com/newest"));
      }
  });

};
