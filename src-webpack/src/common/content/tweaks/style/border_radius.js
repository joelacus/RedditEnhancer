/**
 * Tweaks: Style - Border Radius
 *
 * @name borderRadiusAmount
 * @description Change the corner radius of various UI elements on Reddit.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadBorderRadiusAmount() {
	BROWSER_API.storage.sync.get(['borderRadiusAmount'], function (result) {
		if (result.borderRadiusAmount) borderRadiusAmount(result.borderRadiusAmount);
	});
}

/* === Enable/Disable The Feature === */
export function borderRadiusAmount(value) {
	if (redditVersion === 'newnew') {
		if (parseInt(value) >= 0) {
			document.documentElement.style.setProperty('--re-theme-border-radius', value + 'px');
			if (!document.querySelector('style[id="re-theme-border-radius"]')) {
				addBorderRadiusAmountStylesheet();
			}
		} else if (parseInt(value) === -1 || value === undefined) {
			document.documentElement.style.removeProperty('--re-theme-border-radius');
			removeBorderRadiusAmountStylesheet();
		}
	}
}

// Add Border Radius Amount Stylesheet
function addBorderRadiusAmountStylesheet() {
	if (!document.head.querySelector('style[id="re-theme-border-radius"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-border-radius';
		styleElement.textContent = `
			.theme-rpl,
			.theme-beta,
			.theme-light,
			.theme-dark,
			.theme-light.theme-rpl,
			.theme-dark.theme-rpl,
			:root {
				--radius-sm: var(--re-theme-border-radius) !important;
				--radius-md: var(--re-theme-border-radius) !important;
				--radius-lg: var(--re-theme-border-radius) !important;
				--radius-full: var(--re-theme-border-radius) !important;
				--rem8: var(--re-theme-border-radius) !important;
			}
			/* Community highlight cards */
			community-highlight-card {
				--card-border-radius: var(--re-theme-border-radius, 16px);
				--thumbnail-radius: calc(var(--re-theme-border-radius) / 2);
			}
			rpl-modal-card,
			faceplate-modal {
				--rem16: var(--re-theme-border-radius);
			}
			.rounded-1,
			.rounded-2,
			.rounded-4,
			.rounded-5,
			.rounded-6,
			.rounded-8,
			.rounded-sm,
			.rounded-md,
			.rounded-lg,
			.rounded-full,
			.button,
			img.banner.rounded-\\[22px\\],
			/* r/popular cards */
			.rounded-\\[16px\\],
			shreddit-gallery-carousel > faceplate-tracker,
			/* Comment pages, profile banner */
			.xs\\:rounded-\\[16px\\],
			.rounded-t-\\[1rem\\],
			faceplate-hovercard::part(content-container),
			faceplate-hovercard div.rounded-t-\\[16px\\],
			faceplate-tabgroup#profile-feed-tabgroup > a,
			:where(button), :where(input):where([type="submit"], [type="reset"], [type="button"]),
			/* Posts in Card view, search results and subreddit sidebar */
			shreddit-app article > shreddit-post[view-type="cardView"],
			shreddit-post div.hover-card,
			shreddit-post::part(button),
			#subreddit-wiki-header,
			#subreddit-wiki-header + div,
			main.main search-telemetry-tracker > div:not([data-testid="search-scope-switcher"]),
			div[data-testid="search-crosspost-unit"] div:has(> search-telemetry-tracker),
			div#right-sidebar-container > *,
			div#right-sidebar-container aside,
			div#right-sidebar-container aside a,
			div#right-sidebar-container aside button,
			div#right-sidebar-container [data-testid="search-results-sidebar"],
			.rounded-2,
			/* Post media previews */
			div[slot="thumbnail"],
			div[slot="post-media-container"],
			div[slot="post-media-container"] > div,
			gallery-carousel li:has(img.media-lightbox-img),
			div:has(> shreddit-aspect-ratio),
			/* Comment search results */
			reddit-feed > faceplate-tracker > div,
			faceplate-tracker[noun="load_more_comments"] button,
			/* Wiki pages */
			shreddit-app[routename="subreddit_wiki"] main.main > div:last-of-type,
			div.toc {
				border-radius: var(--re-theme-border-radius) !important;
			}
			article > shreddit-post[view-type="compactView"] {
				border-radius: 0;
			}
			faceplate-tracker[noun="load_more_comments"] button {
				position: relative;
			}
			/* Post flairs */
			shreddit-post-flair[slot="post-flair"] span,
			author-flair-event-handler span,
			community-achievements-flair span,
			div.flair span,
			.rounded-\\[20px\\],
			.rounded-5,
			span:has(div.flair-content) {
				line-height: 1.4 !important;
				border-radius: calc(var(--re-theme-border-radius) / 2) !important;
			}
			/* Keep some space between post flair and content */
			shreddit-app[routename="post_page"] div[slot="text-body"],
			shreddit-app[routename="post_page"] div[slot="post-media-container"] {
				margin-top: .5rem;
			}
			/* Notification panel */
			div[data-id="notification-container-element"] > div:first-of-type {
				border-radius: var(--re-theme-border-radius) var(--re-theme-border-radius) 0 0;
				background-color: var(--color-neutral-background-container);
			}
			div[data-id="notification-container-element"] > div:last-of-type {
				padding: 0;

				& > faceplate-tracker a {
					border-radius: 0 0 var(--re-theme-border-radius) var(--re-theme-border-radius);
				}
			}
			shreddit-composer,
			comment-composer-host faceplate-textarea-input {
				--color-neutral-border: transparent;
				--color-neutral-border-medium: transparent;
				--color-neutral-background-hover: var(--color-neutral-background);
				background-color: var(--color-neutral-background);
				border: 1px solid var(--color-neutral-border-weak);
				border-radius: var(--re-theme-border-radius);
				--font-16-20-regular: initial;
			}
			span[avatar] .rounded-full,
			.re-header-menu .rounded-full {
				border-radius: 50% !important;
			}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Add border radius to elements in shadow DOMs
export function addBorderRadiusToShadowRootElements() {
	const searchBar = document.querySelector('reddit-search-large')?.shadowRoot || null;
	const recentPosts = document.querySelector('recent-posts')?.shadowRoot?.children[0] || null;
	const pdpCommentSearchInput = document.querySelector('pdp-comment-search-input')?.shadowRoot || null;
	const subredditHeader = document.querySelector('shreddit-subreddit-header')?.shadowRoot || null;
	const shredditSubredditHeaderButtons = document.querySelector('shreddit-subreddit-header-buttons')?.shadowRoot || null;
	const shredditSortDropdown = document.querySelector('shreddit-sort-dropdown[telemetry-source="sort_switch"]')?.shadowRoot || null;
	const shredditTimeSortDropdown = document.querySelector('shreddit-sort-dropdown[telemetry-source="time_sort_switch"]')?.shadowRoot || null;
	const shredditLayoutEventSetterDropdown = document.querySelector('shreddit-layout-event-setter shreddit-sort-dropdown')?.shadowRoot || null;
	const composeMessageSenderDropdown = document.querySelector('compose-message-sender-dropdown')?.shadowRoot || null;
	const achievementsEntrypoint = document.querySelector('achievements-entrypoint')?.shadowRoot || null;
	const shadowRootElements = [
		searchBar?.querySelector('div'),
		searchBar?.querySelector('#search-input-chip'),
		recentPosts,
		pdpCommentSearchInput?.querySelector('button'),
		pdpCommentSearchInput?.querySelector('faceplate-search-input'),
		pdpCommentSearchInput?.querySelector('button#cancel-pdp-comment-search-button'),
		pdpCommentSearchInput?.querySelector('faceplate-search-input')?.shadowRoot?.querySelector('div.label-container'),
		subredditHeader?.querySelector('div.header'),
		subredditHeader?.querySelector('#show-community-guide-btn'),
		subredditHeader?.querySelector('shreddit-join-button')?.shadowRoot?.querySelector('button'),
		/* shredditSubredditHeaderButtons?.querySelector('shreddit-notification-frequency-control')?.shadowRoot?.querySelector('button'),
		shredditSubredditHeaderButtons?.querySelector('shreddit-join-button')?.shadowRoot?.querySelector('button'),
		shredditSubredditHeaderButtons?.querySelector('shreddit-subreddit-overflow-control')?.shadowRoot?.querySelector('button'),
		shredditSubredditHeaderButtons?.querySelector('a.modtools-btn'), */
		shredditSortDropdown?.querySelector('button'),
		shredditTimeSortDropdown?.querySelector('button'),
		shredditLayoutEventSetterDropdown?.querySelector('button'),
		composeMessageSenderDropdown?.querySelector('button'),
		achievementsEntrypoint?.querySelector('div'),
		achievementsEntrypoint?.querySelector('button'),
	];
	shadowRootElements.forEach((element) => {
		if (element) {
			element.style.borderRadius = 'var(--re-theme-border-radius)';
			element.classList.forEach(cls => {
				if (/^rounded-/.test(cls)) {
					element.classList.replace(cls, 'rounded-none');
				} else {
					element.classList.add('rounded-none');
				}
			});
		}
	});
	if (recentPosts) {
		recentPosts.style.margin = '0';
	}
	if (pdpCommentSearchInput) {
		pdpCommentSearchInput.querySelector('button').style.border = 'none';
		pdpCommentSearchInput.querySelector('button').style.padding = '0';
	}
	if (subredditHeader) {
		subredditHeader.querySelector('div.header')?.setAttribute('part', 'header');
	}
	if (achievementsEntrypoint) {
		achievementsEntrypoint.querySelector('div:has(.achievements-entrypoint)')?.setAttribute('part', 'achievements-entrypoint');
		achievementsEntrypoint.querySelector('hr')?.remove();
		achievementsEntrypoint.querySelector('.achievements-entrypoint-title')?.setAttribute('part', 'achievements-entrypoint-title');
	}
}

// Remove Border Radius Amount Stylesheet
function removeBorderRadiusAmountStylesheet() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-theme-border-radius"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
