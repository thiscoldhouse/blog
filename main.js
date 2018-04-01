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
      if (!next_image){
	next_image = Object.keys(data)[0];
	blog.carousel_state = 0;
      }
      next_image = data[next_image]["preview-image"];
      $("#carousel-image-placeholder").attr(
	"src", next_image
      );
      
      blog.carousel_state = blog.carousel_state + 1;      
      console.log(next_image);
    })
  }

  var toggle_page = function(page_name) {
    var page = "pages/" + page_name + ".html";
    console.log(page);
    $(".content-container").load(page);

  }
  $(".navbarlink").click(function(e) {
    toggle_page(e.target.id);
  });

  // set up the page
  
  // start in home
  toggle_page('home')
  // start the carousel
  blog.carousel_state = 0;
  window.setInterval(toggle_carousel_image, 1000)
  
})


