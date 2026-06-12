/* ==========================================================================
   EduPath Nigeria — Shared scripts (all pages)
   Author: Monday Ogedengbe
   ========================================================================== */

/**
 * Toggle the mobile navigation menu open/closed.
 * Demonstrates: DOM selection, event listener, conditional branching.
 */
function initNavToggle() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggleBtn.textContent = isOpen ? "✕ Close" : "☰ Menu";
  });
}

/**
 * Insert the current year into every element with [data-year].
 * Demonstrates: Date object, template literals, DOM modification.
 */
function initFooterYear() {
  const yearEls = document.querySelectorAll("[data-year]");
  const currentYear = new Date().getFullYear();

  yearEls.forEach((el) => {
    el.textContent = `${currentYear}`;
  });
}

/**
 * Render the SVG "pathway" divider — the site's signature visual motif.
 * A stepped route line with a marker, used between major sections.
 * Demonstrates: template literals for building markup.
 */
function renderPathwayDividers() {
  const dividers = document.querySelectorAll(".pathway-divider");

  const svgMarkup = `
    <svg viewBox="0 0 1200 36" preserveAspectRatio="none" role="presentation" aria-hidden="true" focusable="false">
      <path class="track" d="M0,18 L300,18 L340,4 L420,32 L480,18 L1200,18"></path>
      <circle class="marker" cx="420" cy="32" r="6"></circle>
      <circle class="marker" cx="340" cy="4" r="6"></circle>
    </svg>
  `;

  dividers.forEach((div) => {
    div.innerHTML = svgMarkup;
  });
}

/**
 * Apply lazy loading to images that opt in via [data-lazy].
 * Uses IntersectionObserver where available, falls back to native loading.
 * Demonstrates: conditional branching, DOM modification, modern API usage.
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll("img[data-lazy]");

  if (!("IntersectionObserver" in window)) {
    // Fallback: load everything immediately.
    lazyImages.forEach((img) => {
      img.src = img.dataset.lazy;
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.lazy;
        img.removeAttribute("data-lazy");
        obs.unobserve(img);
      }
    });
  }, { rootMargin: "150px" });

  lazyImages.forEach((img) => observer.observe(img));
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initFooterYear();
  renderPathwayDividers();
  initLazyLoading();
});
