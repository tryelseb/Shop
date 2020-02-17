//= ../../bower_components/jquery/dist/jquery.js
//= ../../node_modules/foundation-sites/dist/js/foundation.min.js
//= partials/jquery.validate.min.js

$(document).ready(function () {
  // Category mobile menu
  $('#category-mob').click(function () {
    $('.category__list').animate({
      height: 'toggle',
      'margin-bottom': '1em'
    }, 800)
  });
  // End category mobile menu
  $("#mobile-btn").on( "click", function() {
    if ($(".menu").hasClass('show-menu')) {
      $(".menu").animate({
        width: '0'
      }, 50, function() { 
        $(".menu").removeClass('show-menu'); 
        $(".menu__list").removeAttr('style');
        $(".menu").removeAttr('style');
      });      
    } else {
      $(".menu").addClass('show-menu').animate({
        width: "100%"
      }, 50);
      $(".menu__list").animate({
        width: "65%"
      }, 100);
    }
  });

  $('.item__img').on("click", function() {
    $('#l-popup').addClass('active');

    $(this).children('img').clone().appendTo(".popup");

    $('.cancel').click(function() {
      $('#l-popup').removeClass('active');
      $('.popup').children('img').remove();
    });
  });

  // Filter - open/close
    $('.filter__title').click(function(){
      $(this).each(function(){
        $(this).toggleClass('active');
        $(this).next('ul').slideToggle('fast');
      });
    });
  //

  // Checkout more info - open/close
  $('#more-info').click(function(){
    $('.underline').toggleClass('active');
    $(this).children('.table').slideToggle('fast');
  });
//
  
});
