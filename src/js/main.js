//= ../../bower_components/jquery/dist/jquery.js
//= ../../node_modules/foundation-sites/dist/js/foundation.min.js
//= partials/jquery.validate.min.js

$( document ).ready(function() {
  // Category mobile menu
  $('#category-mob').click(function() {
    $('.category__list').animate({
      height: 'toggle',
      'margin-bottom': '1em'
    }, 800)
  });
  // End category mobile menu
});
