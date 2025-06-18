/**
 * Tweaks: Hide Elements - Hide post separators
 * @name hidePostDivider
 * @description Hide the separator lines between entries in feeds (frontpage, subreddits, etc.)
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHidePostDivider() {
	BROWSER_API.storage.sync.get(['hidePostDivider', 'postSeparatorHeight']).then((result) => {
		if (result.hidePostDivider) {
			hidePostDivider(true);
			postSeparatorHeight(result.postSeparatorHeight);
		}
	});
}

// Activate the feature based on Reddit version
export function hidePostDivider(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableHidePostDivider();
		} else {
			disableHidePostDivider();
		}
	}
}

// Enable the feature
function enableHidePostDivider() {
	if (!document.head.querySelector('style[id="re-hide-post-divider"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-divider';
		styleElement.textContent = `shreddit-title ~ hr,
									article ~ hr,
									faceplate-tracker ~ hr,
									faceplate-tracker > hr,
									custom-feed > hr,
									search-telemetry-tracker ~ hr,
									comment-body-header > hr {
										display: none;
										visibility: hidden;
									}
									/* Add margins between posts to compensate for removed dividers, Card and Compact view */
									article:has(> shreddit-post[view-type="cardView"]),
									faceplate-batch > article:has(> shreddit-post[view-type="cardView"]),
									community-highlight-carousel[feed-view-type="cardView"],
									/* Comment search results */
									reddit-feed > faceplate-tracker > div {
										margin-bottom: var(--re-post-separator-height, 10px) !important;
									}
									article:has(> shreddit-post[view-type="compactView"]) {
										margin-bottom: var(--re-post-separator-height, 0) !important;
									}
									main#main-content search-telemetry-tracker > div,
									main.main search-telemetry-tracker > div,
									main.main post-consume-tracker > div {
										margin: var(--re-post-separator-height, 0) 0;
									}
									shreddit-async-loader[bundlename="feed_announcement"] {
										margin: 0;
										margin-bottom: var(--re-post-separator-height, 10px);
									
										& > feed-announcement {
											margin: 0;
										}
									}
									/* Add padding to posts, Card and Compact view */
									article > shreddit-post[view-type="cardView"] {
										margin: 0 !important;
										padding: .7rem !important;
									}
									article > shreddit-post[view-type="compactView"] {
										padding: .25rem .5rem !important;
										margin: 0 !important;
									}
									/* Allow spaces for post selection checkboxes in mod queue */
									shreddit-app[routename="mod_queue"] article > shreddit-post,
									shreddit-app[routename="mod_queue_all"] article > shreddit-post {
										padding-left: 2rem !important;
									}
									
									#right-sidebar-contents aside:has(shreddit-subreddit-header) {
										backdrop-filter: initial !important;
									}
									shreddit-app[routename='subreddit'] #right-sidebar-container aside,
									shreddit-app[routename='subreddit_wiki'] #right-sidebar-container aside,
									shreddit-app[routename='post_page'] #right-sidebar-container aside,
									shreddit-app[routename='comment_page'] #right-sidebar-container aside {
										background-color: transparent;
									
										> .py-md {
											padding: 0;
										}
										shreddit-subreddit-header, ::part(header), ::part(achievements-entrypoint), shreddit-subreddit-header ~ div.px-md {
											background-color: var(--color-neutral-background-weak);
											backdrop-filter: blur(var(--re-theme-blur));
											margin-bottom: 1rem;
											border-radius: var(--re-theme-border-radius, 8px);
										}
										::part(header), ::part(achievements-entrypoint), shreddit-subreddit-header ~ div.px-md {
											padding: 1rem;
										}
										community-author-flair {
											margin-bottom: 0;
										}
										hr {
											display: none;
										}
									}
									shreddit-app[pagetype='custom_feed'] #right-sidebar-container {
										aside {
											background-color: transparent;
										}
										aside > div.px-md,
										custom-feed-description,
										custom-feed-community-list,
										custom-feed-recommendations {
											background-color: var(--color-neutral-background-weak);
											margin-bottom: 1rem;
											border-radius: var(--re-theme-border-radius, 8px);
											backdrop-filter: blur(var(--re-theme-blur));
										}
										custom-feed-description {
											padding: 0.5rem 0;
										}
										custom-feed-community-list,
										custom-feed-recommendations {
											padding-bottom: 1rem;
										}
										aside > div.px-md {
											padding: 1rem;
										}
										hr {
											display: none;
										}
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable the feature
function disableHidePostDivider() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-divider"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Set custom height for post separators
export function postSeparatorHeight(value) {
	if (value && value >= 0) {
		document.documentElement.style.setProperty('--re-post-separator-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-separator-height');
	}
}
