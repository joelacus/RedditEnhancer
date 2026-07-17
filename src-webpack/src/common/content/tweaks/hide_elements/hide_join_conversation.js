/**
 * Tweaks: Hide Elements - Hide "Join the conversation"
 *
 * @name hideJoinConversation
 * @description Hide the create new comment "Join the conversation" input box.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideJoinConversation() {
	BROWSER_API.storage.sync.get(['hideJoinConversation'], function (result) {
		if (result.hideJoinConversation) hideJoinConversation(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideJoinConversation(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideJoinConversation();
	} else {
		disableHideJoinConversation();
	}
}

// Enable Hide Join Conversation Input - RV3
function enableHideJoinConversation() {
	if (!document.head.querySelector('style[id="re-hide-join-conversation"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-join-conversation';
		styleElement.textContent = `shreddit-app[routename="post_page"] comment-body-header comment-composer-host {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Join Conversation Input - RV3
function disableHideJoinConversation() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-join-conversation"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
