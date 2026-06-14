(function () {
  'use strict';

  // ─── Navigation ───────────────────────────────
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ─── Smooth scroll ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Reveal on scroll ─────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ─── Counter animation ────────────────────────
  var counters = document.querySelectorAll('.stats__number[data-target]');
  var counterDone = false;
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counterDone) {
          counterDone = true;
          counters.forEach(function (counter) {
            var target = +counter.dataset.target;
            var duration = 2000;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target).toLocaleString();
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counter.textContent = target.toLocaleString();
              }
            }
            requestAnimationFrame(step);
          });
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  var statsSection = document.getElementById('stats');
  if (statsSection) counterObserver.observe(statsSection);

  // ─── Back to top ──────────────────────────────
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  // ─── Active nav highlight ─────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );
  sections.forEach(function (sec) {
    navObserver.observe(sec);
  });

  // ─── Contact form (Formspree) ─────────────────
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var btnText = submitBtn.querySelector('.btn__text');
  var btnLoader = submitBtn.querySelector('.btn__loader');
  var formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    submitBtn.disabled = true;
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then(function (response) {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;

        if (response.ok) {
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
          formStatus.className = 'form-status error';
        }
      })
      .catch(function () {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        formStatus.textContent = 'Network error. Please check your connection and try again.';
        formStatus.className = 'form-status error';
      });
  });
})();
