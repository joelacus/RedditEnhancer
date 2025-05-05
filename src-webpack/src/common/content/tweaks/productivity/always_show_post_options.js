/* ===== Tweaks - Productivity - Always Show Post Options ===== */

/* === Triggered On Page Load === */
export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions'], function (result) {
		if (result.alwaysShowPostOptions) alwaysShowPostOptions(true);
	});
}

/* === Main Function === */
export function alwaysShowPostOptions(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableAlwaysShowPostOptionsNewNew();
		}
	}
}

// Function - Enable Always Show Post Options - New New
function enableAlwaysShowPostOptionsNewNew() {
	if (!document.querySelector('style[id="re-post-expand-menu"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-post-expand-menu';
		styleElement.textContent = `shreddit-post .re-btn-menu {
										display: inline-flex;
										margin: 0;
										padding: 0;
									}
									shreddit-post .re-btn-menu > div {
										border-radius: 0.5rem;
										padding: 4px 6px 2px 6px !important;
										grid-gap: 0;
									}
									shreddit-post .re-btn-menu > div > span > span:has(span.text-14) {
										display: none;
									}
									.re-btn-menu + [bundlename="shreddit_post_overflow_menu"] {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	setTimeout(() => {
		if (document.querySelector('[routename="post_page"]')) {
			attachMenu(document.querySelector('shreddit-post'));
		} else {
			document.querySelectorAll('shreddit-post').forEach((post) => {
				attachMenu(post);
			});
			observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
		}
	}, 100);
}

// Function - Attach Menu And Move Items - New New
function attachMenu(post) {
	if (!post.querySelector('.re-btn-menu > div')) {
		const postCreditBar = post.querySelector('[slot="credit-bar"]');
		const menu = document.createElement('div');
		menu.classList.add('re-btn-menu');
		postCreditBar.lastElementChild.insertBefore(menu, postCreditBar.lastElementChild.lastElementChild);
		const postMenu = post.querySelector('shreddit-post-overflow-menu');
		if (postMenu.shadowRoot) {
			postMenu.shadowRoot.querySelectorAll('faceplate-menu > li > div:not(.hidden)').forEach((item) => {
				menu.appendChild(item);
			});
		}
	}
}

// Observe feed for new posts - New New
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (['TIME', 'ARTICLE', 'DIV'].includes(addedNode.nodeName)) {
				document.querySelectorAll('shreddit-post').forEach(attachMenu);
			}
		});
	});
});
