// Get current review count from localStorage, or initialize to 0
let reviewCount = parseInt(localStorage.getItem('reviewCount')) || 0;

// Increment the counter
reviewCount++;

// Save back to localStorage
localStorage.setItem('reviewCount', reviewCount);

// Display the counter on the page
document.getElementById('review-count').textContent = reviewCount;