
!(function($) {
  "use strict";

  

  // // Smooth scroll for the navigation menu and links with .scrollto classes
  // var scrolltoOffset = $('#header').outerHeight() - 1;
  // $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
  //   if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  //     var target = $(this.hash);
  //     if (target.length) {
  //       e.preventDefault();

  //       var scrollto = target.offset().top - scrolltoOffset;

  //       if ($(this).attr("href") == '#header') {
  //         scrollto = 0;
  //       }

  //       $('html, body').animate({
  //         scrollTop: scrollto
  //       }, 1500, 'easeInOutExpo');

  //       if ($(this).parents('.nav-menu, .mobile-nav').length) {
  //         $('.nav-menu .active, .mobile-nav .active').removeClass('active');
  //         $(this).closest('li').addClass('active');
  //       }

  //       if ($('body').hasClass('mobile-nav-active')) {
  //         $('body').removeClass('mobile-nav-active');
         
  //       }
  //       return false;
  //     }
  //   }
  // });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Navigation active state on scroll
  // var nav_sections = $('section');
  // var main_nav = $('.nav-menu, .mobile-nav');

  // $(window).on('scroll', function() {
  //   var cur_pos = $(this).scrollTop() + 200;

  //   nav_sections.each(function() {
  //     var top = $(this).offset().top,
  //       bottom = top + $(this).outerHeight();

  //     if (cur_pos >= top && cur_pos <= bottom) {
  //       if (cur_pos <= bottom) {
  //         main_nav.find('li').removeClass('active');
  //       }
  //       main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
  //     }
  //     if (cur_pos < 300) {
  //       $(".nav-menu ul:first li:first, .mobile-nav ul:first li:first").addClass('active');
  //     }
  //   });
  // });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body')
      .prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars"></i></button>');
 
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      
    });
  
   $(document).on('click', '.dropMenu', function(e) {
      $('body').removeClass('mobile-nav-active');
           
    });
    $(document).on('click', '.drop-down', function(e) {
      $('body').removeClass('mobile-nav-active');
           
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle, .dropMenu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
      

        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
  // // Toggle .header-scrolled class to #header when page is scrolled
  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 100) {
  //     $('#header').addClass('header-scrolled');
  //     $('#topbar').addClass('topbar-scrolled');
  //   } else {
  //     $('#header').removeClass('header-scrolled');
  //     $('#topbar').removeClass('topbar-scrolled');
  //   }
  // });

  // if ($(window).scrollTop() > 100) {
  //   $('#header').addClass('header-scrolled');
  //   $('#topbar').addClass('topbar-scrolled');
  // }


  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

 

})(jQuery);

// ===============FILTER FUNCTION=======================


function FilterToggle_patient() {
  $('#filter-content').addClass('open')
  
}

function FilterSectionToggleClose() {
  $('#filter-content').removeClass('open')

}

$(document).one( "click","#filter-btn", function() {
  pasientFilterSection()  
});
// -------------Patient Filter Item Click------------------------
$(document).one( "click","#genderOneClick", function() {
  genderFnFilter()
  
});


$(document).one( "click", "#pasientOneClick", function() {
  pasientFilter()
  
});

$(document).one( "click","#occuOneClick", function() {
  occupationFnFilter()
});

$(document).one( "click","#maritualOneClick", function() {
  maritalStatusFnFilter()
});

$(document).one( "click","#eduOneClick", function() {
  educationFnFilter()
});

$(document).one( "click","#bloodOneClick", function() {
  bloodGroupFnFilter()
});


/* =====Appointment filter=============== */

function FilterToggle_Appointmet() {
  $('#filter-content-appointment').addClass('open')
  
}

function FilterAppointment_ToggleClose() {
  $('#filter-content-appointment').removeClass('open')

}

$(document).one( "click", "#filter-btn-appointment", function() {
  appointmentFilterSection()

  
});

// -------------Appointment Filter Item Click------------------------
$(document).one( "click","#purposeOneClick", function() {
  purposeFnFilter()
});

$(document).one( "click","#doctorOneClick", function() {
  doctorFnFilter()
});

$(document).one( "click","#patientAppOneClick", function() {
  patientAppFnFilter()
});

$(document).one( "click","#statusOneClick", function() {
  statusFnFilter()
});

$(document).one( "click","#sexOneClick", function() {
  sexFnFilter()
});

 
  $(document).on("click", "nav .activeNav",function(event) {    
     $("nav .activeNav").removeClass("active"); 
     $(this).addClass("active"); 
  });

  $(document).on("change", ".form-group select", function() {    
    $(this).find(':selected').addClass('selected')
           .siblings('option').removeClass('selected');
 });
  