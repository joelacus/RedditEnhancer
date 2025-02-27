/* ===== Tweaks - Productivity - Show Missing Post Flair On The Home Feed ===== */

import { showBannerMessage } from "../../banner_message";

/* === Triggered On Page Load === */
export function loadShowPostFlair() {
	BROWSER_API.storage.sync.get(['showPostFlair'], function (result) {
		if (result.showPostFlair) showPostFlair(true);
	});
}

/* === Main Function === */
// NOTE: adding flairs to search results leads to 429s, so restrain from doing that for now
export function showPostFlair(value) {
	const routename = document.querySelector('shreddit-app').getAttribute('routename');
	const feedRoutes = ['frontpage', 'popular', 'custom_feed'];

	if (redditVersion === 'newnew' && value === true) {
		if (feedRoutes.includes(routename)) {
			document.querySelectorAll('shreddit-post').forEach((post) => {
				attachFlair(post);
			});
			observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
		}
	} else if (redditVersion === 'newnew' && value === false) {
		if (routename === 'frontpage' || routename === 'popular') {
			observer.disconnect();
			removeFlair();
		}
	}
}

// Remove all post flair tags
function removeFlair() {
	document.querySelectorAll('shreddit-post').forEach((post) => {
		if (post.querySelector('.re-post-flair')) {
			post.querySelectorAll('.re-post-flair').forEach((flair) => {
				flair.remove();
			});
		}
	});
}

// Attach post flair to post header
async function attachFlair(post) {
	if (!post.querySelector('shreddit-post-flair > .re-post-flair')) {
		const postID = post.getAttribute('id');
		const postSub = post.getAttribute('subreddit-prefixed-name');
		const postData = await fetchPostData(postID);
		const flair = postData.children[0].data.link_flair_richtext;

		// Reddit seems to sometimes not put flairs in the array if they're not formatted?
		if (flair.length === 0 && postData.children[0].data.link_flair_text) {
			flair.push({ e: 'text', t: postData.children[0].data.link_flair_text });
		}

		// Reddit API returns post flairs in an array. shreddit-post-flair should not be added
		// to posts with no flairs, causing really weird paddings
		if ((flair && flair.length > 0) || postData.children[0].data.link_flair_text) {
			const flairTextColour = postData.children[0].data.link_flair_text_color;
			const flairBgColour = postData.children[0].data.link_flair_background_color;
			const flairName = postData.children[0].data.link_flair_text;
			// Build <a>
			let a = document.createElement('a');
			a.classList.add('re-post-flair');
			// Build <span>
			let span = document.createElement('span');
			span.setAttribute('class', 'bg-tone-4 inline-block truncate max-w-full text-12 font-normal align-text-bottom box-border px-[6px] rounded-[20px] leading-4 text-secondary relative top-[-0.25rem] xs:top-[-2px] my-2xs xs:mb-sm py-0');
			if (flairBgColour && flairBgColour !== 'transparent') {
				if (flairTextColour === 'light') {
					span.classList.remove('text-secondary');
					span.classList.add('text-global-white');
				} else if (flairTextColour === 'dark') {
					span.classList.remove('text-secondary');
					span.classList.add('text-global-black');
				}
			} else {
				span.classList.add('border-solid', 'border', 'border-neutral-border-weak');
			}
			span.setAttribute('style', 'background-color: ' + flairBgColour + ';display: inline-flex;grid-gap: 4px;');
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
			const faceplate_img = document.createElement('faceplate-img');
			faceplate_img.classList.add('flair-image');
			faceplate_img.setAttribute('loading', 'lazy');
			faceplate_img.setAttribute('width', '16');
			faceplate_img.setAttribute('height', '16');
			faceplate_img.setAttribute('src', flairEmojiURL);
			faceplate_img.setAttribute('alt', 'emoji' + flairEmoji);
			const div = document.createElement('div');
			div.classList.add('loaded');
			div.setAttribute('style', 'width:16px;height:16px;');
			const img = document.createElement('img');
			img.src = flairEmojiURL;
			img.alt = 'emoji' + flairEmoji;
			div.append(img);
			faceplate_img.append(div);
			return faceplate_img;
		}
	}
}

// Function to fetch post data from Reddit API
async function fetchPostData(postID) {
	const fetch_url = `https://www.reddit.com/api/info.json?id=${postID}`;
	try {
		const response = await fetch(fetch_url, { method: 'GET' });
		const data = await response.json();
		return data.data;
	} catch (error) {
		if (error instanceof TypeError && error.message === 'NetworkError when attempting to fetch resource.') {
			showBannerMessage('warning', 'Unable to fetch post data and attach flairs as www.reddit.com is not reachable at the moment');
		}
		console.error('Error fetching post data:', error);
		throw error;
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