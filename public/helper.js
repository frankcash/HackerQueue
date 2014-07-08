function commentsTemplate(info){
  if (!info.comments_link){
    return "No Comments";
  }

  var numComments = info.comments || 0;

  return '<a style="text-decoration:none" href="' + info.comments_link + '">'
  + numComments 
  + ' Comments '
  + '</a>';
}

function postTemplate(info, site){
  return $('<li id="post"><p><a href="' + info.url 
           + ' "style="text-decoration:none" target="_blank">'
           + info.title +'</a> <sup>' + site + " - "
           + commentsTemplate(info)
           + "</sup> </p></li>");
}

function createPost(data, site){
  for(var i = 0; i< 15; i++){
    if(data[i].title=="scribd"){

    }else{
      postTemplate(data[i], site).appendTo('#helper');
    }
  }
}

function filteredPost(data, q, site){
  for(var i = 0; i<15; i++){
    var re = new RegExp(q, "i");
    var treble = re.test(data[i].title);
    if((treble == true) && (data[i].title!="scribd")){
      postTemplate(data[i], site).appendTo('#helper');
    }
  }
}

function updateForCheck(){
  $("li").remove();
  $("#res").remove();
  if($('#top').is(':checked')) {
    if($('#hnBox').is(':checked')){
      $.getJSON('/ycomb', function(data){
        var site = "HN";
        createPost(data, site)
      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lobster', function(data){
        var site = "Lobste.rs";
        createPost(data, site)
      });

    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rp', function(data){
        var site = "r/programming";
        createPost(data, site)
      });
    }
  }else{
    if($('#hnBox').is(':checked')){
      $.getJSON('/ynew', function(data){
        createPost(data, "HN")
      });
    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rnew', function(data){
        createPost(data, "r/programming")
      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lnew', function(data){
        createPost(data, "Lobste.rs")
      });
    }

  }

}

function reFresh(){
  $("li").remove();
  $("#res").remove();
  if($('#top').is(':checked')) {
    if($('#hnBox').is(':checked')){
      $.getJSON('/ycomb', function(data){
        var site = "HN";
        createPost(data, site)
      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lobster', function(data){
        var site = "Lobste.rs";
        createPost(data, site)
      });

    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rp', function(data){
        var site = "r/programming";
        createPost(data, site)
      });
    }
  }else{
    if($('#hnBox').is(':checked')){
      $.getJSON('/ynew', function(data){
        createPost(data, "HN")
      });
    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rnew', function(data){
        createPost(data, "r/programming")
      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lnew', function(data){
        createPost(data, "Lobste.rs")
      });
    }

  }
} // end of reFresh






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

  if($('#hnBox').is(':checked')){

    $.getJSON('/ycomb', function(data){
      var site = "HN";
      createPost(data, site)
    });
  }
  if($('#lobsterBox').is(':checked')){
    $.getJSON('/lobster', function(data){
      var site = "Lobste.rs";
      createPost(data, site)
    });

  }
  if($('#rprogBox').is(':checked')){
    $.getJSON('/rp', function(data){
      var site = "r/programming";
      createPost(data, site)
    });
  }

	$("#searchterm").keyup( debounce (function(e){
    var q = $("#searchterm").val();
    $('li').remove();
    $("#res").remove();
    if($('#top').is(':checked')) {
      if($('#lobsterBox').is(':checked')){
    		$.getJSON("/lobster", function(data){
          filteredPost(data, q, "Lobste.rs")

    		})
      }
      if($('#rprogBox').is(':checked')){
    		$.getJSON("/rp", function(data){
          filteredPost(data, q, "/r/programming")

    		})
      }
      if($('#hnBox').is(':checked')){
    		$.getJSON("/ycomb", function(data){
          filteredPost(data, q, "HN")

    		})
      }
  }else{
    if($('#hnBox').is(':checked')){
      $.getJSON('/ynew', function(data){
        filteredPost(data, q, "HN")

      });
    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rnew', function(data){
        filteredPost(data, q, "/r/programming")

      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lnew', function(data){
        filteredPost(data, q, "Lobste.rs")

      });
    }
  }
},300));

  $("#new").click(function(){
    $("li").remove();
    $("#res").remove();
    if($('#hnBox').is(':checked')){
      $.getJSON('/ynew', function(data){
        createPost(data, "HN")
      });
    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rnew', function(data){
        createPost(data, "r/programming")
      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lnew', function(data){
        createPost(data, "Lobste.rs")
      });
    }
  })

  $("#top").click(function(){

    $("li").remove();
    $("#res").remove();
    if($('#hnBox').is(':checked')){
      $.getJSON('/ycomb', function(data){
        var site = "HN";
        createPost(data, site)
      });
    }
    if($('#lobsterBox').is(':checked')){
      $.getJSON('/lobster', function(data){
        var site = "Lobste.rs";
        createPost(data, site)
      });

    }
    if($('#rprogBox').is(':checked')){
      $.getJSON('/rp', function(data){
        var site = "r/programming";
        createPost(data, site)
      });
    }
  })

});

$(document).ready(function() {
    $('#refresh').mouseenter(function() {
        $('#refresh').fadeTo('fast',1);
    });
    $('#refresh').mouseleave(function() {
        $('#refresh').fadeTo('fast',.75);
    });
    $("#toTop").click(function () {
      $("html, body").animate({scrollTop: 0}, 1000);
    });
    $('#toTop').css( 'cursor', 'pointer' );


    $("#hnBox").click(function(){
      updateForCheck()
    })
    $("#lobsterBox").click(function(){
      updateForCheck()
    })
    $("#rprogBox").click(function(){
      updateForCheck()
    })
});
