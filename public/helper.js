
$.getJSON('/ycomb', function(data){ // gets the JSON info
  for(var i = 0; i<30;i++){
  	console.log("ycom");
    $("<p>"  +"<a href=" + data[i].url + ">" + data[i].title + "</a></p>").appendTo("#helper")
  }
});

$.getJSON('/rp', function(data){
	for(var i=0; i<25; i++){
		console.log("rp");
		$("<p>"+ "<a href=" + data[i].uri + ">" +data[i].title+ "</a>"+"</p>").appendTo("#helper")
	}
});

$.getJSON('/lobster', function(data){
	for (var i = 0; i<25; i++) {
		console.log("lobster");
		$("<p><a href=" + data[i].url + ">" + data[i].title + "</a></p>").appendTo("#helper")
  }
});	


$( document ).ready(function() {
  // console.log( "ready!" );
  // $("b").mouseover(function(){
  //  $("<p>" + data[i].rank + "</p>")
  // });

});
