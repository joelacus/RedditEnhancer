/* ===== Tweaks - Productivity - Add Scroll To Long Text Posts ===== */

/* === Triggered On Page Load === */
export function loadTextPostScroll() {
	BROWSER_API.storage.sync.get(['textPostScroll'], function (result) {
		textPostScroll(result.textPostScroll);
	});
}

/* === Main Function === */
export function textPostScroll(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			document.body.classList.add('re-text-scroll');
		} else if (value === false || value == undefined) {
			document.body.classList.remove('re-text-scroll');
		}
	}
}
