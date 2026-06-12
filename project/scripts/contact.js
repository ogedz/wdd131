/* ==========================================================================
   EduPath Nigeria — Contact page logic
   Demonstrates: DOM interaction, conditional branching, template literals,
   localStorage, form validation, accordion interaction.
   ========================================================================== */

const NEWSLETTER_KEY = "edupath-newsletter-emails";

/**
 * Read stored newsletter emails from localStorage.
 */
function getNewsletterEmails() {
  try {
    const raw = localStorage.getItem(NEWSLETTER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read newsletter emails:", err);
    return [];
  }
}

/**
 * Save the newsletter emails array to localStorage.
 */
function saveNewsletterEmails(emails) {
  try {
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(emails));
  } catch (err) {
    console.error("Could not save newsletter email:", err);
  }
}

/**
 * Basic email format check.
 */
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Handle newsletter form submission.
 */
function handleNewsletterSubmit(event) {
  event.preventDefault();

  const input = document.getElementById("newsletter-email");
  const errorEl = document.getElementById("newsletter-error");
  const confirmationEl = document.getElementById("newsletter-confirmation");
  const email = input.value.trim();

  if (!isValidEmail(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    input.classList.add("invalid");
    confirmationEl.classList.remove("show");
    return;
  }

  const emails = getNewsletterEmails();

  if (emails.includes(email)) {
    errorEl.textContent = "";
    input.classList.remove("invalid");
    confirmationEl.textContent = `${email} is already subscribed. Thanks for being with us!`;
    confirmationEl.classList.add("show");
    return;
  }

  emails.push(email);
  saveNewsletterEmails(emails);

  errorEl.textContent = "";
  input.classList.remove("invalid");
  confirmationEl.textContent = `Thanks! ${email} has been added to the EduPath newsletter list.`;
  confirmationEl.classList.add("show");
  input.value = "";
}

/**
 * Validate a single field, show/hide its error message, and toggle styling.
 * Returns true if the field is valid.
 */
function validateField(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  let message = "";

  if (field.hasAttribute("required") && field.value.trim() === "") {
    message = "This field is required.";
  } else if (field.type === "email" && field.value.trim() !== "" && !isValidEmail(field.value.trim())) {
    message = "Please enter a valid email address.";
  } else if (field.id === "contact-message" && field.value.trim().length > 0 && field.value.trim().length < 20) {
    message = "Please provide a bit more detail (at least 20 characters).";
  }

  if (message) {
    field.classList.add("invalid");
    if (errorEl) errorEl.textContent = message;
    return false;
  }

  field.classList.remove("invalid");
  if (errorEl) errorEl.textContent = "";
  return true;
}

/**
 * Validate the whole partner/contact form on submit.
 */
function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const fields = form.querySelectorAll("input[required], textarea[required], select[required]");

  let allValid = true;

  fields.forEach((field) => {
    const isValid = validateField(field);
    if (!isValid) allValid = false;
  });

  const confirmationEl = document.getElementById("contact-confirmation");

  if (!allValid) {
    confirmationEl.classList.remove("show");
    return;
  }

  const name = form.querySelector("#contact-name").value.trim();

  confirmationEl.textContent = `Thanks, ${name}! Your message has been received. We'll get back to you within 2 business days.`;
  confirmationEl.classList.add("show");
  form.reset();
}

/**
 * Toggle a single FAQ accordion item open/closed.
 */
function handleAccordionClick(event) {
  const trigger = event.target.closest(".accordion-trigger");
  if (!trigger) return;

  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  const isOpen = trigger.getAttribute("aria-expanded") === "true";

  trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");

  if (panel) {
    panel.classList.toggle("open", !isOpen);
  }
}

function initContactPage() {
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);

    // Live validation on blur for each required field.
    const fields = contactForm.querySelectorAll("input[required], textarea[required], select[required]");
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
    });
  }

  const accordion = document.getElementById("faq-accordion");
  if (accordion) {
    accordion.addEventListener("click", handleAccordionClick);
  }
}

document.addEventListener("DOMContentLoaded", initContactPage);
