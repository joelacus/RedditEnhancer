/**
 * Tweaks: Productivity - Show Post Flair
 * @name showPostFlair
 *
 * Attempt to attach post flairs to posts in frontpage, popular and multireddit feeds, which are omitted by default.
 * RE actively scans the feed with an observer to search for post IDs, then sends GET requests with those post IDs to
 * Reddit's public APIs, and parse the resulting JSON data to extract flair information.
 *
 * If something goes wrong, the entire process is halted and RE should display a banner message. Likely happens when the
 * IP address and/or browser user-agent is blocked from API access (`403 Forbidden`).
 *
 * NOTE: Reddit doesn't support CORS in its responses and `Access-Control-Allow-Origin` is not set in the header. On Chrome
 * and Chromium-based browsers which enforce CORS by default, API requests would fail if user is browsing from subdomains
 * of reddit.com, such as sh.reddit.com. RE tries to work around this by explicitly setting 'no-cors' in the request to
 * bypass CORS, however this means that if it fails, we have no way of knowing why it failed. Oh well.
 *
 * Applies to: New New UI (2023-)
 */

import { showBannerMessage } from "../../banner_message";

// Flag to halt the process and prevent multiple error messages when an error occur
let e = false;

// Get the feature state from browser sync storage
export function loadShowPostFlair() {
	BROWSER_API.storage.sync.get(['showPostFlair'], function (result) {
		if (result.showPostFlair) showPostFlair(true);
	});
}

// Activate the feature based on Reddit version
// NOTE: adding flairs to search results leads to 429s, so restrain from doing that for now
export function showPostFlair(value) {
	const routeName = document.querySelector('shreddit-app').getAttribute('routename');
	const feedRoutes = ['frontpage', 'popular', 'custom_feed'];

	if (redditVersion === 'newnew' && value && feedRoutes.includes(routeName)) {
		document.querySelectorAll('shreddit-post').forEach(attachFlair);
		observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
	} else {
		// Disconnect the observer and remove all added post flairs
		observer.disconnect();
		document.querySelectorAll('shreddit-post .re-post-flair').forEach(flair => flair.remove());
	}
}

// Attach post flair to post header
async function attachFlair(post) {
	if (e || post.querySelector('shreddit-post-flair > .re-post-flair')) return;
	const postID = post.getAttribute('id');
	const postSub = post.getAttribute('subreddit-prefixed-name');
	let postData;

	try {
		postData = (await BROWSER_API.runtime.sendMessage({
			actions: [{
				action: 'fetchData',
				url: `https://www.reddit.com/api/info.json?id=${postID}`
			}]
		})).data;
	} catch (error) {
		console.log(error);
		showBannerMessage('error', error.error || error);
		e = true; // Set the error flag to true to prevent further attempts
	}

	if (!postData || !postData.children || !postData.children[0]) return;

	const flair = postData.children[0].data.link_flair_richtext || [];
	// Reddit seems to sometimes not put flairs in the array if they're not formatted?
	if (flair.length === 0 && postData.children[0].data.link_flair_text) {
		flair.push({ e: 'text', t: postData.children[0].data.link_flair_text });
	}

	// Reddit API returns post flairs in an array. shreddit-post-flair should not be added to posts with no flairs, causing really weird paddings
	if ((flair && flair.length > 0) || postData.children[0].data.link_flair_text) {
		const flairTextColour = postData.children[0].data.link_flair_text_color;
		const flairBgColour = postData.children[0].data.link_flair_background_color;
		const flairName = postData.children[0].data.link_flair_text;

		// Build <a>
		let a = document.createElement('a');
		a.classList.add('re-post-flair');

		// Build <span>
		let span = Object.assign(document.createElement('span'), {
			className: 'bg-tone-4 inline-block truncate max-w-full text-12 font-normal align-text-bottom box-border px-[6px] ' +
				'rounded-[20px] leading-4 text-secondary relative top-[-0.25rem] xs:top-[-2px] my-2xs xs:mb-sm py-0',
			style: `background-color: ${flairBgColour}; display: inline-flex; grid-gap: 4px;`,
		});
		if (flairBgColour && flairBgColour !== 'transparent') {
			if (flairTextColour === 'light') {
				span.classList.replace('text-secondary', 'text-global-white');
			} else if (flairTextColour === 'dark') {
				span.classList.replace('text-secondary', 'text-global-black');
			}
		} else {
			span.classList.add('border-solid', 'border', 'border-neutral-border-weak');
		}

		// Append each flair to <span>
		for (let f = 0; f < flair.length; f++) {
			if (flair[f].e === 'text') {
				const flairText = flair[f].t;
				const url = '/' + postSub + '/?f=flair_name%3A%22' + flairName + '%22';
				a.href = url;
				span.append(flairText);
			} else if (flair[f].e === 'emoji') {
				const flairEmoji = flair[f].a;
				const flairEmojiURL = flair[f].u;
				const img = buildEmojiElement(flairEmoji, flairEmojiURL);
				span.append(img);
			}
		}

		// Append flair to post
		const container = post.querySelector('shreddit-post-flair');
		a.append(span);
		container.appendChild(a);
	}

	function buildEmojiElement(flairEmoji, flairEmojiURL) {
		const faceplate_img = Object.assign(document.createElement('faceplate-img'), {
			className: 'flair-image',
			loading: 'lazy',
			width: '16',
			height: '16',
			src: flairEmojiURL,
			alt: 'emoji' + flairEmoji
		});
		const div = Object.assign(document.createElement('div'), {
			className: 'loaded',
			style: 'width:16px; height:16px;'
		});
		const img = Object.assign(document.createElement('img'), {
			src: flairEmojiURL,
			alt: 'emoji' + flairEmoji
		});
		div.append(img);
		faceplate_img.append(div);
		return faceplate_img;
	}
}

// Observe feed for new posts
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(addedNode => {
            if (addedNode.nodeName === 'ARTICLE') {
                setTimeout(() => {
                    const post = addedNode.querySelector('shreddit-post');
                    if (post) {
                        attachFlair(post);
                    }
                }, 1000);
            }
        });
    });
});