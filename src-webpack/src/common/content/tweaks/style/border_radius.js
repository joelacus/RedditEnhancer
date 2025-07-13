/* ===== Tweaks - Style - Border Radius ===== */

/* === Triggered On Page Load === */
export function loadBorderRadiusAmount() {
	BROWSER_API.storage.sync.get(['borderRadiusAmount'], function (result) {
		if (result.borderRadiusAmount) borderRadiusAmount(result.borderRadiusAmount);
	});
}

/* === Main Function === */
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

/* === Enable/Disable Functions === */

// Function - Add Border Radius Amount Stylesheet
function addBorderRadiusAmountStylesheet() {
	if (!document.head.querySelector('style[id="re-theme-border-radius"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-border-radius';
		styleElement.textContent = `
			:root {
				--radius-sm: var(--re-theme-border-radius) !important;
				--radius-md: var(--re-theme-border-radius) !important;
				--radius-lg: var(--re-theme-border-radius) !important;
			}
			/* Community highlight cards */
			community-highlight-card {
				--card-border-radius: var(--re-theme-border-radius, 16px);
				--thumbnail-radius: calc(var(--re-theme-border-radius) / 2);
			}
			img.banner.rounded-\\[22px\\],
			/* r/popular cards */
			.rounded-\\[16px\\],
			shreddit-gallery-carousel > faceplate-tracker,
			/* Comment pages, profile banner */
			.xs\\:rounded-\\[16px\\],
			.rounded-t-\\[1rem\\],
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
			}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Add border radius to elements in shadow DOMs
export function addBorderRadiusToShadowRootElements() {
	const recentPosts = document.querySelector('recent-posts')?.shadowRoot?.children[0] || null;
	const pdpCommentSearchInput = document.querySelector('pdp-comment-search-input')?.shadowRoot || null;
	const subredditHeader = document.querySelector('shreddit-subreddit-header')?.shadowRoot || null;
	const achievementsEntrypoint = document.querySelector('achievements-entrypoint')?.shadowRoot || null;
	const shadowRootElements = [
		recentPosts,
		pdpCommentSearchInput?.querySelector('button'),
		pdpCommentSearchInput?.querySelector('faceplate-search-input'),
		pdpCommentSearchInput?.querySelector('button#cancel-pdp-comment-search-button'),
		pdpCommentSearchInput?.querySelector('faceplate-search-input')?.shadowRoot?.querySelector('div.label-container'),
		subredditHeader?.querySelector('div.header'),
		achievementsEntrypoint?.querySelector('div'),
	];
	shadowRootElements.forEach((element) => {
		if (element) {
			element.style.borderRadius = 'var(--re-theme-border-radius)';
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
	}
}

// Function - Remove Border Radius Amount Stylesheet
function removeBorderRadiusAmountStylesheet() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-theme-border-radius"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
