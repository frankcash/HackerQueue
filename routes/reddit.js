let request = require('request');
let cheerio = require('cheerio');
const db = require('../db')

function parse(html, source){
  let metadataArray = [ ];
  let $ = cheerio.load(html);

  $('a.title').each(function(){

    let a=$(this);

    const comments_tag = a.parent().parent().children('.flat-list').children('li.first').children('a');
    const comments_link = comments_tag.attr("href");
    const comments = parseInt(comments_tag.text());
    const points = a.parent().parent().parent().children('.midcol').children('.unvoted').text();

    const title=a.text();
    const url=a.attr('href');

    const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at") VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;'
    db.query(QUERY,[url, source, title, comments_link, new Date() ], (err, res) => {
      if (err) {
        console.log(err);
        return err
      }
    })


    let metadata = {
      site: "r/programming",
      title:title,
      url:url,
      comments:comments,
      comments_link:comments_link,
      points: points
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
