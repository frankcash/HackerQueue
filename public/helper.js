function createPost(data, site){
  for(var i = 0; i< 15; i++){
    if(data[i].title=="scribd"){

    }else{
      $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">'
      + data[i].title +'</a> <sup>' + site + "</sup> </p></li>").appendTo('#helper');
    }
  }
}

function filteredPost(data, q, site){
  for(var i = 0; i<15; i++){
    var re = new RegExp(q, "i");
    var treble = re.test(data[i].title);
    if((treble == true) && (data[i].title!="scribd")){
      $('<li id="post"><p><a href="' + data[i].url + ' "style="text-decoration:none">' + data[i].title + '</a><sup>' + site + '</sup></p></li>').appendTo('#helper');

    }
  }
}

function reFresh(){
  $("li").remove();
  $("#res").remove();
  if($('#top').is(':checked')) {
    $.getJSON('/ycomb', function(data){
      createPost(data, "HN")
    });

    $.getJSON('/rp', function(data){
      createPost(data, "r/programming")
    });

    $.getJSON('/lobster', function(data){
      createPost(data, "Lobste.rs")
    });
  }else{
    $.getJSON('/ynew', function(data){
      createPost(data, "HN")
    });

    $.getJSON('/rnew', function(data){
      createPost(data, "r/programming")
    });

    $.getJSON('/lnew', function(data){
      createPost(data, "Lobste.rs")
    });

  }
} // end of reFresh

$.getJSON('/ycomb', function(data){
  var site = "HN";
  createPost(data, site)
});

$.getJSON('/rp', function(data){
  var site = "r/programming";
  createPost(data, site)
});

$.getJSON('/lobster', function(data){
  var site = "Lobste.rs";
  createPost(data, site)
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
    reFresh()
  });

	$("#searchterm").keyup( debounce (function(e){
    var q = $("#searchterm").val();
    $('li').remove();
    $("#res").remove();
    // $("#helper").append("<b id=res> Results for " + q + "</b>");

    if($('#top').is(':checked')) {

  		$.getJSON("/lobster", function(data){
        filteredPost(data, q, "Lobste.rs")

  		})

  		$.getJSON("/rp", function(data){
        filteredPost(data, q, "/r/programming")

  		})

  		$.getJSON("/ycomb", function(data){
        filteredPost(data, q, "HN")

  		})
  }else{
    $.getJSON('/ynew', function(data){
      filteredPost(data, q, "HN")

    });

    $.getJSON('/rnew', function(data){
      filteredPost(data, q, "/r/programming")

    });

    $.getJSON('/lnew', function(data){
      filteredPost(data, q, "Lobste.rs")

    });
  }
	},500));

  $("#new").click(function(){
    $("li").remove();
    $("#res").remove();
    $.getJSON('/ynew', function(data){
      createPost(data, "HN")
    });

    $.getJSON('/rnew', function(data){
      createPost(data, "r/programming")
    });

    $.getJSON('/lnew', function(data){
      createPost(data, "Lobste.rs")
    });
  })

  $("#top").click(function(){

    $("li").remove();
    $("#res").remove();
    $.getJSON('/ycomb', function(data){
      var site = "HN";
      createPost(data, site)
    });

    $.getJSON('/rp', function(data){

      var site = "r/programming";
      createPost(data, site)
    });

    $.getJSON('/lobster', function(data){

      var site = "Lobste.rs";
      createPost(data, site)
    });
  })

});

$(document).ready(function() {
    $('#refresh').mouseenter(function() {
        $('#refresh').fadeTo('fast',1);
    });
    $('#refresh').mouseleave(function() {
        $('#refresh').fadeTo('fast',.75);
    });

});
