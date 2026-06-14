(function () {
  'use strict';

  // ─── Preloader ────────────────────────────────
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('loaded');
  });

  // ─── Navigation ───────────────────────────────
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    nav.classList.remove('menu-active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    nav.classList.toggle('menu-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });

  navMenu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
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

  // ─── Typing animation ────────────────────────
  var typedEl = document.getElementById('typedRole');
  if (typedEl) {
    var roles = [
      'Freelance Full-Stack Software Engineer',
      'E-Commerce Specialist',
      'Open Source Contributor',
      'Product Owner — Admin UI',
      'Springboard Mentor'
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;

    function typeRole() {
      var current = roles[roleIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      var delay = typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      } else if (isDeleting) {
        delay = 40;
      }

      setTimeout(typeRole, delay);
    }
    typeRole();
  }

  // ─── Stagger index assignment ─────────────────
  document.querySelectorAll('.projects__grid .project-card, .articles__grid .article-card, .tools__grid .tool-card').forEach(function (el, i) {
    var parent = el.closest('.projects__grid, .articles__grid, .tools__grid');
    var siblings = parent ? Array.from(parent.children) : [];
    el.style.setProperty('--i', siblings.indexOf(el));
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

  // ─── Hero parallax ──────────────────────────────
  var heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrolled = window.pageYOffset;
          if (scrolled < window.innerHeight * 1.5) {
            heroBg.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── Lazy-load images ────────────────────────
  var lazyImgs = document.querySelectorAll('.lazy-img');
  var lazyObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.onload = function () { img.classList.add('loaded'); };
          img.src = img.dataset.src;
          lazyObserver.unobserve(img);
        }
      });
    },
    { rootMargin: '200px 0px' }
  );
  lazyImgs.forEach(function (img) {
    lazyObserver.observe(img);
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

  // ─── Theme toggle ─────────────────────────────
  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ─── Project filters ─────────────────────────
  var filterBtns = document.querySelectorAll('.projects__filter');
  var projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ─── Tilt effect on project cards ─────────────
  projectCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / 20;
      var rotateY = (centerX - x) / 20;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
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
