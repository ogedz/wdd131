// Increment review count in localStorage and display it
const STORAGE_KEY = 'reviewCount';

// Read current count, increment, and save
let count = Number(localStorage.getItem(STORAGE_KEY)) || 0;
count += 1;
localStorage.setItem(STORAGE_KEY, count);

// Display the updated count
const reviewCountEl = document.getElementById('review-count');
if (reviewCountEl) {
    reviewCountEl.textContent = count;
}