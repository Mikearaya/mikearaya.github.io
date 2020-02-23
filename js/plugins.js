!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : t(
        'object' == typeof module && module.exports ? require('jquery') : jQuery
      );
})(function(t) {
  function e(e, i) {
    var o = this,
      s = t(o);
    if (o.value == s.attr('placeholder') && s.hasClass(c.customClass))
      if (s.data('placeholder-password')) {
        if (
          ((s = s
            .hide()
            .nextAll('input[type="password"]:first')
            .show()
            .attr('id', s.removeAttr('id').data('placeholder-id'))),
          !0 === e)
        )
          return (s[0].value = i);
        s.focus();
      } else
        (o.value = ''), s.removeClass(c.customClass), o == n() && o.select();
  }
  function i() {
    var i,
      n = this,
      o = t(n),
      s = this.id;
    if ('' === n.value) {
      if ('password' === n.type) {
        if (!o.data('placeholder-textinput')) {
          try {
            i = o.clone().prop({ type: 'text' });
          } catch (e) {
            i = t('<input>').attr(
              t.extend(
                (function(e) {
                  var i = {},
                    n = /^jQuery\d+$/;
                  return (
                    t.each(e.attributes, function(t, e) {
                      e.specified && !n.test(e.name) && (i[e.name] = e.value);
                    }),
                    i
                  );
                })(this),
                { type: 'text' }
              )
            );
          }
          i
            .removeAttr('name')
            .data({ 'placeholder-password': o, 'placeholder-id': s })
            .bind('focus.placeholder', e),
            o
              .data({ 'placeholder-textinput': i, 'placeholder-id': s })
              .before(i);
        }
        o = o
          .removeAttr('id')
          .hide()
          .prevAll('input[type="text"]:first')
          .attr('id', s)
          .show();
      }
      o.addClass(c.customClass), (o[0].value = o.attr('placeholder'));
    } else o.removeClass(c.customClass);
  }
  function n() {
    try {
      return document.activeElement;
    } catch (t) {}
  }
  var o,
    s,
    r =
      '[object OperaMini]' == Object.prototype.toString.call(window.operamini),
    a = 'placeholder' in document.createElement('input') && !r,
    l = 'placeholder' in document.createElement('textarea') && !r,
    u = t.valHooks,
    h = t.propHooks;
  if (a && l)
    (s = t.fn.placeholder = function() {
      return this;
    }).input = s.textarea = !0;
  else {
    var c = {};
    ((s = t.fn.placeholder = function(n) {
      c = t.extend({}, { customClass: 'placeholder' }, n);
      return (
        this.filter((a ? 'textarea' : ':input') + '[placeholder]')
          .not('.' + c.customClass)
          .bind({ 'focus.placeholder': e, 'blur.placeholder': i })
          .data('placeholder-enabled', !0)
          .trigger('blur.placeholder'),
        this
      );
    }).input = a),
      (s.textarea = l),
      (o = {
        get: function(e) {
          var i = t(e),
            n = i.data('placeholder-password');
          return n
            ? n[0].value
            : i.data('placeholder-enabled') && i.hasClass(c.customClass)
            ? ''
            : e.value;
        },
        set: function(o, s) {
          var r = t(o),
            a = r.data('placeholder-password');
          return a
            ? (a[0].value = s)
            : r.data('placeholder-enabled')
            ? ('' === s
                ? ((o.value = s), o != n() && i.call(o))
                : (r.hasClass(c.customClass) && e.call(o, !0, s)) ||
                  (o.value = s),
              r)
            : (o.value = s);
        }
      }),
      a || ((u.input = o), (h.value = o)),
      l || ((u.textarea = o), (h.value = o)),
      t(function() {
        t(document).delegate('form', 'submit.placeholder', function() {
          var n = t('.' + c.customClass, this).each(e);
          setTimeout(function() {
            n.each(i);
          }, 10);
        });
      }),
      t(window).bind('beforeunload.placeholder', function() {
        t('.' + c.customClass).each(function() {
          this.value = '';
        });
      });
  }
}),
  (function(t) {
    'use strict';
    t.fn.fitVids = function(e) {
      var i = { customSelector: null, ignore: null };
      if (!document.getElementById('fit-vids-style')) {
        var n = document.head || document.getElementsByTagName('head')[0],
          o = document.createElement('div');
        (o.innerHTML =
          '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
          n.appendChild(o.childNodes[1]);
      }
      return (
        e && t.extend(i, e),
        this.each(function() {
          var e = [
            'iframe[src*="player.vimeo.com"]',
            'iframe[src*="youtube.com"]',
            'iframe[src*="youtube-nocookie.com"]',
            'iframe[src*="kickstarter.com"][src*="video.html"]',
            'object',
            'embed'
          ];
          i.customSelector && e.push(i.customSelector);
          var n = '.fitvidsignore';
          i.ignore && (n = n + ', ' + i.ignore);
          var o = t(this).find(e.join(','));
          (o = (o = o.not('object object')).not(n)).each(function(e) {
            var i = t(this);
            if (
              !(
                i.parents(n).length > 0 ||
                ('embed' === this.tagName.toLowerCase() &&
                  i.parent('object').length) ||
                i.parent('.fluid-width-video-wrapper').length
              )
            ) {
              i.css('height') ||
                i.css('width') ||
                (!isNaN(i.attr('height')) && !isNaN(i.attr('width'))) ||
                (i.attr('height', 9), i.attr('width', 16));
              var o =
                ('object' === this.tagName.toLowerCase() ||
                (i.attr('height') && !isNaN(parseInt(i.attr('height'), 10)))
                  ? parseInt(i.attr('height'), 10)
                  : i.height()) /
                (isNaN(parseInt(i.attr('width'), 10))
                  ? i.width()
                  : parseInt(i.attr('width'), 10));
              if (!i.attr('id')) {
                var s = 'fitvid' + e;
                i.attr('id', s);
              }
              i
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent('.fluid-width-video-wrapper')
                .css('padding-top', 100 * o + '%'),
                i.removeAttr('height').removeAttr('width');
            }
          });
        })
      );
    };
  })(window.jQuery || window.Zepto),
  (function(t) {
    t.fn.fitText = function(e, i) {
      var n = e || 1,
        o = t.extend(
          {
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
          },
          i
        );
      return this.each(function() {
        var e = t(this),
          i = function() {
            e.css(
              'font-size',
              Math.max(
                Math.min(e.width() / (10 * n), parseFloat(o.maxFontSize)),
                parseFloat(o.minFontSize)
              )
            );
          };
        i(), t(window).on('resize.fittext orientationchange.fittext', i);
      });
    };
  })(jQuery),
  'function' != typeof Object.create &&
    (Object.create = function(t) {
      function e() {}
      return (e.prototype = t), new e();
    }),
  (function(t, e, i) {
    var n = {
      init: function(e, i) {
        (this.$elem = t(i)),
          (this.options = t.extend(
            {},
            t.fn.owlCarousel.options,
            this.$elem.data(),
            e
          )),
          (this.userOptions = e),
          this.loadContent();
      },
      loadContent: function() {
        var e,
          i = this;
        'function' == typeof i.options.beforeInit &&
          i.options.beforeInit.apply(this, [i.$elem]),
          'string' == typeof i.options.jsonPath
            ? ((e = i.options.jsonPath),
              t.getJSON(e, function(t) {
                var e,
                  n = '';
                if ('function' == typeof i.options.jsonSuccess)
                  i.options.jsonSuccess.apply(this, [t]);
                else {
                  for (e in t.owl)
                    t.owl.hasOwnProperty(e) && (n += t.owl[e].item);
                  i.$elem.html(n);
                }
                i.logIn();
              }))
            : i.logIn();
      },
      logIn: function() {
        this.$elem.data('owl-originalStyles', this.$elem.attr('style')),
          this.$elem.data('owl-originalClasses', this.$elem.attr('class')),
          this.$elem.css({ opacity: 0 }),
          (this.orignalItems = this.options.items),
          this.checkBrowser(),
          (this.wrapperWidth = 0),
          (this.checkVisible = null),
          this.setVars();
      },
      setVars: function() {
        if (0 === this.$elem.children().length) return !1;
        this.baseClass(),
          this.eventTypes(),
          (this.$userItems = this.$elem.children()),
          (this.itemsAmount = this.$userItems.length),
          this.wrapItems(),
          (this.$owlItems = this.$elem.find('.owl-item')),
          (this.$owlWrapper = this.$elem.find('.owl-wrapper')),
          (this.playDirection = 'next'),
          (this.prevItem = 0),
          (this.prevArr = [0]),
          (this.currentItem = 0),
          this.customEvents(),
          this.onStartup();
      },
      onStartup: function() {
        this.updateItems(),
          this.calculateAll(),
          this.buildControls(),
          this.updateControls(),
          this.response(),
          this.moveEvents(),
          this.stopOnHover(),
          this.owlStatus(),
          !1 !== this.options.transitionStyle &&
            this.transitionTypes(this.options.transitionStyle),
          !0 === this.options.autoPlay && (this.options.autoPlay = 5e3),
          this.play(),
          this.$elem.find('.owl-wrapper').css('display', 'block'),
          this.$elem.is(':visible')
            ? this.$elem.css('opacity', 1)
            : this.watchVisibility(),
          (this.onstartup = !1),
          this.eachMoveUpdate(),
          'function' == typeof this.options.afterInit &&
            this.options.afterInit.apply(this, [this.$elem]);
      },
      eachMoveUpdate: function() {
        !0 === this.options.lazyLoad && this.lazyLoad(),
          !0 === this.options.autoHeight && this.autoHeight(),
          this.onVisibleItems(),
          'function' == typeof this.options.afterAction &&
            this.options.afterAction.apply(this, [this.$elem]);
      },
      updateVars: function() {
        'function' == typeof this.options.beforeUpdate &&
          this.options.beforeUpdate.apply(this, [this.$elem]),
          this.watchVisibility(),
          this.updateItems(),
          this.calculateAll(),
          this.updatePosition(),
          this.updateControls(),
          this.eachMoveUpdate(),
          'function' == typeof this.options.afterUpdate &&
            this.options.afterUpdate.apply(this, [this.$elem]);
      },
      reload: function() {
        var t = this;
        e.setTimeout(function() {
          t.updateVars();
        }, 0);
      },
      watchVisibility: function() {
        var t = this;
        if (!1 !== t.$elem.is(':visible')) return !1;
        t.$elem.css({ opacity: 0 }),
          e.clearInterval(t.autoPlayInterval),
          e.clearInterval(t.checkVisible),
          (t.checkVisible = e.setInterval(function() {
            t.$elem.is(':visible') &&
              (t.reload(),
              t.$elem.animate({ opacity: 1 }, 200),
              e.clearInterval(t.checkVisible));
          }, 500));
      },
      wrapItems: function() {
        this.$userItems
          .wrapAll('<div class="owl-wrapper">')
          .wrap('<div class="owl-item"></div>'),
          this.$elem
            .find('.owl-wrapper')
            .wrap('<div class="owl-wrapper-outer">'),
          (this.wrapperOuter = this.$elem.find('.owl-wrapper-outer')),
          this.$elem.css('display', 'block');
      },
      baseClass: function() {
        var t = this.$elem.hasClass(this.options.baseClass),
          e = this.$elem.hasClass(this.options.theme);
        t || this.$elem.addClass(this.options.baseClass),
          e || this.$elem.addClass(this.options.theme);
      },
      updateItems: function() {
        var e, i;
        if (!1 === this.options.responsive) return !1;
        if (!0 === this.options.singleItem)
          return (
            (this.options.items = this.orignalItems = 1),
            (this.options.itemsCustom = !1),
            (this.options.itemsDesktop = !1),
            (this.options.itemsDesktopSmall = !1),
            (this.options.itemsTablet = !1),
            (this.options.itemsTabletSmall = !1),
            (this.options.itemsMobile = !1)
          );
        if (
          ((e = t(this.options.responsiveBaseWidth).width()) >
            (this.options.itemsDesktop[0] || this.orignalItems) &&
            (this.options.items = this.orignalItems),
          !1 !== this.options.itemsCustom)
        )
          for (
            this.options.itemsCustom.sort(function(t, e) {
              return t[0] - e[0];
            }),
              i = 0;
            i < this.options.itemsCustom.length;
            i += 1
          )
            this.options.itemsCustom[i][0] <= e &&
              (this.options.items = this.options.itemsCustom[i][1]);
        else
          e <= this.options.itemsDesktop[0] &&
            !1 !== this.options.itemsDesktop &&
            (this.options.items = this.options.itemsDesktop[1]),
            e <= this.options.itemsDesktopSmall[0] &&
              !1 !== this.options.itemsDesktopSmall &&
              (this.options.items = this.options.itemsDesktopSmall[1]),
            e <= this.options.itemsTablet[0] &&
              !1 !== this.options.itemsTablet &&
              (this.options.items = this.options.itemsTablet[1]),
            e <= this.options.itemsTabletSmall[0] &&
              !1 !== this.options.itemsTabletSmall &&
              (this.options.items = this.options.itemsTabletSmall[1]),
            e <= this.options.itemsMobile[0] &&
              !1 !== this.options.itemsMobile &&
              (this.options.items = this.options.itemsMobile[1]);
        this.options.items > this.itemsAmount &&
          !0 === this.options.itemsScaleUp &&
          (this.options.items = this.itemsAmount);
      },
      response: function() {
        var i,
          n,
          o = this;
        if (!0 !== o.options.responsive) return !1;
        (n = t(e).width()),
          (o.resizer = function() {
            t(e).width() !== n &&
              (!1 !== o.options.autoPlay && e.clearInterval(o.autoPlayInterval),
              e.clearTimeout(i),
              (i = e.setTimeout(function() {
                (n = t(e).width()), o.updateVars();
              }, o.options.responsiveRefreshRate)));
          }),
          t(e).resize(o.resizer);
      },
      updatePosition: function() {
        this.jumpTo(this.currentItem),
          !1 !== this.options.autoPlay && this.checkAp();
      },
      appendItemsSizes: function() {
        var e = this,
          i = 0,
          n = e.itemsAmount - e.options.items;
        e.$owlItems.each(function(o) {
          var s = t(this);
          s.css({ width: e.itemWidth }).data('owl-item', Number(o)),
            (0 != o % e.options.items && o !== n) || o > n || (i += 1),
            s.data('owl-roundPages', i);
        });
      },
      appendWrapperSizes: function() {
        this.$owlWrapper.css({
          width: this.$owlItems.length * this.itemWidth * 2,
          left: 0
        }),
          this.appendItemsSizes();
      },
      calculateAll: function() {
        this.calculateWidth(),
          this.appendWrapperSizes(),
          this.loops(),
          this.max();
      },
      calculateWidth: function() {
        this.itemWidth = Math.round(this.$elem.width() / this.options.items);
      },
      max: function() {
        var t =
          -1 *
          (this.itemsAmount * this.itemWidth -
            this.options.items * this.itemWidth);
        return (
          this.options.items > this.itemsAmount
            ? (this.maximumPixels = t = this.maximumItem = 0)
            : ((this.maximumItem = this.itemsAmount - this.options.items),
              (this.maximumPixels = t)),
          t
        );
      },
      min: function() {
        return 0;
      },
      loops: function() {
        var e,
          i,
          n = 0,
          o = 0;
        for (
          this.positionsInArray = [0], this.pagesInArray = [], e = 0;
          e < this.itemsAmount;
          e += 1
        )
          (o += this.itemWidth),
            this.positionsInArray.push(-o),
            !0 === this.options.scrollPerPage &&
              (i = (i = t(this.$owlItems[e])).data('owl-roundPages')) !== n &&
              ((this.pagesInArray[n] = this.positionsInArray[e]), (n = i));
      },
      buildControls: function() {
        (!0 !== this.options.navigation && !0 !== this.options.pagination) ||
          (this.owlControls = t('<div class="owl-controls"/>')
            .toggleClass('clickable', !this.browser.isTouch)
            .appendTo(this.$elem)),
          !0 === this.options.pagination && this.buildPagination(),
          !0 === this.options.navigation && this.buildButtons();
      },
      buildButtons: function() {
        var e = this,
          i = t('<div class="owl-buttons"/>');
        e.owlControls.append(i),
          (e.buttonPrev = t('<div/>', {
            class: 'owl-prev',
            html: e.options.navigationText[0] || ''
          })),
          (e.buttonNext = t('<div/>', {
            class: 'owl-next',
            html: e.options.navigationText[1] || ''
          })),
          i.append(e.buttonPrev).append(e.buttonNext),
          i.on(
            'touchstart.owlControls mousedown.owlControls',
            'div[class^="owl"]',
            function(t) {
              t.preventDefault();
            }
          ),
          i.on(
            'touchend.owlControls mouseup.owlControls',
            'div[class^="owl"]',
            function(i) {
              i.preventDefault(),
                t(this).hasClass('owl-next') ? e.next() : e.prev();
            }
          );
      },
      buildPagination: function() {
        var e = this;
        (e.paginationWrapper = t('<div class="owl-pagination"/>')),
          e.owlControls.append(e.paginationWrapper),
          e.paginationWrapper.on(
            'touchend.owlControls mouseup.owlControls',
            '.owl-page',
            function(i) {
              i.preventDefault(),
                Number(t(this).data('owl-page')) !== e.currentItem &&
                  e.goTo(Number(t(this).data('owl-page')), !0);
            }
          );
      },
      updatePagination: function() {
        var e, i, n, o, s, r;
        if (!1 === this.options.pagination) return !1;
        for (
          this.paginationWrapper.html(''),
            e = 0,
            i = this.itemsAmount - (this.itemsAmount % this.options.items),
            o = 0;
          o < this.itemsAmount;
          o += 1
        )
          0 == o % this.options.items &&
            ((e += 1),
            i === o && (n = this.itemsAmount - this.options.items),
            (s = t('<div/>', { class: 'owl-page' })),
            (r = t('<span></span>', {
              text: !0 === this.options.paginationNumbers ? e : '',
              class: !0 === this.options.paginationNumbers ? 'owl-numbers' : ''
            })),
            s.append(r),
            s.data('owl-page', i === o ? n : o),
            s.data('owl-roundPages', e),
            this.paginationWrapper.append(s));
        this.checkPagination();
      },
      checkPagination: function() {
        var e = this;
        if (!1 === e.options.pagination) return !1;
        e.paginationWrapper.find('.owl-page').each(function() {
          t(this).data('owl-roundPages') ===
            t(e.$owlItems[e.currentItem]).data('owl-roundPages') &&
            (e.paginationWrapper.find('.owl-page').removeClass('active'),
            t(this).addClass('active'));
        });
      },
      checkNavigation: function() {
        if (!1 === this.options.navigation) return !1;
        !1 === this.options.rewindNav &&
          (0 === this.currentItem && 0 === this.maximumItem
            ? (this.buttonPrev.addClass('disabled'),
              this.buttonNext.addClass('disabled'))
            : 0 === this.currentItem && 0 !== this.maximumItem
            ? (this.buttonPrev.addClass('disabled'),
              this.buttonNext.removeClass('disabled'))
            : this.currentItem === this.maximumItem
            ? (this.buttonPrev.removeClass('disabled'),
              this.buttonNext.addClass('disabled'))
            : 0 !== this.currentItem &&
              this.currentItem !== this.maximumItem &&
              (this.buttonPrev.removeClass('disabled'),
              this.buttonNext.removeClass('disabled')));
      },
      updateControls: function() {
        this.updatePagination(),
          this.checkNavigation(),
          this.owlControls &&
            (this.options.items >= this.itemsAmount
              ? this.owlControls.hide()
              : this.owlControls.show());
      },
      destroyControls: function() {
        this.owlControls && this.owlControls.remove();
      },
      next: function(t) {
        if (this.isTransition) return !1;
        if (
          ((this.currentItem +=
            !0 === this.options.scrollPerPage ? this.options.items : 1),
          this.currentItem >
            this.maximumItem +
              (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
        ) {
          if (!0 !== this.options.rewindNav)
            return (this.currentItem = this.maximumItem), !1;
          (this.currentItem = 0), (t = 'rewind');
        }
        this.goTo(this.currentItem, t);
      },
      prev: function(t) {
        if (this.isTransition) return !1;
        if (
          ((this.currentItem =
            !0 === this.options.scrollPerPage &&
            0 < this.currentItem &&
            this.currentItem < this.options.items
              ? 0
              : this.currentItem -
                (!0 === this.options.scrollPerPage ? this.options.items : 1)),
          0 > this.currentItem)
        ) {
          if (!0 !== this.options.rewindNav) return (this.currentItem = 0), !1;
          (this.currentItem = this.maximumItem), (t = 'rewind');
        }
        this.goTo(this.currentItem, t);
      },
      goTo: function(t, i, n) {
        var o = this;
        return (
          !o.isTransition &&
          ('function' == typeof o.options.beforeMove &&
            o.options.beforeMove.apply(this, [o.$elem]),
          t >= o.maximumItem ? (t = o.maximumItem) : 0 >= t && (t = 0),
          (o.currentItem = o.owl.currentItem = t),
          !1 !== o.options.transitionStyle &&
          'drag' !== n &&
          1 === o.options.items &&
          !0 === o.browser.support3d
            ? (o.swapSpeed(0),
              !0 === o.browser.support3d
                ? o.transition3d(o.positionsInArray[t])
                : o.css2slide(o.positionsInArray[t], 1),
              o.afterGo(),
              o.singleItemTransition(),
              !1)
            : ((t = o.positionsInArray[t]),
              !0 === o.browser.support3d
                ? ((o.isCss3Finish = !1),
                  !0 === i
                    ? (o.swapSpeed('paginationSpeed'),
                      e.setTimeout(function() {
                        o.isCss3Finish = !0;
                      }, o.options.paginationSpeed))
                    : 'rewind' === i
                    ? (o.swapSpeed(o.options.rewindSpeed),
                      e.setTimeout(function() {
                        o.isCss3Finish = !0;
                      }, o.options.rewindSpeed))
                    : (o.swapSpeed('slideSpeed'),
                      e.setTimeout(function() {
                        o.isCss3Finish = !0;
                      }, o.options.slideSpeed)),
                  o.transition3d(t))
                : !0 === i
                ? o.css2slide(t, o.options.paginationSpeed)
                : 'rewind' === i
                ? o.css2slide(t, o.options.rewindSpeed)
                : o.css2slide(t, o.options.slideSpeed),
              void o.afterGo()))
        );
      },
      jumpTo: function(t) {
        'function' == typeof this.options.beforeMove &&
          this.options.beforeMove.apply(this, [this.$elem]),
          t >= this.maximumItem || -1 === t
            ? (t = this.maximumItem)
            : 0 >= t && (t = 0),
          this.swapSpeed(0),
          !0 === this.browser.support3d
            ? this.transition3d(this.positionsInArray[t])
            : this.css2slide(this.positionsInArray[t], 1),
          (this.currentItem = this.owl.currentItem = t),
          this.afterGo();
      },
      afterGo: function() {
        this.prevArr.push(this.currentItem),
          (this.prevItem = this.owl.prevItem = this.prevArr[
            this.prevArr.length - 2
          ]),
          this.prevArr.shift(0),
          this.prevItem !== this.currentItem &&
            (this.checkPagination(),
            this.checkNavigation(),
            this.eachMoveUpdate(),
            !1 !== this.options.autoPlay && this.checkAp()),
          'function' == typeof this.options.afterMove &&
            this.prevItem !== this.currentItem &&
            this.options.afterMove.apply(this, [this.$elem]);
      },
      stop: function() {
        (this.apStatus = 'stop'), e.clearInterval(this.autoPlayInterval);
      },
      checkAp: function() {
        'stop' !== this.apStatus && this.play();
      },
      play: function() {
        var t = this;
        if (((t.apStatus = 'play'), !1 === t.options.autoPlay)) return !1;
        e.clearInterval(t.autoPlayInterval),
          (t.autoPlayInterval = e.setInterval(function() {
            t.next(!0);
          }, t.options.autoPlay));
      },
      swapSpeed: function(t) {
        'slideSpeed' === t
          ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed))
          : 'paginationSpeed' === t
          ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed))
          : 'string' != typeof t && this.$owlWrapper.css(this.addCssSpeed(t));
      },
      addCssSpeed: function(t) {
        return {
          '-webkit-transition': 'all ' + t + 'ms ease',
          '-moz-transition': 'all ' + t + 'ms ease',
          '-o-transition': 'all ' + t + 'ms ease',
          transition: 'all ' + t + 'ms ease'
        };
      },
      removeTransition: function() {
        return {
          '-webkit-transition': '',
          '-moz-transition': '',
          '-o-transition': '',
          transition: ''
        };
      },
      doTranslate: function(t) {
        return {
          '-webkit-transform': 'translate3d(' + t + 'px, 0px, 0px)',
          '-moz-transform': 'translate3d(' + t + 'px, 0px, 0px)',
          '-o-transform': 'translate3d(' + t + 'px, 0px, 0px)',
          '-ms-transform': 'translate3d(' + t + 'px, 0px, 0px)',
          transform: 'translate3d(' + t + 'px, 0px,0px)'
        };
      },
      transition3d: function(t) {
        this.$owlWrapper.css(this.doTranslate(t));
      },
      css2move: function(t) {
        this.$owlWrapper.css({ left: t });
      },
      css2slide: function(t, e) {
        var i = this;
        (i.isCssFinish = !1),
          i.$owlWrapper.stop(!0, !0).animate(
            { left: t },
            {
              duration: e || i.options.slideSpeed,
              complete: function() {
                i.isCssFinish = !0;
              }
            }
          );
      },
      checkBrowser: function() {
        var t = i.createElement('div');
        (t.style.cssText =
          '  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)'),
          (t = t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g)),
          (this.browser = {
            support3d: null !== t && 1 === t.length,
            isTouch: 'ontouchstart' in e || e.navigator.msMaxTouchPoints
          });
      },
      moveEvents: function() {
        (!1 === this.options.mouseDrag && !1 === this.options.touchDrag) ||
          (this.gestures(), this.disabledEvents());
      },
      eventTypes: function() {
        var t = ['s', 'e', 'x'];
        (this.ev_types = {}),
          !0 === this.options.mouseDrag && !0 === this.options.touchDrag
            ? (t = [
                'touchstart.owl mousedown.owl',
                'touchmove.owl mousemove.owl',
                'touchend.owl touchcancel.owl mouseup.owl'
              ])
            : !1 === this.options.mouseDrag && !0 === this.options.touchDrag
            ? (t = [
                'touchstart.owl',
                'touchmove.owl',
                'touchend.owl touchcancel.owl'
              ])
            : !0 === this.options.mouseDrag &&
              !1 === this.options.touchDrag &&
              (t = ['mousedown.owl', 'mousemove.owl', 'mouseup.owl']),
          (this.ev_types.start = t[0]),
          (this.ev_types.move = t[1]),
          (this.ev_types.end = t[2]);
      },
      disabledEvents: function() {
        this.$elem.on('dragstart.owl', function(t) {
          t.preventDefault();
        }),
          this.$elem.on('mousedown.disableTextSelect', function(e) {
            return t(e.target).is('input, textarea, select, option');
          });
      },
      gestures: function() {
        function n(t) {
          if (void 0 !== t.touches)
            return { x: t.touches[0].pageX, y: t.touches[0].pageY };
          if (void 0 === t.touches) {
            if (void 0 !== t.pageX) return { x: t.pageX, y: t.pageY };
            if (void 0 === t.pageX) return { x: t.clientX, y: t.clientY };
          }
        }
        function o(e) {
          'on' === e
            ? (t(i).on(a.ev_types.move, s), t(i).on(a.ev_types.end, r))
            : 'off' === e &&
              (t(i).off(a.ev_types.move), t(i).off(a.ev_types.end));
        }
        function s(o) {
          (o = o.originalEvent || o || e.event),
            (a.newPosX = n(o).x - l.offsetX),
            (a.newPosY = n(o).y - l.offsetY),
            (a.newRelativeX = a.newPosX - l.relativePos),
            'function' == typeof a.options.startDragging &&
              !0 !== l.dragging &&
              0 !== a.newRelativeX &&
              ((l.dragging = !0), a.options.startDragging.apply(a, [a.$elem])),
            (8 < a.newRelativeX || -8 > a.newRelativeX) &&
              !0 === a.browser.isTouch &&
              (void 0 !== o.preventDefault
                ? o.preventDefault()
                : (o.returnValue = !1),
              (l.sliding = !0)),
            (10 < a.newPosY || -10 > a.newPosY) &&
              !1 === l.sliding &&
              t(i).off('touchmove.owl'),
            (a.newPosX = Math.max(
              Math.min(a.newPosX, a.newRelativeX / 5),
              a.maximumPixels + a.newRelativeX / 5
            )),
            !0 === a.browser.support3d
              ? a.transition3d(a.newPosX)
              : a.css2move(a.newPosX);
        }
        function r(i) {
          var n;
          ((i = i.originalEvent || i || e.event).target =
            i.target || i.srcElement),
            (l.dragging = !1),
            !0 !== a.browser.isTouch && a.$owlWrapper.removeClass('grabbing'),
            (a.dragDirection =
              0 > a.newRelativeX
                ? (a.owl.dragDirection = 'left')
                : (a.owl.dragDirection = 'right')),
            0 !== a.newRelativeX &&
              ((n = a.getNewPosition()),
              a.goTo(n, !1, 'drag'),
              l.targetElement === i.target &&
                !0 !== a.browser.isTouch &&
                (t(i.target).on('click.disable', function(e) {
                  e.stopImmediatePropagation(),
                    e.stopPropagation(),
                    e.preventDefault(),
                    t(e.target).off('click.disable');
                }),
                (n = (i = t._data(i.target, 'events').click).pop()),
                i.splice(0, 0, n))),
            o('off');
        }
        var a = this,
          l = {
            offsetX: 0,
            offsetY: 0,
            baseElWidth: 0,
            relativePos: 0,
            position: null,
            minSwipe: null,
            maxSwipe: null,
            sliding: null,
            dargging: null,
            targetElement: null
          };
        (a.isCssFinish = !0),
          a.$elem.on(a.ev_types.start, '.owl-wrapper', function(i) {
            var s;
            if (3 === (i = i.originalEvent || i || e.event).which) return !1;
            if (!(a.itemsAmount <= a.options.items)) {
              if (
                (!1 === a.isCssFinish && !a.options.dragBeforeAnimFinish) ||
                (!1 === a.isCss3Finish && !a.options.dragBeforeAnimFinish)
              )
                return !1;
              !1 !== a.options.autoPlay && e.clearInterval(a.autoPlayInterval),
                !0 === a.browser.isTouch ||
                  a.$owlWrapper.hasClass('grabbing') ||
                  a.$owlWrapper.addClass('grabbing'),
                (a.newPosX = 0),
                (a.newRelativeX = 0),
                t(this).css(a.removeTransition()),
                (s = t(this).position()),
                (l.relativePos = s.left),
                (l.offsetX = n(i).x - s.left),
                (l.offsetY = n(i).y - s.top),
                o('on'),
                (l.sliding = !1),
                (l.targetElement = i.target || i.srcElement);
            }
          });
      },
      getNewPosition: function() {
        var t = this.closestItem();
        return (
          t > this.maximumItem
            ? (t = this.currentItem = this.maximumItem)
            : 0 <= this.newPosX && (this.currentItem = t = 0),
          t
        );
      },
      closestItem: function() {
        var e = this,
          i =
            !0 === e.options.scrollPerPage
              ? e.pagesInArray
              : e.positionsInArray,
          n = e.newPosX,
          o = null;
        return (
          t.each(i, function(s, r) {
            n - e.itemWidth / 20 > i[s + 1] &&
            n - e.itemWidth / 20 < r &&
            'left' === e.moveDirection()
              ? ((o = r),
                (e.currentItem =
                  !0 === e.options.scrollPerPage
                    ? t.inArray(o, e.positionsInArray)
                    : s))
              : n + e.itemWidth / 20 < r &&
                n + e.itemWidth / 20 > (i[s + 1] || i[s] - e.itemWidth) &&
                'right' === e.moveDirection() &&
                (!0 === e.options.scrollPerPage
                  ? ((o = i[s + 1] || i[i.length - 1]),
                    (e.currentItem = t.inArray(o, e.positionsInArray)))
                  : ((o = i[s + 1]), (e.currentItem = s + 1)));
          }),
          e.currentItem
        );
      },
      moveDirection: function() {
        var t;
        return (
          0 > this.newRelativeX
            ? ((t = 'right'), (this.playDirection = 'next'))
            : ((t = 'left'), (this.playDirection = 'prev')),
          t
        );
      },
      customEvents: function() {
        var t = this;
        t.$elem.on('owl.next', function() {
          t.next();
        }),
          t.$elem.on('owl.prev', function() {
            t.prev();
          }),
          t.$elem.on('owl.play', function(e, i) {
            (t.options.autoPlay = i), t.play(), (t.hoverStatus = 'play');
          }),
          t.$elem.on('owl.stop', function() {
            t.stop(), (t.hoverStatus = 'stop');
          }),
          t.$elem.on('owl.goTo', function(e, i) {
            t.goTo(i);
          }),
          t.$elem.on('owl.jumpTo', function(e, i) {
            t.jumpTo(i);
          });
      },
      stopOnHover: function() {
        var t = this;
        !0 === t.options.stopOnHover &&
          !0 !== t.browser.isTouch &&
          !1 !== t.options.autoPlay &&
          (t.$elem.on('mouseover', function() {
            t.stop();
          }),
          t.$elem.on('mouseout', function() {
            'stop' !== t.hoverStatus && t.play();
          }));
      },
      lazyLoad: function() {
        var e, i, n, o;
        if (!1 === this.options.lazyLoad) return !1;
        for (e = 0; e < this.itemsAmount; e += 1)
          'loaded' !== (i = t(this.$owlItems[e])).data('owl-loaded') &&
            ((n = i.data('owl-item')),
            'string' != typeof (o = i.find('.lazyOwl')).data('src')
              ? i.data('owl-loaded', 'loaded')
              : (void 0 === i.data('owl-loaded') &&
                  (o.hide(),
                  i.addClass('loading').data('owl-loaded', 'checked')),
                (!0 !== this.options.lazyFollow || n >= this.currentItem) &&
                  n < this.currentItem + this.options.items &&
                  o.length &&
                  this.lazyPreload(i, o)));
      },
      lazyPreload: function(t, i) {
        function n() {
          t.data('owl-loaded', 'loaded').removeClass('loading'),
            i.removeAttr('data-src'),
            'fade' === s.options.lazyEffect ? i.fadeIn(400) : i.show(),
            'function' == typeof s.options.afterLazyLoad &&
              s.options.afterLazyLoad.apply(this, [s.$elem]);
        }
        var o,
          s = this,
          r = 0;
        'DIV' === i.prop('tagName')
          ? (i.css('background-image', 'url(' + i.data('src') + ')'), (o = !0))
          : (i[0].src = i.data('src')),
          (function t() {
            (r += 1),
              s.completeImg(i.get(0)) || !0 === o
                ? n()
                : 100 >= r
                ? e.setTimeout(t, 100)
                : n();
          })();
      },
      autoHeight: function() {
        function i() {
          var i = t(o.$owlItems[o.currentItem]).height();
          o.wrapperOuter.css('height', i + 'px'),
            o.wrapperOuter.hasClass('autoHeight') ||
              e.setTimeout(function() {
                o.wrapperOuter.addClass('autoHeight');
              }, 0);
        }
        var n,
          o = this,
          s = t(o.$owlItems[o.currentItem]).find('img');
        void 0 !== s.get(0)
          ? ((n = 0),
            (function t() {
              (n += 1),
                o.completeImg(s.get(0))
                  ? i()
                  : 100 >= n
                  ? e.setTimeout(t, 100)
                  : o.wrapperOuter.css('height', '');
            })())
          : i();
      },
      completeImg: function(t) {
        return !(
          !t.complete ||
          (void 0 !== t.naturalWidth && 0 === t.naturalWidth)
        );
      },
      onVisibleItems: function() {
        var e;
        for (
          !0 === this.options.addClassActive &&
            this.$owlItems.removeClass('active'),
            this.visibleItems = [],
            e = this.currentItem;
          e < this.currentItem + this.options.items;
          e += 1
        )
          this.visibleItems.push(e),
            !0 === this.options.addClassActive &&
              t(this.$owlItems[e]).addClass('active');
        this.owl.visibleItems = this.visibleItems;
      },
      transitionTypes: function(t) {
        (this.outClass = 'owl-' + t + '-out'),
          (this.inClass = 'owl-' + t + '-in');
      },
      singleItemTransition: function() {
        var t = this,
          e = t.outClass,
          i = t.inClass,
          n = t.$owlItems.eq(t.currentItem),
          o = t.$owlItems.eq(t.prevItem),
          s =
            Math.abs(t.positionsInArray[t.currentItem]) +
            t.positionsInArray[t.prevItem],
          r = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2;
        (t.isTransition = !0),
          t.$owlWrapper.addClass('owl-origin').css({
            '-webkit-transform-origin': r + 'px',
            '-moz-perspective-origin': r + 'px',
            'perspective-origin': r + 'px'
          }),
          o
            .css({ position: 'relative', left: s + 'px' })
            .addClass(e)
            .on(
              'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend',
              function() {
                (t.endPrev = !0),
                  o.off(
                    'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend'
                  ),
                  t.clearTransStyle(o, e);
              }
            ),
          n
            .addClass(i)
            .on(
              'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend',
              function() {
                (t.endCurrent = !0),
                  n.off(
                    'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend'
                  ),
                  t.clearTransStyle(n, i);
              }
            );
      },
      clearTransStyle: function(t, e) {
        t.css({ position: '', left: '' }).removeClass(e),
          this.endPrev &&
            this.endCurrent &&
            (this.$owlWrapper.removeClass('owl-origin'),
            (this.isTransition = this.endCurrent = this.endPrev = !1));
      },
      owlStatus: function() {
        this.owl = {
          userOptions: this.userOptions,
          baseElement: this.$elem,
          userItems: this.$userItems,
          owlItems: this.$owlItems,
          currentItem: this.currentItem,
          prevItem: this.prevItem,
          visibleItems: this.visibleItems,
          isTouch: this.browser.isTouch,
          browser: this.browser,
          dragDirection: this.dragDirection
        };
      },
      clearEvents: function() {
        this.$elem.off('.owl owl mousedown.disableTextSelect'),
          t(i).off('.owl owl'),
          t(e).off('resize', this.resizer);
      },
      unWrap: function() {
        0 !== this.$elem.children().length &&
          (this.$owlWrapper.unwrap(),
          this.$userItems.unwrap().unwrap(),
          this.owlControls && this.owlControls.remove()),
          this.clearEvents(),
          this.$elem
            .attr('style', this.$elem.data('owl-originalStyles') || '')
            .attr('class', this.$elem.data('owl-originalClasses'));
      },
      destroy: function() {
        this.stop(),
          e.clearInterval(this.checkVisible),
          this.unWrap(),
          this.$elem.removeData();
      },
      reinit: function(e) {
        (e = t.extend({}, this.userOptions, e)),
          this.unWrap(),
          this.init(e, this.$elem);
      },
      addItem: function(t, e) {
        var i;
        return (
          !!t &&
          (0 === this.$elem.children().length
            ? (this.$elem.append(t), this.setVars(), !1)
            : (this.unWrap(),
              (i = void 0 === e || -1 === e ? -1 : e) >=
                this.$userItems.length || -1 === i
                ? this.$userItems.eq(-1).after(t)
                : this.$userItems.eq(i).before(t),
              void this.setVars()))
        );
      },
      removeItem: function(t) {
        if (0 === this.$elem.children().length) return !1;
        (t = void 0 === t || -1 === t ? -1 : t),
          this.unWrap(),
          this.$userItems.eq(t).remove(),
          this.setVars();
      }
    };
    (t.fn.owlCarousel = function(e) {
      return this.each(function() {
        if (!0 === t(this).data('owl-init')) return !1;
        t(this).data('owl-init', !0);
        var i = Object.create(n);
        i.init(e, this), t.data(this, 'owlCarousel', i);
      });
    }),
      (t.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ['prev', 'next'],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: e,
        baseClass: 'owl-carousel',
        theme: 'owl-theme',
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: 'fade',
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
      });
  })(jQuery, window, document),
  (function(t) {
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : t(jQuery);
  })(function(t) {
    t.extend(t.fn, {
      validate: function(e) {
        if (this.length) {
          var i = t.data(this[0], 'validator');
          return (
            i ||
            (this.attr('novalidate', 'novalidate'),
            (i = new t.validator(e, this[0])),
            t.data(this[0], 'validator', i),
            i.settings.onsubmit &&
              (this.on('click.validate', ':submit', function(e) {
                i.settings.submitHandler && (i.submitButton = e.target),
                  t(this).hasClass('cancel') && (i.cancelSubmit = !0),
                  void 0 !== t(this).attr('formnovalidate') &&
                    (i.cancelSubmit = !0);
              }),
              this.on('submit.validate', function(e) {
                function n() {
                  var n, o;
                  return (
                    !i.settings.submitHandler ||
                    (i.submitButton &&
                      (n = t("<input type='hidden'/>")
                        .attr('name', i.submitButton.name)
                        .val(t(i.submitButton).val())
                        .appendTo(i.currentForm)),
                    (o = i.settings.submitHandler.call(i, i.currentForm, e)),
                    i.submitButton && n.remove(),
                    void 0 !== o && o)
                  );
                }
                return (
                  i.settings.debug && e.preventDefault(),
                  i.cancelSubmit
                    ? ((i.cancelSubmit = !1), n())
                    : i.form()
                    ? i.pendingRequest
                      ? ((i.formSubmitted = !0), !1)
                      : n()
                    : (i.focusInvalid(), !1)
                );
              })),
            i)
          );
        }
        e &&
          e.debug &&
          window.console &&
          console.warn("Nothing selected, can't validate, returning nothing.");
      },
      valid: function() {
        var e, i, n;
        return (
          t(this[0]).is('form')
            ? (e = this.validate().form())
            : ((n = []),
              (e = !0),
              (i = t(this[0].form).validate()),
              this.each(function() {
                (e = i.element(this) && e), (n = n.concat(i.errorList));
              }),
              (i.errorList = n)),
          e
        );
      },
      rules: function(e, i) {
        var n,
          o,
          s,
          r,
          a,
          l,
          u = this[0];
        if (e)
          switch (
            ((n = t.data(u.form, 'validator').settings),
            (o = n.rules),
            (s = t.validator.staticRules(u)),
            e)
          ) {
            case 'add':
              t.extend(s, t.validator.normalizeRule(i)),
                delete s.messages,
                (o[u.name] = s),
                i.messages &&
                  (n.messages[u.name] = t.extend(
                    n.messages[u.name],
                    i.messages
                  ));
              break;
            case 'remove':
              return i
                ? ((l = {}),
                  t.each(i.split(/\s/), function(e, i) {
                    (l[i] = s[i]),
                      delete s[i],
                      'required' === i && t(u).removeAttr('aria-required');
                  }),
                  l)
                : (delete o[u.name], s);
          }
        return (
          (r = t.validator.normalizeRules(
            t.extend(
              {},
              t.validator.classRules(u),
              t.validator.attributeRules(u),
              t.validator.dataRules(u),
              t.validator.staticRules(u)
            ),
            u
          )).required &&
            ((a = r.required),
            delete r.required,
            (r = t.extend({ required: a }, r)),
            t(u).attr('aria-required', 'true')),
          r.remote &&
            ((a = r.remote), delete r.remote, (r = t.extend(r, { remote: a }))),
          r
        );
      }
    }),
      t.extend(t.expr[':'], {
        blank: function(e) {
          return !t.trim('' + t(e).val());
        },
        filled: function(e) {
          return !!t.trim('' + t(e).val());
        },
        unchecked: function(e) {
          return !t(e).prop('checked');
        }
      }),
      (t.validator = function(e, i) {
        (this.settings = t.extend(!0, {}, t.validator.defaults, e)),
          (this.currentForm = i),
          this.init();
      }),
      (t.validator.format = function(e, i) {
        return 1 === arguments.length
          ? function() {
              var i = t.makeArray(arguments);
              return i.unshift(e), t.validator.format.apply(this, i);
            }
          : (arguments.length > 2 &&
              i.constructor !== Array &&
              (i = t.makeArray(arguments).slice(1)),
            i.constructor !== Array && (i = [i]),
            t.each(i, function(t, i) {
              e = e.replace(new RegExp('\\{' + t + '\\}', 'g'), function() {
                return i;
              });
            }),
            e);
      }),
      t.extend(t.validator, {
        defaults: {
          messages: {},
          groups: {},
          rules: {},
          errorClass: 'error',
          validClass: 'valid',
          errorElement: 'label',
          focusCleanup: !1,
          focusInvalid: !0,
          errorContainer: t([]),
          errorLabelContainer: t([]),
          onsubmit: !0,
          ignore: ':hidden',
          ignoreTitle: !1,
          onfocusin: function(t) {
            (this.lastActive = t),
              this.settings.focusCleanup &&
                (this.settings.unhighlight &&
                  this.settings.unhighlight.call(
                    this,
                    t,
                    this.settings.errorClass,
                    this.settings.validClass
                  ),
                this.hideThese(this.errorsFor(t)));
          },
          onfocusout: function(t) {
            this.checkable(t) ||
              (!(t.name in this.submitted) && this.optional(t)) ||
              this.element(t);
          },
          onkeyup: function(e, i) {
            (9 === i.which && '' === this.elementValue(e)) ||
              -1 !==
                t.inArray(i.keyCode, [
                  16,
                  17,
                  18,
                  20,
                  35,
                  36,
                  37,
                  38,
                  39,
                  40,
                  45,
                  144,
                  225
                ]) ||
              ((e.name in this.submitted || e === this.lastElement) &&
                this.element(e));
          },
          onclick: function(t) {
            t.name in this.submitted
              ? this.element(t)
              : t.parentNode.name in this.submitted &&
                this.element(t.parentNode);
          },
          highlight: function(e, i, n) {
            'radio' === e.type
              ? this.findByName(e.name)
                  .addClass(i)
                  .removeClass(n)
              : t(e)
                  .addClass(i)
                  .removeClass(n);
          },
          unhighlight: function(e, i, n) {
            'radio' === e.type
              ? this.findByName(e.name)
                  .removeClass(i)
                  .addClass(n)
              : t(e)
                  .removeClass(i)
                  .addClass(n);
          }
        },
        setDefaults: function(e) {
          t.extend(t.validator.defaults, e);
        },
        messages: {
          required: 'This field is required.',
          remote: 'Please fix this field.',
          email: 'Please enter a valid email address.',
          url: 'Please enter a valid URL.',
          date: 'Please enter a valid date.',
          dateISO: 'Please enter a valid date ( ISO ).',
          number: 'Please enter a valid number.',
          digits: 'Please enter only digits.',
          creditcard: 'Please enter a valid credit card number.',
          equalTo: 'Please enter the same value again.',
          maxlength: t.validator.format(
            'Please enter no more than {0} characters.'
          ),
          minlength: t.validator.format(
            'Please enter at least {0} characters.'
          ),
          rangelength: t.validator.format(
            'Please enter a value between {0} and {1} characters long.'
          ),
          range: t.validator.format(
            'Please enter a value between {0} and {1}.'
          ),
          max: t.validator.format(
            'Please enter a value less than or equal to {0}.'
          ),
          min: t.validator.format(
            'Please enter a value greater than or equal to {0}.'
          )
        },
        autoCreateRanges: !1,
        prototype: {
          init: function() {
            function e(e) {
              var i = t.data(this.form, 'validator'),
                n = 'on' + e.type.replace(/^validate/, ''),
                o = i.settings;
              o[n] && !t(this).is(o.ignore) && o[n].call(i, this, e);
            }
            (this.labelContainer = t(this.settings.errorLabelContainer)),
              (this.errorContext =
                (this.labelContainer.length && this.labelContainer) ||
                t(this.currentForm)),
              (this.containers = t(this.settings.errorContainer).add(
                this.settings.errorLabelContainer
              )),
              (this.submitted = {}),
              (this.valueCache = {}),
              (this.pendingRequest = 0),
              (this.pending = {}),
              (this.invalid = {}),
              this.reset();
            var i,
              n = (this.groups = {});
            t.each(this.settings.groups, function(e, i) {
              'string' == typeof i && (i = i.split(/\s/)),
                t.each(i, function(t, i) {
                  n[i] = e;
                });
            }),
              (i = this.settings.rules),
              t.each(i, function(e, n) {
                i[e] = t.validator.normalizeRule(n);
              }),
              t(this.currentForm)
                .on(
                  'focusin.validate focusout.validate keyup.validate',
                  ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",
                  e
                )
                .on(
                  'click.validate',
                  "select, option, [type='radio'], [type='checkbox']",
                  e
                ),
              this.settings.invalidHandler &&
                t(this.currentForm).on(
                  'invalid-form.validate',
                  this.settings.invalidHandler
                ),
              t(this.currentForm)
                .find('[required], [data-rule-required], .required')
                .attr('aria-required', 'true');
          },
          form: function() {
            return (
              this.checkForm(),
              t.extend(this.submitted, this.errorMap),
              (this.invalid = t.extend({}, this.errorMap)),
              this.valid() ||
                t(this.currentForm).triggerHandler('invalid-form', [this]),
              this.showErrors(),
              this.valid()
            );
          },
          checkForm: function() {
            this.prepareForm();
            for (
              var t = 0, e = (this.currentElements = this.elements());
              e[t];
              t++
            )
              this.check(e[t]);
            return this.valid();
          },
          element: function(e) {
            var i = this.clean(e),
              n = this.validationTargetFor(i),
              o = !0;
            return (
              (this.lastElement = n),
              void 0 === n
                ? delete this.invalid[i.name]
                : (this.prepareElement(n),
                  (this.currentElements = t(n)),
                  (o = !1 !== this.check(n))
                    ? delete this.invalid[n.name]
                    : (this.invalid[n.name] = !0)),
              t(e).attr('aria-invalid', !o),
              this.numberOfInvalids() ||
                (this.toHide = this.toHide.add(this.containers)),
              this.showErrors(),
              o
            );
          },
          showErrors: function(e) {
            if (e) {
              for (var i in (t.extend(this.errorMap, e),
              (this.errorList = []),
              e))
                this.errorList.push({
                  message: e[i],
                  element: this.findByName(i)[0]
                });
              this.successList = t.grep(this.successList, function(t) {
                return !(t.name in e);
              });
            }
            this.settings.showErrors
              ? this.settings.showErrors.call(
                  this,
                  this.errorMap,
                  this.errorList
                )
              : this.defaultShowErrors();
          },
          resetForm: function() {
            t.fn.resetForm && t(this.currentForm).resetForm(),
              (this.submitted = {}),
              (this.lastElement = null),
              this.prepareForm(),
              this.hideErrors();
            var e,
              i = this.elements()
                .removeData('previousValue')
                .removeAttr('aria-invalid');
            if (this.settings.unhighlight)
              for (e = 0; i[e]; e++)
                this.settings.unhighlight.call(
                  this,
                  i[e],
                  this.settings.errorClass,
                  ''
                );
            else i.removeClass(this.settings.errorClass);
          },
          numberOfInvalids: function() {
            return this.objectLength(this.invalid);
          },
          objectLength: function(t) {
            var e,
              i = 0;
            for (e in t) i++;
            return i;
          },
          hideErrors: function() {
            this.hideThese(this.toHide);
          },
          hideThese: function(t) {
            t.not(this.containers).text(''), this.addWrapper(t).hide();
          },
          valid: function() {
            return 0 === this.size();
          },
          size: function() {
            return this.errorList.length;
          },
          focusInvalid: function() {
            if (this.settings.focusInvalid)
              try {
                t(
                  this.findLastActive() ||
                    (this.errorList.length && this.errorList[0].element) ||
                    []
                )
                  .filter(':visible')
                  .focus()
                  .trigger('focusin');
              } catch (t) {}
          },
          findLastActive: function() {
            var e = this.lastActive;
            return (
              e &&
              1 ===
                t.grep(this.errorList, function(t) {
                  return t.element.name === e.name;
                }).length &&
              e
            );
          },
          elements: function() {
            var e = this,
              i = {};
            return t(this.currentForm)
              .find('input, select, textarea')
              .not(':submit, :reset, :image, :disabled')
              .not(this.settings.ignore)
              .filter(function() {
                return (
                  !this.name &&
                    e.settings.debug &&
                    window.console &&
                    console.error('%o has no name assigned', this),
                  !(this.name in i || !e.objectLength(t(this).rules())) &&
                    ((i[this.name] = !0), !0)
                );
              });
          },
          clean: function(e) {
            return t(e)[0];
          },
          errors: function() {
            var e = this.settings.errorClass.split(' ').join('.');
            return t(this.settings.errorElement + '.' + e, this.errorContext);
          },
          reset: function() {
            (this.successList = []),
              (this.errorList = []),
              (this.errorMap = {}),
              (this.toShow = t([])),
              (this.toHide = t([])),
              (this.currentElements = t([]));
          },
          prepareForm: function() {
            this.reset(), (this.toHide = this.errors().add(this.containers));
          },
          prepareElement: function(t) {
            this.reset(), (this.toHide = this.errorsFor(t));
          },
          elementValue: function(e) {
            var i,
              n = t(e),
              o = e.type;
            return 'radio' === o || 'checkbox' === o
              ? this.findByName(e.name)
                  .filter(':checked')
                  .val()
              : 'number' === o && void 0 !== e.validity
              ? !e.validity.badInput && n.val()
              : 'string' == typeof (i = n.val())
              ? i.replace(/\r/g, '')
              : i;
          },
          check: function(e) {
            e = this.validationTargetFor(this.clean(e));
            var i,
              n,
              o,
              s = t(e).rules(),
              r = t.map(s, function(t, e) {
                return e;
              }).length,
              a = !1,
              l = this.elementValue(e);
            for (n in s) {
              o = { method: n, parameters: s[n] };
              try {
                if (
                  'dependency-mismatch' ===
                    (i = t.validator.methods[n].call(
                      this,
                      l,
                      e,
                      o.parameters
                    )) &&
                  1 === r
                ) {
                  a = !0;
                  continue;
                }
                if (((a = !1), 'pending' === i))
                  return void (this.toHide = this.toHide.not(
                    this.errorsFor(e)
                  ));
                if (!i) return this.formatAndAdd(e, o), !1;
              } catch (t) {
                throw (this.settings.debug &&
                  window.console &&
                  console.log(
                    'Exception occurred when checking element ' +
                      e.id +
                      ", check the '" +
                      o.method +
                      "' method.",
                    t
                  ),
                t instanceof TypeError &&
                  (t.message +=
                    '.  Exception occurred when checking element ' +
                    e.id +
                    ", check the '" +
                    o.method +
                    "' method."),
                t);
              }
            }
            if (!a) return this.objectLength(s) && this.successList.push(e), !0;
          },
          customDataMessage: function(e, i) {
            return (
              t(e).data(
                'msg' + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()
              ) || t(e).data('msg')
            );
          },
          customMessage: function(t, e) {
            var i = this.settings.messages[t];
            return i && (i.constructor === String ? i : i[e]);
          },
          findDefined: function() {
            for (var t = 0; t < arguments.length; t++)
              if (void 0 !== arguments[t]) return arguments[t];
          },
          defaultMessage: function(e, i) {
            return this.findDefined(
              this.customMessage(e.name, i),
              this.customDataMessage(e, i),
              (!this.settings.ignoreTitle && e.title) || void 0,
              t.validator.messages[i],
              '<strong>Warning: No message defined for ' + e.name + '</strong>'
            );
          },
          formatAndAdd: function(e, i) {
            var n = this.defaultMessage(e, i.method),
              o = /\$?\{(\d+)\}/g;
            'function' == typeof n
              ? (n = n.call(this, i.parameters, e))
              : o.test(n) &&
                (n = t.validator.format(n.replace(o, '{$1}'), i.parameters)),
              this.errorList.push({ message: n, element: e, method: i.method }),
              (this.errorMap[e.name] = n),
              (this.submitted[e.name] = n);
          },
          addWrapper: function(t) {
            return (
              this.settings.wrapper &&
                (t = t.add(t.parent(this.settings.wrapper))),
              t
            );
          },
          defaultShowErrors: function() {
            var t, e, i;
            for (t = 0; this.errorList[t]; t++)
              (i = this.errorList[t]),
                this.settings.highlight &&
                  this.settings.highlight.call(
                    this,
                    i.element,
                    this.settings.errorClass,
                    this.settings.validClass
                  ),
                this.showLabel(i.element, i.message);
            if (
              (this.errorList.length &&
                (this.toShow = this.toShow.add(this.containers)),
              this.settings.success)
            )
              for (t = 0; this.successList[t]; t++)
                this.showLabel(this.successList[t]);
            if (this.settings.unhighlight)
              for (t = 0, e = this.validElements(); e[t]; t++)
                this.settings.unhighlight.call(
                  this,
                  e[t],
                  this.settings.errorClass,
                  this.settings.validClass
                );
            (this.toHide = this.toHide.not(this.toShow)),
              this.hideErrors(),
              this.addWrapper(this.toShow).show();
          },
          validElements: function() {
            return this.currentElements.not(this.invalidElements());
          },
          invalidElements: function() {
            return t(this.errorList).map(function() {
              return this.element;
            });
          },
          showLabel: function(e, i) {
            var n,
              o,
              s,
              r = this.errorsFor(e),
              a = this.idOrName(e),
              l = t(e).attr('aria-describedby');
            r.length
              ? (r
                  .removeClass(this.settings.validClass)
                  .addClass(this.settings.errorClass),
                r.html(i))
              : ((n = r = t('<' + this.settings.errorElement + '>')
                  .attr('id', a + '-error')
                  .addClass(this.settings.errorClass)
                  .html(i || '')),
                this.settings.wrapper &&
                  (n = r
                    .hide()
                    .show()
                    .wrap('<' + this.settings.wrapper + '/>')
                    .parent()),
                this.labelContainer.length
                  ? this.labelContainer.append(n)
                  : this.settings.errorPlacement
                  ? this.settings.errorPlacement(n, t(e))
                  : n.insertAfter(e),
                r.is('label')
                  ? r.attr('for', a)
                  : 0 === r.parents("label[for='" + a + "']").length &&
                    ((s = r.attr('id').replace(/(:|\.|\[|\]|\$)/g, '\\$1')),
                    l
                      ? l.match(new RegExp('\\b' + s + '\\b')) || (l += ' ' + s)
                      : (l = s),
                    t(e).attr('aria-describedby', l),
                    (o = this.groups[e.name]) &&
                      t.each(this.groups, function(e, i) {
                        i === o &&
                          t("[name='" + e + "']", this.currentForm).attr(
                            'aria-describedby',
                            r.attr('id')
                          );
                      }))),
              !i &&
                this.settings.success &&
                (r.text(''),
                'string' == typeof this.settings.success
                  ? r.addClass(this.settings.success)
                  : this.settings.success(r, e)),
              (this.toShow = this.toShow.add(r));
          },
          errorsFor: function(e) {
            var i = this.idOrName(e),
              n = t(e).attr('aria-describedby'),
              o = "label[for='" + i + "'], label[for='" + i + "'] *";
            return (
              n && (o = o + ', #' + n.replace(/\s+/g, ', #')),
              this.errors().filter(o)
            );
          },
          idOrName: function(t) {
            return (
              this.groups[t.name] ||
              (this.checkable(t) ? t.name : t.id || t.name)
            );
          },
          validationTargetFor: function(e) {
            return (
              this.checkable(e) && (e = this.findByName(e.name)),
              t(e).not(this.settings.ignore)[0]
            );
          },
          checkable: function(t) {
            return /radio|checkbox/i.test(t.type);
          },
          findByName: function(e) {
            return t(this.currentForm).find("[name='" + e + "']");
          },
          getLength: function(e, i) {
            switch (i.nodeName.toLowerCase()) {
              case 'select':
                return t('option:selected', i).length;
              case 'input':
                if (this.checkable(i))
                  return this.findByName(i.name).filter(':checked').length;
            }
            return e.length;
          },
          depend: function(t, e) {
            return (
              !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
            );
          },
          dependTypes: {
            boolean: function(t) {
              return t;
            },
            string: function(e, i) {
              return !!t(e, i.form).length;
            },
            function: function(t, e) {
              return t(e);
            }
          },
          optional: function(e) {
            var i = this.elementValue(e);
            return (
              !t.validator.methods.required.call(this, i, e) &&
              'dependency-mismatch'
            );
          },
          startRequest: function(t) {
            this.pending[t.name] ||
              (this.pendingRequest++, (this.pending[t.name] = !0));
          },
          stopRequest: function(e, i) {
            this.pendingRequest--,
              this.pendingRequest < 0 && (this.pendingRequest = 0),
              delete this.pending[e.name],
              i &&
              0 === this.pendingRequest &&
              this.formSubmitted &&
              this.form()
                ? (t(this.currentForm).submit(), (this.formSubmitted = !1))
                : !i &&
                  0 === this.pendingRequest &&
                  this.formSubmitted &&
                  (t(this.currentForm).triggerHandler('invalid-form', [this]),
                  (this.formSubmitted = !1));
          },
          previousValue: function(e) {
            return (
              t.data(e, 'previousValue') ||
              t.data(e, 'previousValue', {
                old: null,
                valid: !0,
                message: this.defaultMessage(e, 'remote')
              })
            );
          },
          destroy: function() {
            this.resetForm(),
              t(this.currentForm)
                .off('.validate')
                .removeData('validator');
          }
        },
        classRuleSettings: {
          required: { required: !0 },
          email: { email: !0 },
          url: { url: !0 },
          date: { date: !0 },
          dateISO: { dateISO: !0 },
          number: { number: !0 },
          digits: { digits: !0 },
          creditcard: { creditcard: !0 }
        },
        addClassRules: function(e, i) {
          e.constructor === String
            ? (this.classRuleSettings[e] = i)
            : t.extend(this.classRuleSettings, e);
        },
        classRules: function(e) {
          var i = {},
            n = t(e).attr('class');
          return (
            n &&
              t.each(n.split(' '), function() {
                this in t.validator.classRuleSettings &&
                  t.extend(i, t.validator.classRuleSettings[this]);
              }),
            i
          );
        },
        normalizeAttributeRule: function(t, e, i, n) {
          /min|max/.test(i) &&
            (null === e || /number|range|text/.test(e)) &&
            ((n = Number(n)), isNaN(n) && (n = void 0)),
            n || 0 === n ? (t[i] = n) : e === i && 'range' !== e && (t[i] = !0);
        },
        attributeRules: function(e) {
          var i,
            n,
            o = {},
            s = t(e),
            r = e.getAttribute('type');
          for (i in t.validator.methods)
            'required' === i
              ? ('' === (n = e.getAttribute(i)) && (n = !0), (n = !!n))
              : (n = s.attr(i)),
              this.normalizeAttributeRule(o, r, i, n);
          return (
            o.maxlength &&
              /-1|2147483647|524288/.test(o.maxlength) &&
              delete o.maxlength,
            o
          );
        },
        dataRules: function(e) {
          var i,
            n,
            o = {},
            s = t(e),
            r = e.getAttribute('type');
          for (i in t.validator.methods)
            (n = s.data(
              'rule' + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()
            )),
              this.normalizeAttributeRule(o, r, i, n);
          return o;
        },
        staticRules: function(e) {
          var i = {},
            n = t.data(e.form, 'validator');
          return (
            n.settings.rules &&
              (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}),
            i
          );
        },
        normalizeRules: function(e, i) {
          return (
            t.each(e, function(n, o) {
              if (!1 !== o) {
                if (o.param || o.depends) {
                  var s = !0;
                  switch (typeof o.depends) {
                    case 'string':
                      s = !!t(o.depends, i.form).length;
                      break;
                    case 'function':
                      s = o.depends.call(i, i);
                  }
                  s ? (e[n] = void 0 === o.param || o.param) : delete e[n];
                }
              } else delete e[n];
            }),
            t.each(e, function(n, o) {
              e[n] = t.isFunction(o) ? o(i) : o;
            }),
            t.each(['minlength', 'maxlength'], function() {
              e[this] && (e[this] = Number(e[this]));
            }),
            t.each(['rangelength', 'range'], function() {
              var i;
              e[this] &&
                (t.isArray(e[this])
                  ? (e[this] = [Number(e[this][0]), Number(e[this][1])])
                  : 'string' == typeof e[this] &&
                    ((i = e[this].replace(/[\[\]]/g, '').split(/[\s,]+/)),
                    (e[this] = [Number(i[0]), Number(i[1])])));
            }),
            t.validator.autoCreateRanges &&
              (null != e.min &&
                null != e.max &&
                ((e.range = [e.min, e.max]), delete e.min, delete e.max),
              null != e.minlength &&
                null != e.maxlength &&
                ((e.rangelength = [e.minlength, e.maxlength]),
                delete e.minlength,
                delete e.maxlength)),
            e
          );
        },
        normalizeRule: function(e) {
          if ('string' == typeof e) {
            var i = {};
            t.each(e.split(/\s/), function() {
              i[this] = !0;
            }),
              (e = i);
          }
          return e;
        },
        addMethod: function(e, i, n) {
          (t.validator.methods[e] = i),
            (t.validator.messages[e] =
              void 0 !== n ? n : t.validator.messages[e]),
            i.length < 3 &&
              t.validator.addClassRules(e, t.validator.normalizeRule(e));
        },
        methods: {
          required: function(e, i, n) {
            if (!this.depend(n, i)) return 'dependency-mismatch';
            if ('select' === i.nodeName.toLowerCase()) {
              var o = t(i).val();
              return o && o.length > 0;
            }
            return this.checkable(i) ? this.getLength(e, i) > 0 : e.length > 0;
          },
          email: function(t, e) {
            return (
              this.optional(e) ||
              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                t
              )
            );
          },
          url: function(t, e) {
            return (
              this.optional(e) ||
              /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(
                t
              )
            );
          },
          date: function(t, e) {
            return (
              this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            );
          },
          dateISO: function(t, e) {
            return (
              this.optional(e) ||
              /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
                t
              )
            );
          },
          number: function(t, e) {
            return (
              this.optional(e) ||
              /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            );
          },
          digits: function(t, e) {
            return this.optional(e) || /^\d+$/.test(t);
          },
          creditcard: function(t, e) {
            if (this.optional(e)) return 'dependency-mismatch';
            if (/[^0-9 \-]+/.test(t)) return !1;
            var i,
              n,
              o = 0,
              s = 0,
              r = !1;
            if ((t = t.replace(/\D/g, '')).length < 13 || t.length > 19)
              return !1;
            for (i = t.length - 1; i >= 0; i--)
              (n = t.charAt(i)),
                (s = parseInt(n, 10)),
                r && (s *= 2) > 9 && (s -= 9),
                (o += s),
                (r = !r);
            return o % 10 == 0;
          },
          minlength: function(e, i, n) {
            var o = t.isArray(e) ? e.length : this.getLength(e, i);
            return this.optional(i) || o >= n;
          },
          maxlength: function(e, i, n) {
            var o = t.isArray(e) ? e.length : this.getLength(e, i);
            return this.optional(i) || n >= o;
          },
          rangelength: function(e, i, n) {
            var o = t.isArray(e) ? e.length : this.getLength(e, i);
            return this.optional(i) || (o >= n[0] && o <= n[1]);
          },
          min: function(t, e, i) {
            return this.optional(e) || t >= i;
          },
          max: function(t, e, i) {
            return this.optional(e) || i >= t;
          },
          range: function(t, e, i) {
            return this.optional(e) || (t >= i[0] && t <= i[1]);
          },
          equalTo: function(e, i, n) {
            var o = t(n);
            return (
              this.settings.onfocusout &&
                o
                  .off('.validate-equalTo')
                  .on('blur.validate-equalTo', function() {
                    t(i).valid();
                  }),
              e === o.val()
            );
          },
          remote: function(e, i, n) {
            if (this.optional(i)) return 'dependency-mismatch';
            var o,
              s,
              r = this.previousValue(i);
            return (
              this.settings.messages[i.name] ||
                (this.settings.messages[i.name] = {}),
              (r.originalMessage = this.settings.messages[i.name].remote),
              (this.settings.messages[i.name].remote = r.message),
              (n = ('string' == typeof n && { url: n }) || n),
              r.old === e
                ? r.valid
                : ((r.old = e),
                  (o = this),
                  this.startRequest(i),
                  ((s = {})[i.name] = e),
                  t.ajax(
                    t.extend(
                      !0,
                      {
                        mode: 'abort',
                        port: 'validate' + i.name,
                        dataType: 'json',
                        data: s,
                        context: o.currentForm,
                        success: function(n) {
                          var s,
                            a,
                            l,
                            u = !0 === n || 'true' === n;
                          (o.settings.messages[i.name].remote =
                            r.originalMessage),
                            u
                              ? ((l = o.formSubmitted),
                                o.prepareElement(i),
                                (o.formSubmitted = l),
                                o.successList.push(i),
                                delete o.invalid[i.name],
                                o.showErrors())
                              : ((s = {}),
                                (a = n || o.defaultMessage(i, 'remote')),
                                (s[i.name] = r.message = t.isFunction(a)
                                  ? a(e)
                                  : a),
                                (o.invalid[i.name] = !0),
                                o.showErrors(s)),
                            (r.valid = u),
                            o.stopRequest(i, u);
                        }
                      },
                      n
                    )
                  ),
                  'pending')
            );
          }
        }
      });
    var e,
      i = {};
    t.ajaxPrefilter
      ? t.ajaxPrefilter(function(t, e, n) {
          var o = t.port;
          'abort' === t.mode && (i[o] && i[o].abort(), (i[o] = n));
        })
      : ((e = t.ajax),
        (t.ajax = function(n) {
          var o = ('mode' in n ? n : t.ajaxSettings).mode,
            s = ('port' in n ? n : t.ajaxSettings).port;
          return 'abort' === o
            ? (i[s] && i[s].abort(), (i[s] = e.apply(this, arguments)), i[s])
            : e.apply(this, arguments);
        }));
  }),
  (function() {
    'use strict';
    function t(n) {
      if (!n) throw new Error('No options passed to Waypoint constructor');
      if (!n.element)
        throw new Error('No element option passed to Waypoint constructor');
      if (!n.handler)
        throw new Error('No handler option passed to Waypoint constructor');
      (this.key = 'waypoint-' + e),
        (this.options = t.Adapter.extend({}, t.defaults, n)),
        (this.element = this.options.element),
        (this.adapter = new t.Adapter(this.element)),
        (this.callback = n.handler),
        (this.axis = this.options.horizontal ? 'horizontal' : 'vertical'),
        (this.enabled = this.options.enabled),
        (this.triggerPoint = null),
        (this.group = t.Group.findOrCreate({
          name: this.options.group,
          axis: this.axis
        })),
        (this.context = t.Context.findOrCreateByElement(this.options.context)),
        t.offsetAliases[this.options.offset] &&
          (this.options.offset = t.offsetAliases[this.options.offset]),
        this.group.add(this),
        this.context.add(this),
        (i[this.key] = this),
        (e += 1);
    }
    var e = 0,
      i = {};
    (t.prototype.queueTrigger = function(t) {
      this.group.queueTrigger(this, t);
    }),
      (t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t);
      }),
      (t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key];
      }),
      (t.prototype.disable = function() {
        return (this.enabled = !1), this;
      }),
      (t.prototype.enable = function() {
        return this.context.refresh(), (this.enabled = !0), this;
      }),
      (t.prototype.next = function() {
        return this.group.next(this);
      }),
      (t.prototype.previous = function() {
        return this.group.previous(this);
      }),
      (t.invokeAll = function(t) {
        var e = [];
        for (var n in i) e.push(i[n]);
        for (var o = 0, s = e.length; s > o; o++) e[o][t]();
      }),
      (t.destroyAll = function() {
        t.invokeAll('destroy');
      }),
      (t.disableAll = function() {
        t.invokeAll('disable');
      }),
      (t.enableAll = function() {
        t.invokeAll('enable');
      }),
      (t.refreshAll = function() {
        t.Context.refreshAll();
      }),
      (t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight;
      }),
      (t.viewportWidth = function() {
        return document.documentElement.clientWidth;
      }),
      (t.adapters = []),
      (t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: 'default',
        horizontal: !1,
        offset: 0
      }),
      (t.offsetAliases = {
        'bottom-in-view': function() {
          return this.context.innerHeight() - this.adapter.outerHeight();
        },
        'right-in-view': function() {
          return this.context.innerWidth() - this.adapter.outerWidth();
        }
      }),
      (window.Waypoint = t);
  })(),
  (function() {
    'use strict';
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = o.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = 'waypoint-context-' + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop()
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (n[t.waypointContextKey] = this),
        (i += 1),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      n = {},
      o = window.Waypoint,
      s = window.onload;
    (e.prototype.add = function(t) {
      var e = t.options.horizontal ? 'horizontal' : 'vertical';
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off('.waypoints'), delete n[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function() {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on('resize.waypoints', function() {
          e.didResize || ((e.didResize = !0), o.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function() {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on('scroll.waypoints', function() {
          (!e.didScroll || o.isTouch) &&
            ((e.didScroll = !0), o.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function() {
        o.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function() {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: 'right',
              backward: 'left'
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: 'down',
              backward: 'up'
            }
          };
        for (var i in e) {
          var n = e[i],
            o = n.newScroll > n.oldScroll ? n.forward : n.backward;
          for (var s in this.waypoints[i]) {
            var r = this.waypoints[i][s],
              a = n.oldScroll < r.triggerPoint,
              l = n.newScroll >= r.triggerPoint;
            ((a && l) || (!a && !l)) &&
              (r.queueTrigger(o), (t[r.group.id] = r.group));
          }
        }
        for (var u in t) t[u].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function() {
        return this.element == this.element.window
          ? o.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function() {
        return this.element == this.element.window
          ? o.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var n = 0, o = t.length; o > n; n++) t[n].destroy();
      }),
      (e.prototype.refresh = function() {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          n = {};
        for (var s in (this.handleScroll(),
        (t = {
          horizontal: {
            contextOffset: e ? 0 : i.left,
            contextScroll: e ? 0 : this.oldScroll.x,
            contextDimension: this.innerWidth(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left'
          },
          vertical: {
            contextOffset: e ? 0 : i.top,
            contextScroll: e ? 0 : this.oldScroll.y,
            contextDimension: this.innerHeight(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top'
          }
        }))) {
          var r = t[s];
          for (var a in this.waypoints[s]) {
            var l,
              u,
              h,
              c,
              d = this.waypoints[s][a],
              p = d.options.offset,
              m = d.triggerPoint,
              f = 0,
              g = null == m;
            d.element !== d.element.window &&
              (f = d.adapter.offset()[r.offsetProp]),
              'function' == typeof p
                ? (p = p.apply(d))
                : 'string' == typeof p &&
                  ((p = parseFloat(p)),
                  d.options.offset.indexOf('%') > -1 &&
                    (p = Math.ceil((r.contextDimension * p) / 100))),
              (l = r.contextScroll - r.contextOffset),
              (d.triggerPoint = f + l - p),
              (u = m < r.oldScroll),
              (h = d.triggerPoint >= r.oldScroll),
              (c = !u && !h),
              !g && u && h
                ? (d.queueTrigger(r.backward), (n[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(r.forward), (n[d.group.id] = d.group))
                : g &&
                  r.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(r.forward), (n[d.group.id] = d.group));
          }
        }
        return (
          o.requestAnimationFrame(function() {
            for (var t in n) n[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function() {
        for (var t in n) n[t].refresh();
      }),
      (e.findByElement = function(t) {
        return n[t.waypointContextKey];
      }),
      (window.onload = function() {
        s && s(), e.refreshAll();
      }),
      (o.requestAnimationFrame = function(e) {
        (
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t
        ).call(window, e);
      }),
      (o.Context = e);
  })(),
  (function() {
    'use strict';
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + '-' + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (n[this.axis][this.name] = this);
    }
    var n = { vertical: {}, horizontal: {} },
      o = window.Waypoint;
    (i.prototype.add = function(t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
          var n = this.triggerQueues[i],
            o = 'up' === i || 'left' === i;
          n.sort(o ? e : t);
          for (var s = 0, r = n.length; r > s; s += 1) {
            var a = n[s];
            (a.options.continuous || s === n.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = o.Adapter.inArray(e, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = o.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function(t) {
        var e = o.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function() {
        return this.waypoints[0];
      }),
      (i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function(t) {
        return n[t.axis][t.name] || new i(t);
      }),
      (o.Group = i);
  })(),
  (function() {
    'use strict';
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        'innerHeight',
        'innerWidth',
        'off',
        'offset',
        'on',
        'outerHeight',
        'outerWidth',
        'scrollLeft',
        'scrollTop'
      ],
      function(e, i) {
        t.prototype[i] = function() {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(['extend', 'inArray', 'isEmptyObject'], function(i, n) {
        t[n] = e[n];
      }),
      i.adapters.push({ name: 'jquery', Adapter: t }),
      (i.Adapter = t);
  })(),
  (function() {
    'use strict';
    function t(t) {
      return function() {
        var i = [],
          n = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((n = t.extend({}, arguments[1])).handler = arguments[0]),
          this.each(function() {
            var o = t.extend({}, n, { element: this });
            'string' == typeof o.context &&
              (o.context = t(this).closest(o.context)[0]),
              i.push(new e(o));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })(),
  (function(t) {
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : t(
          'object' == typeof exports
            ? require('jquery')
            : window.jQuery || window.Zepto
        );
  })(function(t) {
    var e,
      i,
      n,
      o,
      s,
      r,
      a = 'Close',
      l = 'BeforeClose',
      u = 'MarkupParse',
      h = 'Open',
      c = 'Change',
      d = 'mfp',
      p = '.' + d,
      m = 'mfp-ready',
      f = 'mfp-removing',
      g = 'mfp-prevent-close',
      v = function() {},
      y = !!window.jQuery,
      w = t(window),
      b = function(t, i) {
        e.ev.on(d + t + p, i);
      },
      x = function(e, i, n, o) {
        var s = document.createElement('div');
        return (
          (s.className = 'mfp-' + e),
          n && (s.innerHTML = n),
          o ? i && i.appendChild(s) : ((s = t(s)), i && s.appendTo(i)),
          s
        );
      },
      I = function(i, n) {
        e.ev.triggerHandler(d + i, n),
          e.st.callbacks &&
            ((i = i.charAt(0).toLowerCase() + i.slice(1)),
            e.st.callbacks[i] &&
              e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]));
      },
      C = function(i) {
        return (
          (i === r && e.currTemplate.closeBtn) ||
            ((e.currTemplate.closeBtn = t(
              e.st.closeMarkup.replace('%title%', e.st.tClose)
            )),
            (r = i)),
          e.currTemplate.closeBtn
        );
      },
      E = function() {
        t.magnificPopup.instance ||
          ((e = new v()).init(), (t.magnificPopup.instance = e));
      };
    (v.prototype = {
      constructor: v,
      init: function() {
        var i = navigator.appVersion;
        (e.isIE7 = -1 !== i.indexOf('MSIE 7.')),
          (e.isIE8 = -1 !== i.indexOf('MSIE 8.')),
          (e.isLowIE = e.isIE7 || e.isIE8),
          (e.isAndroid = /android/gi.test(i)),
          (e.isIOS = /iphone|ipad|ipod/gi.test(i)),
          (e.supportsTransition = (function() {
            var t = document.createElement('p').style,
              e = ['ms', 'O', 'Moz', 'Webkit'];
            if (void 0 !== t.transition) return !0;
            for (; e.length; ) if (e.pop() + 'Transition' in t) return !0;
            return !1;
          })()),
          (e.probablyMobile =
            e.isAndroid ||
            e.isIOS ||
            /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
              navigator.userAgent
            )),
          (n = t(document)),
          (e.popupsCache = {});
      },
      open: function(i) {
        var o;
        if (!1 === i.isObj) {
          (e.items = i.items.toArray()), (e.index = 0);
          var r,
            a = i.items;
          for (o = 0; o < a.length; o++)
            if (((r = a[o]).parsed && (r = r.el[0]), r === i.el[0])) {
              e.index = o;
              break;
            }
        } else
          (e.items = t.isArray(i.items) ? i.items : [i.items]),
            (e.index = i.index || 0);
        if (!e.isOpen) {
          (e.types = []),
            (s = ''),
            i.mainEl && i.mainEl.length ? (e.ev = i.mainEl.eq(0)) : (e.ev = n),
            i.key
              ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}),
                (e.currTemplate = e.popupsCache[i.key]))
              : (e.currTemplate = {}),
            (e.st = t.extend(!0, {}, t.magnificPopup.defaults, i)),
            (e.fixedContentPos =
              'auto' === e.st.fixedContentPos
                ? !e.probablyMobile
                : e.st.fixedContentPos),
            e.st.modal &&
              ((e.st.closeOnContentClick = !1),
              (e.st.closeOnBgClick = !1),
              (e.st.showCloseBtn = !1),
              (e.st.enableEscapeKey = !1)),
            e.bgOverlay ||
              ((e.bgOverlay = x('bg').on('click' + p, function() {
                e.close();
              })),
              (e.wrap = x('wrap')
                .attr('tabindex', -1)
                .on('click' + p, function(t) {
                  e._checkIfClose(t.target) && e.close();
                })),
              (e.container = x('container', e.wrap))),
            (e.contentContainer = x('content')),
            e.st.preloader &&
              (e.preloader = x('preloader', e.container, e.st.tLoading));
          var l = t.magnificPopup.modules;
          for (o = 0; o < l.length; o++) {
            var c = l[o];
            (c = c.charAt(0).toUpperCase() + c.slice(1)), e['init' + c].call(e);
          }
          I('BeforeOpen'),
            e.st.showCloseBtn &&
              (e.st.closeBtnInside
                ? (b(u, function(t, e, i, n) {
                    i.close_replaceWith = C(n.type);
                  }),
                  (s += ' mfp-close-btn-in'))
                : e.wrap.append(C())),
            e.st.alignTop && (s += ' mfp-align-top'),
            e.fixedContentPos
              ? e.wrap.css({
                  overflow: e.st.overflowY,
                  overflowX: 'hidden',
                  overflowY: e.st.overflowY
                })
              : e.wrap.css({ top: w.scrollTop(), position: 'absolute' }),
            (!1 === e.st.fixedBgPos ||
              ('auto' === e.st.fixedBgPos && !e.fixedContentPos)) &&
              e.bgOverlay.css({ height: n.height(), position: 'absolute' }),
            e.st.enableEscapeKey &&
              n.on('keyup' + p, function(t) {
                27 === t.keyCode && e.close();
              }),
            w.on('resize' + p, function() {
              e.updateSize();
            }),
            e.st.closeOnContentClick || (s += ' mfp-auto-cursor'),
            s && e.wrap.addClass(s);
          var d = (e.wH = w.height()),
            f = {};
          if (e.fixedContentPos && e._hasScrollBar(d)) {
            var g = e._getScrollbarSize();
            g && (f.marginRight = g);
          }
          e.fixedContentPos &&
            (e.isIE7
              ? t('body, html').css('overflow', 'hidden')
              : (f.overflow = 'hidden'));
          var v = e.st.mainClass;
          return (
            e.isIE7 && (v += ' mfp-ie7'),
            v && e._addClassToMFP(v),
            e.updateItemHTML(),
            I('BuildControls'),
            t('html').css(f),
            e.bgOverlay
              .add(e.wrap)
              .prependTo(e.st.prependTo || t(document.body)),
            (e._lastFocusedEl = document.activeElement),
            setTimeout(function() {
              e.content
                ? (e._addClassToMFP(m), e._setFocus())
                : e.bgOverlay.addClass(m),
                n.on('focusin' + p, e._onFocusIn);
            }, 16),
            (e.isOpen = !0),
            e.updateSize(d),
            I(h),
            i
          );
        }
        e.updateItemHTML();
      },
      close: function() {
        e.isOpen &&
          (I(l),
          (e.isOpen = !1),
          e.st.removalDelay && !e.isLowIE && e.supportsTransition
            ? (e._addClassToMFP(f),
              setTimeout(function() {
                e._close();
              }, e.st.removalDelay))
            : e._close());
      },
      _close: function() {
        I(a);
        var i = f + ' ' + m + ' ';
        if (
          (e.bgOverlay.detach(),
          e.wrap.detach(),
          e.container.empty(),
          e.st.mainClass && (i += e.st.mainClass + ' '),
          e._removeClassFromMFP(i),
          e.fixedContentPos)
        ) {
          var o = { marginRight: '' };
          e.isIE7 ? t('body, html').css('overflow', '') : (o.overflow = ''),
            t('html').css(o);
        }
        n.off('keyup.mfp focusin' + p),
          e.ev.off(p),
          e.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
          e.bgOverlay.attr('class', 'mfp-bg'),
          e.container.attr('class', 'mfp-container'),
          !e.st.showCloseBtn ||
            (e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type]) ||
            (e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach()),
          e._lastFocusedEl && t(e._lastFocusedEl).focus(),
          (e.currItem = null),
          (e.content = null),
          (e.currTemplate = null),
          (e.prevHeight = 0),
          I('AfterClose');
      },
      updateSize: function(t) {
        if (e.isIOS) {
          var i = document.documentElement.clientWidth / window.innerWidth,
            n = window.innerHeight * i;
          e.wrap.css('height', n), (e.wH = n);
        } else e.wH = t || w.height();
        e.fixedContentPos || e.wrap.css('height', e.wH), I('Resize');
      },
      updateItemHTML: function() {
        var i = e.items[e.index];
        e.contentContainer.detach(),
          e.content && e.content.detach(),
          i.parsed || (i = e.parseEl(e.index));
        var n = i.type;
        if (
          (I('BeforeChange', [e.currItem ? e.currItem.type : '', n]),
          (e.currItem = i),
          !e.currTemplate[n])
        ) {
          var s = !!e.st[n] && e.st[n].markup;
          I('FirstMarkupParse', s), (e.currTemplate[n] = !s || t(s));
        }
        o && o !== i.type && e.container.removeClass('mfp-' + o + '-holder');
        var r = e['get' + n.charAt(0).toUpperCase() + n.slice(1)](
          i,
          e.currTemplate[n]
        );
        e.appendContent(r, n),
          (i.preloaded = !0),
          I(c, i),
          (o = i.type),
          e.container.prepend(e.contentContainer),
          I('AfterChange');
      },
      appendContent: function(t, i) {
        (e.content = t),
          t
            ? e.st.showCloseBtn &&
              e.st.closeBtnInside &&
              !0 === e.currTemplate[i]
              ? e.content.find('.mfp-close').length || e.content.append(C())
              : (e.content = t)
            : (e.content = ''),
          I('BeforeAppend'),
          e.container.addClass('mfp-' + i + '-holder'),
          e.contentContainer.append(e.content);
      },
      parseEl: function(i) {
        var n,
          o = e.items[i];
        if (
          (o.tagName
            ? (o = { el: t(o) })
            : ((n = o.type), (o = { data: o, src: o.src })),
          o.el)
        ) {
          for (var s = e.types, r = 0; r < s.length; r++)
            if (o.el.hasClass('mfp-' + s[r])) {
              n = s[r];
              break;
            }
          (o.src = o.el.attr('data-mfp-src')),
            o.src || (o.src = o.el.attr('href'));
        }
        return (
          (o.type = n || e.st.type || 'inline'),
          (o.index = i),
          (o.parsed = !0),
          (e.items[i] = o),
          I('ElementParse', o),
          e.items[i]
        );
      },
      addGroup: function(t, i) {
        var n = function(n) {
          (n.mfpEl = this), e._openClick(n, t, i);
        };
        i || (i = {});
        var o = 'click.magnificPopup';
        (i.mainEl = t),
          i.items
            ? ((i.isObj = !0), t.off(o).on(o, n))
            : ((i.isObj = !1),
              i.delegate
                ? t.off(o).on(o, i.delegate, n)
                : ((i.items = t), t.off(o).on(o, n)));
      },
      _openClick: function(i, n, o) {
        if (
          (void 0 !== o.midClick
            ? o.midClick
            : t.magnificPopup.defaults.midClick) ||
          !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)
        ) {
          var s =
            void 0 !== o.disableOn
              ? o.disableOn
              : t.magnificPopup.defaults.disableOn;
          if (s)
            if (t.isFunction(s)) {
              if (!s.call(e)) return !0;
            } else if (w.width() < s) return !0;
          i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()),
            (o.el = t(i.mfpEl)),
            o.delegate && (o.items = n.find(o.delegate)),
            e.open(o);
        }
      },
      updateStatus: function(t, n) {
        if (e.preloader) {
          i !== t && e.container.removeClass('mfp-s-' + i),
            n || 'loading' !== t || (n = e.st.tLoading);
          var o = { status: t, text: n };
          I('UpdateStatus', o),
            (t = o.status),
            (n = o.text),
            e.preloader.html(n),
            e.preloader.find('a').on('click', function(t) {
              t.stopImmediatePropagation();
            }),
            e.container.addClass('mfp-s-' + t),
            (i = t);
        }
      },
      _checkIfClose: function(i) {
        if (!t(i).hasClass(g)) {
          var n = e.st.closeOnContentClick,
            o = e.st.closeOnBgClick;
          if (n && o) return !0;
          if (
            !e.content ||
            t(i).hasClass('mfp-close') ||
            (e.preloader && i === e.preloader[0])
          )
            return !0;
          if (i === e.content[0] || t.contains(e.content[0], i)) {
            if (n) return !0;
          } else if (o && t.contains(document, i)) return !0;
          return !1;
        }
      },
      _addClassToMFP: function(t) {
        e.bgOverlay.addClass(t), e.wrap.addClass(t);
      },
      _removeClassFromMFP: function(t) {
        this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
      },
      _hasScrollBar: function(t) {
        return (
          (e.isIE7 ? n.height() : document.body.scrollHeight) >
          (t || w.height())
        );
      },
      _setFocus: function() {
        (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
      },
      _onFocusIn: function(i) {
        return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target)
          ? void 0
          : (e._setFocus(), !1);
      },
      _parseMarkup: function(e, i, n) {
        var o;
        n.data && (i = t.extend(n.data, i)),
          I(u, [e, i, n]),
          t.each(i, function(t, i) {
            if (void 0 === i || !1 === i) return !0;
            if ((o = t.split('_')).length > 1) {
              var n = e.find(p + '-' + o[0]);
              if (n.length > 0) {
                var s = o[1];
                'replaceWith' === s
                  ? n[0] !== i[0] && n.replaceWith(i)
                  : 'img' === s
                  ? n.is('img')
                    ? n.attr('src', i)
                    : n.replaceWith(
                        '<img src="' +
                          i +
                          '" class="' +
                          n.attr('class') +
                          '" />'
                      )
                  : n.attr(o[1], i);
              }
            } else e.find(p + '-' + t).html(i);
          });
      },
      _getScrollbarSize: function() {
        if (void 0 === e.scrollbarSize) {
          var t = document.createElement('div');
          (t.style.cssText =
            'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
            document.body.appendChild(t),
            (e.scrollbarSize = t.offsetWidth - t.clientWidth),
            document.body.removeChild(t);
        }
        return e.scrollbarSize;
      }
    }),
      (t.magnificPopup = {
        instance: null,
        proto: v.prototype,
        modules: [],
        open: function(e, i) {
          return (
            E(),
            ((e = e ? t.extend(!0, {}, e) : {}).isObj = !0),
            (e.index = i || 0),
            this.instance.open(e)
          );
        },
        close: function() {
          return t.magnificPopup.instance && t.magnificPopup.instance.close();
        },
        registerModule: function(e, i) {
          i.options && (t.magnificPopup.defaults[e] = i.options),
            t.extend(this.proto, i.proto),
            this.modules.push(e);
        },
        defaults: {
          disableOn: 0,
          key: null,
          midClick: !1,
          mainClass: '',
          preloader: !0,
          focus: '',
          closeOnContentClick: !1,
          closeOnBgClick: !0,
          closeBtnInside: !0,
          showCloseBtn: !0,
          enableEscapeKey: !0,
          modal: !1,
          alignTop: !1,
          removalDelay: 0,
          prependTo: null,
          fixedContentPos: 'auto',
          fixedBgPos: 'auto',
          overflowY: 'auto',
          closeMarkup:
            '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
          tClose: 'Close (Esc)',
          tLoading: 'Loading...'
        }
      }),
      (t.fn.magnificPopup = function(i) {
        E();
        var n = t(this);
        if ('string' == typeof i)
          if ('open' === i) {
            var o,
              s = y ? n.data('magnificPopup') : n[0].magnificPopup,
              r = parseInt(arguments[1], 10) || 0;
            s.items
              ? (o = s.items[r])
              : ((o = n),
                s.delegate && (o = o.find(s.delegate)),
                (o = o.eq(r))),
              e._openClick({ mfpEl: o }, n, s);
          } else
            e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else
          (i = t.extend(!0, {}, i)),
            y ? n.data('magnificPopup', i) : (n[0].magnificPopup = i),
            e.addGroup(n, i);
        return n;
      });
    var S,
      T,
      k,
      z = 'inline',
      A = function() {
        k && (T.after(k.addClass(S)).detach(), (k = null));
      };
    t.magnificPopup.registerModule(z, {
      options: {
        hiddenClass: 'hide',
        markup: '',
        tNotFound: 'Content not found'
      },
      proto: {
        initInline: function() {
          e.types.push(z),
            b(a + '.' + z, function() {
              A();
            });
        },
        getInline: function(i, n) {
          if ((A(), i.src)) {
            var o = e.st.inline,
              s = t(i.src);
            if (s.length) {
              var r = s[0].parentNode;
              r &&
                r.tagName &&
                (T || ((S = o.hiddenClass), (T = x(S)), (S = 'mfp-' + S)),
                (k = s
                  .after(T)
                  .detach()
                  .removeClass(S))),
                e.updateStatus('ready');
            } else e.updateStatus('error', o.tNotFound), (s = t('<div>'));
            return (i.inlineElement = s), s;
          }
          return e.updateStatus('ready'), e._parseMarkup(n, {}, i), n;
        }
      }
    });
    var P,
      _ = 'ajax',
      L = function() {
        P && t(document.body).removeClass(P);
      },
      O = function() {
        L(), e.req && e.req.abort();
      };
    t.magnificPopup.registerModule(_, {
      options: {
        settings: null,
        cursor: 'mfp-ajax-cur',
        tError: '<a href="%url%">The content</a> could not be loaded.'
      },
      proto: {
        initAjax: function() {
          e.types.push(_),
            (P = e.st.ajax.cursor),
            b(a + '.' + _, O),
            b('BeforeChange.' + _, O);
        },
        getAjax: function(i) {
          P && t(document.body).addClass(P), e.updateStatus('loading');
          var n = t.extend(
            {
              url: i.src,
              success: function(n, o, s) {
                var r = { data: n, xhr: s };
                I('ParseAjax', r),
                  e.appendContent(t(r.data), _),
                  (i.finished = !0),
                  L(),
                  e._setFocus(),
                  setTimeout(function() {
                    e.wrap.addClass(m);
                  }, 16),
                  e.updateStatus('ready'),
                  I('AjaxContentAdded');
              },
              error: function() {
                L(),
                  (i.finished = i.loadError = !0),
                  e.updateStatus(
                    'error',
                    e.st.ajax.tError.replace('%url%', i.src)
                  );
              }
            },
            e.st.ajax.settings
          );
          return (e.req = t.ajax(n)), '';
        }
      }
    });
    var W,
      M = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = e.st.image.titleSrc;
        if (n) {
          if (t.isFunction(n)) return n.call(e, i);
          if (i.el) return i.el.attr(n) || '';
        }
        return '';
      };
    t.magnificPopup.registerModule('image', {
      options: {
        markup:
          '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
        cursor: 'mfp-zoom-out-cur',
        titleSrc: 'title',
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.'
      },
      proto: {
        initImage: function() {
          var i = e.st.image,
            n = '.image';
          e.types.push('image'),
            b(h + n, function() {
              'image' === e.currItem.type &&
                i.cursor &&
                t(document.body).addClass(i.cursor);
            }),
            b(a + n, function() {
              i.cursor && t(document.body).removeClass(i.cursor),
                w.off('resize' + p);
            }),
            b('Resize' + n, e.resizeImage),
            e.isLowIE && b('AfterChange', e.resizeImage);
        },
        resizeImage: function() {
          var t = e.currItem;
          if (t && t.img && e.st.image.verticalFit) {
            var i = 0;
            e.isLowIE &&
              (i =
                parseInt(t.img.css('padding-top'), 10) +
                parseInt(t.img.css('padding-bottom'), 10)),
              t.img.css('max-height', e.wH - i);
          }
        },
        _onImageHasSize: function(t) {
          t.img &&
            ((t.hasSize = !0),
            W && clearInterval(W),
            (t.isCheckingImgSize = !1),
            I('ImageHasSize', t),
            t.imgHidden &&
              (e.content && e.content.removeClass('mfp-loading'),
              (t.imgHidden = !1)));
        },
        findImageSize: function(t) {
          var i = 0,
            n = t.img[0],
            o = function(s) {
              W && clearInterval(W),
                (W = setInterval(function() {
                  return n.naturalWidth > 0
                    ? void e._onImageHasSize(t)
                    : (i > 200 && clearInterval(W),
                      void (3 === ++i
                        ? o(10)
                        : 40 === i
                        ? o(50)
                        : 100 === i && o(500)));
                }, s));
            };
          o(1);
        },
        getImage: function(i, n) {
          var o = 0,
            s = function() {
              i &&
                (i.img[0].complete
                  ? (i.img.off('.mfploader'),
                    i === e.currItem &&
                      (e._onImageHasSize(i), e.updateStatus('ready')),
                    (i.hasSize = !0),
                    (i.loaded = !0),
                    I('ImageLoadComplete'))
                  : 200 > ++o
                  ? setTimeout(s, 100)
                  : r());
            },
            r = function() {
              i &&
                (i.img.off('.mfploader'),
                i === e.currItem &&
                  (e._onImageHasSize(i),
                  e.updateStatus('error', a.tError.replace('%url%', i.src))),
                (i.hasSize = !0),
                (i.loaded = !0),
                (i.loadError = !0));
            },
            a = e.st.image,
            l = n.find('.mfp-img');
          if (l.length) {
            var u = document.createElement('img');
            (u.className = 'mfp-img'),
              i.el &&
                i.el.find('img').length &&
                (u.alt = i.el.find('img').attr('alt')),
              (i.img = t(u)
                .on('load.mfploader', s)
                .on('error.mfploader', r)),
              (u.src = i.src),
              l.is('img') && (i.img = i.img.clone()),
              (u = i.img[0]).naturalWidth > 0
                ? (i.hasSize = !0)
                : u.width || (i.hasSize = !1);
          }
          return (
            e._parseMarkup(n, { title: M(i), img_replaceWith: i.img }, i),
            e.resizeImage(),
            i.hasSize
              ? (W && clearInterval(W),
                i.loadError
                  ? (n.addClass('mfp-loading'),
                    e.updateStatus('error', a.tError.replace('%url%', i.src)))
                  : (n.removeClass('mfp-loading'), e.updateStatus('ready')),
                n)
              : (e.updateStatus('loading'),
                (i.loading = !0),
                i.hasSize ||
                  ((i.imgHidden = !0),
                  n.addClass('mfp-loading'),
                  e.findImageSize(i)),
                n)
          );
        }
      }
    });
    var R;
    t.magnificPopup.registerModule('zoom', {
      options: {
        enabled: !1,
        easing: 'ease-in-out',
        duration: 300,
        opener: function(t) {
          return t.is('img') ? t : t.find('img');
        }
      },
      proto: {
        initZoom: function() {
          var t,
            i = e.st.zoom,
            n = '.zoom';
          if (i.enabled && e.supportsTransition) {
            var o,
              s,
              r = i.duration,
              u = function(t) {
                var e = t
                    .clone()
                    .removeAttr('style')
                    .removeAttr('class')
                    .addClass('mfp-animated-image'),
                  n = 'all ' + i.duration / 1e3 + 's ' + i.easing,
                  o = {
                    position: 'fixed',
                    zIndex: 9999,
                    left: 0,
                    top: 0,
                    '-webkit-backface-visibility': 'hidden'
                  },
                  s = 'transition';
                return (
                  (o['-webkit-' + s] = o['-moz-' + s] = o['-o-' + s] = o[
                    s
                  ] = n),
                  e.css(o),
                  e
                );
              },
              h = function() {
                e.content.css('visibility', 'visible');
              };
            b('BuildControls' + n, function() {
              if (e._allowZoom()) {
                if (
                  (clearTimeout(o),
                  e.content.css('visibility', 'hidden'),
                  !(t = e._getItemToZoom()))
                )
                  return void h();
                (s = u(t)).css(e._getOffset()),
                  e.wrap.append(s),
                  (o = setTimeout(function() {
                    s.css(e._getOffset(!0)),
                      (o = setTimeout(function() {
                        h(),
                          setTimeout(function() {
                            s.remove(), (t = s = null), I('ZoomAnimationEnded');
                          }, 16);
                      }, r));
                  }, 16));
              }
            }),
              b(l + n, function() {
                if (e._allowZoom()) {
                  if ((clearTimeout(o), (e.st.removalDelay = r), !t)) {
                    if (!(t = e._getItemToZoom())) return;
                    s = u(t);
                  }
                  s.css(e._getOffset(!0)),
                    e.wrap.append(s),
                    e.content.css('visibility', 'hidden'),
                    setTimeout(function() {
                      s.css(e._getOffset());
                    }, 16);
                }
              }),
              b(a + n, function() {
                e._allowZoom() && (h(), s && s.remove(), (t = null));
              });
          }
        },
        _allowZoom: function() {
          return 'image' === e.currItem.type;
        },
        _getItemToZoom: function() {
          return !!e.currItem.hasSize && e.currItem.img;
        },
        _getOffset: function(i) {
          var n,
            o = (n = i
              ? e.currItem.img
              : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
            s = parseInt(n.css('padding-top'), 10),
            r = parseInt(n.css('padding-bottom'), 10);
          o.top -= t(window).scrollTop() - s;
          var a = {
            width: n.width(),
            height: (y ? n.innerHeight() : n[0].offsetHeight) - r - s
          };
          return (
            void 0 === R &&
              (R = void 0 !== document.createElement('p').style.MozTransform),
            R
              ? (a['-moz-transform'] = a.transform =
                  'translate(' + o.left + 'px,' + o.top + 'px)')
              : ((a.left = o.left), (a.top = o.top)),
            a
          );
        }
      }
    });
    var j = 'iframe',
      $ = function(t) {
        if (e.currTemplate[j]) {
          var i = e.currTemplate[j].find('iframe');
          i.length &&
            (t || (i[0].src = '//about:blank'),
            e.isIE8 && i.css('display', t ? 'block' : 'none'));
        }
      };
    t.magnificPopup.registerModule(j, {
      options: {
        markup:
          '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
        srcAction: 'iframe_src',
        patterns: {
          youtube: {
            index: 'youtube.com',
            id: 'v=',
            src: '//www.youtube.com/embed/%id%?autoplay=1'
          },
          vimeo: {
            index: 'vimeo.com/',
            id: '/',
            src: '//player.vimeo.com/video/%id%?autoplay=1'
          },
          gmaps: { index: '//maps.google.', src: '%id%&output=embed' }
        }
      },
      proto: {
        initIframe: function() {
          e.types.push(j),
            b('BeforeChange', function(t, e, i) {
              e !== i && (e === j ? $() : i === j && $(!0));
            }),
            b(a + '.' + j, function() {
              $();
            });
        },
        getIframe: function(i, n) {
          var o = i.src,
            s = e.st.iframe;
          t.each(s.patterns, function() {
            return o.indexOf(this.index) > -1
              ? (this.id &&
                  (o =
                    'string' == typeof this.id
                      ? o.substr(
                          o.lastIndexOf(this.id) + this.id.length,
                          o.length
                        )
                      : this.id.call(this, o)),
                (o = this.src.replace('%id%', o)),
                !1)
              : void 0;
          });
          var r = {};
          return (
            s.srcAction && (r[s.srcAction] = o),
            e._parseMarkup(n, r, i),
            e.updateStatus('ready'),
            n
          );
        }
      }
    });
    var F = function(t) {
        var i = e.items.length;
        return t > i - 1 ? t - i : 0 > t ? i + t : t;
      },
      q = function(t, e, i) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
      };
    t.magnificPopup.registerModule('gallery', {
      options: {
        enabled: !1,
        arrowMarkup:
          '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
        preload: [0, 2],
        navigateByImgClick: !0,
        arrows: !0,
        tPrev: 'Previous (Left arrow key)',
        tNext: 'Next (Right arrow key)',
        tCounter: '%curr% of %total%'
      },
      proto: {
        initGallery: function() {
          var i = e.st.gallery,
            o = '.mfp-gallery',
            r = Boolean(t.fn.mfpFastClick);
          return (
            (e.direction = !0),
            !(!i || !i.enabled) &&
              ((s += ' mfp-gallery'),
              b(h + o, function() {
                i.navigateByImgClick &&
                  e.wrap.on('click' + o, '.mfp-img', function() {
                    return e.items.length > 1 ? (e.next(), !1) : void 0;
                  }),
                  n.on('keydown' + o, function(t) {
                    37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next();
                  });
              }),
              b('UpdateStatus' + o, function(t, i) {
                i.text &&
                  (i.text = q(i.text, e.currItem.index, e.items.length));
              }),
              b(u + o, function(t, n, o, s) {
                var r = e.items.length;
                o.counter = r > 1 ? q(i.tCounter, s.index, r) : '';
              }),
              b('BuildControls' + o, function() {
                if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                  var n = i.arrowMarkup,
                    o = (e.arrowLeft = t(
                      n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, 'left')
                    ).addClass(g)),
                    s = (e.arrowRight = t(
                      n
                        .replace(/%title%/gi, i.tNext)
                        .replace(/%dir%/gi, 'right')
                    ).addClass(g)),
                    a = r ? 'mfpFastClick' : 'click';
                  o[a](function() {
                    e.prev();
                  }),
                    s[a](function() {
                      e.next();
                    }),
                    e.isIE7 &&
                      (x('b', o[0], !1, !0),
                      x('a', o[0], !1, !0),
                      x('b', s[0], !1, !0),
                      x('a', s[0], !1, !0)),
                    e.container.append(o.add(s));
                }
              }),
              b(c + o, function() {
                e._preloadTimeout && clearTimeout(e._preloadTimeout),
                  (e._preloadTimeout = setTimeout(function() {
                    e.preloadNearbyImages(), (e._preloadTimeout = null);
                  }, 16));
              }),
              void b(a + o, function() {
                n.off(o),
                  e.wrap.off('click' + o),
                  e.arrowLeft &&
                    r &&
                    e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(),
                  (e.arrowRight = e.arrowLeft = null);
              }))
          );
        },
        next: function() {
          (e.direction = !0), (e.index = F(e.index + 1)), e.updateItemHTML();
        },
        prev: function() {
          (e.direction = !1), (e.index = F(e.index - 1)), e.updateItemHTML();
        },
        goTo: function(t) {
          (e.direction = t >= e.index), (e.index = t), e.updateItemHTML();
        },
        preloadNearbyImages: function() {
          var t,
            i = e.st.gallery.preload,
            n = Math.min(i[0], e.items.length),
            o = Math.min(i[1], e.items.length);
          for (t = 1; t <= (e.direction ? o : n); t++)
            e._preloadItem(e.index + t);
          for (t = 1; t <= (e.direction ? n : o); t++)
            e._preloadItem(e.index - t);
        },
        _preloadItem: function(i) {
          if (((i = F(i)), !e.items[i].preloaded)) {
            var n = e.items[i];
            n.parsed || (n = e.parseEl(i)),
              I('LazyLoad', n),
              'image' === n.type &&
                (n.img = t('<img class="mfp-img" />')
                  .on('load.mfploader', function() {
                    n.hasSize = !0;
                  })
                  .on('error.mfploader', function() {
                    (n.hasSize = !0), (n.loadError = !0), I('LazyLoadError', n);
                  })
                  .attr('src', n.src)),
              (n.preloaded = !0);
          }
        }
      }
    });
    var N = 'retina';
    t.magnificPopup.registerModule(N, {
      options: {
        replaceSrc: function(t) {
          return t.src.replace(/\.\w+$/, function(t) {
            return '@2x' + t;
          });
        },
        ratio: 1
      },
      proto: {
        initRetina: function() {
          if (window.devicePixelRatio > 1) {
            var t = e.st.retina,
              i = t.ratio;
            (i = isNaN(i) ? i() : i) > 1 &&
              (b('ImageHasSize.' + N, function(t, e) {
                e.img.css({
                  'max-width': e.img[0].naturalWidth / i,
                  width: '100%'
                });
              }),
              b('ElementParse.' + N, function(e, n) {
                n.src = t.replaceSrc(n, i);
              }));
          }
        }
      }
    }),
      (function() {
        var e = 'ontouchstart' in window,
          i = function() {
            w.off('touchmove' + n + ' touchend' + n);
          },
          n = '.mfpFastClick';
        (t.fn.mfpFastClick = function(o) {
          return t(this).each(function() {
            var s,
              r,
              a,
              l,
              u,
              h,
              c,
              d = t(this);
            e &&
              d.on('touchstart' + n, function(t) {
                (u = !1),
                  (c = 1),
                  (h = t.originalEvent
                    ? t.originalEvent.touches[0]
                    : t.touches[0]),
                  (a = h.clientX),
                  (l = h.clientY),
                  w
                    .on('touchmove' + n, function(t) {
                      (h = t.originalEvent
                        ? t.originalEvent.touches
                        : t.touches),
                        (c = h.length),
                        (h = h[0]),
                        (Math.abs(h.clientX - a) > 10 ||
                          Math.abs(h.clientY - l) > 10) &&
                          ((u = !0), i());
                    })
                    .on('touchend' + n, function(t) {
                      i(),
                        u ||
                          c > 1 ||
                          ((s = !0),
                          t.preventDefault(),
                          clearTimeout(r),
                          (r = setTimeout(function() {
                            s = !1;
                          }, 1e3)),
                          o());
                    });
              });
            d.on('click' + n, function() {
              s || o();
            });
          });
        }),
          (t.fn.destroyMfpFastClick = function() {
            t(this).off('touchstart' + n + ' click' + n),
              e && w.off('touchmove' + n + ' touchend' + n);
          });
      })(),
      E();
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('jquery-bridget/jquery-bridget', ['jquery'], function(i) {
          e(t, i);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('jquery')))
      : (t.jQueryBridget = e(t, t.jQuery));
  })(window, function(t, e) {
    'use strict';
    function i(i, s, a) {
      (a = a || e || t.jQuery) &&
        (s.prototype.option ||
          (s.prototype.option = function(t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function(t) {
          return 'string' == typeof t
            ? (function(t, e, n) {
                var o,
                  s = '$().' + i + '("' + e + '")';
                return (
                  t.each(function(t, l) {
                    var u = a.data(l, i);
                    if (u) {
                      var h = u[e];
                      if (h && '_' != e.charAt(0)) {
                        var c = h.apply(u, n);
                        o = void 0 === o ? c : o;
                      } else r(s + ' is not a valid method');
                    } else r(i + ' not initialized. Cannot call methods, i.e. ' + s);
                  }),
                  void 0 !== o ? o : t
                );
              })(this, t, o.call(arguments, 1))
            : ((function(t, e) {
                t.each(function(t, n) {
                  var o = a.data(n, i);
                  o
                    ? (o.option(e), o._init())
                    : ((o = new s(n, e)), a.data(n, i, o));
                });
              })(this, t),
              this);
        }),
        n(a));
    }
    function n(t) {
      !t || (t && t.bridget) || (t.bridget = i);
    }
    var o = Array.prototype.slice,
      s = t.console,
      r =
        void 0 === s
          ? function() {}
          : function(t) {
              s.error(t);
            };
    return n(e || t.jQuery), i;
  }),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define('ev-emitter/ev-emitter', e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })(this, function() {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function(t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function(t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || [])[e] = !0), this;
        }
      }),
      (e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var s = this._onceEvents && this._onceEvents[t]; o; ) {
            var r = s && s[o];
            r && (this.off(t, o), delete s[o]),
              o.apply(this, e),
              (o = i[(n += r ? 0 : 1)]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('get-size/get-size', [], function() {
          return e();
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function() {
    'use strict';
    function t(t) {
      var e = parseFloat(t);
      return -1 == t.indexOf('%') && !isNaN(e) && e;
    }
    function e(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          s(
            'Style returned ' +
              e +
              '. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'
          ),
        e
      );
    }
    function i() {
      if (!l) {
        l = !0;
        var i = document.createElement('div');
        (i.style.width = '200px'),
          (i.style.padding = '1px 2px 3px 4px'),
          (i.style.borderStyle = 'solid'),
          (i.style.borderWidth = '1px 2px 3px 4px'),
          (i.style.boxSizing = 'border-box');
        var s = document.body || document.documentElement;
        s.appendChild(i);
        var r = e(i);
        (n.isBoxSizeOuter = o = 200 == t(r.width)), s.removeChild(i);
      }
    }
    function n(n) {
      if (
        (i(),
        'string' == typeof n && (n = document.querySelector(n)),
        n && 'object' == typeof n && n.nodeType)
      ) {
        var s = e(n);
        if ('none' == s.display)
          return (function() {
            for (
              var t = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0
                },
                e = 0;
              a > e;
              e++
            )
              t[r[e]] = 0;
            return t;
          })();
        var l = {};
        (l.width = n.offsetWidth), (l.height = n.offsetHeight);
        for (
          var u = (l.isBorderBox = 'border-box' == s.boxSizing), h = 0;
          a > h;
          h++
        ) {
          var c = r[h],
            d = s[c],
            p = parseFloat(d);
          l[c] = isNaN(p) ? 0 : p;
        }
        var m = l.paddingLeft + l.paddingRight,
          f = l.paddingTop + l.paddingBottom,
          g = l.marginLeft + l.marginRight,
          v = l.marginTop + l.marginBottom,
          y = l.borderLeftWidth + l.borderRightWidth,
          w = l.borderTopWidth + l.borderBottomWidth,
          b = u && o,
          x = t(s.width);
        !1 !== x && (l.width = x + (b ? 0 : m + y));
        var I = t(s.height);
        return (
          !1 !== I && (l.height = I + (b ? 0 : f + w)),
          (l.innerWidth = l.width - (m + y)),
          (l.innerHeight = l.height - (f + w)),
          (l.outerWidth = l.width + g),
          (l.outerHeight = l.height + v),
          l
        );
      }
    }
    var o,
      s =
        'undefined' == typeof console
          ? function() {}
          : function(t) {
              console.error(t);
            },
      r = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth'
      ],
      a = r.length,
      l = !1;
    return n;
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('matches-selector/matches-selector', e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function() {
    'use strict';
    var t = (function() {
      var t = Element.prototype;
      if (t.matches) return 'matches';
      if (t.matchesSelector) return 'matchesSelector';
      for (var e = ['webkit', 'moz', 'ms', 'o'], i = 0; i < e.length; i++) {
        var n = e[i] + 'MatchesSelector';
        if (t[n]) return n;
      }
    })();
    return function(e, i) {
      return e[t](i);
    };
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('fizzy-ui-utils/utils', [
          'matches-selector/matches-selector'
        ], function(i) {
          return e(t, i);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('desandro-matches-selector')))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function(t, e) {
    var i = {
        extend: function(t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        modulo: function(t, e) {
          return ((t % e) + e) % e;
        },
        makeArray: function(t) {
          var e = [];
          if (Array.isArray(t)) e = t;
          else if (t && 'number' == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
          else e.push(t);
          return e;
        },
        removeFrom: function(t, e) {
          var i = t.indexOf(e);
          -1 != i && t.splice(i, 1);
        },
        getParent: function(t, i) {
          for (; t != document.body; )
            if (((t = t.parentNode), e(t, i))) return t;
        },
        getQueryElement: function(t) {
          return 'string' == typeof t ? document.querySelector(t) : t;
        },
        handleEvent: function(t) {
          var e = 'on' + t.type;
          this[e] && this[e](t);
        },
        filterFindElements: function(t, n) {
          t = i.makeArray(t);
          var o = [];
          return (
            t.forEach(function(t) {
              if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++)
                  o.push(i[s]);
              }
            }),
            o
          );
        },
        debounceMethod: function(t, e, i) {
          var n = t.prototype[e],
            o = e + 'Timeout';
          t.prototype[e] = function() {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments,
              s = this;
            this[o] = setTimeout(function() {
              n.apply(s, e), delete s[o];
            }, i || 100);
          };
        },
        docReady: function(t) {
          'complete' == document.readyState
            ? t()
            : document.addEventListener('DOMContentLoaded', t);
        },
        toDashed: function(t) {
          return t
            .replace(/(.)([A-Z])/g, function(t, e, i) {
              return e + '-' + i;
            })
            .toLowerCase();
        }
      },
      n = t.console;
    return (
      (i.htmlInit = function(e, o) {
        i.docReady(function() {
          var s = i.toDashed(o),
            r = 'data-' + s,
            a = document.querySelectorAll('[' + r + ']'),
            l = document.querySelectorAll('.js-' + s),
            u = i.makeArray(a).concat(i.makeArray(l)),
            h = r + '-options',
            c = t.jQuery;
          u.forEach(function(t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(h);
            try {
              i = s && JSON.parse(s);
            } catch (e) {
              return void (
                n &&
                n.error('Error parsing ' + r + ' on ' + t.className + ': ' + e)
              );
            }
            var a = new e(t, i);
            c && c.data(t, o, a);
          });
        });
      }),
      i
    );
  }),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define('outlayer/item', [
          'ev-emitter/ev-emitter',
          'get-size/get-size'
        ], function(i, n) {
          return e(t, i, n);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('ev-emitter'), require('get-size')))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t, t.EvEmitter, t.getSize)));
  })(window, function(t, e, i) {
    'use strict';
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    var o = document.documentElement.style,
      s = 'string' == typeof o.transition ? 'transition' : 'WebkitTransition',
      r = 'string' == typeof o.transform ? 'transform' : 'WebkitTransform',
      a = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend'
      }[s],
      l = [r, s, s + 'Duration', s + 'Property'],
      u = (n.prototype = Object.create(e.prototype));
    (u.constructor = n),
      (u._create = function() {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: 'absolute' });
      }),
      (u.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (u.getSize = function() {
        this.size = i(this.element);
      }),
      (u.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
          e[l[i] || i] = t[i];
        }
      }),
      (u.getPosition = function() {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption('originLeft'),
          i = this.layout._getOption('originTop'),
          n = t[e ? 'left' : 'right'],
          o = t[i ? 'top' : 'bottom'],
          s = this.layout.size,
          r =
            -1 != n.indexOf('%')
              ? (parseFloat(n) / 100) * s.width
              : parseInt(n, 10),
          a =
            -1 != o.indexOf('%')
              ? (parseFloat(o) / 100) * s.height
              : parseInt(o, 10);
        (r = isNaN(r) ? 0 : r),
          (a = isNaN(a) ? 0 : a),
          (r -= e ? s.paddingLeft : s.paddingRight),
          (a -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = r),
          (this.position.y = a);
      }),
      (u.layoutPosition = function() {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption('originLeft'),
          n = this.layout._getOption('originTop'),
          o = i ? 'paddingLeft' : 'paddingRight',
          s = i ? 'left' : 'right',
          r = i ? 'right' : 'left',
          a = this.position.x + t[o];
        (e[s] = this.getXValue(a)), (e[r] = '');
        var l = n ? 'paddingTop' : 'paddingBottom',
          u = n ? 'top' : 'bottom',
          h = n ? 'bottom' : 'top',
          c = this.position.y + t[l];
        (e[u] = this.getYValue(c)),
          (e[h] = ''),
          this.css(e),
          this.emitEvent('layout', [this]);
      }),
      (u.getXValue = function(t) {
        var e = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + '%'
          : t + 'px';
      }),
      (u.getYValue = function(t) {
        var e = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + '%'
          : t + 'px';
      }),
      (u._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = parseInt(t, 10),
          s = parseInt(e, 10),
          r = o === this.position.x && s === this.position.y;
        if ((this.setPosition(t, e), !r || this.isTransitioning)) {
          var a = t - i,
            l = e - n,
            u = {};
          (u.transform = this.getTranslate(a, l)),
            this.transition({
              to: u,
              onTransitionEnd: { transform: this.layoutPosition },
              isCleaning: !0
            });
        } else this.layoutPosition();
      }),
      (u.getTranslate = function(t, e) {
        return (
          'translate3d(' +
          (t = this.layout._getOption('originLeft') ? t : -t) +
          'px, ' +
          (e = this.layout._getOption('originTop') ? e : -e) +
          'px, 0)'
        );
      }),
      (u.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (u.moveTo = u._transitionTo),
      (u.setPosition = function(t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (u._nonTransition = function(t) {
        for (var e in (this.css(t.to),
        t.isCleaning && this._removeStyles(t.to),
        t.onTransitionEnd))
          t.onTransitionEnd[e].call(this);
      }),
      (u._transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
          var e = this._transn;
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
          for (i in t.to)
            (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
          if (t.from) {
            this.css(t.from);
            this.element.offsetHeight;
            null;
          }
          this.enableTransition(t.to),
            this.css(t.to),
            (this.isTransitioning = !0);
        } else this._nonTransition(t);
      });
    var h =
      'opacity,' +
      (function(t) {
        return t.replace(/([A-Z])/g, function(t) {
          return '-' + t.toLowerCase();
        });
      })(l.transform || 'transform');
    (u.enableTransition = function() {
      this.isTransitioning ||
        (this.css({
          transitionProperty: h,
          transitionDuration: this.layout.options.transitionDuration
        }),
        this.element.addEventListener(a, this, !1));
    }),
      (u.transition = n.prototype[s ? '_transition' : '_nonTransition']),
      (u.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t);
      }),
      (u.onotransitionend = function(t) {
        this.ontransitionend(t);
      });
    var c = { '-webkit-transform': 'transform' };
    (u.ontransitionend = function(t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = c[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          (function(t) {
            for (var e in t) return !1;
            return !0;
          })(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ''), delete e.clean[i]),
          i in e.onEnd)
        )
          e.onEnd[i].call(this), delete e.onEnd[i];
        this.emitEvent('transitionEnd', [this]);
      }
    }),
      (u.disableTransition = function() {
        this.removeTransitionStyles(),
          this.element.removeEventListener(a, this, !1),
          (this.isTransitioning = !1);
      }),
      (u._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = '';
        this.css(e);
      });
    var d = { transitionProperty: '', transitionDuration: '' };
    return (
      (u.removeTransitionStyles = function() {
        this.css(d);
      }),
      (u.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: '' }),
          this.emitEvent('remove', [this]);
      }),
      (u.remove = function() {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once('transitionEnd', function() {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (u.reveal = function() {
        delete this.isHidden, this.css({ display: '' });
        var t = this.layout.options,
          e = {};
        (e[
          this.getHideRevealTransitionEndProperty('visibleStyle')
        ] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
          });
      }),
      (u.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent('reveal');
      }),
      (u.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return 'opacity';
        for (var i in e) return i;
      }),
      (u.hide = function() {
        (this.isHidden = !0), this.css({ display: '' });
        var t = this.layout.options,
          e = {};
        (e[
          this.getHideRevealTransitionEndProperty('hiddenStyle')
        ] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
          });
      }),
      (u.onHideTransitionEnd = function() {
        this.isHidden &&
          (this.css({ display: 'none' }), this.emitEvent('hide'));
      }),
      (u.destroy = function() {
        this.css({
          position: '',
          left: '',
          right: '',
          top: '',
          bottom: '',
          transition: '',
          transform: ''
        });
      }),
      n
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('outlayer/outlayer', [
          'ev-emitter/ev-emitter',
          'get-size/get-size',
          'fizzy-ui-utils/utils',
          './item'
        ], function(i, n, o, s) {
          return e(t, i, n, o, s);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(
          t,
          require('ev-emitter'),
          require('get-size'),
          require('fizzy-ui-utils'),
          require('./item')
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function(t, e, i, n, o) {
    'use strict';
    function s(t, e) {
      var i = n.getQueryElement(t);
      if (i) {
        (this.element = i),
          l && (this.$element = l(this.element)),
          (this.options = n.extend({}, this.constructor.defaults)),
          this.option(e);
        var o = ++h;
        (this.element.outlayerGUID = o),
          (c[o] = this),
          this._create(),
          this._getOption('initLayout') && this.layout();
      } else a && a.error('Bad element for ' + this.constructor.namespace + ': ' + (i || t));
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    var a = t.console,
      l = t.jQuery,
      u = function() {},
      h = 0,
      c = {};
    (s.namespace = 'outlayer'),
      (s.Item = o),
      (s.defaults = {
        containerStyle: { position: 'relative' },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
        visibleStyle: { opacity: 1, transform: 'scale(1)' }
      });
    var d = s.prototype;
    return (
      n.extend(d, e.prototype),
      (d.option = function(t) {
        n.extend(this.options, t);
      }),
      (d._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer'
      }),
      (d._create = function() {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle),
          this._getOption('resize') && this.bindResize();
      }),
      (d.reloadItems = function() {
        this.items = this._itemize(this.element.children);
      }),
      (d._itemize = function(t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var s = new i(e[o], this);
          n.push(s);
        }
        return n;
      }),
      (d._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (d.getItemElements = function() {
        return this.items.map(function(t) {
          return t.element;
        });
      }),
      (d.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption('layoutInstant'),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (d._init = d.layout),
      (d._resetLayout = function() {
        this.getSize();
      }),
      (d.getSize = function() {
        this.size = i(this.element);
      }),
      (d._getMeasurement = function(t, e) {
        var n,
          o = this.options[t];
        o
          ? ('string' == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (d.layoutItems = function(t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (d._getItemsForLayout = function(t) {
        return t.filter(function(t) {
          return !t.isIgnored;
        });
      }),
      (d._layoutItems = function(t, e) {
        if ((this._emitCompleteOnItems('layout', t), t && t.length)) {
          var i = [];
          t.forEach(function(t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (d._getItemLayoutPosition = function() {
        return { x: 0, y: 0 };
      }),
      (d._processLayoutQueue = function(t) {
        t.forEach(function(t) {
          this._positionItem(t.item, t.x, t.y, t.isInstant);
        }, this);
      }),
      (d._positionItem = function(t, e, i, n) {
        n ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (d._postLayout = function() {
        this.resizeContainer();
      }),
      (d.resizeContainer = function() {
        if (this._getOption('resizeContainer')) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (d._getContainerSize = u),
      (d._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? 'width' : 'height'] = t + 'px');
        }
      }),
      (d._emitCompleteOnItems = function(t, e) {
        function i() {
          o.dispatchEvent(t + 'Complete', null, [e]);
        }
        function n() {
          ++r == s && i();
        }
        var o = this,
          s = e.length;
        if (e && s) {
          var r = 0;
          e.forEach(function(e) {
            e.once(t, n);
          });
        } else i();
      }),
      (d.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), l))
          if (((this.$element = this.$element || l(this.element)), e)) {
            var o = l.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (d.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (d.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (d.stamp = function(t) {
        (t = this._find(t)) &&
          ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
      }),
      (d.unstamp = function(t) {
        (t = this._find(t)) &&
          t.forEach(function(t) {
            n.removeFrom(this.stamps, t), this.unignore(t);
          }, this);
      }),
      (d._find = function(t) {
        return t
          ? ('string' == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (d._manageStamps = function() {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (d._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        };
      }),
      (d._manageStamp = u),
      (d._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t);
        return {
          left: e.left - n.left - o.marginLeft,
          top: e.top - n.top - o.marginTop,
          right: n.right - e.right - o.marginRight,
          bottom: n.bottom - e.bottom - o.marginBottom
        };
      }),
      (d.handleEvent = n.handleEvent),
      (d.bindResize = function() {
        t.addEventListener('resize', this), (this.isResizeBound = !0);
      }),
      (d.unbindResize = function() {
        t.removeEventListener('resize', this), (this.isResizeBound = !1);
      }),
      (d.onresize = function() {
        this.resize();
      }),
      n.debounceMethod(s, 'onresize', 100),
      (d.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (d.needsResizeLayout = function() {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth;
      }),
      (d.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (d.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (d.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (d.reveal = function(t) {
        this._emitCompleteOnItems('reveal', t),
          t &&
            t.length &&
            t.forEach(function(t) {
              t.reveal();
            });
      }),
      (d.hide = function(t) {
        this._emitCompleteOnItems('hide', t),
          t &&
            t.length &&
            t.forEach(function(t) {
              t.hide();
            });
      }),
      (d.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (d.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (d.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (d.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (d.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems('remove', e),
          e &&
            e.length &&
            e.forEach(function(t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (d.destroy = function() {
        var t = this.element.style;
        (t.height = ''),
          (t.position = ''),
          (t.width = ''),
          this.items.forEach(function(t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          l && l.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function(t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
        return e && c[e];
      }),
      (s.create = function(t, e) {
        var i = r(s);
        return (
          (i.defaults = n.extend({}, s.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(o)),
          n.htmlInit(i, t),
          l && l.bridget && l.bridget(t, i),
          i
        );
      }),
      (s.Item = o),
      s
    );
  }),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define(['outlayer/outlayer', 'get-size/get-size'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('outlayer'), require('get-size')))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function(t, e) {
    var i = t.create('masonry');
    return (
      (i.compatOptions.fitWidth = 'isFitWidth'),
      (i.prototype._resetLayout = function() {
        this.getSize(),
          this._getMeasurement('columnWidth', 'outerWidth'),
          this._getMeasurement('gutter', 'outerWidth'),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
      }),
      (i.prototype.measureColumns = function() {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          s = o / n,
          r = n - (o % n);
        (s = Math[r && 1 > r ? 'round' : 'floor'](s)),
          (this.cols = Math.max(s, 1));
      }),
      (i.prototype.getContainerWidth = function() {
        var t = this._getOption('fitWidth')
            ? this.element.parentNode
            : this.element,
          i = e(t);
        this.containerWidth = i && i.innerWidth;
      }),
      (i.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = Math[e && 1 > e ? 'round' : 'ceil'](
            t.size.outerWidth / this.columnWidth
          );
        i = Math.min(i, this.cols);
        for (
          var n = this._getColGroup(i),
            o = Math.min.apply(Math, n),
            s = n.indexOf(o),
            r = { x: this.columnWidth * s, y: o },
            a = o + t.size.outerHeight,
            l = this.cols + 1 - n.length,
            u = 0;
          l > u;
          u++
        )
          this.colYs[s + u] = a;
        return r;
      }),
      (i.prototype._getColGroup = function(t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
          var o = this.colYs.slice(n, n + t);
          e[n] = Math.max.apply(Math, o);
        }
        return e;
      }),
      (i.prototype._manageStamp = function(t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption('originLeft') ? n.left : n.right,
          s = o + i.outerWidth,
          r = Math.floor(o / this.columnWidth);
        r = Math.max(0, r);
        var a = Math.floor(s / this.columnWidth);
        (a -= s % this.columnWidth ? 0 : 1), (a = Math.min(this.cols - 1, a));
        for (
          var l =
              (this._getOption('originTop') ? n.top : n.bottom) + i.outerHeight,
            u = r;
          a >= u;
          u++
        )
          this.colYs[u] = Math.max(l, this.colYs[u]);
      }),
      (i.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption('fitWidth') &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (i.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (i.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  function() {
    'use strict';
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function() {
        return this[t].apply(this, arguments);
      };
    }
    var n = t.prototype,
      o = this,
      s = o.EventEmitter;
    (n.getListeners = function(t) {
      var e,
        i,
        n = this._getEvents();
      if ('object' == typeof t)
        for (i in ((e = {}), n))
          n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]);
      else e = n[t] || (n[t] = []);
      return e;
    }),
      (n.flattenListeners = function(t) {
        var e,
          i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i;
      }),
      (n.getListenersAsObject = function(t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {})[t] = i), e || i;
      }),
      (n.addListener = function(t, i) {
        var n,
          o = this.getListenersAsObject(t),
          s = 'object' == typeof i;
        for (n in o)
          o.hasOwnProperty(n) &&
            -1 === e(o[n], i) &&
            o[n].push(s ? i : { listener: i, once: !1 });
        return this;
      }),
      (n.on = i('addListener')),
      (n.addOnceListener = function(t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (n.once = i('addOnceListener')),
      (n.defineEvent = function(t) {
        return this.getListeners(t), this;
      }),
      (n.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (n.removeListener = function(t, i) {
        var n,
          o,
          s = this.getListenersAsObject(t);
        for (o in s)
          s.hasOwnProperty(o) && -1 !== (n = e(s[o], i)) && s[o].splice(n, 1);
        return this;
      }),
      (n.off = i('removeListener')),
      (n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (n.manipulateListeners = function(t, e, i) {
        var n,
          o,
          s = t ? this.removeListener : this.addListener,
          r = t ? this.removeListeners : this.addListeners;
        if ('object' != typeof e || e instanceof RegExp)
          for (n = i.length; n--; ) s.call(this, e, i[n]);
        else
          for (n in e)
            e.hasOwnProperty(n) &&
              (o = e[n]) &&
              ('function' == typeof o
                ? s.call(this, n, o)
                : r.call(this, n, o));
        return this;
      }),
      (n.removeEvent = function(t) {
        var e,
          i = typeof t,
          n = this._getEvents();
        if ('string' === i) delete n[t];
        else if ('object' === i)
          for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this;
      }),
      (n.removeAllListeners = i('removeEvent')),
      (n.emitEvent = function(t, e) {
        var i,
          n,
          o,
          s = this.getListenersAsObject(t);
        for (o in s)
          if (s.hasOwnProperty(o))
            for (n = s[o].length; n--; )
              !0 === (i = s[o][n]).once && this.removeListener(t, i.listener),
                i.listener.apply(this, e || []) ===
                  this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (n.trigger = i('emitEvent')),
      (n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (n.setOnceReturnValue = function(t) {
        return (this._onceReturnValue = t), this;
      }),
      (n._getOnceReturnValue = function() {
        return (
          !this.hasOwnProperty('_onceReturnValue') || this._onceReturnValue
        );
      }),
      (n._getEvents = function() {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function() {
        return (o.EventEmitter = s), t;
      }),
      'function' == typeof define && define.amd
        ? define('eventEmitter/EventEmitter', [], function() {
            return t;
          })
        : 'object' == typeof module && module.exports
        ? (module.exports = t)
        : (this.EventEmitter = t);
  }.call(this),
  (function(t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      n = function() {};
    i.addEventListener
      ? (n = function(t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (n = function(t, i, n) {
          (t[i + n] = n.handleEvent
            ? function() {
                var i = e(t);
                n.handleEvent.call(n, i);
              }
            : function() {
                var i = e(t);
                n.call(t, i);
              }),
            t.attachEvent('on' + i, t[i + n]);
        });
    var o = function() {};
    i.removeEventListener
      ? (o = function(t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (o = function(t, e, i) {
          t.detachEvent('on' + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (n) {
            t[e + i] = void 0;
          }
        });
    var s = { bind: n, unbind: o };
    'function' == typeof define && define.amd
      ? define('eventie/eventie', s)
      : (t.eventie = s);
  })(this),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(['eventEmitter/EventEmitter', 'eventie/eventie'], function(
          i,
          n
        ) {
          return e(t, i, n);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(
          t,
          require('wolfy87-eventemitter'),
          require('eventie')
        ))
      : (t.imagesLoaded = e(t, t.EventEmitter, t.eventie));
  })(window, function(t, e, i) {
    function n(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function o(t) {
      var e = [];
      if (
        (function(t) {
          return '[object Array]' == h.call(t);
        })(t)
      )
        e = t;
      else if ('number' == typeof t.length)
        for (var i = 0; i < t.length; i++) e.push(t[i]);
      else e.push(t);
      return e;
    }
    function s(t, e, i) {
      if (!(this instanceof s)) return new s(t, e, i);
      'string' == typeof t && (t = document.querySelectorAll(t)),
        (this.elements = o(t)),
        (this.options = n({}, this.options)),
        'function' == typeof e ? (i = e) : n(this.options, e),
        i && this.on('always', i),
        this.getImages(),
        l && (this.jqDeferred = new l.Deferred());
      var r = this;
      setTimeout(function() {
        r.check();
      });
    }
    function r(t) {
      this.img = t;
    }
    function a(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var l = t.jQuery,
      u = t.console,
      h = Object.prototype.toString;
    (s.prototype = new e()),
      (s.prototype.options = {}),
      (s.prototype.getImages = function() {
        this.images = [];
        for (var t = 0; t < this.elements.length; t++) {
          var e = this.elements[t];
          this.addElementImages(e);
        }
      }),
      (s.prototype.addElementImages = function(t) {
        'IMG' == t.nodeName && this.addImage(t),
          !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
          for (var i = t.querySelectorAll('img'), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ('string' == typeof this.options.background) {
            var s = t.querySelectorAll(this.options.background);
            for (n = 0; n < s.length; n++) {
              var r = s[n];
              this.addElementBackgroundImages(r);
            }
          }
        }
      });
    var c = { 1: !0, 9: !0, 11: !0 };
    s.prototype.addElementBackgroundImages = function(t) {
      for (
        var e = d(t),
          i = /url\(['"]*([^'"\)]+)['"]*\)/gi,
          n = i.exec(e.backgroundImage);
        null !== n;

      ) {
        var o = n && n[1];
        o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
      }
    };
    var d =
      t.getComputedStyle ||
      function(t) {
        return t.currentStyle;
      };
    return (
      (s.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e);
      }),
      (s.prototype.addBackground = function(t, e) {
        var i = new a(t, e);
        this.images.push(i);
      }),
      (s.prototype.check = function() {
        function t(t, i, n) {
          setTimeout(function() {
            e.progress(t, i, n);
          });
        }
        var e = this;
        if (
          ((this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length)
        )
          for (var i = 0; i < this.images.length; i++) {
            var n = this.images[i];
            n.once('progress', t), n.check();
          }
        else this.complete();
      }),
      (s.prototype.progress = function(t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emit('progress', this, t, e),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && u && u.log('progress: ' + i, t, e);
      }),
      (s.prototype.complete = function() {
        var t = this.hasAnyBroken ? 'fail' : 'done';
        if (
          ((this.isComplete = !0),
          this.emit(t, this),
          this.emit('always', this),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? 'reject' : 'resolve';
          this.jqDeferred[e](this);
        }
      }),
      (r.prototype = new e()),
      (r.prototype.check = function() {
        return this.getIsImageComplete()
          ? void this.confirm(0 !== this.img.naturalWidth, 'naturalWidth')
          : ((this.proxyImage = new Image()),
            i.bind(this.proxyImage, 'load', this),
            i.bind(this.proxyImage, 'error', this),
            i.bind(this.img, 'load', this),
            i.bind(this.img, 'error', this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function(t, e) {
        (this.isLoaded = t), this.emit('progress', this, this.img, e);
      }),
      (r.prototype.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (r.prototype.onload = function() {
        this.confirm(!0, 'onload'), this.unbindEvents();
      }),
      (r.prototype.onerror = function() {
        this.confirm(!1, 'onerror'), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function() {
        i.unbind(this.proxyImage, 'load', this),
          i.unbind(this.proxyImage, 'error', this),
          i.unbind(this.img, 'load', this),
          i.unbind(this.img, 'error', this);
      }),
      (a.prototype = new r()),
      (a.prototype.check = function() {
        i.bind(this.img, 'load', this),
          i.bind(this.img, 'error', this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, 'naturalWidth'),
            this.unbindEvents());
      }),
      (a.prototype.unbindEvents = function() {
        i.unbind(this.img, 'load', this), i.unbind(this.img, 'error', this);
      }),
      (a.prototype.confirm = function(t, e) {
        (this.isLoaded = t), this.emit('progress', this, this.element, e);
      }),
      (s.makeJQueryPlugin = function(e) {
        (e = e || t.jQuery) &&
          ((l = e).fn.imagesLoaded = function(t, e) {
            return new s(this, t, e).jqDeferred.promise(l(this));
          });
      }),
      s.makeJQueryPlugin(),
      s
    );
  });
