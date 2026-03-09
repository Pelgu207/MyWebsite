/* ============================================================
   script.js – Personal Website Scripts
   Minimal JavaScript for interactivity.
   ============================================================ */

/* ── Auto-update footer copyright year ─────────────────────── */
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

/* ── Smooth-scroll for in-page anchor links ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── PDF embed fallback detection ───────────────────────────── */
/*
   Checks whether the browser rendered the PDF embed successfully.
   If the embed errors or is empty (e.g. on iOS / browsers without
   a PDF plugin), the fallback download message is shown instead.
   navigator.mimeTypes is deprecated and unreliable; we use the
   embed element's load/error events for feature detection instead.
*/
(function () {
  var embed = document.getElementById('pdf-embed');
  var fallback = document.getElementById('pdf-fallback');
  if (!embed || !fallback) return; // not on cv.html page

  function showFallback() {
    embed.style.display = 'none';
    fallback.style.display = 'block';
    /* Hide the "If PDF does not load" notice – fallback already says it */
    var notice = document.querySelector('.pdf-notice');
    if (notice) notice.style.display = 'none';
  }

  /* iOS does not render PDFs inside <embed> at all */
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    showFallback();
    return;
  }

  /* For other platforms, listen for a load error on the embed */
  embed.addEventListener('error', showFallback);
})();

/* ── Navbar shadow on scroll ─────────────────────────────────── */
(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });
})();
