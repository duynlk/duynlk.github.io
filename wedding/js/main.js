(function ($) {
    "use strict";

    var isShowRsvp = false;

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }

        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
            if (!isShowRsvp){
                $('#rsvpModal').modal('show');
                isShowRsvp = true;
            }
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });

    // click audio
    $("#btn-sound").click(function () {
        var src = $(this).prop("src");
        if(src.includes("sound.png")){
            $('#player').trigger("pause");
            $(this).prop("src","img/mute.png");
        }else{
            $('#player').trigger("play");
            $(this).prop("src","img/sound.png");
        }
    });

    // change src image
    function changeImageSrc() {
        if (window.matchMedia("(max-width: 1200px)").matches) {
            $("img#carousel-img").attr("src", "img/event-1.jpg");
            $("img#carousel-img").css("object-position", "");
        } else {
            $("img#carousel-img").attr("src", "img/carousel-1.jpg");
            $("img#carousel-img").css("object-position", "0 8%");
        }
    }

    // call change src image
    changeImageSrc();
    $(window).resize(function() {
        changeImageSrc();
    });

    $('#submitRsvp').on('click', function(){
        var nameRsvp = $('#nameRsvp').val();
        var commitRsvp = 'Sẽ đến';
        if ($('#nameRsvp').val() == '0'){
            commitRsvp = 'Không đến được';
        }
        var msgRsvp = $('#msgRsvp').val();

        $.ajax({
            url: "https://formsubmit.co/ajax/nguyenlukhanhduy@gmail.com",
            method: "POST",
            data: {
                name: nameRsvp + ' - ' + commitRsvp,
                message: msgRsvp
            },
            dataType: "json",
            accepts: 'application/json',
            success: (data) => console.log(data),
            error: (err) => console.log(err)
        });
    });
})(jQuery);