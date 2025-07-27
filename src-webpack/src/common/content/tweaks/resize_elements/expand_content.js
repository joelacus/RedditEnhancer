/**
 * Tweaks: Resize Feed/Post - Expand Feed/Post
 *
 * @name expandLayout
 * @description Resize the width of feeds and posts.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
import { showBannerMessage } from '../../banner_message';

export function loadExpandContent() {
	BROWSER_API.storage.sync.get(['snapSidebar', 'expandLayout', 'expandLayoutWidth', 'expandSubWidth', 'expandPostWidth', 'expandPostOverlayWidth', 'expandUserProfileWidth', 'expandTopicFeedWidth', 'expandCustomFeedWidth', 'resizeMainContainerWidth'], function (result) {
		snap = result.snapSidebar;
		if (result.expandLayout) expandLayout(true);
		expandLayoutWidth(result.expandLayoutWidth);
		expandSubWidth(result.expandSubWidth);
		expandPostWidth(result.expandPostWidth);
		expandPostOverlayWidth(result.expandPostOverlayWidth);
		expandUserProfileWidth(result.expandUserProfileWidth);
		expandTopicFeedWidth(result.expandTopicFeedWidth);
		expandCustomFeedWidth(result.expandCustomFeedWidth);
		resizeMainContainerWidth(result.resizeMainContainerWidth);
	});
}

let snap = false;

/* === Enable/Disable The Feature === */
export function expandLayout(value) {
	if (value) {
		switch (redditVersion) {
			case 'old':
				enableExpandContentRV1();
				break;
			case 'newnew':
				enableExpandContentRV3();
				break;
		}
	} else {
		disableExpandContentAll();
	}
}

export function snapSidebar(value) {
	showBannerMessage('info', '[RedditEnhancer] Changes will take effect after a reload or the next time you load Reddit.');
}

// Enable Expand Content - RV1
function enableExpandContentRV1() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `div.content {
									margin: .5rem 0;
								}
								.listing-page div.content[role="main"],
								.messages-page div.content[role="main"],
								.wiki-page div.content[role="main"],
								.submit-page div.content[role="main"],
								.moderator div.content[role="main"] {
									width: var(--re-content-width);
									max-width: calc(100% - 15px);
								}
								.comments-page div.content[role="main"],
								.other-discussions-page div.content[role="main"] {
									width: var(--re-post-width);
									margin: .5rem 8px;
									max-width: calc(100% - 2rem);
								}
								.profile-page div.content[role="main"] {
									width: var(--re-user-profile-width);
								}
								.listing-page.multi-page div.content[role="main"] {
									width: var(--re-custom-feed-width);
									max-width: calc(100% - 15px);
								}
								/* Expand the post content, comments and wiki page content */
								.md,
								div.content[role="main"] .subreddit-rules-page,
								div.search-result-group {
									max-width: initial !important;
								}
								div.search-result-group {
									padding: 1rem;
								}
								.wiki-page div.wiki-page-content {
									margin: 8px;
								}
								div.panestack-title,
								p#noresults,
								div.infobar,
								.commentarea div.menuarea {
									margin: 10px 0;
								}
								.comments-page div.midcol,
								div.gold-accent.comment-visits-box,
								div.commentarea > form.usertext {
									margin-left: 0 !important;
								}
								.res-commentBoxes div.comment {
									margin: 0 0 8px 0 !important;
								}
								div.searchpane {
									margin: 5px;
								}
								div.markdownEditor-wrapper,
								div.usertext-edit textarea,
								div.roundfield .usertext-edit,
								.moderator div.usertext-edit.md-container,
								form#compose-message div.roundfield {
									width: 100%;
									max-width: initial;
								}
								.comments-page div.usertext-edit.md-container {
									width: 50%;
									max-width: initial;
								}
								/* Submit post page */
								.submit-page div.formtabs-content,
								div.usertext.usertext--with-margin {
									width: 100%;
								}
								.submit-page div.roundfield {
									width: calc(100% - 20px);
								}
								div.roundfield textarea[name="title"],
								div.roundfield input[type="text"],
								div.roundfield input[type="url"],
								div.roundfield input[type="password"],
								div.roundfield input[type="number"],
								#compose-message div.roundfield select {
									width: calc(100% - .5rem);
								}
								/* Moderator pages */
								div.linefield,
								div.linefield.mobile {
									width: 60%;
								}
								/* Changes for "Modernise Old Reddit" */
								.re-modernise #re-container {
									display: flex;
								}
								.re-modernise .content > .tabmenu {
									margin-top: 16px !important;
									width: calc(100% - 75px) !important;
								}
								.re-modernise .comments-page #siteTable {
									margin-left: 0 !important;
									width: 100% !important;
								}
								.re-modernise .comments-page .tabmenu {
									margin-left: 0 !important;
									width: calc(100% - 28px) !important;
								}
								.re-modernise .side {
									margin-left: 0 !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Enable Expand Content - RV3
function enableExpandContentRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `
		@media (min-width: 960px) {
			/* Prevent the outer container from glitching on FF */
			.grid-container:not(.grid-full) {
				max-width: 100vw;
			}
			shreddit-app .grid-container:not(.grid-full) .subgrid-container,
			shreddit-app[routename="compose_message"] .subgrid-container {
				width: 100%;
				max-width: revert;
				gap: revert;
				padding: revert;
			}
			shreddit-app main.main > div {
				max-width: revert;
			}
			div.main-container.grid,
			div.main-container.flex {
				display: grid;
            	grid-template-columns: 1fr minmax(0,316px);
            	gap: 1.25rem;
            	margin: 0 auto;
            }
            .masthead > div,
            .masthead > section {
            	margin: 0 auto;
            }
            shreddit-gallery-carousel > li {
            	padding: 0 !important;
			}
            community-appearance-entrypoint[target="banner"] {
                margin-bottom: 5rem !important;
            }
        }`;
	if (!snap) {
		styleElement.textContent += `
			@media (min-width: 960px) {
				shreddit-app .main-container,
				shreddit-app[routename="frontpage"] .main-container,
				shreddit-app[routename="all"] .main-container,
				shreddit-app[routename="popular"] .main-container,
				shreddit-app[routename="popular"] .masthead > div,
				shreddit-app[routename="mod_queue_all"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\],
				shreddit-app[pagetype="search_results"] .main-container,
				shreddit-app[pagetype="search_results"] .masthead > div,
				shreddit-app[pagetype="post_submit"] .main-container,
				shreddit-app[routename="inbox"] .main-container,
				shreddit-app[routename^="settings-"] .main-container,
				shreddit-app[routename="community_page"] .main-container,
				shreddit-app[pagetype="explore"] .main-container,
				shreddit-app[routename="compose_message"] .main-container {
					max-width: min(var(--re-content-width), var(--re-main-container-width));
				}
				shreddit-app[routename^="subreddit"] .main-container,
				shreddit-app[routename^="subreddit"] .masthead,
				shreddit-app[routename="mod_queue"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\] {
					max-width: min(var(--re-sub-width), var(--re-main-container-width));
				}
				.re-full-width-banner .masthead > section {
					max-width: min(var(--re-sub-width), var(--re-main-container-width));
				}
				shreddit-app[routename="post_page"] .main-container,
				shreddit-app[routename="comments_page"] .main-container,
				shreddit-app[routename="profile_post_page"] .main-container,
				shreddit-app[routename="profile_post_page_comments"] .main-container,
				shreddit-app[routename="post_stats"] .main-container,
				shreddit-app[routename="CommentStats"] .main-container {
					max-width: min(var(--re-post-width), var(--re-main-container-width));
				}
				shreddit-app[routename="profile_overview"] .main-container,
				shreddit-app[routename="profile_posts"] .main-container,
				shreddit-app[routename="profile_comments"] .main-container,
				shreddit-app[routename="profile_saved"] .main-container,
				shreddit-app[routename="profile_hidden"] .main-container,
				shreddit-app[routename="profile_upvoted"] .main-container,
				shreddit-app[routename="profile_downvoted"] .main-container {
					max-width: min(var(--re-user-profile-width), var(--re-main-container-width));
				}
				shreddit-app[routename="topic"] .main-container {
					max-width: min(var(--re-topic-feed-width), var(--re-main-container-width));
				}
				shreddit-app[pagetype="custom_feed"] .main-container {
					max-width: min(var(--re-custom-feed-width), var(--re-main-container-width));
				}
				shreddit-app[pagetype="custom_feed"] div.masthead custom-feed-header {
					display: block;
					max-width: min(var(--re-custom-feed-width), var(--re-main-container-width));
					margin: 0 auto;
				}
				main.main#main-content {
					max-width: 100%;
				}
			}`;
	} else {
		styleElement.textContent += `
			@media (min-width: 960px) {
				div.main-container.grid,
				div.main-container.flex {
					max-width: 100%;
					padding: 0 1.5rem;
					box-sizing: border-box;
				}
				shreddit-app main.main,
				shreddit-app[routename="frontpage"] main.main,
				shreddit-app[routename="all"] main.main,
				shreddit-app[routename="popular"] main.main,
				shreddit-app[routename="mod_queue_all"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\],
				shreddit-app[pagetype="search_results"] main.main,
				shreddit-app[pagetype="post_submit"] main.main,
				shreddit-app[routename="inbox"] main.main,
				shreddit-app[routename^="settings-"] main.main,
				shreddit-app[routename="community_page"] main.main,
				shreddit-app[pagetype="explore"] main.main,
				shreddit-app[routename="compose_message"] main.main {
					max-width: var(--re-content-width);
					margin: 0 auto;
				}
				shreddit-app[routename^="subreddit"] main.main,
				shreddit-app[routename="subreddit_wiki"] main.main,
				shreddit-app[routename="mod_queue"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\] {
					max-width: var(--re-sub-width);
					margin: 0 auto;
				}
				shreddit-app[routename="popular"] .masthead,
				shreddit-app[routename^="subreddit"] .masthead,
				shreddit-app[routename="subreddit_wiki"] .masthead {
					padding: 0 1.5rem;
				}
				shreddit-app[routename^="subreddit"] .masthead > section,
				shreddit-app[routename="subreddit_wiki"] .masthead > section {
					max-width: revert;
				}
				shreddit-app[routename="post_page"] main.main,
				shreddit-app[routename="comments_page"] main.main,
				shreddit-app[routename="profile_post_page"] main.main,
				shreddit-app[routename="profile_post_page_comments"] main.main,
				shreddit-app[routename="post_stats"] main.main,
				shreddit-app[routename="CommentStats"] main.main {
					max-width: var(--re-post-width);
					margin: 1rem auto;
				}
				shreddit-app[routename="profile_overview"] main.main,
				shreddit-app[routename="profile_posts"] main.main,
				shreddit-app[routename="profile_comments"] main.main,
				shreddit-app[routename="profile_saved"] main.main,
				shreddit-app[routename="profile_hidden"] main.main,
				shreddit-app[routename="profile_upvoted"] main.main,
				shreddit-app[routename="profile_downvoted"] main.main {
					max-width: var(--re-user-profile-width);
					margin: 0 auto;
				}
				shreddit-app[routename="topic"] main.main {
					max-width: var(--re-topic-feed-width);
					margin: 0 auto;
				}
				shreddit-app[pagetype="custom_feed"] div.masthead {
					width: calc(100% - 3rem);
					margin: 0 1.5rem;
				}
				shreddit-app[pagetype="custom_feed"] main.main {
					max-width: var(--re-custom-feed-width);
					margin: 0 auto;
				}
			}`;
	}
	document.head.appendChild(styleElement);
	document.documentElement.classList.add('re-expand-feed-layout');
}

// Disable Expand Content - All
function disableExpandContentAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-expand-feed-layout"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.documentElement.classList.remove('re-expand-feed-layout');
}

// Page Style Property - Expand Layout Width
export function expandLayoutWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-content-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-content-width', '80%');
	}
}

// Page Style Property - Expand Post Overlay Width
export function expandPostOverlayWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-post-overlay-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-post-overlay-width', '80%');
	}
}

// Page Style Property - Expand Post Width
export function expandPostWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-post-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-post-width', '80%');
	}
}

// Page Style Property - Expand Sub Reddit Width
export function expandSubWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-sub-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-sub-width', '80%');
	}
}

// Page Style Property - Expand User Profile Feed Width
export function expandUserProfileWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-user-profile-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-user-profile-width', '80%');
	}
}

// Page Style Property - Expand Topic Feed Width
export function expandTopicFeedWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-topic-feed-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-topic-feed-width', '80%');
	}
}

// Page Style Property - Expand Custom Feed Width
export function expandCustomFeedWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-custom-feed-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-custom-feed-width', '80%');
	}
}

// Set the custom width
export function resizeMainContainerWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-main-container-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-main-container-width');
	}
}
