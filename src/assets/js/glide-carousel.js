$(document).ready(function () {
    // get root directory path
    let domain_link = '../'; //window.location.origin;
    var $slickElementjs = $('.js-glide-carousel');
    let glideItemsCount = $('.js-glide-carousel .glide-item').length; // indexing from 1
    let direction = document.documentElement.dir;
    
    // inside .js-glide-carousel there are .glide-item, make 2 copies of them.
    // This is to make the carousel loop infinitely
    for (let i = 1; i <= 5; i++) {
        $('.js-glide-carousel .glide-item').clone().appendTo('.js-glide-carousel');
    }

    let glideItemsCountTo = $('.js-glide-carousel .glide-item').length / glideItemsCount; // indexing from 1
    // convert glideItemsCountTo/2 to integer
    glideItemsCountTo = Math.floor(glideItemsCountTo/2);
    glideItemsCountTo = glideItemsCount * glideItemsCountTo;

    $('.js-glide-carousel').slick({
        // autoplay: true,
        // autoplaySpeed: 5000,
        // dots: true,
        arrows: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        prevArrow: `<button type="button" class="slick-prev"><img src="${domain_link}/assets/images/icons/ArrowRightWhite.svg"/></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="${domain_link}/assets/images/icons/ArrowRightWhite.svg"/></button>`,
        // slidesToScroll: 1,
        // variableWidth: true,
        rtl: direction === 'rtl' ? true : false,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    arrows: false,
                }
            }
        ]
    });

    // keep the slick 2nd clone 1st child as active, without animation
    $('.js-glide-carousel').slick('slickGoTo', glideItemsCountTo -1, true);
    setTimeout(() => {
        $('.js-glide-carousel').slick('slickGoTo', glideItemsCountTo, true);
    }, 10);
    // get variables for window.glideBeforeChange
    window.glideBeforeChange(null, null, glideItemsCount-1, glideItemsCount);

    glideItems = document.querySelectorAll('.js-glide-carousel .glide-item');

    glideItems.forEach(slide => {
        slide.addEventListener('click', function (e) {
            // e.preventDefault();
            // If it's not the active slide
            if (!this.classList.contains('slick-current')) {
                e.preventDefault();
                let slideIndex = $(this).data('slick-index');
                $('.js-glide-carousel').slick('slickGoTo', slideIndex);
            }
        });
    });

    // if rtl
    if (document.documentElement.dir === 'rtl') {
        $('.js-glide-carousel').slick('slickSetOption', 'rtl', true, true);
    }
    // Add a class to the active slide
    $('.js-glide-carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        window.glideBeforeChange(event, slick, currentSlide, nextSlide);
    });

    // setting a limit for the number of characters on slide desc
    const slideDesc = document.querySelectorAll('.js-glide-carousel .glide-item .js-glide-desc');

    // truncate the slideDesc and set the max limit to 61 characters
    slideDesc.forEach(function (el) {
        let desc = el.textContent;
        if (desc.length > 61) {
            el.textContent = desc.slice(0, 61) + '...';
        }

    });


if(window.innerWidth > 1200)
    {

        // Handle touch events
        $('.c-glide-carousel').on('touchstart', function (e) {
            var touchStartX = e.originalEvent.touches[0].clientX;
            var touchStartY = e.originalEvent.touches[0].clientY;

            $(this).on('touchmove', function (e) {
                var touchEndX = e.originalEvent.touches[0].clientX;
                var touchEndY = e.originalEvent.touches[0].clientY;
                var deltaX = touchEndX - touchStartX;
                var deltaY = touchEndY - touchStartY;

                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX > 0) {
                        $slickElementjs.slick('slickPrev');
                    } else {
                        $slickElementjs.slick('slickNext');
                    }
                }

                $(this).off('touchmove');
            });
        });
   
    }
});

window.glideBeforeChange = function (event, slick, currentSlide, nextSlide) {
    if (currentSlide === nextSlide) { return; }

    glideItems = document.querySelectorAll('.js-glide-carousel .glide-item');

    // remove all classes that start with "before-active-"
    glideItems.forEach(function (el) {
        el.className = el.className.replace(/\bbefore-active-\S+/g, '');
    });

    // is the user going to the right or left?
    let direction = currentSlide < nextSlide ? 'right' : 'left';

    // get number of slick-slide elements on left side of slick-current
    let leftSlides = $('.js-glide-carousel .slick-current').prevAll().length;

    // slick-current left slides will have a series of classes name "before-active-1", "before-active-2", etc.
    // depending on how many slides are on the left side of slick-current
    // direction will be used to slightly offset so end result is consistent
    for (let i = 0; i <= leftSlides; i++) {
        $('.js-glide-carousel .slick-slide').eq(nextSlide - 1 - i).addClass('before-active-' + i);
    }
};