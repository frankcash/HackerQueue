$.getJSON('/scrape', function(data){ // gets the JSON info
  // console.log(data);
  for(var i = 0; i<30;i++){
    $("<p><b>" + data[i].rank + ".</b> " + "<a href=" + data[i].url + ">" + data[i].title + "</a></p>").appendTo("#helper")
  }
});
$( document ).ready(function() {
  // console.log( "ready!" );
  // $("b").mouseover(function(){
  //  $("<p>" + data[i].rank + "</p>")
  // });

});
