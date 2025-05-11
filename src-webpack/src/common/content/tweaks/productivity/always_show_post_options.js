/* ===== Tweaks - Productivity - Always Show Post Options ===== */

/* === Triggered On Page Load === */
export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions', 'hidePostNotificationOption', 'hidePostSaveOption', 'hidePostHideOption', 'hidePostReportOption', 'hidePostEditOption', 'hidePostDeleteOption', 'hidePostSpoilerOption', 'hidePostNSFWOption', 'hidePostBrandAwarenessOption'], function (result) {
		if (result.alwaysShowPostOptions) alwaysShowPostOptions(true);
		if (result.hidePostNotificationOption) hidePostNotificationOption(true);
		if (result.hidePostSaveOption) hidePostSaveOption(true);
		if (result.hidePostHideOption) hidePostHideOption(true);
		if (result.hidePostReportOption) hidePostReportOption(true);
		if (result.hidePostEditOption) hidePostEditOption(true);
		if (result.hidePostDeleteOption) hidePostDeleteOption(true);
		if (result.hidePostSpoilerOption) hidePostSpoilerOption(true);
		if (result.hidePostNSFWOption) hidePostNSFWOption(true);
		if (result.hidePostBrandAwarenessOption) hidePostBrandAwarenessOption(true);
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

// Function - Enable Hide "Notification" Option - New New
export function hidePostNotificationOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-notification-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-notification-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="notification-outline"]),
											.re-btn-menu > div:has([icon-name="notification-fill"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-notification-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Save" Option - New New
export function hidePostSaveOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-save-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-save-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="save-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-save-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Hide" Option - New New
export function hidePostHideOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-hide-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-hide-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="hide-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-hide-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Report" Option - New New
export function hidePostReportOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-report-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-report-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="report-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-report-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Edit" Option - New New
export function hidePostEditOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-edit-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-edit-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="edit-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-edit-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Delete" Option - New New
export function hidePostDeleteOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-delete-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-delete-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="delete-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-delete-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Spoiler" Option - New New
export function hidePostSpoilerOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-spoiler-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-spoiler-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="spoiler-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-spoiler-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "NSFW" Option - New New
export function hidePostNsfwOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-nsfw-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-nsfw-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="nsfw-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-nsfw-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Function - Enable Hide "Brand Awareness" Option - New New
export function hidePostBrandAwarenessOption(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-post-brand-awareness-option"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-brand-awareness-option';
				styleElement.textContent = `.re-btn-menu > div:has([icon-name="brand-awareness-outline"]) {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-brand-awareness-option"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}
