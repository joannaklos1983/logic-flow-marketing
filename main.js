/* ═══════════════════════════════════════════════════════
   LOGIC-FLOW — MAIN JS
   Handles: sticky nav, mobile menu, reveal animations, form
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── STICKY NAV ─────────────────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── MOBILE MENU ─────────────────────────────────────── */
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── REVEAL ON SCROLL ────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── SYSTEM GRID — card entrance + flow lines ─────────── */
  (function () {
    var section = document.querySelector('.system');
    var grid    = document.getElementById('sysGrid');
    var flowSvg = document.getElementById('sysFlowSvg');
    if (!section || !grid || !flowSvg) return;

    var NS = 'http://www.w3.org/2000/svg';

    var particles   = [];
    var particleRaf = null;

    function runParticleLoop() {
      function loop(ts) {
        particles.forEach(function (p) {
          var elapsed = ts - p.startTs;
          if (elapsed < 0) return;
          var t      = (elapsed % p.duration) / p.duration;
          var offset = p.startOff - t * p.travelLen;
          p.el.setAttribute('stroke-dashoffset', String(offset));
        });
        particleRaf = requestAnimationFrame(loop);
      }
      particleRaf = requestAnimationFrame(loop);
    }

    function stopParticles() {
      if (particleRaf) { cancelAnimationFrame(particleRaf); particleRaf = null; }
      particles = [];
    }

    function cardEl(n) {
      return grid.querySelector('[data-card="' + n + '"]');
    }

    function measure(el) {
      var g = grid.getBoundingClientRect();
      var e = el.getBoundingClientRect();
      return {
        cx: e.left - g.left + e.width  / 2,
        cy: e.top  - g.top  + e.height / 2,
        l:  e.left - g.left,
        r:  e.right - g.left,
        t:  e.top  - g.top,
        b:  e.bottom - g.top
      };
    }

    function makeDot(cx, cy, r) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', String(cx));
      c.setAttribute('cy', String(cy));
      c.setAttribute('r',  String(r));
      c.setAttribute('fill', 'rgba(212,175,55,0.70)');
      return c;
    }

    function buildLines(animate) {
      stopParticles();
      var gr = grid.getBoundingClientRect();
      if (!gr.width || !gr.height) return;

      while (flowSvg.firstChild) flowSvg.removeChild(flowSvg.firstChild);
      flowSvg.setAttribute('viewBox', '0 0 ' + gr.width + ' ' + gr.height);

      var defs   = document.createElementNS(NS, 'defs');
      var marker = document.createElementNS(NS, 'marker');
      marker.setAttribute('id', 'sysTip');
      marker.setAttribute('markerWidth',  '6');
      marker.setAttribute('markerHeight', '6');
      marker.setAttribute('refX', '5');
      marker.setAttribute('refY', '3');
      marker.setAttribute('orient', 'auto');
      var tip = document.createElementNS(NS, 'path');
      tip.setAttribute('d', 'M0.5,0.5 L5,3 L0.5,5.5 Z');
      tip.setAttribute('fill', 'rgba(212,175,55,0.80)');
      marker.appendChild(tip);
      defs.appendChild(marker);
      flowSvg.appendChild(defs);

      var conns = [[1,2],[2,3],[3,4],[4,5],[5,6]];
      var drawn = [];

      conns.forEach(function (c, i) {
        var a = measure(cardEl(c[0]));
        var b = measure(cardEl(c[1]));
        var d, mx, sx, sy, ex, ey;

        if (c[0] === 3 && c[1] === 4) {
          sx = a.cx; sy = a.b;
          ex = b.cx; ey = b.t;
          d = 'M ' + sx + ' ' + sy +
              ' C ' + sx + ' ' + (sy + (ey - sy) * 0.55) +
              ', '  + ex + ' ' + (sy + (ey - sy) * 0.45) +
              ', '  + ex + ' ' + ey;
        } else if (b.cx > a.cx) {
          sx = a.r;  sy = a.cy;
          ex = b.l;  ey = b.cy;
          mx = (sx + ex) / 2;
          d = 'M ' + sx + ' ' + sy +
              ' C ' + mx + ' ' + sy + ', ' + mx + ' ' + ey +
              ', '  + ex + ' ' + ey;
        } else {
          sx = a.l;  sy = a.cy;
          ex = b.r;  ey = b.cy;
          mx = (sx + ex) / 2;
          d = 'M ' + sx + ' ' + sy +
              ' C ' + mx + ' ' + sy + ', ' + mx + ' ' + ey +
              ', '  + ex + ' ' + ey;
        }

        /* main connector line */
        var path = document.createElementNS(NS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', 'rgba(212,175,55,0.55)');
        path.setAttribute('stroke-width', '1.2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('marker-end', 'url(#sysTip)');
        flowSvg.appendChild(path);

        /* particle path — same bezier, animated dot of light */
        var particle = document.createElementNS(NS, 'path');
        particle.setAttribute('d', d);
        particle.setAttribute('stroke', 'rgba(212,175,55,0.95)');
        particle.setAttribute('stroke-width', '2.5');
        particle.setAttribute('fill', 'none');
        particle.setAttribute('stroke-linecap', 'round');
        flowSvg.appendChild(particle);

        /* endpoint jewel dots */
        flowSvg.appendChild(makeDot(sx, sy, 3.5));
        flowSvg.appendChild(makeDot(ex, ey, 3.5));

        drawn.push({ el: path, particle: particle, idx: i });
      });

      /* measure, then animate or reveal */
      requestAnimationFrame(function () {
        var now = performance.now();
        drawn.forEach(function (item) {
          var len = item.el.getTotalLength ? item.el.getTotalLength() : 500;

          /* main line */
          if (animate) {
            item.el.setAttribute('stroke-dasharray', len);
            item.el.setAttribute('stroke-dashoffset', len);
            setTimeout(function () {
              item.el.style.transition =
                'stroke-dashoffset 0.85s cubic-bezier(0.22,1,0.36,1)';
              item.el.setAttribute('stroke-dashoffset', '0');
            }, item.idx * 180);
          } else {
            item.el.setAttribute('stroke-dasharray', len);
            item.el.setAttribute('stroke-dashoffset', '0');
          }

          /* particle — 18px dash sliding start→end, no repeat */
          var pLen    = item.particle.getTotalLength ? item.particle.getTotalLength() : len;
          var dashLen  = 18;
          var gap      = pLen + dashLen + 12; /* gap > travel distance → no repeat */
          var travelLen = pLen + dashLen;      /* dashoffset: dashLen → -(pLen) */
          item.particle.setAttribute('stroke-dasharray', dashLen + ' ' + gap);
          item.particle.setAttribute('stroke-dashoffset', String(dashLen)); /* starts invisible */
          particles.push({
            el:         item.particle,
            startOff:   dashLen,
            travelLen:  travelLen,
            duration:   2100 + item.idx * 80,
            startTs:    now + (animate ? item.idx * 180 + 1250 : item.idx * 80)
          });
        });

        if (!particleRaf) runParticleLoop();
      });
    }

    function activate() {
      section.classList.add('is-animated');
      /* wait for card entrance animations to settle, then draw lines */
      setTimeout(function () { buildLines(true); }, 1450);
    }

    if ('IntersectionObserver' in window) {
      var sysObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { activate(); sysObs.disconnect(); }
      }, { threshold: 0.12 });
      sysObs.observe(section);
    } else {
      activate();
    }

    var rstTimer;
    window.addEventListener('resize', function () {
      clearTimeout(rstTimer);
      rstTimer = setTimeout(function () {
        if (section.classList.contains('is-animated')) buildLines(false);
      }, 250);
    });

    /* gear rotation linked to scroll */
    var gearEls = [
      document.getElementById('sysGear1'),
      document.getElementById('sysGear2'),
      document.getElementById('sysGear3')
    ];
    var gearSpeeds = [0.035, -0.025, 0.055];
    window.addEventListener('scroll', function () {
      var s = window.scrollY;
      gearEls.forEach(function (g, i) {
        if (g) g.style.transform = 'rotate(' + (s * gearSpeeds[i]) + 'deg)';
      });
    }, { passive: true });
  }());

  /* ── REPORT ANIMATION ───────────────────────────────── */
  var reportDoc = document.querySelector('.report-doc');

  if (reportDoc) {
    function runReportAnimation() {
      reportDoc.querySelectorAll('.area-fill[data-w]').forEach(function(bar, i) {
        setTimeout(function() {
          bar.style.width = bar.getAttribute('data-w') + '%';
        }, 150 + i * 100);
      });

      var ring = reportDoc.querySelector('.score-ring-progress');
      if (ring) {
        setTimeout(function() {
          ring.style.strokeDashoffset = ring.getAttribute('data-target-offset');
        }, 100);
      }

      var scoreEl = reportDoc.querySelector('.score-num');
      if (scoreEl) {
        var target = parseInt(scoreEl.getAttribute('data-target') || '0', 10);
        var duration = 1400;
        var startTs = null;
        function tickCounter(ts) {
          if (!startTs) startTs = ts;
          var progress = Math.min((ts - startTs) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          scoreEl.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tickCounter);
        }
        setTimeout(function() { requestAnimationFrame(tickCounter); }, 100);
      }
    }

    if ('IntersectionObserver' in window) {
      var reportObs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          runReportAnimation();
          reportObs.disconnect();
        }
      }, { threshold: 0.3 });
      reportObs.observe(reportDoc);
    } else {
      runReportAnimation();
    }
  }

  /* ── FORM HANDLING ───────────────────────────────────── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const urlEl     = form.querySelector('#furl');
      const emailEl   = form.querySelector('#femail');
      const privacyEl = form.querySelector('#fprivacy');
      let valid = true;

      [urlEl, emailEl].forEach(function (el) {
        el.classList.remove('is-invalid');
        if (!el.value.trim()) {
          el.classList.add('is-invalid');
          valid = false;
        }
      });

      if (privacyEl) {
        privacyEl.classList.remove('is-invalid');
        if (!privacyEl.checked) {
          privacyEl.classList.add('is-invalid');
          valid = false;
        }
      }

      if (!valid) {
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłanie…';

      setTimeout(function () {
        form.hidden   = true;
        success.hidden = false;
      }, 800);
    });

    form.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('is-invalid');
      });
      input.addEventListener('change', function () {
        input.classList.remove('is-invalid');
      });
    });
  }

})();
