/**
 * Tweaks: Media - Compact Post Link Display
 *
 * @name compactPostLinkPreview
 * @description Compact the display of the external link preview on a link post.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadCompactPostLinkPreview() {
	BROWSER_API.storage.sync.get(['compactPostLinkPreview'], function (result) {
		compactPostLinkPreview(result.compactPostLinkPreview);
	});
}

/* === Enable/Disable The Feature === */
export function compactPostLinkPreview(value) {
	if (redditVersion === 'newnew') {
		const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
		const postRoutes = ['post_page', 'comments_page', 'profile_post_page'];
		// Do not compact e.g. YouTube video embeds
		if (value && postRoutes.includes(routeName) && !document.querySelector('shreddit-embed')) {
			// Remove the original post link
			let postLink = document.querySelector('shreddit-post[post-type="link"]')?.getAttribute('content-href');
			document.querySelector('div:has(> faceplate-tracker[source="post_lightbox"])')?.remove();

			if (/(imgur\.com|imgur\.io|ibb\.co)/.test(new URL(postLink).hostname)) return;

			// Append Stylesheet
			if (!document.head.querySelector('style[id="re-compact-post-link-display"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-compact-post-link-display';
				styleElement.textContent = `shreddit-app[routename="post_page"] shreddit-post[post-type="link"] img.preview-img,
		 							        shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] img.preview-img {
									        	width: 144px;
									        	height: 116px;
									        	object-fit: cover;
									        	float: right;
									        	border-radius: var(--re-theme-border-radius, 4px);
									        	border: 1px solid var(--color-neutral-border-weak);
									        	margin: 0;
									        }
									        [routename="post_page"] shreddit-post[post-type="link"] div[slot="post-media-container"]:has(img#post-image),
									        [routename="comment_page"] shreddit-post[post-type="link"] div[slot="post-media-container"]:has(img#post-image) {
									            margin-top: calc(var(--re-post-media-container-margin) * -1);
									        	margin-left: auto;
									        	width: 144px;
									        }
									        [routename="post_page"] shreddit-post[post-type="link"]:has(img#post-image) h1,
									        [routename="comment_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 {
									        	margin-right: 152px;
									        }
									        [routename="post_page"] shreddit-post[post-type="link"] shreddit-aspect-ratio,
									        [routename="comment_page"] shreddit-post[post-type="link"] shreddit-aspect-ratio {
                                            	--max-height: 116px !important;
                                            }
									        [routename="post_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 + a,
									        [routename="comment_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 + a {
									        	float: left;
									        	margin-top: calc(-116px + var(--re-post-media-container-margin));
									        	max-width: calc(100% - 144px - 1rem);
									        }`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}

			if (document.querySelector('shreddit-post div[slot="text-body"]')) {
				const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compact-post-link-display"]');
				dynamicStyleElements.forEach((element) => {
					document.head.removeChild(element);
				});
			}

			// Get the height of post title, link and flair (if exists)
			const titleHeight = document.querySelector('shreddit-post h1').offsetHeight;
			const flairHeight = document.querySelector('shreddit-post shreddit-post-flair') ? document.querySelector('shreddit-post shreddit-post-flair').offsetHeight + 8 : 0;
			document.documentElement.style.setProperty('--re-post-media-container-margin', `calc(${titleHeight}px + ${flairHeight}px)`);

			if (document.querySelector('shreddit-post a.re-post-link')) return;

			// Append the new post link
			let postLink2 = Object.assign(document.createElement('a'), {
				href: postLink,
				textContent: postLink,
				className: 'relative text-12 xs:text-14 font-semibold mb-xs post-link max-w-full truncate a cursor-pointer hover:underline re-post-link',
				target: '_blank',
				rel: 'noopener noreferrer ugc',
			});
			document.querySelector('shreddit-post').insertBefore(postLink2, document.querySelector('shreddit-post h1').nextSibling);
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compact-post-link-display"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});

			// Remove the new post link
			document.querySelector('shreddit-post .re-post-link').remove();
		}
	}
}
