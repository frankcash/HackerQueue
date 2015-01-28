"use strict";

var request = require('request');
var cheerio = require('cheerio');

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


// a is .details 
var findCommentsLabel = function(detailsEl) {
  var commentsLabelEl = null;

  var storyLinerEl = detailsEl.parent();
  if (!storyLinerEl) { return null; }

  var bylineEl = storyLinerEl.children('.byline');
  if (!bylineEl) { return null; }

  commentsLabelEl = bylineEl.children('span.comments_label');
  if (!commentsLabelEl) { return null; }

  return commentsLabelEl;
};

var parseLobsterElement = function(a) {
  // parses href attribute from "a" element
  var url = a.children().attr('href'); 

  // parses link title
  var title = a.text(); 
  
  var commentsLabel = a.parent().children('.byline').children('span.comments_label');
  var commentsMatch = commentsLabel.text().match("[0-9]+");
  var comments = commentsMatch !== null ? commentsMatch[0] : 0;
  var commentsLink = commentsLabel.children('a').attr("href");

  // transform comments link to absolute url if relative url found
  if (commentsLink) { commentsLink = "https://lobste.rs" + commentsLink; }

  // If there is no comments link, 
  // then try to create a commentsLink from the data on the page.
  // The data-shortid="lponsp" looks promising in the form:
  // http://lobste.rs/s/lponsp
  if (!commentsLink) {
    commentsLink = getAlternateLink(a);
  }

  var metadata = { 
    site: "lobste.rs",
    title:title,
    url:url,
    comments:comments,
    comments_link:commentsLink
  };

  return metadata;
};

var parseLobsterResponse = function(html) {
    var metadataArray = [ ];

    var $ = cheerio.load(html);
    $('span.link').each(function(i, element){
      var a = $(this); //selects previous data
      var metadata = parseLobsterElement(a);
      if (metadata) { metadataArray.push(metadata); }
    });

    // Iterate through every link's score
    $('div.score').each(function (i, element) {
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
}

exports.lnew = function(req, res){
  request('https://lobste.rs/recent', function(error, response, html){
    if(!error && response.statusCode === 200){
      var metadataArray = parseLobsterResponse(html);
      res.send(metadataArray);
    }
  });
}
