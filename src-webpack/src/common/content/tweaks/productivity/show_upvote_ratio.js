/**
 * Tweaks: Productivity - Show Upvote Ratio
 *
 * @name showUpvoteRatio
 * @description Show the upvote ratio of post in post detail view.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowUpvoteRatio() {
	BROWSER_API.storage.sync.get(['showUpvoteRatio'], function (result) {
		if (result.showUpvoteRatio) showUpvoteRatio(true);
	});
}

/* === Enable/Disable The Feature === */
export function showUpvoteRatio(value) {
	if (redditVersion === 'newnew') {
		const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
		const feedRoutes = ['post_page', 'comment_page'];

		if (value && feedRoutes.includes(routeName) && document.querySelector('shreddit-post')) {
			attachRatio(document.querySelector('shreddit-post'));
		} else {
			disableShowUpvoteRatioRV3();
		}
	}
}

// Enable Show Upvote Ratio
async function attachRatio(post) {
	const postID = post.getAttribute('id');
	let postData;

	try {
		postData = (
			await BROWSER_API.runtime.sendMessage({
				actions: [
					{
						action: 'fetchData',
						url: `https://www.reddit.com/api/info.json?id=${postID}`,
					},
				],
			})
		).data;
	} catch (e) {
		console.error(`[RedditEnhancer] showUpvoteRatio: Error fetching post data for ID ${postID}`, error);
		showBannerMessage('error', error.error || error);
		return;
	}
	if (!postData || !postData.children || !postData.children[0]) {
		console.warn(`[RedditEnhancer] showUpvoteRatio: No data found for post ID ${postID}`);
		return;
	}
	const upvoteRatio = Math.round(postData.children[0].data.upvote_ratio * 100 || -1);

	let ratio = Object.assign(document.createElement('span'), {
		textContent: `${upvoteRatio}%`,
		className: 're-upvote-ratio',
		part: 're-upvote-ratio',
		title: `${upvoteRatio}% upvoted`,
	});

	if (redditVersion === 'newnew') {
		if (document.querySelector('.re-vote-panel') && !document.querySelector('.re-upvote-ratio')) {
			document.querySelector('.re-vote-panel faceplate-number').append(ratio);
		} else if (!post.shadowRoot?.querySelector('.re-upvote-ratio')) {
			document.querySelector('shreddit-post')?.shadowRoot?.querySelector('span[data-post-click-location="vote"] faceplate-number')?.append(ratio);
		}
	}
}

// Disable Show Upvote Ratio - RV3
function disableShowUpvoteRatioRV3() {
	document.querySelectorAll('shreddit-post').forEach((post) => {
		const ratio = post.shadowRoot?.querySelector('.re-upvote-ratio');
		if (ratio) ratio.remove();
	});
}
