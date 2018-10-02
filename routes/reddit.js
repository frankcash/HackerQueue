let request = require('request');
let cheerio = require('cheerio');
const db = require('../db');
const getTimeDiffFromString = require('../lib/time');

function parse(html, source){
  let metadataArray = [ ];
  let $ = cheerio.load(html);

  $('.Post').each(function(){

    let post=$(this);

    const title_tag   = post.find('h2');
    const link_tag    = title_tag.parent();

    const comments_tag  = post.find('a[data-click-id=comments]');
    const comments_link = comments_tag.attr("href");
    const comments      = parseInt(comments_tag.text());

    const points = post.find('button[aria-label=upvote]').parent().children('div').text();

    const title = title_tag.text();
    const url   = link_tag.attr('href');

    const timestamp = post.find("a[data-click-id='timestamp']").text();
    const published_at = getTimeDiffFromString(timestamp);

    const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at", "published_at") VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING;'
    db.query(QUERY,[url, source, title, comments_link, new Date(), published_at], function (err) {
      if (err) {
        console.log(err);
        return err
      }
    });


    let metadata = {
      site: "r/programming",
      title:title,
      url:url,
      comments:comments,
      comments_link:comments_link,
      points: points,
      published_at: published_at,
    };

    metadataArray.push(metadata);
  });

  return metadataArray;
}

exports.rtop = function(req,res){
  request('http://www.reddit.com/r/programming', function(error, response, html){
    if(!error && response.statusCode === 200){
      res.send(parse(html, "reddit.com/r/programming"));
    }
  });
};


exports.rnew = function(req,res){
  request('http://www.reddit.com/r/programming/new/', function(error, response, html){
    if(!error && response.statusCode === 200){
      res.send(parse(html, "reddit.com/r/programming/new"));
    }
  });
};
