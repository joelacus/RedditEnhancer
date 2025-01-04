/**
 * Tweaks - Hide - Auto Hide Cookie Prompt
 * Hide the cookie consent popup if you haven't already accepted/dismissed it.
 * 
 * Applies to: Old New UI (2018-2024)
 */

/* === Main Function === */
const cookies = document.querySelector('[style*="Toaster"]');
if (cookies != null) {
	cookies.style.display = 'none';
}
