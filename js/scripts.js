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
    
    
    
    
    $('.reviews_slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
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

  

    
    $('.tel-inp-init').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });


    ymaps.ready(init);
    
    
    

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
    });



}
