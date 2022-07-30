jQuery(function() {
  
	var $ = jQuery;

  $('body').addClass('postload');

  $(document).ready(function() {

    // Toggle overlays
    
  	$('#header-wrap .wsite-search-button, #nav-open, #wsite-nav-cart-a').on('click', function(e) { 
  		e.preventDefault();
  		var target = $(this).attr("data-target") ? $(this).attr("data-target") : "#search";
    	$('.overlay').not(target).removeClass('open');
  	  $(target).toggleClass('open');
  	  if ($('.overlay').hasClass("open")) {
  	    $('#close-overlay').addClass("visible");
  	  }
  	  else {
        $('#close-overlay').removeClass("visible");  	    
  	  }
  	  return false;
  	});

  	$('#close-overlay').on('click', function(e) { 
  		e.preventDefault(); 
    	$('.overlay').removeClass('open');
      $('#close-overlay').removeClass("visible");
  	});
  	
  	window.onkeydown = function(e) {
      if (e.keyCode == 27) {
        $('#close-overlay').trigger('click');
      }
    }
    
  	// Add fullwidth class to gallery thumbs if less than 6
  	
  	$('.imageGallery').each(function(){
  	  if ($(this).children('div').length <= 6) {
  	    $(this).children('div').addClass('fullwidth-mobile');
  	  }
  	});
  	
  	// Add swipe to fancybox mobile 

    var swipeGallery = function(){
      setTimeout(function(){
      var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
      var mc = new Hammer(touchGallery);
      mc.on("panleft panright", function(ev) {
        if (ev.type == "panleft") {
          $("a.fancybox-next").trigger("click");
        }
        else if (ev.type == "panright") {
          $("a.fancybox-prev").trigger("click");
        }
        swipeGallery();
      });
      }, 500);
    }
    
		if ($(window).width() < 1024) {
      $("body").on( "click", "a.w-fancybox", function() {
        swipeGallery();
      });
  	}
    
    // Watch for changes on non-mobile nav

    $('#nav-hidden').on('DOMSubtreeModified propertychange', function() {

      $("#nav-hidden li a").each(function(){

        var navLinkId = $(this).attr("id");

        // Differentiating post-load nav elements by the presence of an id (only currently available modifier)

        if (navLinkId) {

          // Detach parent li
          var navLinkParent = $("#"+navLinkId).parent().detach();

          // Append to overlay nav if login & adjust height of nav
          if (!$("#nav-container #"+navLinkId).length && navLinkId == "wsite-nav-login-a") {
            $("#nav-container .wsite-menu-default").append(navLinkParent);
            var newheight = $("#nav-container .wsite-menu-default").height();
            $(".wsite-mobile-menu").height(newheight);
          }
          // Append to header if cart
          else if (!$("#header-wrap #"+navLinkId).length && navLinkId == "wsite-nav-cart-a") {
            if ($(window).width() > 767) {
              $("#header-wrap > .container").append(navLinkParent);
            }
            else {
              $("#header-wrap").append(navLinkParent);
              $("#content-wrap").addClass("cartpad");
            }
            $('#wsite-mini-cart').addClass('overlay');
          	$('#wsite-nav-cart-a').unbind('mouseenter mouseleave').attr("data-target","#wsite-mini-cart");

            // Move mini cart
          	if (!$("#site-wrap #wsite-mini-cart").length) {
              var minicart = $('#wsite-mini-cart').detach();
              $("#site-wrap").append(minicart);
            	$('#wsite-nav-cart-a, #wsite-nav-cart-a').unbind('mouseenter mouseleave');
              $("#nav-open").after('<div class="spacer"></div>'); 
            }
            
          }
        }
        
      });
    });
    
    // Keep those mouseover events off the cart icon
    
    $('#wsite-mini-cart').on('DOMSubtreeModified propertychange', function() {
    	$('#wsite-nav-cart-a, #wsite-nav-cart-a').unbind('mouseenter mouseleave');
    });

  });
});