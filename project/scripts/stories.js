/* ==========================================================================
   EduPath Nigeria — Success Stories page logic
   Demonstrates: DOM interaction (select, modify, listen), conditional
   branching, array methods, template literals, lazy loading, modal dialog.
   ========================================================================== */

const successStories = [
  {
    id: "adaobi",
    name: "Adaobi Eze",
    location: "Lagos",
    pathway: "ND → Tech Lead",
    image: "images/stories/adaobi.webp",
    summary: "Moved from a National Diploma in Computer Science to leading a development team at a Lagos fintech.",
    fullStory: "Adaobi completed her National Diploma in Computer Science at Yaba College of Technology, unsure whether her qualification would be enough to compete for tech roles. Instead of waiting for a degree, she enrolled in a frontend development bootcamp and built a portfolio of small projects. Her first job was a junior developer role at a small startup, where she focused on learning quickly and taking on extra responsibility. Within four years, consistent upskilling in React and team leadership courses helped her move into a tech lead role overseeing a team of six engineers at a Lagos-based fintech company."
  },
  {
    id: "emmanuel",
    name: "Emmanuel Okafor",
    location: "Port Harcourt",
    pathway: "SSCE → Data Analyst",
    image: "images/stories/emmanuel.webp",
    summary: "Used online courses and bootcamps to break into a data analyst role without a university degree.",
    fullStory: "After his SSCE results didn't meet the cutoff for his preferred university course, Emmanuel decided not to wait another year for admission. He spent six months learning Excel, SQL, and Power BI through free and low-cost online courses, supplementing his learning with YouTube tutorials in the evenings while working a part-time job. He built a small portfolio analysing publicly available Nigerian economic data. A local logistics company hired him as a junior data analyst at age 22, and he has since been promoted twice, now managing reporting for three regional offices."
  },
  {
    id: "chioma",
    name: "Chioma Adebayo",
    location: "Abuja",
    pathway: "HND → Founder",
    image: "images/stories/chioma.webp",
    summary: "Built a thriving Adire fashion brand after completing her Higher National Diploma in Fashion Design.",
    fullStory: "Chioma earned her HND in Fashion Design from a polytechnic in Abuja, then apprenticed for a year under an established designer to learn pattern-making and production at scale. Rather than seeking employment, she started by selling handmade Adire pieces to friends and family, reinvesting every profit into fabric and equipment. She used Instagram to showcase her designs and built a loyal customer base. Two years later, her brand employs three tailors and supplies pieces to two boutiques in Abuja, with plans to open her first physical store."
  },
  {
    id: "tunde",
    name: "Tunde Bakare",
    location: "Ibadan",
    pathway: "BSc → Agripreneur",
    image: "images/stories/tunde.webp",
    summary: "Combined his Agricultural Science degree with a youth agripreneur programme to launch a poultry business.",
    fullStory: "Tunde graduated with a BSc in Agricultural Science but found that most graduate jobs in his field offered low pay and slow progression. He joined a youth agripreneur incubation programme in Ibadan, which gave him practical training in modern poultry farming, business planning, and access to a small starter loan. He started with 200 birds on a rented plot of land. Eighteen months later, his farm produces eggs and broilers for three local markets, and he has hired two part-time workers from his community."
  },
  {
    id: "blessing",
    name: "Blessing Nwachukwu",
    location: "Lagos",
    pathway: "SSCE → Pharmacy Technician",
    image: "images/stories/blessing.webp",
    summary: "Trained as a pharmacy technician straight after secondary school and now works at a busy community pharmacy.",
    fullStory: "Blessing knew she wanted a career in healthcare but didn't want to spend five years pursuing a nursing or pharmacy degree. After her SSCE, she enrolled in an OND programme in Pharmacy Technology, completing it in two years with a one-year practical attachment at a hospital pharmacy. After registering with the Pharmacists Council of Nigeria, she found a role at a community pharmacy in Lagos, where she now manages dispensing for over 100 customers a day and is studying part-time toward a further qualification."
  },
  {
    id: "ifeoma",
    name: "Ifeoma Chukwu",
    location: "Online / Remote",
    pathway: "ND → Digital Marketer",
    image: "images/stories/ifeoma.webp",
    summary: "Took her National Diploma in Mass Communication and turned it into a remote digital marketing career.",
    fullStory: "Ifeoma's ND in Mass Communication gave her strong writing skills, but she struggled to find relevant jobs in Lagos. She completed free certifications in Google Ads and Meta Blueprint, then offered to manage social media for a friend's small business at no cost to build a case study. That case study helped her land her first paid client, and within a year she was managing social media accounts for five small businesses remotely, eventually being hired full-time by a digital agency that allows her to work from home in Enugu."
  }
];

/**
 * Build the markup for one story card with a "Read More" trigger.
 */
function buildStoryCardMarkup(story) {
  return `
    <article class="card">
      <img
        data-lazy="${story.image}"
        alt="Portrait of ${story.name}"
        width="400"
        height="300"
        loading="lazy"
      >
      <span class="tag">${story.pathway}</span>
      <h3>${story.name}</h3>
      <p>${story.summary}</p>
      <button class="read-more" type="button" data-story-id="${story.id}" style="background:none; border:none; cursor:pointer; padding:0; text-align:left;">Read full story →</button>
    </article>
  `;
}

/**
 * Render all story cards into the grid.
 */
function renderStories() {
  const grid = document.getElementById("stories-grid");
  if (!grid) return;

  grid.innerHTML = successStories.map(buildStoryCardMarkup).join("");

  if (typeof initLazyLoading === "function") {
    initLazyLoading();
  }
}

/**
 * Open the modal and populate it with a story's full content.
 */
function openStoryModal(storyId) {
  const story = successStories.find((s) => s.id === storyId);
  if (!story) return;

  const overlay = document.getElementById("story-modal-overlay");
  const titleEl = document.getElementById("story-modal-title");
  const bodyEl = document.getElementById("story-modal-body");

  if (!overlay || !titleEl || !bodyEl) return;

  titleEl.textContent = `${story.name} — ${story.pathway}`;
  bodyEl.innerHTML = `
    <p><strong>Location:</strong> ${story.location}</p>
    <p>${story.fullStory}</p>
  `;

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");

  const closeBtn = overlay.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();
}

/**
 * Close the story modal.
 */
function closeStoryModal() {
  const overlay = document.getElementById("story-modal-overlay");
  if (!overlay) return;

  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}

/**
 * Handle clicks for opening/closing the modal (event delegation).
 */
function handleStoryClicks(event) {
  const readMoreBtn = event.target.closest("[data-story-id]");
  if (readMoreBtn) {
    openStoryModal(readMoreBtn.dataset.storyId);
    return;
  }

  const closeBtn = event.target.closest(".modal-close");
  const overlay = event.target.closest("#story-modal-overlay");

  if (closeBtn || event.target === overlay) {
    closeStoryModal();
  }
}

/**
 * Allow closing the modal with the Escape key.
 */
function handleKeydown(event) {
  if (event.key === "Escape") {
    closeStoryModal();
  }
}

function initStoriesPage() {
  const grid = document.getElementById("stories-grid");
  if (!grid) return;

  renderStories();

  document.addEventListener("click", handleStoryClicks);
  document.addEventListener("keydown", handleKeydown);
}

document.addEventListener("DOMContentLoaded", initStoriesPage);
