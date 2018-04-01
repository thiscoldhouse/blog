var blog = blog || {};

$( document ).ready(function(){
	
  $(".navbarlink").click(function(e) {
	  var page = "pages/" + e.target.id + ".html";
	  console.log(page);
	  $(".content-container").load(page);
  });
 })

