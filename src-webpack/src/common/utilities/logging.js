// ────────────────────────────────────────────────────────────────────────────
// Utility / Logging
// ────────────────────────────────────────────────────────────────────────────

/**
 * Sends log messages to the developer tools console instead of the web page console.
 * @param {string} type - The type of log (e.g., 'log', 'warn', 'error')
 * @param {string} message - The message to log
 */
export function logToDevConsole(type, message) {
	BROWSER_API.runtime.sendMessage({ log: type, message: message });
}
