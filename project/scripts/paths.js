/* ==========================================================================
   EduPath Nigeria — Path Finder logic
   Demonstrates: DOM interaction, conditional branching, array methods
   (.filter(), .forEach(), .map()), template literals, localStorage.
   ========================================================================== */

const BOOKMARKS_KEY = "edupath-bookmarked-paths";

/**
 * Read bookmarked path IDs from localStorage.
 * Returns an array of string IDs (empty array if none saved or on error).
 */
function getBookmarkedIds() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read bookmarks from localStorage:", err);
    return [];
  }
}

/**
 * Save an array of bookmarked path IDs to localStorage.
 */
function saveBookmarkedIds(ids) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error("Could not save bookmarks to localStorage:", err);
  }
}

/**
 * Toggle a path's bookmarked status and update storage.
 * Returns the new bookmarked state (true/false).
 */
function toggleBookmark(pathId) {
  const ids = getBookmarkedIds();
  const index = ids.indexOf(pathId);
  let isNowBookmarked;

  if (index === -1) {
    ids.push(pathId);
    isNowBookmarked = true;
  } else {
    ids.splice(index, 1);
    isNowBookmarked = false;
  }

  saveBookmarkedIds(ids);
  return isNowBookmarked;
}

/**
 * Filter the careerPaths array based on the user's selections.
 * "any" location matches every path; field and level must match exactly.
 */
function findMatchingPaths(level, field, location) {
  return careerPaths.filter((path) => {
    const levelMatches = path.levels.includes(level);
    const fieldMatches = path.field === field;
    const locationMatches =
      location === "any" ||
      path.locations.includes("any") ||
      path.locations.includes(location);

    return levelMatches && fieldMatches && locationMatches;
  });
}

/**
 * Build the HTML markup for a single path result card.
 * Uses template literals exclusively for string construction.
 */
function buildPathCardMarkup(path, isBookmarked) {
  const stepsMarkup = path.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  const bookmarkLabel = isBookmarked ? "Saved ✓" : "Save this path";
  const pressedState = isBookmarked ? "true" : "false";

  return `
    <article class="path-result" data-path-id="${path.id}">
      <h3>${path.title}</h3>
      <p>${path.summary}</p>
      <ol class="path-steps">
        ${stepsMarkup}
      </ol>
      <p><strong>Estimated timeline:</strong> ${path.timeline}</p>
      <p><strong>Typical salary range:</strong> ${path.salaryRange}</p>
      <button
        class="bookmark-btn"
        type="button"
        data-path-id="${path.id}"
        aria-pressed="${pressedState}"
      >${bookmarkLabel}</button>
    </article>
  `;
}

/**
 * Render the list of matching paths into the results container.
 * Handles the "no matches" case with a helpful message.
 */
function renderResults(paths) {
  const resultsContainer = document.getElementById("path-results");
  const bookmarkedIds = getBookmarkedIds();

  if (!resultsContainer) return;

  if (paths.length === 0) {
    resultsContainer.innerHTML = `
      <div class="card">
        <h3>No exact matches yet</h3>
        <p>We don't have a pathway matching that exact combination right now. Try a different field of interest, or browse all resources to explore options.</p>
        <a href="resources.html" class="btn btn-secondary">Browse Resources</a>
      </div>
    `;
    return;
  }

  const cardsMarkup = paths
    .map((path) => buildPathCardMarkup(path, bookmarkedIds.includes(path.id)))
    .join("");

  resultsContainer.innerHTML = `
    <h2>Recommended pathways for you</h2>
    <p>${paths.length} pathway${paths.length === 1 ? "" : "s"} matched your selections.</p>
    ${cardsMarkup}
  `;
}

/**
 * Render the saved/bookmarked paths section.
 */
function renderSavedPaths() {
  const savedContainer = document.getElementById("saved-paths");
  if (!savedContainer) return;

  const bookmarkedIds = getBookmarkedIds();

  if (bookmarkedIds.length === 0) {
    savedContainer.innerHTML = `<p>You haven't saved any pathways yet. Use the Path Finder above and select "Save this path" to keep track of options you're considering.</p>`;
    return;
  }

  const savedPaths = careerPaths.filter((path) =>
    bookmarkedIds.includes(path.id)
  );

  const itemsMarkup = savedPaths
    .map(
      (path) => `
        <li>
          <strong>${path.title}</strong> — ${path.timeline}
          <button class="bookmark-btn" type="button" data-path-id="${path.id}" aria-pressed="true">Remove</button>
        </li>
      `
    )
    .join("");

  savedContainer.innerHTML = `<ul class="saved-paths-list">${itemsMarkup}</ul>`;
}

/**
 * Handle clicks anywhere in the results or saved-paths sections,
 * specifically for bookmark buttons (event delegation).
 */
function handleBookmarkClick(event) {
  const button = event.target.closest(".bookmark-btn");
  if (!button) return;

  const pathId = button.dataset.pathId;
  toggleBookmark(pathId);

  // Re-render both views so state stays in sync.
  const lastResults = document.getElementById("path-results").dataset.lastIds;
  if (lastResults) {
    const ids = JSON.parse(lastResults);
    const paths = careerPaths.filter((p) => ids.includes(p.id));
    renderResults(paths);
  }
  renderSavedPaths();
}

/**
 * Handle the Path Finder form submission.
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const level = document.getElementById("education-level").value;
  const field = document.getElementById("field-interest").value;
  const location = document.getElementById("location").value;

  if (!level || !field || !location) {
    const errorEl = document.getElementById("form-error");
    if (errorEl) {
      errorEl.textContent = "Please answer all three questions to get your recommendations.";
    }
    return;
  }

  const errorEl = document.getElementById("form-error");
  if (errorEl) errorEl.textContent = "";

  const matches = findMatchingPaths(level, field, location);

  // Store the matched IDs so bookmark toggles can re-render correctly.
  const resultsContainer = document.getElementById("path-results");
  resultsContainer.dataset.lastIds = JSON.stringify(matches.map((p) => p.id));

  renderResults(matches);
  resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initPathFinder() {
  const form = document.getElementById("path-finder-form");
  if (!form) return;

  form.addEventListener("submit", handleFormSubmit);
  document.addEventListener("click", handleBookmarkClick);

  renderSavedPaths();
}

document.addEventListener("DOMContentLoaded", initPathFinder);
