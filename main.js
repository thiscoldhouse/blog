var blog = blog || {};

$( document ).ready(function(){
  // ----------- simple routing ------------- //

  if (!("onhashchange" in window)) {
    alert("You're running an old browser! This Cold House won't work very well, though I'll do my best. Please consider upgrading for the best experience!")
  }


  function toggle_page(page_name) {
    window.location.hash = "#"+ page_name;
    $(".content-container").load("/pages/" + page_name + ".html");
  }

  function locationHasChanged(){
    toggle_page(window.location.hash.substring(1));
  };


  function attachHandlers(){
    window.onhashchange = locationHasChanged;

    $(".navbarlink").click(function(e) {
      e.preventDefault();
      toggle_page(e.target.id);
    });
  }

  function setupPage(){
    attachHandlers();

    var page = window.location.hash.substring(1);

    // handle homepage edge case
    if (!page){
      toggle_page('projects');
    }
    locationHasChanged();

  }

  setupPage();

});
