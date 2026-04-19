// ────────────────────────────────────────────────────────────────────────────
// Utility / Parse HTML String
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parses an HTML string and returns the first DOM element.
 * @param {string} htmlString - The HTML string to parse
 * @returns {Node} The first child node of the parsed document body
 */
export function parseHtmlString(htmlString) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');
	return Array.from(doc.body.childNodes)[0];
}
