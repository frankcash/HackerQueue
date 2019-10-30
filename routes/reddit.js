let request = require('request');
let cheerio = require('cheerio');
const db = require('../db');
const helpers = require('../helpers');

function parse(html, source){
  let metadataArray = [ ];
  let $ = cheerio.load(html);

  $('.Post').each(function(){

    let post=$(this);
    const title_tag   = post.find('h3');
    const link_tag    = title_tag.parent().parent();

    const comments_tag  = post.find('a[data-click-id=comments]');
    const comments_link = "https://www.reddit.com" + comments_tag.attr("href");
    const comments      = parseInt(comments_tag.text());


    const title = title_tag.text();
    const url   = helpers.url_refer(helpers.fixSelfPost("https://www.reddit.com", link_tag.attr('href')));

    const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at") VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;';
    db.query(QUERY,[url, source, title, comments_link, new Date() ], (err) => {
      if (err) {
        console.log(err);
        return err;
      }
    });


    let metadata = {
      site: "r/programming",
      title: title,
      url: url,
      comments: comments,
      comments_link: comments_link,
    };

    metadataArray.push(metadata);
  });

  return metadataArray;
}

exports.rtop = function(req,res){
  request('http://www.reddit.com/r/programming', function(error, response, html){
    if(!error && response.statusCode === 200){
      res.send(helpers.wrap(parse(html, "reddit.com/r/programming")));
    }
  });
};


exports.rnew = function(req,res){
  request('http://www.reddit.com/r/programming/new/', function(error, response, html){
    if(!error && response.statusCode === 200){
      res.send(helpers.wrap(parse(html, "reddit.com/r/programming/new")));
    }
  });
};
