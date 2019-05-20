var blog = blog || {};

$( document ).ready(function(){

//    $(

    // ----------- simple routing -------------

    var toggle_page = function(page_name) {
        window.location.hash = "#"+ page_name;
        $(".content-container").load("/pages/" + page_name + ".html");
    }  ;
    $(".navbarlink").click(function(e) {
        e.preventDefault();
        toggle_page(e.target.id);
    });

    if (!("onhashchange" in window)) {
        alert("You're running an old browser! This Cold House won't work very well, though I'll do my best. Please consider upgrading for the best experience!")
    }

    var locationHasChanged = function(){
        toggle_page(window.location.hash.substring(1));
    };
    window.onhashchange = locationHasChanged;


    // set up the page
    // actually injects the right html in our simple routing scheme
    var page = window.location.hash.substring(1);
    if (page.length != 2 || !page[1]){
        page = "/pages/about.html";
    }
    else {
        page = page[1];
        page = "/pages/" + page + ".html";
    };

    $(".content-container").load(page);

    // start up the site
    locationHasChanged();

});
