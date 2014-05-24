<<<<<<< HEAD
$.getJSON('/ycomb', function(data){ // gets the JSON info
  // console.log(data);
  for(var i = 0; i<30;i++){
    $("<p><b>" + data[i].rank + ".</b> " + "<a href=" + data[i].url + ">" + data[i].title + "</a></p>").appendTo("#helper")
  }
});

=======

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

>>>>>>> 2259898b3b3cb7d35331d82229df823b44487d8c
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
