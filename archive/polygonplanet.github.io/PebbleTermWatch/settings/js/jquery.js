/*
 * jQuery touch trapper plugin
 *
 * Version 1.0.0, 2014-05-01 polygon planet <polygon.planet.aqua@gmail.com>
 * MIT license.
 */

(function($) {
  'use strict';

  $.support.touch = 'ontouchend' in document;

  var on_ = $.fn.on,
      DELAY_LONG = 800,
      DELAY_DBL = 400,
      events;

  var UserSelect = {
    getCSS: function(val) {
      return {
        '-webkit-user-select': val,
        '-moz-user-select': val,
        '-ms-user-select': val,
        '-o-user-select': val,
        'user-select': val
      };
    },
    disable: function(target) {
      target.css(this.getCSS('none'));
    },
    clear: function(target) {
      target.css(this.getCSS(''));
    }
  };

  $.extend($.event.special, {
    longclick: {
      setup: function() {
        var click = false;
        var timerId;

        on_.call($(this), 'mousedown', function() {
          var that = $(this);

          click = true;
          UserSelect.disable(that);

          timerId = setTimeout(function() {
            UserSelect.clear(that);
            if (click) {
              that.trigger('longclick');
              click = false;
            }
          }, DELAY_LONG);
        });

        on_.call($(this), 'mouseup mouseout', function() {
          clearTimeout(timerId);
          click = false;
          UserSelect.clear($(this));
        });
      }
    }
  });

  if (!$.support.touch) {
    return;
  }

  $.extend($.event.special, {
    tap: {
      setup: function() {
        var tap = false;

        on_.call($(this), 'touchstart', function() {
          tap = true;
        });

        on_.call($(this), 'touchmove touchleave', function() {
          tap = false;
        });

        on_.call($(this), 'touchend', function() {
          if (tap) {
            $(this).trigger('tap');
          }
          tap = false;
        });
      }
    },
    dbltap: {
      setup: function() {
        var tap = false;

        on_.call($(this), 'touchstart', function() {
          if (tap) {
            $(this).trigger('dbltap');
            tap = false;
          } else {
            tap = true;
          }
          setTimeout(function() {
            tap = false;
          }, DELAY_DBL);
        });
      }
    },
    longtouch: {
      setup: function() {
        var touch = false;
        var timerId;

        on_.call($(this), 'touchstart', function(ev) {
          var that = $(this);

          touch = true;
          UserSelect.disable(that);

          timerId = setTimeout(function() {
            UserSelect.clear(that);
            if (touch) {
              that.trigger('longtouch');
              touch = false;
            }
          }, DELAY_LONG);
        });

        on_.call($(this), 'touchend touchleave', function() {
          clearTimeout(timerId);
          touch = false;
          UserSelect.clear($(this));
        });
      }
    }
  });

  $(document).on('touchcancel', function(ev) {
    ev.preventDefault();
  });

  events = {
    click: 'tap',
    dblclick: 'dbltap',
    longclick: 'longtouch',
    mousedown: 'touchstart',
    mouseup: 'touchend',
    mouseout: 'touchleave',
    mousemove: 'touchmove',
    mouseenter: 'touchstart',
    mouseleave: 'touchend'
  };

  $.fn.extend({
    on: function(/*types, selector, data, fn, one*/) {
      var args = Array.prototype.slice.call(arguments),
          types = args[0],
          items, type, i, len,
          results = [];

      if (typeof types === 'string' && !/touch/i.test(types)) {
        items = types.split(/\s+/);
        len = items.length;
        for (i = 0; i < len; i++) {
          type = items[i];
          if (type) {
            if (type in events) {
              results.push(events[type]);
            } else {
              results.push(type);
            }
          }
        }
        args[0] = results.join(' ');
      }
      return on_.apply(this, args);
    }
  });

}(jQuery));
