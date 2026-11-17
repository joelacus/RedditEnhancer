// ────────────────────────────────────────────────────────────────────────────
// Utility / Parse HTML String
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parses an HTML string and returns a DocumentFragment containing the parsed nodes.
 * The markup is sanitised before it is returned: blocked elements are removed,
 * event handler attributes are stripped, and URL attributes with dangerous
 * schemes are dropped. Text from Reddit API responses, storage, or imported
 * files must still be passed through `escapeHtml()` at the interpolation site,
 * otherwise attacker markup using allowed tags would be preserved.
 * Uses a detached <template> element so nothing touches the live DOM until
 * the caller appends the returned fragment.
 * @param {string} htmlString - The HTML string to parse
 * @returns {DocumentFragment} A fragment containing the parsed nodes
 */

// Elements that are never allowed in parsed markup. SMIL animation elements
// (<animate>, <set>, …) can rewrite another element's attributes at runtime,
// and <foreignObject> embeds arbitrary HTML inside SVG — both are blocked.
// <svg> itself stays allowed: static SVG icons are used in trusted markup.
const BLOCKED_TAGS = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'base', 'form', 'frame', 'frameset', 'applet', 'template', 'slot', 'animate', 'animatetransform', 'animatemotion', 'set', 'foreignobject']);

// Attributes holding URLs that must be scheme-checked.
const URL_ATTRIBUTES = new Set(['href', 'src', 'cite', 'data', 'poster', 'xlink:href']);

// Content that is never allowed inside a style attribute.
const DANGEROUS_STYLE_PATTERN = /expression\s*\(|javascript\s*:|vbscript\s*:|behaviour\s*:|behavior\s*:|-moz-binding|url\s*\(/i;

// The browser strips tab/CR/LF anywhere in a URL and control characters and
// spaces at the edges, so "java\tscript:alert(1)" resolves to a javascript:
// URL even though the raw value passes a scheme test. Strip every control
// character and space before testing the scheme.
const CONTROL_CHARS_PATTERN = /[\u0000-\u0020\u007f]+/g;

function isSafeHref(value) {
	const v = value.replace(CONTROL_CHARS_PATTERN, '');
	if (v === '') return false;
	if (/^(javascript|vbscript|file)\s*:/i.test(v)) return false;
	if (/^data\s*:/i.test(v)) return false;
	return true;
}

function isSafeImgSrc(value) {
	const v = value.replace(CONTROL_CHARS_PATTERN, '');
	if (v === '') return false;
	if (/^data\s*:image\//i.test(v)) return true;
	if (/^(javascript|vbscript|file|data)\s*:/i.test(v)) return false;
	return true;
}

function cleanNode(node) {
	if (node.nodeType === Node.COMMENT_NODE) {
		node.remove();
		return;
	}
	if (node.nodeType !== Node.ELEMENT_NODE) return;
	const tag = node.tagName.toLowerCase();
	if (BLOCKED_TAGS.has(tag)) {
		node.remove();
		return;
	}
	for (const attr of Array.from(node.attributes)) {
		const name = attr.name.toLowerCase();
		if (name.startsWith('on')) {
			node.removeAttribute(attr.name);
			continue;
		}
		if (name === 'srcdoc' || name === 'action' || name === 'formaction' || name === 'srcset') {
			node.removeAttribute(attr.name);
			continue;
		}
		if (URL_ATTRIBUTES.has(name)) {
			const safe = tag === 'img' && name === 'src' ? isSafeImgSrc(attr.value) : isSafeHref(attr.value);
			if (!safe) node.removeAttribute(attr.name);
			continue;
		}
		if (name === 'style' && DANGEROUS_STYLE_PATTERN.test(attr.value)) {
			node.removeAttribute(attr.name);
		}
	}
	for (const child of Array.from(node.childNodes)) cleanNode(child);
}

export function parseHtmlString(htmlString) {
	const template = document.createElement('template');
	template.innerHTML = String(htmlString).trim();
	for (const child of Array.from(template.content.childNodes)) cleanNode(child);
	const fragment = document.createDocumentFragment();
	Array.from(template.content.childNodes).forEach((node) => fragment.appendChild(node));
	return fragment;
}
