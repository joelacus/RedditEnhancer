// ────────────────────────────────────────────────────────────────────────────
// Utility / Parse HTML String
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parses an HTML string and returns a DocumentFragment containing the parsed nodes.
 * Uses a <template> element to avoid innerHTML on live DOM nodes.
 * @param {string} htmlString - The HTML string to parse
 * @returns {DocumentFragment} A fragment containing the parsed nodes
 */
export function parseHtmlString(htmlString) {
	const template = document.createElement('template');
	template.innerHTML = htmlString.trim();
	const fragment = document.createDocumentFragment();
	Array.from(template.content.childNodes).forEach((node) => fragment.appendChild(node));
	return fragment;
}
