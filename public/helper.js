$.getJSON('/ycomb', function(data){ 
  for(var i = 0; i<15;i++){
    $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p></li>').appendTo('#helper');

  }
});

$.getJSON('/rp', function(data){

	for(var i=0; i<15; i++){
		$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p></li>').appendTo('#helper');

	}
});

$.getJSON('/lobster', function(data){

	for (var i = 0; i<15; i++) {
		$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p></li>').appendTo('#helper');

  }
});	

$( document ).ready(function() {

	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this, args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	}

  $('#refresh').css( 'cursor', 'pointer' );

  $('#refresh').click(function(){
    location.reload();
  });

	$("#searchterm").keyup( debounce (function(e){
		var q = $("#searchterm").val();
		$('li').remove();
		$("#res").remove();
		$("#helper").append("<b id=res> Results for " + q + "</b>");

		$.getJSON("/lobster", function(data){ 
			
			for(var i = 0; i<15; i++){
				var re = new RegExp(q, "i");
				var treble = re.test(data[i].title);
				if(treble == true){
					$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p></li>').appendTo('#helper');
					console.log("lob");
				}
			}
		})

		$.getJSON("/rp", function(data){
			for(var i = 0; i<15; i++){
				var re = new RegExp(q, "i");
				var treble = re.test(data[i].title);
				if(treble == true){
					$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p></li>').appendTo('#helper');
					console.log("rp");
				}
			}
		})

		$.getJSON("/ycomb", function(data){
			for(var i = 0; i<15; i++){
				var re = new RegExp(q, "i");
				var treble = re.test(data[i].title);
				if(treble == true){
					$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p></li>').appendTo('#helper');
					console.log("yc");
				}
			}
		})

	},250));


});

