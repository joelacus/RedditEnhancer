/**
 * Tweaks: Hide Elements - Force Show Vote Buttons
 *
 * @name forceShowVoteButtons
 * @description Force show the post vote buttons on old Reddit when some subreddit choose to hide them from the user.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadForceShowVoteButtons() {
	BROWSER_API.storage.sync.get(['forceShowVoteButtons'], function (result) {
		if (result.forceShowVoteButtons) forceShowVoteButtons(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function forceShowVoteButtons(value) {
	if (redditVersion === 'old' && value) {
		enableForceShowVoteButtons();
	} else {
		disableForceShowVoteButtons();
	}
}

// Enable Force Show Vote Buttons - RV1
function enableForceShowVoteButtons() {
	if (!document.head.querySelector('style[id="re-force-show-vote-buttons"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-force-show-vote-buttons';
		styleElement.textContent = `.arrow.up,
									.arrow.down {
										display: block !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Force Show Vote Buttons - RV1
function disableForceShowVoteButtons() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-force-show-vote-buttons"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
