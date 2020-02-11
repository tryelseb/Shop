//= ../../bower_components/jquery/dist/jquery.js
//= ../../node_modules/foundation-sites/dist/js/foundation.min.js
//= partials/jquery.validate.min.js



$(document).foundation();
console.log($('#select-contact option:selected').val());
function Select_form() {
  var target_select = $('#select-contact option:selected').val();
  if (target_select == "1") {
    $("#general_inquiry").css('display', 'block').animate({
      opacity: 1
    }, 1000);
    $("#cancelation").css({'display': 'none', 'opacity': '0' });
    $("#assistence").css({'display': 'none', 'opacity': '0' });
  } else if (target_select == "3") {
    $("#general_inquiry").css({'display': 'none', 'opacity': '0' });
    $("#cancelation").css({ 'display': 'none', 'opacity': '0' });
    $("#assistence").css('display', 'block').animate({
      opacity: 1
    }, 1000);
  } else if (target_select == "2") {
    $("#general_inquiry").css({'display': 'none', 'opacity': '0' });
    $("#assistence").css({'display': 'none', 'opacity': '0' });
    $("#cancelation").css('display', 'block').animate({
      opacity: 1
    }, 1000);
  }
}
  


//SIGNUP POPAP
var popapForm = $("#signin-form");

popapForm.validate({
  rules: {
    popap_email: {
      required: true,
      email: true
    },
    popap_password: {
      required: true
    },
    forgot_email: {
      required: true,
        email: true
    }
  },
  messages: {
    popap_email: "Please enter your email",
    forgot_email: "Please enter your email",
    popap_password: "Please enter your password"
  },
  submitHandler: function (form) {
    $(form).trigger("formvalid");
  }
});
jQuery.validator.addMethod("email", function (value, element) {
  return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(value);
}, "Please enter valid email address!");
popapForm.on("submit", function (e) {
  e.preventDefault;
});
//////
/// SIGNUP 2
var contactForm = $("#contactForm");

contactForm.validate({
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    },
    password_confirm: {
      equalTo: "#password"
    },
    polici: {
      required: true
    }
  },
  messages: {
    polici: "Please accept our policy",
    email: "Please enter your email",
    password: "Please enter your password"
  },
  submitHandler: function (form) {
    $(form).trigger("formvalid");
  }
});
contactForm.on("submit", function (e) {
  e.preventDefault;
});
/////
//// SIGNUP_3
var nonAvs = $('.non-avs');
var states = new Array('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');
var states_abb = new Array('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');
var provinces = new Array('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Nova Scotia', 'Nunavut', 'North West Territories', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewen', 'Yukon');
var prov_abb = new Array('AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT');
var dd_country = $('#fake_country'),
  submitWrap = $('.submit-wrap');
if ($('#secure-form').length > 0) {
  if (!nonAvs.length > 0) {
    dd_country.on('change', setautocomplete);
    setautocomplete();
  }
}

function setautocomplete() {
  select_ind = document.secureForm.elements["fake_country"].selectedIndex,
    country_el = document.secureForm.elements["fake_country"].options[select_ind].value,
    whole_str = "",
    countrCon = $('#fake-country-container'),
    setState = '<?=(isset($_GET["state"]) ? $_GET["state"] : "")?>';
  if (country_el == "CA" || country_el == "US") {
    if (country_el == "CA") {
      var str = "<?=getWord('W00412')?>";
      for (var i = 0; i < provinces.length; i++) {
        var dd_str = "<option value='" + prov_abb[i] + "'";
        if (setState == prov_abb[i])
          dd_str += "selected=selected";
        dd_str += ">" + provinces[i] + "</option>";
        whole_str = whole_str + dd_str;
      }
    } else {
      var str = "<?=getWord('W00411')?>";
      for (var i = 0; i < states.length; i++) {
        var dd_str = "<option value='" + states_abb[i] + "'";
        if (setState == states_abb[i])
          dd_str += "selected=selected";
        dd_str += ">" + states[i] + "</option>";
        whole_str = whole_str + dd_str;
      }
    }
    $('#row-state .state-holder').remove();
    $('#row-state').append("<div id='state-container'><select id='dd_state' name='state'>" + whole_str + "</select></div>");
  } else {
    var stateSelect = $('#state-container');
    if (stateSelect.length) {
      stateSelect.remove();
      $('#row-state').append("<div id='state-container' class='state-holder'><input type=text name=state id=txt_state value=\"<?php echo $_POST['state'] ?>\" rel=type-2 placeholder=\"<?=getWord('W01087')?>\" /></div>");
    }
  }
}
$.validator.addMethod("CardPattern", function (value, element) {
  return this.optional(element) || /^(2|4|5)[0-9]{12,15}$/.test(value);
}, "Invalid card number");
$.validator.addMethod("ExpiryDate", function (value, element, params) {
  var minMonth = new Date().getMonth() + 1;
  var minYear = new Date().getFullYear();
  var month = parseInt($(params.month).val(), 10);
  var year = parseInt($(params.year).val(), 10);
  return (year > minYear || (year === minYear && month > minMonth));
}, "The expiry date is already passed");
$.validator.addMethod("NamePattern", function (value, element) {
  return this.optional(element) || /^[a-z A-Z ,.'-]+$/.test(value);
}, "Please enter valid name");
$("#secure-form").validate({
  rules: {
    first_name: {
      required: true,
      NamePattern: true
    },
    last_name: {
      required: true,
      NamePattern: true
    },
    zip_code: {
      required: true,
      minlength: 3,
      maxlength: 10
    },
    fake_country: {
      required: true
    },
    address: {
      required: true
    },
    city: {
      required: true
    },
    state: {
      required: true
    },
    ccn: {
      required: true,
      digits: true,
      minlength: 13,
      CardPattern: true
    },
    month: {
      required: true
    },
    year: {
      required: true,
      ExpiryDate: {
        month: '#month',
        year: '#year'
      }
    },
    cvv2_code: {
      required: true,
      digits: true,
      maxlength: 3
    },
    are_you_sure: "required"
  },
  messages: {
    first_name: {
      required: "Please enter your first name"
    },
    last_name: {
      required: "Please enter a valid last name"
    },
    zip_code: {
      required: "Please enter Zip/Postal Code",
      minlength: "Zip/Postal Code must be between 3 and 10 characters",
      maxlength: "Zip/Postal Code must be between 3 and 10 characters"
    },
    fake_country: {
      required: "Please select a country"
    },
    address: {
      required: "Please enter your address"
    },
    city: {
      required: "Please enter your city"
    },
    state: {
      required: "Please enter your password state"
    },
    ccn: {
      required: "Please enter a valid Visa/Master Card",
      digits: "Please enter a valid Visa/Master Card",
      minlength: "Invalid card number"
    },
    month: {
      required: "Invalid date"
    },
    year: {
      required: "Invalid date",
      ExpiryDate: "Please enter a valid year"
    },
    cvv2_code: {
      required: "Please enter a valid CVV2",
      digits: "Please enter a valid CVV2",
      maxlength: "Zip/Postal Code must be between 3 characters"
    },
    are_you_sure: "Please accept our policy"
  },
  submitHandler: function (form) {
    appendOverlay();
    form.submit();
  }
});
/////////////
///////// Cancel 
var contactForm = $("#cancel-form");

contactForm.validate({
  rules: {
    email: {
      required: true,
      email: true
    },
    email_credit: {
      required: true,
      email: true
    },
    password: {
      required: true
    },
    ccn: {
      required: true,
      digits: true,
      minlength: 13,
      CardPattern: true
    }
  },
  messages: {
    ccn: {
      required: "Please enter a valid Visa/Master Card",
      digits: "Please enter a valid Visa/Master Card",
      minlength: "Invalid card number"
    },
    email: "Please enter your email",
    email_credit: "Please enter your email",
    password: "Please enter your password"
  },
  submitHandler: function (form) {
    $(form).trigger("formvalid");
  }
});
contactForm.on("submit", function (e) {
  e.preventDefault;
});
//////////////
jQuery(document).ready(function ($) {
  var speed = 500,
    $scrollTop = $('<a href="#" title="go to top" class="scrollTop"><i class="fa fa-angle-double-up"></i></a>').appendTo('body');
  $scrollTop.click(function (e) {
    e.preventDefault();
    $('html:not(:animated),body:not(:animated)').animate({
      scrollTop: 0
    }, speed);
  });

  function show_scrollTop() {
    ($(window).scrollTop() > 300) ? $scrollTop.fadeIn(600): $scrollTop.fadeOut(600);
  }
  $(window).scroll(function () {
    show_scrollTop();
  });
  show_scrollTop();
});

jQuery("document").ready(function ($) {

  var menu = $('.main-header');
  var menu_color = $('.main-menu__link');
  var logo_color = $('.logo-color ');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      menu.addClass("fixed-menu-nav");
      menu_color.addClass("fixed-menu-color");
      logo_color.addClass("fixed-logo-color");
      $('.main-menu').removeClass("decor-menu");
    } else {
      menu.removeClass("fixed-menu-nav");
      menu_color.removeClass("fixed-menu-color");
      logo_color.removeClass("fixed-logo-color");
      $('.main-menu').addClass("decor-menu");
    }

  });
});
$("#navToggle").click(function () {

  $(this).toggleClass("active");
  $(".overlay").toggleClass("open");
  $('.main-menu').removeClass("decor-menu");
  // this line ▼ prevents content scroll-behind
  $("body").toggleClass("locked");
  $('.main-menu__list li').on('click', function () {
    $('.navBurger').removeClass('active');
    $('#test').removeClass('open');
    $('body').removeClass('locked');
    $(".fixed-menu-color").css("color", "");
  })
});

$('#open_cvv_image').click(function () {
  if ($('.cvv-img').css('display') == 'none') {
    $('.cvv-img').animate({
      height: 'show'
    }, 500);
  } else {
    $('.cvv-img').animate({
      height: 'hide'
    }, 500);
  }
});
$('#cancel-pass').click(function () {
  $('.credit-form').css("display", "block");
  $('#cancel-pass').css("display", "none");
  $('#return-pass').css("display", "block");
  if ($('.credit-form').css("display") == "block") {
    $('.password-form').css("display", "none")
  }
  $('#return-pass').click(function () {
    $('.credit-form').css("display", "none");
    $('.password-form').css("display", "block");
    $('#cancel-pass').css("display", "block");
    $('#return-pass').css("display", "none");
  });
});

$('#popap-forgot').click(function () {
  $('.forgot-form').css("display", "block");
  $('.main-form').css("display", "none");
 
  $('#popap-back').click(function () {
   $('.forgot-form').css("display", "none");
   $('.main-form').css("display", "block");
  });
});
///popap login  
$('#pop-login').click(function(){
  $('.wrp-popap').css('display', 'flex').animate({
    opacity: "1"
  }, 500);
  $('.close-window').click(function(){
    $('.wrp-popap').animate({
      opacity: "0",
    }, 500);
    setTimeout(function () {
      $('.wrp-popap').css('display', 'none');
    }, 500);
  });
  
  $('#forgot-pass').click(function() {
    $('.popap-title h4').replaceWith('<h4>Forgot Login</h4>');
    $('.main-login').css('display','none');
    $('#forgot-pass').css('display', 'none');
    $('.forgot-pass').css('display', 'block');
    $('#back-login').css('display', 'block');

    $('#back-login').click(function(){
      $('.popap-title h4').replaceWith('<h4>Login</h4>');
      $('.main-login').css('display', 'block');
      $('#forgot-pass').css('display', 'block');
      $('.forgot-pass').css('display', 'none');
      $('#back-login').css('display', 'none');
    });
  });
});

// animate script 
{
  const spaceSection = document.getElementsByClassName('section-6')[0];
  spaceSection.addEventListener("mousemove", e => {
    let x = e.clientX;
    let y = e.clientY;
    console.log("cordinates: " + x + "," + y)
  });
}