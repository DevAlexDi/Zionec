$(document).ready(function () {
    
    $('.main-slider').slick({
        dots:true,
        arrows:true,
        nextArrow: '<button type="button" class="slick-next"><img src="img/rev_slider_next.png" alt="Вперед"></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="img/rev_slider_prev.png" alt="Назад"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.open_modal').click(function(e) {
        e.preventDefault();
        $('#modal_with_com').modal('show');
    });

    $('.phantom_click').click(function(e) {
        var url = $(this).prev().attr('href');
        location.href = url;
    });

    $('body').keyup(function(e) {
        if (e.which == 27) $('.modal').modal('hide');
    });

    $('#chosen .logos').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1500,
        //arrows: true,
        nextArrow: '<button type="button" class="slick-next"><img src="img/rev_slider_next.png" alt="Вперед"></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="img/rev_slider_prev.png" alt="Назад"></button>',
        appendArrows: $('#chosen .arrows'),
        centerMode: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            }
        ]
    });
    
    
    $('.reviews_slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        appendDots: $('.reviews_slider_dots'),
        arrows: true,
        nextArrow: '<button type="button" class="slick-next"><img src="img/rev_slider_next.png" alt="Вперед"></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="img/rev_slider_prev.png" alt="Назад"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    var count = $('#chosen .logos div').length;

    setInterval(function() {
        var active = $('#chosen .logos .active');
        if (active.index() < count - 1) {
            active.removeClass('active');
            active.next().addClass('active');
        }
        else {
            active.removeClass('active');
            $('#chosen .logos div:first-child').addClass('active');
        }
    }, 1000);


    var flag_open_lang = true;
    $('.sity-wrapp').click(function(e){
        e.stopPropagation();
        if(flag_open_lang){
            $('.sity-list').fadeIn(300);
            flag_open_lang = false;
        }
        else{
            $('.sity-list').fadeOut(300);
            flag_open_lang = true;
        }

    });

    $('body').click(function() {
        $('.sity-list').fadeOut(300);
        flag_open_lang = true;
    });

  

    
    $('.tel-inp-init').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });

    $('.sec-lvl-2 .scroll-down span').click(function() {
        var t = $('.sec-lvl-2').height() + $('.sec-lvl-1').height();
        $('body, html').animate({
            scrollTop: t
        }, 500);
    });


    if($('body').children('#map').length > 0) {
        ymaps.ready(init);
    }
    
    $(window).scroll(function() {
        if ($(window).scrollTop() > $("#fixed_head").height()) {
            $("#fixed_head").addClass("shown");
        }
        else {
            $("#fixed_head").removeClass("shown");
        }
    });

    if($('body').children('#product_page').length > 0) {
        $('#product_text').each(function () {
            var pic = $(this)
                , getItems;
            var pswp = $('.pswp')[0];
            pic.on('click', '.img_wrap', function (event) {
                getItems = function () {
                    var items = [];
                    pic.find('.img_wrap').each(function (e) {
                        if(!$(this).hasClass("slick-cloned")){
                            var href = $(this).attr('data-src')
                                , size = $(this).data('size').split('x')
                                , width = size[0]
                                , height = size[1];
                            var item = {
                                src: href
                                , w: width
                                , h: height
                            }
                            items.push(item);
                        }
                    });
                    return items;
                }
                var items = getItems();
                event.preventDefault();

                var index = $(this).attr("data-index");
                var options = {
                    index: parseInt(index)
                    , bgOpacity: 0.7
                    , showHideOpacity: true
                }

                var lightBox = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });
        });
    }
    

});


function init() {


    var myMap = new ymaps.Map("map", {
        center: [55.753215, 37.622504]
        , zoom: 16
        , controls: ['zoomControl']
    });


    myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('scrollZoom');
    var myGeoObjects = [];
    var flag_for_center = true;



    $(".office").each(function (e) {
        var latt = $(this).find('.show_on_map').attr("data-lat");
        var longg = $(this).find('.show_on_map').attr("data-lon");
        if (flag_for_center) {
            myMap.setCenter([latt, longg], 16, {
                checkZoomRange: false
            });
            flag_for_center = false;
        }
        myGeoObjects[e] = new ymaps.Placemark([latt, longg], {
            clusterCaption: 'Заголовок'
        }, {
            iconLayout: 'default#image'
            , iconImageHref: 'img/map_marker.png'
            , iconImageSize: [39, 51]
            , iconImageOffset: [-19.5, -51]
        });
    });


    var clusterIcons = [{
        href: 'img/marker-1.png'
        , size: [39, 51]
        , offset: [0, 0]
    }];


    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false
        , clusterOpenBalloonOnClick: false
        , clusterBalloonPanelMaxMapArea: 0
        , clusterBalloonContentLayoutWidth: 300
        , clusterBalloonContentLayoutHeight: 200
        , clusterBalloonPagerSize: 2
        , clusterBalloonPagerVisible: false
    });


    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);



    $('.show_on_map').click(function(){
        myMap.setCenter(
            [parseFloat($(this).attr("data-lat"))
                , parseFloat($(this).attr("data-lon"))], 16, {
                checkZoomRange: false
            });
        $('body, html').animate({
            scrollTop: $('#map').offset().top
        }, 500);
    });



}
