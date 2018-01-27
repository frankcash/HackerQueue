"use strict";

var request = require('request');
var cheerio = require('cheerio');
const db = require('../db')

function fixSelfPost(url){
  if(url.match("http") === null){
    return ("https://lobste.rs" + url);
  }
  return url;
}

var getAlternateLink = function(a) {
  var detailsEl = a.parent();
  var storyLinerEl = detailsEl.parent();
  var listItemEl = storyLinerEl.parent();
  var storyID = listItemEl.attr("data-shortid");
  if (storyID) {
    return "https://lobste.rs/s/" + storyID;
  }
  return null;
};

var parseLobsterElement = function(a) {

  const source =  "lobste.rs";

  // parses href attribute from "a" element
  var url = fixSelfPost(a.children().attr('href'));

  // parses link title
  var title = a.text();

  var commentsLabel = a.parent().children('.byline').children('span.comments_label');
  var commentsMatch = commentsLabel.text().match("[0-9]+");
  var comments = commentsMatch !== null ? commentsMatch[0] : 0;
  var comments_link = commentsLabel.children('a').attr("href");

  // transform comments link to absolute url if relative url found
  if (comments_link) { comments_link = "https://lobste.rs" + comments_link; }

  // If there is no comments link,
  // then try to create a commentsLink from the data on the page.
  // The data-shortid="lponsp" looks promising in the form:
  // http://lobste.rs/s/lponsp
  if (!comments_link) {
    comments_link = getAlternateLink(a);
  }

  const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at") VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;'
  db.query(QUERY,[url, source, title, comments_link, new Date() ], (err, res) => {
    if (err) {
      console.log(err);
      return err
    }
  })

  var metadata = {
    site: source,
    title:title,
    url:url,
    comments:comments,
    comments_link:comments_link
  };

  return metadata;
};

var parseLobsterResponse = function(html) {
    var metadataArray = [ ];

    var $ = cheerio.load(html);
    $('span.link').each(function(){
      var a = $(this); //selects previous data
      var metadata = parseLobsterElement(a);
      if (metadata) { metadataArray.push(metadata); }
    });

    // Iterate through every link's score
    $('div.score').each(function (i) {
      // push the score value to it's respective link object
      metadataArray[i].points = $(this).text();
    });

    return metadataArray;
};

exports.ltop = function(req, res){
  request('https://lobste.rs', function(error, response, html){
      if(!error && response.statusCode === 200){
        var metadataArray = parseLobsterResponse(html);
        res.send(metadataArray);
      }
  });
};

exports.lnew = function(req, res){
  request('https://lobste.rs/recent', function(error, response, html){
    if(!error && response.statusCode === 200){
      var metadataArray = parseLobsterResponse(html);
      res.send(metadataArray);
    }
  });
};
