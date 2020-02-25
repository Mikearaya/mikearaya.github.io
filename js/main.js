!(function(e) {
  'use strict';
  e(window).load(function() {
    e('#loader').fadeOut('slow', function() {
      e('#preloader')
        .delay(300)
        .fadeOut('slow');
    });
  }),
    setTimeout(function() {
      e('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
    }, 100),

    e('#owl-slider').owlCarousel({
      navigation: !1,
      pagination: !0,
      itemsCustom: [
        [0, 1],
        [700, 2],
        [960, 3]
      ],
      navigationText: !1
    }),

  var n = e('#stats'),
    t = e('.stat-count');
  n.waypoint({
    handler: function(n) {
      'down' === n &&
        t.each(function() {
          var n = e(this);
          e({ Counter: 0 }).animate(
            { Counter: n.text() },
            {
              duration: 4e3,
              easing: 'swing',
              step: function(e) {
                n.text(Math.ceil(e));
              }
            }
          );
        }),
        this.destroy();
    },
    offset: '90%'
  });
  var s = e('section'),
    r = e('#main-nav-wrap li a');
  s.waypoint({
    handler: function(n) {
      var t;
      (t = e('section#' + this.element.id)), 'up' === n && (t = t.prev());
      var a = e('#main-nav-wrap a[href="#' + t.attr('id') + '"]');
      r.parent().removeClass('current'), a.parent().addClass('current');
    },
    offset: '25%'
  }),
    e('input, textarea, select').placeholder(),
    e('#contactForm').validate({
      submitHandler: function(n) {
        var t = e('#submit-loader');
        e.ajax({
          type: 'POST',
          url: 'inc/sendEmail.php',
          data: e(n).serialize(),
          beforeSend: function() {
            t.fadeIn();
          },
          success: function(n) {
            'OK' == n
              ? (t.fadeOut(),
                e('#message-warning').hide(),
                e('#contactForm').fadeOut(),
                e('#message-success').fadeIn())
              : (t.fadeOut(),
                e('#message-warning').html(n),
                e('#message-warning').fadeIn());
          },
          error: function() {
            t.fadeOut(),
              e('#message-warning').html(
                'Something went wrong. Please try again.'
              ),
              e('#message-warning').fadeIn();
          }
        });
      }
    });
})(jQuery);
