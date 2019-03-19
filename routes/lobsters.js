"use strict";

const request = require('request');
const cheerio = require('cheerio');
const db = require('../db');
const helpers = require('../helpers');

function fixSelfPost(url){
  if(url.match("http") === null){
    return ("https://lobste.rs" + url);
  }
  return url;
}

const getAlternateLink = function(a) {
  let detailsEl = a.parent();
  let storyLinerEl = detailsEl.parent();
  let listItemEl = storyLinerEl.parent();
  let storyID = listItemEl.attr("data-shortid");
  if (storyID) {
    return "https://lobste.rs/s/" + storyID;
  }
  return null;
};

const parseLobsterElement = function(a) {

  const source =  "lobste.rs";

  // parses href attribute from "a" element
  const url = helpers.url_refer(fixSelfPost(a.children().attr('href')));

  // parses link title
  const title = a.text();

  let commentsLabel = a.parent().children('.byline').children('span.comments_label');
  let commentsMatch = commentsLabel.text().match("[0-9]+");
  let comments = commentsMatch !== null ? commentsMatch[0] : 0;
  let comments_link = commentsLabel.children('a').attr("href");

  // transform comments link to absolute url if relative url found
  if (comments_link) { comments_link = "https://lobste.rs" + comments_link; }

  // If there is no comments link,
  // then try to create a commentsLink from the data on the page.
  // The data-shortid="lponsp" looks promising in the form:
  // http://lobste.rs/s/lponsp
  if (!comments_link) {
    comments_link = getAlternateLink(a);
  }

  const QUERY = 'INSERT INTO "crawls" ("story_url", "source", "title", "comments", "crawled_at") VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;';
  db.query(QUERY,[url, 2, title, comments_link, new Date() ], (err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });

  const metadata = {
    site: source,
    title:title,
    url:url,
    comments:comments,
    comments_link:comments_link
  };

  return metadata;
};

const parseLobsterResponse = function(html) {
    let metadataArray = [ ];

    let $ = cheerio.load(html);
    $('span.link').each(function(){
      let a = $(this); //selects previous data
      let metadata = parseLobsterElement(a);
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
        let metadataArray = parseLobsterResponse(html);
        res.send(metadataArray);
      }
  });
};

exports.lnew = function(req, res){
  request('https://lobste.rs/recent', function(error, response, html){
    if(!error && response.statusCode === 200){
      const metadataArray = parseLobsterResponse(html);
      res.send(metadataArray);
    }
  });
};
