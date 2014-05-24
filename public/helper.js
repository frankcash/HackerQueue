$.getJSON('/ycomb', function(data){ // gets the JSON info
   console.log("ycomb");
  for(var i = 0; i<30;i++){
  	console.log(data[i].url);
    $("<p>"  +"<a href=" + data[i].url + ">" + data[i].title + "</a></p>").appendTo("#helper")
  }
});

$.getJSON('/rp', function(data){
	console.log("rp");
	for(var i=0; i<25; i++){
		$("<p>"+ "<a href=" + data[i].uri + ">" +data[i].title+ "</a>"+"</p>").appendTo("#helper")
	}
});

$( document ).ready(function() {
  // console.log( "ready!" );
  // $("b").mouseover(function(){
  //  $("<p>" + data[i].rank + "</p>")
  // });

});
