let request = require('request');
let cheerio = require('cheerio');
const db = require('../db');
const helpers = require('../helpers');

function parse(html){
  let metadataArray = [ ];
  let $ = cheerio.load(html);
  $('.athing').each(function(){
    let $storylink = $(this).find('.storylink');
    const title = $storylink.text();
    const url = helpers.url_refer($storylink.attr('href'));
    let $subtext = $(this).next();
    let $comments = $subtext.find('a').last();
    const comments = $comments.text();
    const YCOMB_COMMENT_URL = "https://news.ycombinator.com/";
    const comments_link = YCOMB_COMMENT_URL + $comments.attr('href');

    const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at") VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;';
    db.query(QUERY,[url, "news.ycombinator.com", title, comments_link, new Date() ], (err) => {
      if (err) {
        console.log(err);
        return err;
      }
    });

    let metadata = { // creates a new object
      site: "HN",
      title: title,
      url: url,
      comments: parseInt(comments),
      comments_link: comments_link
    };
    metadataArray.push(metadata); // pushes the object
  });
  return metadataArray;
}

exports.htop = function(req,res){
  request('https://news.ycombinator.com', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(helpers.wrap(parse(html, "news.ycombinator.com")));
      }
  });

};

exports.hnew = function(req,res){
  request('https://news.ycombinator.com/newest', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(helpers.wrap(parse(html, "news.ycombinator.com/newest")));
      }
  });

};
