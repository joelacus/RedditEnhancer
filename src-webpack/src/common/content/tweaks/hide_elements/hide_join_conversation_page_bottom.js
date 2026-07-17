/**
 * Tweaks: Hide Elements - Hide "Join the conversation" at the Bottom of the Page
 *
 * @name hideJoinConversationPageBottom
 * @description Hide the create new comment "Join the conversation" input box from appearing at the bottom of the post page as you scroll down.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideJoinConversationPageBottom() {
	BROWSER_API.storage.sync.get(['hideJoinConversationPageBottom'], function (result) {
		if (result.hideJoinConversationPageBottom) hideJoinConversationPageBottom(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideJoinConversationPageBottom(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideJoinConversationPageBottom();
	} else {
		disableHideJoinConversationPageBottom();
	}
}

// Enable Hide Join Conversation Input at the Bottom of the Page - RV3
function enableHideJoinConversationPageBottom() {
	if (!document.head.querySelector('style[id="re-hide-join-conversation-page-bottom"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-join-conversation-page-bottom';
		styleElement.textContent = `shreddit-app > #sticky-comment-composer-wrapper {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Join Conversation Input at the Bottom of the Page - RV3
function disableHideJoinConversationPageBottom() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-join-conversation-page-bottom"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
