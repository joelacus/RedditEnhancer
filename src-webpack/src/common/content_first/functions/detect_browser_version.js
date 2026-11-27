// ────────────────────────────────────────────────────────────────────────────
// Detect Firefox Version
// ────────────────────────────────────────────────────────────────────────────

export function detectFirefoxVersion() {
	const userAgent = navigator.userAgent;
	const match = userAgent.match(/Firefox\/(\d+)/);
	if (match && match[1]) {
		const firefoxVersion = parseInt(match[1], 10);
		// Firefox 128 is the first version that supports optional_host_permissions in Manifest V3.
		return firefoxVersion < 128;
	}
	return null;
}
