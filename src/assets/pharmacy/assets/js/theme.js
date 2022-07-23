
"use strict";

var $jq = jQuery.noConflict()
// ---------------------------------------------//
//  Background
//--------------------------------------------- //

$jq("[data-background]").each(function () {
    $jq(this).attr('style', 'background-image:url(' + $jq(this).attr("data-background") + ')');
});
// ---------------------------------------------//
//  Background
//--------------------------------------------- //
if ($jq('.range-slider').length > 0) {
    var nonLinearSlider = $jq('.range-slider');
    var startMin = parseInt(nonLinearSlider.data('start-min'));
    var startMax = parseInt(nonLinearSlider.data('start-max'));
    var min = parseInt(nonLinearSlider.data('min'));
    var max = parseInt(nonLinearSlider.data('max'));
    var step = parseInt(nonLinearSlider.data('step'));

    var slider = document.getElementById('nouislider');

    noUiSlider.create(slider, {
        connect: true,
        behaviour: 'tap',
        'step': step,
        start: [startMin, startMax],
        tooltips: [true, true],
        range: {
            'min': [min],
            'max': [max]
        },
        pips: {
            mode: 'positions',
            values: [0, 25, 50, 75, 100],
            density: 3
        }
    });
}
//-------------------------------------------------------
// Date Picker
//-------------------------------------------------------*/
if ($jq('.date_range_picker').length > 0) {
    var today = moment();
    $jq('.date_range_picker').daterangepicker({
        // "autoApply": true,
        "alwaysShowCalendars": true,
        "startDate": today,
        "opens": "center"
    }, function (start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
};
if ($jq('.date_picker').length > 0) {
    var today = moment();
    $jq('.date_picker').daterangepicker({
        "autoApply": true,
        "singleDatePicker": true,
        "alwaysShowCalendars": true,
        "startDate": today,
        "opens": "center"
    }, function (start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
};
// -------------------------------------------//
//  Custom Select
// -------------------------------------------//
if ($jq("select").length > 0) {
    $jq('select:not(.ignore)').select2({
        selectionCssClass: ':all:'
    });
    $jq(".select2-selection--single.wide").parent().addClass("wide");
    $jq(".selection.wide").parent().addClass("wide");
}

// ---------------------------------------------//
// Slick Slider
// ---------------------------------------------//
$jq('.slider').each(function () {
    var play = $jq(this).data('autoplay');
    var playSpeed = $jq(this).data('autoplay-speed');
    var nav = $jq(this).data('nav');
    var dot = $jq(this).data('dots');
    var slidesToshow = $jq(this).data('slides-to-show');
    var slidesToscroll = $jq(this).data('slides-to-scroll');
    var slideCenter = $jq(this).data('slick-center-mode');
    $jq(this).slick({
        arrows: nav,
        dots: dot,
        slidesToShow: slidesToshow,
        autoplay: play,
        autoplaySpeed: playSpeed,
        centerMode: slideCenter,
        slidesToScroll: slidesToscroll,
        responsive: [{
            breakpoint: 500,
            settings: {
                slidesToShow: slidesToshow < 2 ? slidesToshow : 1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: slidesToshow < 2 ? slidesToshow : 3
            }
        }]
    });
});
$jq('.slider-for').each(function () {
    var play = $jq(this).data('autoplay');
    var playSpeed = $jq(this).data('autoplay-speed');
    var nav = $jq(this).data('nav');
    var dot = $jq(this).data('dots');
    var slidesToshow = $jq(this).data('slides-to-show');
    var slidesToscroll = $jq(this).data('slides-to-scroll');
    var slideCenter = $jq(this).data('slick-center-mode');
    $jq(this).slick({
        arrows: nav,
        dots: dot,
        slidesToShow: slidesToshow,
        autoplay: play,
        autoplaySpeed: playSpeed,
        centerMode: slideCenter,
        slidesToScroll: slidesToscroll,
        asNavFor: ".slider-nav",
        responsive: [{
            breakpoint: 500,
            settings: {
                slidesToShow: slidesToshow < 2 ? slidesToshow : 1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: slidesToshow < 2 ? slidesToshow : 3
            }
        }]
    });
});
$jq('.slider-nav').each(function () {
    var play = $jq(this).data('autoplay');
    var playSpeed = $jq(this).data('autoplay-speed');
    var nav = $jq(this).data('nav');
    var dot = $jq(this).data('dots');
    var slidesToshow = $jq(this).data('slides-to-show');
    var slidesToscroll = $jq(this).data('slides-to-scroll');
    var slideCenter = $jq(this).data('slick-center-mode');
    $jq(this).slick({
        arrows: nav,
        dots: dot,
        slidesToShow: slidesToshow,
        autoplay: play,
        autoplaySpeed: playSpeed,
        centerMode: slideCenter,
        slidesToScroll: slidesToscroll,
        asNavFor: ".slider-for",
        focusOnSelect: true
    });
});


// ---------------------------------------------//
// add Remove item
// ---------------------------------------------//
$jq('.qty-input i').on('click', function () {
    var val = parseInt($jq('.qty-input input').val());

    if ($jq(this).hasClass('less')) {
        val = val - 1;
    } else if ($jq(this).hasClass('more')) {
        val = val + 1;
    }

    if (val < 1) {
        val = 1;
    }

    $jq('.qty-input input').val(val);
})

// ---------------------------------------------//
// File Upload name add
// ---------------------------------------------//
$jq('.custom-input-file').each(function () {
    var $jqinput = $jq(this),
        $jqlabel = $jqinput.next('label'),
        labelVal = $jqlabel.html();

    $jqinput.on('change', function (e) {
        var fileName = '';

        if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else if (e.target.value)
            fileName = e.target.value.split('\\').pop();

        if (fileName)
            $jqlabel.find('span').html(fileName);
        else
            $jqlabel.html(labelVal);
    });

    // Firefox bug fix
    $jqinput
        .on('focus', function () {
            $jqinput.addClass('has-focus');
        })
        .on('blur', function () {
            $jqinput.removeClass('has-focus');
        });
});

var websiteWidth = $jq(document).width();
$jq(".header-links-item .header-childrenItem-parent").on("mouseover", function (event) {
    var liparent = $jq(this.parentElement);
    var ulChild = liparent.find('.header-childrenItem-child-category-links');
    var xOffset = liparent.offset().left;
    var alignRight = ($jq(document).width() - xOffset) < xOffset;

    if ($jq(document).width() > websiteWidth) {
        ulChild.addClass("dropdown-menu-right");
    }
});

$jq(".header-search input.custom-search").on("click", function (event) {
    if ($jq(".search-content .search-product").hasClass("d-none")) {
        $jq(".search-content").find('.search-product').removeClass('d-none');
        if ($jq('.search_overlay').length > 0 == false) {
            $jq("body").append('<div class="search_overlay"></div>');
        }
        $jq(".header , .announcement-header").css({ "zIndex": "99999" });
        $jq("body").css({ "overflow": "hidden" });
    } else {
        $jq(".search-content").find('.search-product').addClass('d-none');
        $jq("body").find('.search_overlay').remove();
        $jq(".header , .announcement-header").attr({ "style": "" });
        $jq("body").attr({ "style": "" });
    }
});
$jq(document).on("click", ".search_overlay", function (event) {
    $jq(".search-content").find('.search-product').addClass('d-none');
    $jq("body").find('.search_overlay').remove();
    $jq(".header , .announcement-header").attr({ "style": "" });
    $jq("body").attr({ "style": "" });
});

$jq(".open-sidebar").on("click", function (event) {
    $jq('.menu-sidebar').addClass("show");
    $jq('.overlay').addClass("show");
});
$jq(".close").on("click", function (event) {
    $jq('.menu-sidebar').removeClass("show");
    $jq('.overlay').removeClass("show");
});
$jq(".overlay").on("click", function (event) {
    $jq('.menu-sidebar').removeClass("show");
    $jq('.overlay').removeClass("show");
});
