/* ==========================================================================
   EduPath Nigeria — Home Page Logic
   Demonstrates: DOM selection/modification, IntersectionObserver event
   handling, conditional branching, template literals.
   Animates the impact statistics counting up from 0 once they scroll
   into view.
   ========================================================================== */

/**
 * Animate a single stat element counting from 0 up to its target value.
 * Uses requestAnimationFrame for smooth, performant updates.
 */
function animateCount(el) {
  const target = Number(el.dataset.countTo);
  const suffix = el.dataset.suffix || "";
  const duration = 1200; // milliseconds
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);

    el.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(step);
}

/**
 * Watch the stats section and trigger the count-up animation the first
 * time it becomes visible in the viewport.
 */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count-to]");
  if (statNumbers.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback: animate immediately if IntersectionObserver isn't supported.
    statNumbers.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initStatsCounter);
