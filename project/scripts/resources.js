/* ==========================================================================
   EduPath Nigeria — Resources page logic
   Demonstrates: DOM interaction, conditional branching, array methods
   (.filter(), .forEach()), template literals, lazy-loaded images.
   ========================================================================== */

const trainingResources = [
  {
    id: "alx-africa",
    name: "ALX Africa",
    field: "tech",
    type: "Online Bootcamp",
    location: "Online (Nationwide)",
    description: "Intensive software engineering and data programmes with mentorship and a strong alumni network across Africa.",
    image: "images/resources/alx-africa.webp"
  },
  {
    id: "decagon",
    name: "Decagon Institute",
    field: "tech",
    type: "Bootcamp",
    location: "Lagos",
    description: "Full-time software engineering fellowship that places graduates directly with hiring partners after training.",
    image: "images/resources/decagon.webp"
  },
  {
    id: "yaba-college",
    name: "Yaba College of Technology",
    field: "trades",
    type: "Polytechnic",
    location: "Lagos",
    description: "Offers ND and HND programmes across engineering, applied sciences, and technical trades.",
    image: "images/resources/yaba-college.webp"
  },
  {
    id: "itf-vocational",
    name: "ITF Vocational Training Centres",
    field: "trades",
    type: "Government Programme",
    location: "Multiple states",
    description: "Industrial Training Fund centres offering hands-on training in electrical work, automotive repair, and more.",
    image: "images/resources/itf-vocational.webp"
  },
  {
    id: "lagos-business-school",
    name: "Lagos Business School — Short Courses",
    field: "business",
    type: "Executive Education",
    location: "Lagos",
    description: "Short, practical courses in entrepreneurship, finance, and management for working professionals.",
    image: "images/resources/lagos-business-school.webp"
  },
  {
    id: "ican",
    name: "ICAN Professional Programme",
    field: "business",
    type: "Professional Body",
    location: "Nationwide",
    description: "The Institute of Chartered Accountants of Nigeria's qualification pathway for professional accountants.",
    image: "images/resources/ican.webp"
  },
  {
    id: "schools-of-nursing",
    name: "Schools of Nursing (State-run)",
    field: "healthcare",
    type: "Diploma Programme",
    location: "Multiple states",
    description: "Government-run nursing schools offering accredited programmes leading to NMCN licensure.",
    image: "images/resources/schools-of-nursing.webp"
  },
  {
    id: "pcn-pharmacy-tech",
    name: "PCN-Accredited Pharmacy Tech Schools",
    field: "healthcare",
    type: "OND Programme",
    location: "Multiple states",
    description: "Polytechnic programmes accredited by the Pharmacists Council of Nigeria for pharmacy technicians.",
    image: "images/resources/pcn-pharmacy-tech.webp"
  },
  {
    id: "iita-youth-agripreneurs",
    name: "IITA Youth Agripreneurs",
    field: "agriculture",
    type: "Incubation Programme",
    location: "Ibadan",
    description: "Hands-on agribusiness training and incubation for young people interested in modern farming and agro-processing.",
    image: "images/resources/iita-youth-agripreneurs.webp"
  },
  {
    id: "fadama-extension",
    name: "Fadama Extension Services",
    field: "agriculture",
    type: "Government Programme",
    location: "Multiple states",
    description: "Agricultural extension support connecting farmers and trainees with modern techniques and resources.",
    image: "images/resources/fadama-extension.webp"
  },
  {
    id: "fashion-academy-lagos",
    name: "Fashion Academy Lagos",
    field: "creative",
    type: "Vocational School",
    location: "Lagos",
    description: "Pattern-making, sewing, and fashion business courses for aspiring designers and entrepreneurs.",
    image: "images/resources/fashion-academy-lagos.webp"
  },
  {
    id: "spoken-word-academy",
    name: "Spoken Word & Design Academy",
    field: "creative",
    type: "Online Course",
    location: "Online (Nationwide)",
    description: "Graphic design, branding, and content creation courses with project-based learning.",
    image: "images/resources/graphic-design-academy.webp"
  }
];

/**
 * Build the markup for one resource card. Image src is left blank and
 * placed in data-lazy so main.js's IntersectionObserver can load it.
 */
function buildResourceCardMarkup(resource) {
  return `
    <article class="card" data-field="${resource.field}">
      <img
        data-lazy="${resource.image}"
        alt="${resource.name} training facility"
        width="500"
        height="375"
        loading="lazy"
      >
      <span class="tag">${resource.type}</span>
      <h3>${resource.name}</h3>
      <p>${resource.description}</p>
      <p><strong>Location:</strong> ${resource.location}</p>
    </article>
  `;
}

/**
 * Render resource cards, optionally filtered by field.
 * "all" shows every resource.
 */
function renderResources(field) {
  const grid = document.getElementById("resources-grid");
  if (!grid) return;

  const filtered =
    field === "all"
      ? trainingResources
      : trainingResources.filter((resource) => resource.field === field);

  if (filtered.length === 0) {
    grid.innerHTML = `<p>No resources found for this category yet. Check back soon, or <a href="contact.html">suggest a partner</a>.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(buildResourceCardMarkup).join("");

  // Newly inserted images need lazy-loading wired up again.
  if (typeof initLazyLoading === "function") {
    initLazyLoading();
  }
}

/**
 * Handle a click on a filter chip: update pressed state and re-render.
 */
function handleFilterClick(event) {
  const chip = event.target.closest(".filter-chip");
  if (!chip) return;

  const allChips = document.querySelectorAll(".filter-chip");
  allChips.forEach((c) => c.setAttribute("aria-pressed", "false"));
  chip.setAttribute("aria-pressed", "true");

  const field = chip.dataset.field;
  renderResources(field);
}

function initResourcesPage() {
  const filterBar = document.getElementById("resource-filters");
  if (!filterBar) return;

  filterBar.addEventListener("click", handleFilterClick);
  renderResources("all");
}

document.addEventListener("DOMContentLoaded", initResourcesPage);
