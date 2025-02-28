/* ===== Tweaks - Productivity - Show Post Numbers ===== */

/* === Triggered On Page Load === */
export function loadShowPostNumbers() {
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers) showPostNumbers(true);
	});
}

/* === Main Function === */
let postNumber = 1;
let view;

export function showPostNumbers(value) {
	// Do not run post numbers on post and settings pages
	const noRoute = ['comments', 'settings', 'user'];

	if (value) {
		if (redditVersion === 'new' && !window.location.pathname.includes(noRoute)) {
			// Get the current view
			const layoutSwitchIcon = document.querySelector('button#LayoutSwitch--picker > span > i');
			if (layoutSwitchIcon) {
				view = layoutSwitchIcon.className.split('_').pop();
			}
			console.log(view);

			postNumber = 1;
			attachPostCount(postNumber);
			observer.observe(document.querySelector('.ListingLayout-outerContainer'), {childList: true, subtree: true});
		}
	} else {
		observer.disconnect();
		const numbers = document.querySelectorAll('.re-post-number');
		numbers.forEach((el) => {
			el.remove();
		});
		postNumber = 1;
	}
}

function attachPostCount() {
	const posts = document.querySelectorAll('.Post.scrollerItem:not(.promotedlink):not(.re-break-reminder)');
	const post_array = [...posts];
	post_array.forEach((element) => {
		if (!element.querySelector('.re-post-number')) {
			let el, span;

			if (view === 'card') {
				el = element.querySelector('div:has(> div > div[data-adclicklocation="top_bar"])');
				span = Object.assign(document.createElement('span'), {
					className: 're-post-number',
					innerHTML: `${postNumber++} &centerdot;`
				});
				el.insertBefore(span, el.firstChild);
			}
		}
	});
}

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			console.log(addedNode);
			if (addedNode.nodeName === 'I') {
				postNumber = 1;
				attachPostCount();
			} else if (addedNode.nodeName === 'DIV') {
				if (addedNode.querySelector('div[data-scroller-first]')) {
					postNumber = 1;
					attachPostCount();
				} else {
					const post = addedNode.querySelector('.Post');
					if (post) {
						attachPostCount();
					}
				}
			}
		});
	});
});
