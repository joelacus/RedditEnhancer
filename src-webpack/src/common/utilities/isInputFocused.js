// ────────────────────────────────────────────────────────────────────────────
// Utility / Is Input Focused
// ────────────────────────────────────────────────────────────────────────────

export const isInputFocused = () => {
	const active = document.activeElement;
	if (!active) return false;

	switch (active.tagName) {
		case 'INPUT':
		case 'TEXTAREA':
		case 'REDDIT-SEARCH-LARGE':
		case 'SHREDDIT-COMPOSER':
			return true;
		default:
			return active.isContentEditable || !!active.shadowRoot?.querySelector('[data-testid="reddit-chat-client"]');
	}
};
