$.getJSON('/ycomb', function(data){ 
  for(var i = 0; i<10;i++){
    $('<li id="post"><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
  }
});

$.getJSON('/rp', function(data){
	for(var i=0; i<10; i++){
		$('<li id="post"><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
	}
});

$.getJSON('/lobster', function(data){
	for (var i = 0; i<10; i++) {
		$('<li id="post"><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
  }
});	


$( document ).ready(function() {
  $('#refresh').click(function(){
    location.reload();
  });



	$("#searchterm").keyup(function(e){
		var q = $("#searchterm").val();
		$('li').remove();
		$("#res").remove();
		$("#helper").append("<b id=res> Results for " + q + "</b>");

		$.getJSON("/lobster", function(data){ 
			
			for(var i = 0; i<10; i++){
				var re = new RegExp(q, "g");
				var treble = re.test(data[i].title);
				if(treble == true){
					$('<li id="post"><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
					console.log("lob");
				}
			}
		})

		$.getJSON("/rp", function(data){
			// $('li').remove();
			for(var i = 0; i<10; i++){
				var re = new RegExp(q, "g");
				var treble = re.test(data[i].title);
				if(treble == true){
					$('<li id="post"><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
					console.log("rp");
				}
			}
		})

		$.getJSON("/ycomb", function(data){
			// $('li').remove();
			for(var i = 0; i<10; i++){
				var re = new RegExp(q, "g");
				var treble = re.test(data[i].title);
				if(treble == true){
					$('<li id="post"><p><a href="' + data[i].url + '">' + data[i].title + '</a></p></li>').appendTo('#helper');
					console.log("yc");
				}
			}
		})

	})




});
