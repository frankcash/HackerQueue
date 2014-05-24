
$.getJSON('/ycomb', function(data){ // gets the JSON info
  for(var i = 0; i<30;i++){
  	console.log("ycom");
    $('<li><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
  }
});

$.getJSON('/rp', function(data){
	for(var i=0; i<25; i++){
		console.log("rp");
		$('<li><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
	}
});

$.getJSON('/lobster', function(data){
	for (var i = 0; i<25; i++) {
		console.log("lobster");
		$('<li><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
  }
});	


$( document ).ready(function() {
  $('#refresh').click(function(){
    location.reload();
  });
});
