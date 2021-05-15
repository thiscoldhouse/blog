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


  function attachNavHandlers(){
    window.onhashchange = locationHasChanged;

    $(".navbarlink").click(function(e) {
      e.preventDefault();
      toggle_page(e.target.id);
    });

  }

  function attachModalHandlers(){
    function handleModalButtonClick(e){
        let image = $(e.currentTarget).attr('src');
        $('#modal').css('display', 'block');
        //$('#modal').css('background-image', 'url(' + image + ')');
        $('#modal-image').attr('src', image);


        // make a centered square
        let offset = $(document).scrollTop();
        let viewportHeight = $(window).height();
        let viewportWidth = $(window).width();
        $('#modal').css('width', viewportWidth/2 + 'px');
        $('#modal').css('left', (viewportWidth/4) + 'px');

        // adjust close modal button dynamically
        let imageLeft = $('#modal-image').position()['left'];
        let imageWidth = $('#modal-image').width()
        $('#close-modal').css('left', imageLeft + imageWidth - 3);
    }

    $('.modal-btn').each(function(i){
      modalButton = $($('.modal-btn')[i])
      console.log(modalButton);
      $(modalButton).click(handleModalButtonClick);

    });
    $('#close-modal').click(function(e){
      $('#modal').css('display', 'none');
    });
  }

  blog['attachModalHandlers'] = attachModalHandlers;

  function setupPage(){
    attachNavHandlers();

    var page = window.location.hash.substring(1);

    // handle homepage edge case
    if (!page){
      toggle_page('projects');
    }
    locationHasChanged();

  }

  setupPage();

});
