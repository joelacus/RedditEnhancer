/* ===== Tweaks - Productivity - Show Post Numbers ===== */

/* === Triggered On Page Load === */
export function loadShowPostNumbers() {
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers) showPostNumbers(true);
	});
}

/* === Main Function === */
let postNumber = 1;

export function showPostNumbers(value) {
	postNumber = 1;
	const link = window.location.href;
	if (redditVersion === 'new') {
		if (link.indexOf('/comments/') <= 0 && link.indexOf('/settings/') <= 0 && link.indexOf('/user/') <= 0) {
			// not post, not settings
			if (value === true) {
				// get all posts in feed
				const posts = document.querySelectorAll('.Post:not(.promotedlink):not(.re-break-reminder)');
				const post_array = [...posts];
				post_array.forEach((element, index) => {
					if (!element.querySelector('.re-post-number')) {
						const el = element.querySelector('[id^="vote-arrows-"]').parentElement;
						// create number element
						const span = document.createElement('span');
						span.classList.add('re-post-number');
						span.textContent = postNumber++;
						el.appendChild(span);
						el.parentElement.style.minHeight = '110px';
					}
				});
				observer.observe(document.querySelector('.ListingLayout-outerContainer'), { childList: true, subtree: true });
			} else if (value === false || value == undefined) {
				observer.disconnect();
				const numbers = document.querySelectorAll('.re-post-number');
				numbers.forEach((el) => {
					el.remove();
				});
				postNumber = 1;
			}
		}
	}
}

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				const post = addedNode.querySelector('.Post');
				if (post) {
					const posts = document.querySelectorAll('.Post:not(.promotedlink):not(.re-break-reminder)');
					const post_array = [...posts];
					post_array.forEach((element, index) => {
						if (!element.querySelector('.re-post-number')) {
							const el = element.querySelector('[id^="vote-arrows-"]').parentElement;
							// create number element
							const span = document.createElement('span');
							span.classList.add('re-post-number');
							span.textContent = postNumber++;
							el.appendChild(span);
							el.parentElement.style.minHeight = '110px';
						}
					});
				}
			}
		});
	});
});
