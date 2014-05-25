$.getJSON('/ycomb', function(data){
  for(var i = 0; i<15;i++){
    $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title +'</a> <sup>HN</sup> </p></li>').appendTo('#helper');

  }
});

$.getJSON('/rp', function(data){

	for(var i=0; i<15; i++){
		$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>/r/programming</sup></p></li>').appendTo('#helper');

	}
});

$.getJSON('/lobster', function(data){

	for (var i = 0; i<15; i++) {
		$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>Lobste.rs</sup></p></li>').appendTo('#helper');

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

    if($('#top').is(':checked')) {

  		$.getJSON("/lobster", function(data){

  			for(var i = 0; i<15; i++){
  				var re = new RegExp(q, "i");
  				var treble = re.test(data[i].title);
  				if(treble == true){
  					$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>Lobste.rs</sup></p></li>').appendTo('#helper');

  				}
  			}
  		})

  		$.getJSON("/rp", function(data){
  			for(var i = 0; i<15; i++){
  				var re = new RegExp(q, "i");
  				var treble = re.test(data[i].title);
  				if(treble == true){
  					$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>/r/programming</sup></p></li>').appendTo('#helper');

  				}
  			}
  		})

  		$.getJSON("/ycomb", function(data){
  			for(var i = 0; i<15; i++){
  				var re = new RegExp(q, "i");
  				var treble = re.test(data[i].title);
  				if(treble == true){
  					$('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>HN</sup></p></li>').appendTo('#helper');

  				}
  			}
  		})
  }else{
    $.getJSON('/ynew', function(data){
      for(var i = 0; i<15; i++){
        var re = new RegExp(q, "i");
        var treble = re.test(data[i].title);
        if(treble == true){
          $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a></p><sup>HN</sup></li>').appendTo('#helper');

        }
      }
    });

    $.getJSON('/rnew', function(data){
      for(var i = 0; i<15; i++){
        var re = new RegExp(q, "i");
        var treble = re.test(data[i].title);
        if(treble == true){
          $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>/r/programming</sup></p></li>').appendTo('#helper');

        }
      }
    });

    $.getJSON('/lnew', function(data){
      for(var i = 0; i<15; i++){
        var re = new RegExp(q, "i");
        var treble = re.test(data[i].title);
        if(treble == true){
          $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>Lobste.rs</sup></p></li>').appendTo('#helper');

        }
      }
    });
  }
	},500));

  $("#new").click(function(){
    $("li").remove();
    $("#res").remove();
    $.getJSON('/ynew', function(data){
      for(var i = 0; i<15;i++){
        $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>HN</sup></p></li>').appendTo('#helper');

      }
    });

    $.getJSON('/rnew', function(data){

      for(var i=0; i<15; i++){
        $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>/r/programming</sup></p></li>').appendTo('#helper');

      }
    });

    $.getJSON('/lnew', function(data){

      for (var i = 0; i<15; i++) {
        $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>Lobste.rs</sup></p></li>').appendTo('#helper');

      }
    });
  })

  $("#top").click(function(){

    $("li").remove();
    $("#res").remove();
    $.getJSON('/ycomb', function(data){
      for(var i = 0; i<15;i++){
        $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>HN</sup></p></li>').appendTo('#helper');

      }
    });

    $.getJSON('/rp', function(data){

      for(var i=0; i<15; i++){
        $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>/r/programming</sup></p></li>').appendTo('#helper');

      }
    });

    $.getJSON('/lobster', function(data){

      for (var i = 0; i<15; i++) {
        $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>Lobste.rs</sup></p></li>').appendTo('#helper');

      }
    });
  })

});
