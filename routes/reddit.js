var request = require('request');
var cheerio = require('cheerio');

exports.rtop = function(req,res){
  request('http://www.reddit.com/r/programming', function(error, response, html){
    if(!error && response.statusCode == 200){
      var metadataArray = [ ];
      var $ = cheerio.load(html);

      $('a.title').each(function(i, element){

        var a=$(this);

        var comments_tag = a.parent().parent().children('.flat-list').children('li.first').children('a');
        var comments_link = comments_tag.attr("href");
        var comments = parseInt(comments_tag.text());
        var points = a.parent().parent().parent().children('.midcol').children('.unvoted').text();

        var title=a.text();
        var url=a.attr('href');

        var metadata = {
          site: "r/programming",
          title:title,
          url:url,
          comments:comments,
          comments_link:comments_link,
          points: points
        };

        metadataArray.push(metadata);
      });
      res.send(metadataArray);
    }

  });
}


exports.rnew = function(req,res){
  request('http://www.reddit.com/r/programming/new/', function(error, response, html){
    if(!error && response.statusCode == 200){
      var metadataArray = [ ];
      var $ = cheerio.load(html);

      $('a.title').each(function(i, element){

        var a=$(this);

        var title=a.text();
        var url=a.attr('href');

        var comments_tag = a.parent().parent().children('.flat-list').children('li.first').children('a');
        var comments_link = comments_tag.attr("href");
        var comments = parseInt(comments_tag.text());
        var points = a.parent().parent().parent().children('.midcol').children('.unvoted').text();


        var metadata = {
          site: "r/programming",
          title:title,
          url:url,
          comments:comments,
          comments_link:comments_link,
          points: points
        };


        metadataArray.push(metadata);
      });



      res.send(metadataArray);
    }

  });
}
