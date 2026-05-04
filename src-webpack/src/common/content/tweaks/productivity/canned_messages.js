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

import i18next from 'i18next';
import { showToast } from '../../../utilities/toast_notification';

// Listen for messages from background script (context menu)
BROWSER_API.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'copyCannedMessage' && request.message) {
		copyToClipboard(request.message);
		showToast('success', i18next.t('CopiedMessage.message'));
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
