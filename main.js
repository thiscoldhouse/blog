var blog = blog || {};

$( document ).ready(function(){
  var toggle_carousel_image = function(){
    $.ajax({
      url:"pages/projects/projects.json",
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      cache: false
    }).done( function(data){
      var next_image = Object.keys(data)[blog.carousel_state];
      if (!next_image || blog.carousel_state > 4){
	next_image = Object.keys(data)[0];
	blog.carousel_state = 0;
      }
      var next_text = data[next_image]["tagline"];
      var next_link = data[next_image]["link"];
      next_image = data[next_image]["preview-image"];
      blog.carousel_state = blog.carousel_state + 1;
      $("#carousel-image").fadeOut("slow", function(){
	$("#carousel-text-placeholder").fadeOut("slow",function(){
	  $("#carousel-link").attr(
	    "href", next_link
	  );
	  $("#carousel-image").attr(
	    "src", next_image
	  );	
	  $("#carousel-text-placeholder").text(next_text);
	  $("#carousel-image").fadeIn("slow");
	  $("#carousel-text-placeholder").fadeIn("slow");
	});
      });
    });
  }


  
  // ----------- simple routing -------------
 
  var toggle_page = function(page_name) {
    window.location.hash = "#"+ page_name;
    $(".content-container").load("/pages/" + page_name + ".html");
  }  
  $(".navbarlink").click(function(e) {
    e.preventDefault();
    toggle_page(e.target.id);
  });

  if (!("onhashchange" in window)) {
    alert("You're running an old browser! This Cold House won't work very well, though I'll do my best. Please consider upgrading for the best experience!")
  }
  
  locationHasChanged = function(){    
    toggle_page(window.location.hash.substring(1));
  };
  window.onhashchange = locationHasChanged;

  
  // set up the page 
  // actually injects the right html in our simple routing scheme
  var page = window.location.hash.substring(1);
  if (page.length != 2 || !page[1]){
    page = "/pages/home.html";
  }
  else {
    page = page[1];
    page = "/pages/" + page + ".html"
  }
    
  $(".content-container").load(page);
  
  // start the carousel
  blog.carousel_state = 0;
  window.setInterval(toggle_carousel_image, 5000);
  toggle_carousel_image();  // load the first one

  
})


