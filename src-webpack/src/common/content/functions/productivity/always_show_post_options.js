/* ===== Tweaks - Productivity - Always Show Post Options ===== */

/* === Triggered On Page Load === */
export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions'], function (result) {
		alwaysShowPostOptions(result.alwaysShowPostOptions);
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
									shreddit-post [bundlename="shreddit_post_overflow_menu"] {
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
	}, 5000);
}

// Function - Attach Menu And Move Items - New New
function attachMenu(post) {
	//console.log(post);
	if (!post.querySelector('.re-btn-menu > div')) {
		const postCreditBar = post.querySelector('[slot="credit-bar"]');
		//console.log(postCreditBar);
		const menu = document.createElement('div');
		menu.classList.add('re-btn-menu');
		postCreditBar.lastElementChild.appendChild(menu);
		//console.log(post.querySelector('shreddit-post-overflow-menu'));
		const postMenu = post.querySelector('shreddit-post-overflow-menu').shadowRoot;
		//console.log(postMenu);
		postMenu.querySelectorAll('faceplate-menu > li > div:not(.hidden)').forEach((item) => {
			//console.log(item);
			menu.appendChild(item);
		});
	}
}

// Observe feed for new posts - New New
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'ARTICLE') {
				const post = addedNode.querySelector('shreddit-post');
				if (addedNode) {
					attachMenu(post);
				}
				setTimeout(() => {
					const post = addedNode.querySelector('shreddit-post');
					if (addedNode) {
						attachMenu(post);
					}
				}, 3000);
			}
		});
	});
});
