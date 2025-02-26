/**
 * Tweaks: Media - Compress Post Link Display
 * @name compressPostLinkDisplay
 * @description Compress the display of external link in link post view.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadCompressPostLinkDisplay() {
    BROWSER_API.storage.sync.get(['compressPostLinkDisplay'], function (result) {
        compressPostLinkDisplay(result.compressPostLinkDisplay);
    });
}

// Activate the feature based on Reddit version
export function compressPostLinkDisplay(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            // Remove the original post link
            let postLink = document.querySelector('shreddit-post[post-type="link"]').getAttribute('content-href');
            document.querySelector('div:has(> faceplate-tracker[source="post_lightbox"])').remove();

            // Append Stylesheet
            if (!document.head.querySelector('style[id="re-compress-post-link-display"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-compress-post-link-display';
                styleElement.textContent = `shreddit-app[routename="post_page"] shreddit-post[post-type="link"] img#post-image,
		 							        shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] img#post-image {
									        	width: 144px;
									        	height: 116px;
									        	object-fit: cover;
									        	float: right;
									        	border-radius: var(--re-theme-border-radius, 4px);
									        	border: 1px solid var(--color-neutral-border-weak);
									        	margin: 0;
									        }
									        shreddit-app[routename="post_page"] shreddit-post[post-type="link"] div[slot="post-media-container"]:has(img#post-image),
									        shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] div[slot="post-media-container"]:has(img#post-image) {
									            margin-top: calc(var(--re-post-media-container-margin) * -1);
									        	margin-left: auto;
									        	width: 144px;
									        }
									        shreddit-app[routename="post_page"] shreddit-post[post-type="link"]:has(img#post-image) h1,
									        shreddit-app[routename="comment_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 {
									        	margin-right: 152px;
									        }
									        shreddit-app[routename="post_page"] shreddit-post[post-type="link"] shreddit-aspect-ratio,
									        shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] shreddit-aspect-ratio {
                                            	--max-height: 116px !important;
                                            }
									        shreddit-app[routename="post_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 + a,
									        shreddit-app[routename="comment_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 + a {
									        	float: left;
									        	margin-top: calc(-116px + var(--re-post-media-container-margin));
									        	max-width: calc(100% - 152px);
									        }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }

            // Get the height of post title, link and flair (if exists)
            const titleHeight = document.querySelector('shreddit-post h1').offsetHeight;
            const flairHeight = document.querySelector('shreddit-post shreddit-post-flair') ?
                document.querySelector('shreddit-post shreddit-post-flair').offsetHeight + 8 : 0;
            document.documentElement.style.setProperty('--re-post-media-container-margin', `${titleHeight + flairHeight}px`);

            // Append the new post link
            let postLink2 = document.createElement('a');
            postLink2.setAttribute('href', postLink);
            postLink2.textContent = postLink;
            postLink2.classList.add('relative', 'text-12', 'xs:text-14', 'font-semibold', 'mb-xs', 'post-link', 'max-w-full',
                'truncate', 'a', 'cursor-pointer', 'hover:underline', 're-post-link');
            postLink2.setAttribute('target', '_blank');
            postLink2.setAttribute('rel', 'noopener noreferrer ugc');
            document.querySelector('shreddit-post').insertBefore(postLink2, document.querySelector('shreddit-post h1').nextSibling);
        } else {
            const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compress-post-link-display"]');
            dynamicStyleElements.forEach((element) => {
                document.head.removeChild(element);
            });

            // Remove the new post link
            document.querySelector('shreddit-post .re-post-link').remove();
        }
    }
}
