/* ===== Tweaks - Hide - Side Menu Icons Only ===== */

/* === Triggered On Page Load === */
export function loadSideMenuIconsOnly() {
	BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
		if (result.sideMenuIconsOnly) sideMenuIconsOnly(true);
	});
}

/* === Main Function === */
export function sideMenuIconsOnly(value) {
	if (redditVersion === 'newnew' && value === true) {
		// stylesheet 1
		if (!document.head.querySelector('style[id="re-side-menu-icons-only-1"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-side-menu-icons-only-1';
			styleElement.textContent = `left-nav-top-section::part(item),
										left-nav-create-community-button::part(item),
										reddit-sidebar-nav faceplate-expandable-section-helper span>span>[icon-name="caret-down-outline"],
										reddit-sidebar-nav faceplate-expandable-section-helper summary,
										#moderation_section a span > .text-14,
										custom-feed-edit-button span>.text-14,
										reddit-recent-pages::part(item),
										#RESOURCES span:has(>.text-14),
										reddit-sidebar-nav div:has([href="https://redditinc.com"]),
										#communities_section span:has(>.text-14),
										shreddit-app div#flex-nav-buttons {
											display: none !important;
										}
										left-nav-top-section::part(pad-item),
										left-nav-create-community-button::part(pad-item),
										#moderation_section a,
										custom-feed-edit-button li > div,
										reddit-recent-pages::part(pad-item),
										#RESOURCES a {
											padding-left: 0.25rem !important;
											width: fit-content;
											gap: 0;
											padding-right: 6px !important;
										}
										flex-left-nav-container#left-sidebar-container reddit-sidebar-nav#left-sidebar {
											padding-right: 0;
										}
										#communities_section div[role="button"] {
											padding: 5px !important;
										}
										custom-feed-edit-button div[role="button"],
										custom-feed-edit-button div[role="button"] > span {
											gap: 0 !important;
										}
										#moderation_section a > span {
											gap: 0 !important;
										}
										#left-sidebar-container {
											max-width: var(--re-side-menu-width) !important;
										}
										@media (min-width: 1200px) {
											.m\\:max-w-\\[calc\\(100vw-272px\\)\\] {
												max-width: calc(100vw - 72px) !important;
											}
										}
										@media (min-width: 1200px) {
											.m\\:grid-cols-\\[272px_1fr\\] {
												grid-template-columns: 72px 1fr !important;
											}
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// stylesheet 2
		const styleElement2 = document.createElement('style');
		styleElement2.id = 're-side-menu-icons-only-2';
		styleElement2.textContent = `left-nav-community-item::part(item),
									#moderation_section::part(item),
									left-nav-multireddit-item::part(item) {
                                        display: none !important;
                                    }
									left-nav-community-item::part(pad-item),
									#moderation_section::part(pad-item),
									left-nav-multireddit-item::part(pad-item) {
										padding-left: 0.25rem !important;
										width: fit-content;
										gap: 0;
										padding-right: 6px !important;
									}
									left-nav-multireddit-item::part(pad-item) > span {
										gap: 0 !important;
									}`;
		document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item').append(styleElement2);
		document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item').append(styleElement2.cloneNode(true));
		document.querySelector('left-nav-multireddits-controller').shadowRoot.querySelector('left-nav-multireddit-item').append(styleElement2.cloneNode(true));

		// set side menu width
		BROWSER_API.storage.sync.get(['hideSideMenuFavouriteButton'], function (result) {
			if (result.hideSideMenuFavouriteButton === true) {
				document.documentElement.style.setProperty('--re-side-menu-width', '72px');
			} else {
				document.documentElement.style.setProperty('--re-side-menu-width', '86px');
			}
		});

		// hide items
		enableSideMenuIconsOnly();
	} else {
		disableSideMenuIconsOnly();
	}
}

// Function - Enable Side Menu Icons Only - New New
function enableSideMenuIconsOnly() {
	// append part attribute to top section items
	document
		.querySelector('left-nav-top-section')
		.shadowRoot.querySelectorAll('span:has(>.text-14)')
		.forEach((item) => {
			item.setAttribute('part', 'item');
		});
	document
		.querySelector('left-nav-top-section')
		.shadowRoot.querySelectorAll('a')
		.forEach((item) => {
			item.setAttribute('part', 'pad-item');
		});
	// append part attribute to moderation items
	document.querySelectorAll('#moderation_section span:has(>.text-14)').forEach((item) => {
		item.setAttribute('part', 'item');
	});
	document
		.querySelector('#moderation_section left-nav-moderation-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has(>.text-14)').setAttribute('part', 'item');
		});
	document.querySelectorAll('#moderation_section a').forEach((item) => {
		item.setAttribute('part', 'pad-item');
	});
	document
		.querySelector('left-nav-moderation-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('a').setAttribute('part', 'pad-item');
		});
	// append part attribute to custom feed items
	document
		.querySelector('left-nav-multireddits-controller')
		.shadowRoot.querySelectorAll('left-nav-multireddit-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('a').setAttribute('part', 'pad-item');
		});
	document
		.querySelector('left-nav-multireddits-controller')
		.shadowRoot.querySelectorAll('left-nav-multireddit-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has(>.text-14)').setAttribute('part', 'item');
		});
	// append part attribute to recent items
	document.querySelector('reddit-recent-pages').shadowRoot.querySelector('summary').setAttribute('part', 'item');
	document
		.querySelector('reddit-recent-pages')
		.shadowRoot.querySelectorAll('span:has(>.text-14)')
		.forEach((item) => {
			item.setAttribute('part', 'item');
		});
	document
		.querySelector('reddit-recent-pages')
		.shadowRoot.querySelectorAll('a')
		.forEach((item) => {
			item.setAttribute('part', 'pad-item');
		});
	// append part attribute to community items
	document
		.querySelector('left-nav-communities-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has(>.text-14)').setAttribute('part', 'item');
		});
	document
		.querySelector('left-nav-communities-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('a').setAttribute('part', 'pad-item');
		});
}

// Function - Disable Side Menu Icons Only - New New
function disableSideMenuIconsOnly() {
	const styleElement1 = document.head.querySelectorAll('style[id="re-side-menu-icons-only-1"]');
	styleElement1.forEach((element) => {
		document.head.removeChild(element);
	});
	const styleElement2Parent = document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item');
	styleElement2Parent.querySelectorAll('style[id="re-side-menu-icons-only-2"]').forEach((element) => {
		styleElement2Parent.removeChild(element);
	});
	const styleElement3Parent = document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item');
	styleElement3Parent.querySelectorAll('style[id="re-side-menu-icons-only-2"]').forEach((element) => {
		styleElement3Parent.removeChild(element);
	});
	document.documentElement.style.setProperty('--re-side-menu-width', '272px');
	BROWSER_API.storage.sync.get(['sideMenuWidth'], function (result) {
		if (result.sideMenuWidth) {
			document.documentElement.style.setProperty('--re-side-menu-width', result.sideMenuWidth + 'px');
		} else {
			document.documentElement.style.setProperty('--re-side-menu-width', '272px');
		}
	});
}
