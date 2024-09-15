/* ===== Tweaks - Style - Border Radius ===== */

/* === Triggered On Page Load === */
export function loadBorderRadiusAmount() {
	BROWSER_API.storage.sync.get(['borderRadiusAmount'], function (result) {
		borderRadiusAmount(result.borderRadiusAmount);
	});
}

/* === Main Function === */
export function borderRadiusAmount(value) {
	if (redditVersion === 'newnew') {
		if (parseInt(value) >= 0) {
			document.documentElement.style.setProperty('--re-theme-border-radius', value + 'px');
			if (!document.querySelector('style[id="re-theme-border-radius"]')) {
				addBorderRadiusAmountStylesheet();
			}
		} else if (parseInt(value) === -1 || value == undefined) {
			document.documentElement.style.removeProperty('--re-theme-border-radius');
			removeBorderRadiusAmountStylesheet();
		}
	}
}

// Function - Add Border Radius Amount Stylesheet
function addBorderRadiusAmountStylesheet() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-theme-border-radius';
	styleElement.textContent = `.xs\\:rounded-\\[16px\\],
                                .rounded-\\[8px\\],
                                .rounded-\\[1rem\\],
                                comment-body-header,
                                shreddit-comment-tree,
                                shreddit-post .hover-card {
                                    border-radius: var(--re-theme-border-radius) !important;
                                }
                                .rounded-\\[16px\\],
                                :where(button), :where(input):where([type="submit"], [type="reset"], [type="button"]),
                                .button {
                                    border-radius: calc(var(--re-theme-border-radius) / 2) !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Remove Border Radius Amount Stylesheet
function removeBorderRadiusAmountStylesheet() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-border-radius"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
