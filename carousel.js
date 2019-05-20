$(document).ready(function(){
    $(".slideshow").click(function(e){
        var images = $(e.currentTarget).parent().children();
        var found = false;

        $.each(images, function(i, image){
            var this_image = $(images[i]);
            if (found) {
                this_image.css('display', 'block')
                found = false;
            }
            else if (this_image.css('display') == 'block'){
                this_image.css('display', 'none');
                found = true;
            }
        })

        if (found){
            $(images[0]).css('display', 'block');
        }
    });

});
