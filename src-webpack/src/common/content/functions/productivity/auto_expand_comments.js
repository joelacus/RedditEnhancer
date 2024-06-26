/* ===== Tweaks - Productivity - Auto Expand Comments ===== */

/* === Triggered On Page Load === */
export function loadAutoExpandComments() {
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		autoExpandComments(result.autoExpandComments);
	});
}

/* === Main Function === */

// expands comments, and waits for comments to load to then expand sub comments etc.
// is there a better way? expand on scroll?
export function autoExpandComments(value) {
	if (redditVersion === 'new' && value === true) {
		setTimeout(() => {
			enableAutoExpandCommentsNew();
		}, 2000);
		setTimeout(() => {
			enableAutoExpandCommentsNew();
		}, 5000);
		setTimeout(() => {
			enableAutoExpandCommentsNew();
		}, 5000);
		setTimeout(() => {
			enableAutoExpandCommentsNew();
		}, 15000);
		setTimeout(() => {
			enableAutoExpandCommentsNew();
		}, 20000);
		setTimeout(() => {
			enableAutoExpandCommentsNew();
		}, 25000);
	} else if (redditVersion === 'newnew' && value === true) {
		setTimeout(() => {
			enableAutoExpandCommentsNewNew();
		}, 2000);
		setTimeout(() => {
			enableAutoExpandCommentsNewNew();
		}, 5000);
		setTimeout(() => {
			enableAutoExpandCommentsNewNew();
		}, 10000);
		setTimeout(() => {
			enableAutoExpandCommentsNewNew();
		}, 15000);
		setTimeout(() => {
			enableAutoExpandCommentsNewNew();
		}, 20000);
		setTimeout(() => {
			enableAutoExpandCommentsNewNew();
		}, 25000);
	}
}

// Function - Auto Expand Comments - New
function enableAutoExpandCommentsNew() {
	document.querySelectorAll('.Comment:has(> button > .icon-expand) > :last-child.undefined').forEach((el) => {
		if (window.getComputedStyle(el.parentElement.parentElement).display === 'block') {
			el.parentElement.querySelector('button').click();
		}
	});
	document.querySelectorAll('[id^="moreComments"]').forEach((el) => {
		el.querySelector('p').click();
	});
}

// Function - Auto Expand Comments - New New
function enableAutoExpandCommentsNewNew() {
	document.querySelectorAll('shreddit-comment button:has(span > svg):has(span > [number])').forEach((el) => {
		el.click();
	});
	document.querySelectorAll('shreddit-comment[collapsed]').forEach((el) => {
		el.removeAttribute('collapsed');
	});
}
