// ────────────────────────────────────────────────────────────────────────────
// Utility / Escape HTML
// ────────────────────────────────────────────────────────────────────────────

export function escapeHtml(text) {
	if (text === null || text === undefined) return '';
	const div = document.createElement('div');
	div.textContent = String(text);
	// innerHTML escapes &, < and >, but leaves quotes untouched — that is
	// unsafe when the result is interpolated into a quoted attribute
	// (title="…", value='…'), where the value could break out of the
	// attribute. Escape quotes too so the output is safe in both element and
	// attribute context.
	return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
