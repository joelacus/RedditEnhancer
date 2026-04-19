/**
 * Tweaks: Productivity - Canned Messages
 *
 * @name cannedMessages
 * @description Add a dropdown menu with user-defined canned messages that can be copied to clipboard.
 *
 * Most logic in background.js
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// Listen for messages from background script (context menu)
BROWSER_API.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'copyCannedMessage' && request.message) {
		console.log(request);
		copyToClipboard(request.message);
		showCopyConfirmation();
	}
});

// ─── Clipboard and UI Functions ─────────────────────────────────────────────

function copyToClipboard(text) {
	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(text).catch((err) => {
			console.error('Failed to copy to clipboard:', err);
			fallbackCopyToClipboard(text);
		});
	} else {
		fallbackCopyToClipboard(text);
	}
}

function fallbackCopyToClipboard(text) {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.style.position = 'fixed';
	textArea.style.left = '-9999px';
	document.body.appendChild(textArea);
	textArea.select();
	try {
		document.execCommand('copy');
	} catch (err) {
		console.error('Fallback copy failed:', err);
	}
	document.body.removeChild(textArea);
}

function showCopyConfirmation() {
	// Create temporary confirmation message
	const confirmation = document.createElement('div');
	confirmation.textContent = 'Copied!';
	confirmation.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: var(--color-accent, #0079d3);
		color: white;
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 600;
		z-index: 999999;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		animation: fadeInOut 2s ease-in-out;
	`;

	// Add animation keyframes if not already present
	if (!document.getElementById('re-canned-messages-animation')) {
		const style = document.createElement('style');
		style.id = 're-canned-messages-animation';
		style.textContent = `
			@keyframes fadeInOut {
				0% { opacity: 0; transform: translateY(-10px); }
				15% { opacity: 1; transform: translateY(0); }
				85% { opacity: 1; transform: translateY(0); }
				100% { opacity: 0; transform: translateY(-10px); }
			}
		`;
		document.head.appendChild(style);
	}

	document.body.appendChild(confirmation);

	setTimeout(() => {
		if (confirmation.parentNode) {
			confirmation.parentNode.removeChild(confirmation);
		}
	}, 2000);
}
