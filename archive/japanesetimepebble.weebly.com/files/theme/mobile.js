Weebly = Weebly || {};

Weebly.mobile_navigation = (function($) {

	var SLIDE_RIGHT = "SLIDE_RIGHT",
		SLIDE_DOWN = "SLIDE_DOWN",
		SLIDE_STATIC = "SLIDE_STATIC",
		IOS_ADDRESS_BAR_HEIGHT = 60;

	var isOpen = false,
		isMoving = false,
		supportsTouch = false,
		pendingResizeData = null,
		isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false ),
		supports3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
		supportsTouch = false,
		menuOffsetY = 0,
		navStyle = SLIDE_STATIC,
		$menuWrapper, $menuButton, $menu, $body, supports3D;


    /**
    * Add a css transition
    *
    * @param jquery $o object to animate
    * @param string property a css transitionable property
    * @param number speed the ms speed of animation
    * @param function cb callback function after animation completes
    * @return undefined
    */
	 
	var addTransition = function($o, property, speed, cb) {
		if (!speed) {
			speed = 500;
		}

		$o.css({
			webkitTransitionDuration : speed + 'ms',
			webkitTransitionProperty : property,
			webkitTransitionTimingFunction : 'linear'
		});

		var onTransistionEnd = function(e) {
			$o.off('webkitTransitionEnd', onTransistionEnd);

			$o.css({
				webkitTransitionDuration : '',
				webkitTransitionProperty : '',
				webkitTransitionTimingFunction : ''
			});
			
			cb();
		}
		$o.on('webkitTransitionEnd', onTransistionEnd);
	};

	/**
	 * Utility animate function for css transitions
	 *
	 * @param jquery $o object to animate
	 * @param object from css properties to animate from
	 * @param object to css properties to animate to
	 * @param number speed the ms speed of animation
	 * @param function cb callback function after animation completes
	 * @return undefined
	 */
	var animate = function($o, from, to, speed, cb) {
		if (!speed) {
			speed = 500;
		}
		if (supports3D) {

			$o.css({ webkitTransitionDuration : '0ms' });
			$o.css(from);

			setTimeout(function() {
				addTransition($o, 'all', speed, cb);

				var props = {};
				for (property in to) {
					if (!to.hasOwnProperty(property)) {
						continue;
					}
					props[property] = to[property];
				}
				$o.css(props);
			}, 0);
		} else {
			//jquery.animate isn't working too well here, disable for now
			to.avoidCSSTransitions = true;
			$o.animate(to, {
				duration    : speed,
				complete    : cb	
			});
		}
	};

	/**
	 * Controls the menu effect when a menu button is tapped
	 *
	 * @param event e event handler
	 * @return undefined
	 */
	var menuTap = function(e) {
		var menuHeight = $menuWrapper.outerHeight(),
			effectStart, effectEnd, fromCSS, toCSS;

		if (isMoving) {
			return;
		}

		isOpen = !isOpen;
        console.log("1 " + isOpen);

		isMoving = true;

		if (isOpen) {
            console.log("1 " + isOpen);
			$body.addClass('menu-open');
		}

		var cb = function() {
			isMoving = false;

			if (!isOpen) {
				$body.removeClass('menu-open');
			}
		};

		if (navStyle === SLIDE_DOWN) {
			// '10' here is compensating for the box shadows overlapping
			// each other between the header and the menu
			if (!isOpen) {
				effectStart = 0;
				effectEnd   = -menuHeight - 10;
			} else {
				effectStart = -menuHeight - 10;
				effectEnd   = 0;
			}

			fromCSS = {
				'-webkit-transform' : 'translate3d( 0px, ' + effectStart + 'px, 0)'
			};

			toCSS = {
				'-webkit-transform': 'translate3d( 0px, ' + effectEnd + 'px, 0)'
			};

			if (!supports3D) {
				fromCSS = { top : menuOffsetY + effectStart + 'px' };
				toCSS   = { top : menuOffsetY + effectEnd + 'px' };
			}
			
			animate($menuWrapper, fromCSS, toCSS, 300, cb);	
		} else if (navStyle === SLIDE_RIGHT) {
			var $pageWrapper = $('#wsite-page-wrapper');

			cb = function() {
				isMoving = false;

				if (!isOpen) {
					$body.removeClass('menu-open');
					$menuWrapper.hide();
					$body.css('overflow-x', 'visible');
					$('#wsite-viewport').css({
						'overflow' : 'visible',
						'height' : ''
					});
					$pageWrapper.css({'background' : 'none', 'height' : ''});
					$pageWrapper.css({'height' : ''});
				} else {
					$pageWrapper.one('click', closeMenu);
				}

				// causes flickering if visible
				if (!isOpen) {
					var $backgroundImage = (Weebly.mobile) ? $('#w-fixed-bg') : $('.wsite-background');
					$backgroundImage.show();	
				}
			};

			var closeMenu = function(e) {
				if (!isOpen) {
					return;
				}
				
				menuTap();
				
				e.stopImmediatePropagation();
				e.preventDefault();
				$pageWrapper.off('click', closeMenu);
			};

			var timeoutLength = 0;

			if (!isOpen) {
				effectStart = '80%';
				effectEnd = '0%';
			} else {		
				effectStart = '0%';
				effectEnd = '80%';

				var $backgroundImage = (Weebly.mobile) ? $('#w-fixed-bg') : $('.wsite-background');
				if ($backgroundImage.length === 0) {
					$backgroundImage = $body;
				}
				
				var browserPadding = (isiOS) ? IOS_ADDRESS_BAR_HEIGHT : 0;
				var $windowProxy = $('#w-mobile-phone-screen');
				$windowProxy = ($windowProxy.length > 0) ? $windowProxy : $(window);
					
				$pageWrapper.css({
					'background-color'    : $backgroundImage.css('background-color') || 'white',
					'background-image'    : $backgroundImage.css('background-image'),
					'background-position' : $backgroundImage.css('background-position'),
					'background-size'     : $backgroundImage.css('background-size'),
					'background-repeat'   : $backgroundImage.css('background-repeat'),
					'background-clip'     : $backgroundImage.css('background-clip'),
					'height'              : Math.max($backgroundImage.height(), $windowProxy.height() + browserPadding) + 'px'
				});

				//eliminate the 'flicker' from waiting for the background image to load
				if ($backgroundImage.css('background-image').length > 0 && supports3D && supportsTouch) {
					timeoutLength = 260;
				}

				// causes flickering if visible
				if ($backgroundImage !== $body) {
					$backgroundImage.hide();
				}

				$body.css({ 'overflow-x' : 'hidden' });

				setTimeout(function() {
					$menuWrapper.show();
				}, timeoutLength);
			}

			fromCSS = {
				'-webkit-transform': 'translate3d(' + effectStart + ', 0px, 0)'
			};

			toCSS = {
				'-webkit-transform': 'translate3d(' + effectEnd + ', 0px, 0)'
			};

			if (!supports3D) {
				fromCSS = { left : effectStart };
				toCSS   = { left : effectEnd };
			}
			
			setTimeout(function() {
				animate($pageWrapper, fromCSS, toCSS, 300, cb);
			}, timeoutLength);
		}

	};

	/**
	 * Tweens the menu left or right
	 *
	 * @param jquery $oldSlide the current slide being moved out
	 * @param jquery $newSlide the new slide being moved in
	 * @param bool rightToLeft move to the right if true, left if false
	 * @return undefined
	 */
	var tweenMenu = function($oldSlide, $newSlide, rightToLeft) {
		var $animContainer = $('.wsite-animation-wrap', $menu),
			sign = (rightToLeft) ? 1 : -1;

		if (isMoving) {
			return;
		}
		isMoving = true;

		var newHeight = Math.max($newSlide.outerHeight(), $oldSlide.outerHeight());

		$menu.css({
			height : newHeight + 'px'
		});

		var menuWidth = $menu.width();

		var toX = -sign * menuWidth + 'px';

		var fromCSS = {
			'-webkit-transform': 'translate3d( 0, 0px, 0)'
		};

		var toCSS = {
			'-webkit-transform': 'translate3d(' + toX + ', 0px, 0)'
		};

		if (supports3D) {
			$newSlide.css({ 
				'-webkit-transform': 'translate3d(' + (sign * menuWidth) + 'px, 0px, 0)'
			});
		} else {
			$newSlide.css({ 
				'left': (sign * menuWidth) + 'px'
			});

			fromCSS = { left : 0 };
			toCSS   = { left : toX };
		}

		$newSlide.show();

		var cb = function() {
			$oldSlide.hide();

			var slideHeight = $newSlide.outerHeight();
			//reset animation container
			$menu.css({ height : slideHeight + 'px' });
			$animContainer.css(fromCSS);
			$newSlide.css(fromCSS);
			
			isMoving = false;
		};
		
		animate($animContainer, fromCSS, toCSS, 300, cb);		
	};

	/**
	 * Adds a an active state css class so that button presses 
	 * can be styled
	 *
	 * @param jquery $element element(s) to add state to
	 * @param string tagName selector to filter dom elemenets
	 * @return undefined
	 */
	var addActiveState = function($element, tagName) {
		$element.on('touchstart', tagName, function(ev) {
				$(this).addClass('active');
		});
		$element.on('touchend', tagName, function(ev) {
			$(this).removeClass('active');
		});
	};


	/**
	 * Resizes the vertical height of the mobile menu
	 *
	 * @return undefined
	 */
	var resizeMenu = function() {
		if (!$menu) {
			return;
		}
		var menuHeight = $menu.find('.wsite-menu-slide:visible').outerHeight();
		if (menuHeight > 0) {
			$menu.css({ height : menuHeight + 'px' });	
		}
	};

	/**
	 * Inits the body to detect touch support
	 *
	 * @return undefined
	 */
	var initBody = function() {
		$body = $('body');
		
		if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			$body.removeClass('no-touch');
			$body.addClass('touch');
			supportsTouch = true;
		}
	};

	var initBackground = function() {
		var isFixedBG = ($body.css('background-attachment').indexOf('fixed') > -1 || $body.css('position').indexOf('fixed') > -1);

		if (Weebly.mobile || !isFixedBG) {
			return;
		}

		$body.prepend('<div class="wsite-background"></div>');
		var $backgroundImage = $body.find('.wsite-background');

		$backgroundImage.css({
			'background-color'    : $body.css('background-color') || 'rgba(0,0,0,0)',
			'background-image'    : $body.css('background-image'),
			'background-position' : $body.css('background-position'),
			'background-size'     : $body.css('background-size'),
			'background-repeat'   : $body.css('background-repeat'),
			'background-clip'     : $body.css('background-clip'),
			'position'            : 'fixed',
			'top'                 : $body.css('top'),
			'left'                : $body.css('left'),
			'height'              : '100%',
			'width'               : '100%'
		});
		$body.css('background', 'none');
	}

	/**
	 * Inits the mobile menu structure
	 *
	 * @return undefined
	 */
	var initMenu = function() {
		var $sideMenus = $('#nav-container .wsite-menu-wrap'),
			$headerUl, $sliderContainer;

		$menuButton = $('#mobile');
		$headerUl = $('#nav-container .wsite-menu-default');

		$headerUl.wrap('<div class="wsite-mobile-menu" />');
		$menu = $headerUl.up('.wsite-mobile-menu');
		$menuWrapper = $headerUl.up('#navigation');
		$menuWrapper = ($menuWrapper.length > 0) ? $menuWrapper : $menu;

		isOpen = false;
		isMoving = false;

        // if (!Weebly.mobile) {
        //  $menuButton.on('click', menuTap);
        // }
		
		var slideCSS = {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%'
		};

		// something to select on
		$headerUl.addClass('wsite-menu-slide').css(slideCSS);
		$sideMenus.addClass('wsite-menu-slide').css(slideCSS);

		// new css settings can cause jarring while animations render,
		// set the settings here even though they don't really 'do anything'
		$headerUl.css({ 'left' : '0'});
		if (supports3D) {
			$headerUl.css({'-webkit-transform': 'translate3d( 0, 0px, 0)'});
		}

		$menu.append('<div class="wsite-animation-wrap"></div>');
		$sliderContainer = $('.wsite-animation-wrap', $menu);
		$sliderContainer.css({ position: 'relative' });
		if (supports3D) {
			$sliderContainer.css({'-webkit-backface-visibility': 'hidden'});
		}
		$sliderContainer.append($headerUl);

		$sideMenus.each(function() {
			var	$sideMenu  = $(this),
				$parentAnchor = $sideMenu.prev(),
				$ul           = $sideMenu.children('ul'),
				$previousMenu = $sideMenu.parents('.wsite-menu-slide');

			var $backLink = $('<li class="wsite-menu-back-item">'
					+	'<a><span class="wsite-menu-mobile-arrow"></span><span class="wsite-menu-back">Back</span></a>'
				+ '</li>');
			$backLink.on('click', function(ev) {
				tweenMenu($sideMenu, $previousMenu, false);
			});

			var $sideMenuRoot = $parentAnchor.clone();
			var $rootLink = $('<li class="wsite-menu-master-item"></li>').html($sideMenuRoot);			

			$ul.prepend($rootLink);
			$ul.prepend($backLink);

			$parentAnchor.removeAttr('href').removeAttr('onclick');
			$parentAnchor.append('<span class="wsite-menu-mobile-arrow"></span>');
			$parentAnchor.on('click', function(ev) {
				tweenMenu($previousMenu, $sideMenu, true);
			});

			$sideMenu.css({ 'left' : '0' });
			if (supports3D) {
				$sideMenu.css({'-webkit-transform': 'translate3d( 0, 0px, 0)'});
			}

			$sliderContainer.append($sideMenu);
		});

		$menu.css({ 'display' : 'block'});
		$menuWrapper.css({ 'display' : 'block'});
		resizeMenu();
		
		if ($body.hasClass('wsite-menu-dropdown')) {
			initSlideDown();
		} else if ($body.hasClass('wsite-menu-slideright')) {
			initSlideRight();
		}

		// prefer active state classes over html active
		if (supportsTouch) {
			addActiveState($('.wsite-home-link'));
			addActiveState($menuButton);
			addActiveState($menu, 'a');
		}
	};

	var initSlideRight = function() {
		navStyle = SLIDE_RIGHT;

		var $children = $body.contents();

		$body.prepend('<div id="wsite-viewport" ><div id="wsite-page-wrapper" /></div>');
		var $pageWrapper = $('#wsite-page-wrapper');

		for (var i = 0; i < $children.length; i++) {
			var child = $children[i];
			$pageWrapper[0].appendChild(child);
		}
		
		$pageWrapper.css({
			'position'   : 'relative',
			'background' : 'none',
			'z-index'    : '3',
			'left' : '0',
			'top'  : '0'
			
		});
		if (supports3D) {
			$pageWrapper.css({
				'-webkit-backface-visibility': 'hidden',
				'-webkit-transform' : 'translateZ(0)',
				'-webkit-transform': 'translate3d( 0, 0, 0)'
			});
		}

		var menuHeight = $pageWrapper.height();

		$menuWrapper.css({
			'top'      : '0',
			'left'      : '0',
			'min-height'  : '100%',
			'width'    : '80%',
			'position' : 'absolute'
		});

		$menuWrapper.hide();

		$body.find('#wsite-viewport').css({
				'height' : '',
				'width'  : '100%'
			}).append($menuWrapper);
	};

	var initSlideDown = function() {
		navStyle = SLIDE_DOWN;

		$menuWrapper.css({
			'position'  : 'absolute',
			'width'     : '100%',
			'z-index' : 6
		});

		var position = $menuWrapper.position();
		menuOffsetY = (position) ? position.top : 0;

		//adjust menu to start behind header and closed
		var yPos = -$menuWrapper.outerHeight() - 10;
		if (supports3D) {
			$menuWrapper.css({ 
				'-webkit-transform' : 'translate3d( 0px, ' + yPos + 'px, 0)',
				'-webkit-backface-visibility' : 'hidden'
			});
		} else {
			$menuWrapper.css({ 
				'top' : (menuOffsetY + yPos) + 'px'
			});
		}
	};


	/**
	 * Close the menu
	 *
	 * @return undefined
	 */
	var closeMenu = function() {
		if (isOpen) {
			menuTap(null);
		}
	};

	var isMenuOpen = function() {
		return isOpen;
	};

	var init = function() {
		$body = $('#icontent');
		$body = ($body.length > 0) ? $body : $('body');

		// May be able to dump this flag in the future,
		// but fixing 3d transition flickering issues was in theme css
		if (!$body.hasClass('wsite-render3d')) {
			supports3D = false;
		}
		
		initMenu();
		whenThemeCSSLoaded(initBackground);
	};

	if (!Weebly.mobile) {
		// reset iframe content sizes
		$(window).on("message", function(event) {
			if (!event.origin || event.origin.indexOf('weebly.com') === -1) {
				return;
			}
			
			pendingResizeData = event.data;
		});	
	}

	// dom ready
	$(function() {
		initBody();
		init();

		if (window.FastClick) {
			FastClick.attach($('.wsite-menu-button')[0]);
			FastClick.attach($('.wsite-mobile-menu')[0]);
		}

	});

	return {
		init         : init,
		closeMenu    : closeMenu,
		resizeMenu   : resizeMenu,
		menuTap      : menuTap,
		isMenuOpen   : isMenuOpen
	};

}(Weebly.jQuery));