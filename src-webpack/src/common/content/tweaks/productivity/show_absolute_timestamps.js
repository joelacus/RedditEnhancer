/**
 * Tweaks: Productivity - Show Post And Comment Absolute Local Timestamps
 *
 * @name showPostAndCommentAbsoluteTimestamps
 * @description Display the absolute timestamps of posts and comments in local time, as well as the relative timestamps.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { registerMutationCallback } from '../../observer_manager';

// ─── Posts ──────────────────────────────────────────────────────────────────

let post_timestamp_format;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadShowPostAbsoluteTimestamp() {
	BROWSER_API.storage.sync.get(['showPostAbsoluteTimestamp', 'postAbsoluteTimestampFormat'], function (result) {
		if (result.postAbsoluteTimestampFormat) post_timestamp_format = result.postAbsoluteTimestampFormat ?? '';
		if (result.showPostAbsoluteTimestamp) showPostAbsoluteTimestamp(true);
	});
}

// Store cleanup functions for the observers
let observerRV3Cleanup = null;
let observerRV1Cleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function showPostAbsoluteTimestamp(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed', 'post_page', 'comments_page'];

	if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName) && value) {
		// Initial pass
		displayPostAbsoluteTimestampsRV3();
		// Register with centralised observer manager
		// Clean up any existing observer first
		if (observerRV3Cleanup) {
			observerRV3Cleanup();
		}
		const feed = document.querySelector('shreddit-feed');
		if (feed) {
			observerRV3Cleanup = registerMutationCallback(
				feed,
				(mutations) => {
					mutations.forEach((mutation) => {
						mutation.addedNodes.forEach((addedNode) => {
							if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
								setTimeout(() => {
									displayPostAbsoluteTimestampsRV3();
								}, 1000);
							}
						});
					});
				},
				{ childList: true, subtree: true },
				'showPostAbsoluteTimestamp',
			);
		}
	} else if (redditVersion === 'old' && value) {
		// Initial pass
		displayPostAbsoluteTimestampsRV1();
		// Register with centralised observer manager
		// Clean up any existing observer first
		if (observerRV1Cleanup) {
			observerRV1Cleanup();
		}
		const feed = document.querySelector('#siteTable');
		if (feed) {
			observerRV1Cleanup = registerMutationCallback(
				feed,
				(mutations) => {
					mutations.forEach((mutation) => {
						mutation.addedNodes.forEach((addedNode) => {
							if (addedNode.classList?.contains('sitetable')) {
								setTimeout(() => {
									displayPostAbsoluteTimestampsRV1();
								}, 250);
							}
						});
					});
				},
				{ childList: true, subtree: true },
				'showPostAbsoluteTimestamp',
			);
		}
	} else if (redditVersion === 'newnew' && !value) {
		// Cleanup observer
		if (observerRV3Cleanup) {
			observerRV3Cleanup();
			observerRV3Cleanup = null;
		}

		// Remove all added absolute timestamps and restore relative timestamps
		document.querySelectorAll('.re-post-absolute-timestamp').forEach((el) => {
			el.remove();
		});
		document.querySelectorAll('shreddit-post faceplate-timeago time').forEach((time) => {
			time.style.display = '';
		});
	} else if (redditVersion === 'old' && !value) {
		// Cleanup observer
		if (observerRV1Cleanup) {
			observerRV1Cleanup();
			observerRV1Cleanup = null;
		}

		// Remove all added absolute timestamps and restore relative timestamps
		document.querySelectorAll('.re-post-absolute-timestamp').forEach((el) => {
			el.remove();
		});
		document.querySelectorAll('.sitetable > .thing .live-timestamp').forEach((time) => {
			time.style.display = '';
		});
	}
}

let isAttaching = false;

// Display Post Absolute Timestamps - RV3
function displayPostAbsoluteTimestampsRV3() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('shreddit-post');
	let postArray = [...posts];

	// Loop through each post and attach absolute timestamp if not already attached
	postArray.forEach((post) => {
		if (!post.querySelector('.re-post-absolute-timestamp')) {
			const timestamp_el = post.querySelector('faceplate-timeago') || post.querySelector('#pdp-credit-bar time').parentElement;
			const datetime_str = timestamp_el.querySelector('time')?.getAttribute('datetime') || '';
			const relative_str = timestamp_el.querySelector('time')?.textContent || '';
			if (datetime_str) {
				const span = document.createElement('span');
				span.className = 're-post-absolute-timestamp';
				let localTimestamp;
				if (post_timestamp_format) {
					localTimestamp = formatDateTime(datetime_str, post_timestamp_format) ?? convertUTCToLocal(datetime_str);
				} else {
					localTimestamp = convertUTCToLocal(datetime_str);
				}
				span.textContent = `(${localTimestamp}) (${relative_str})`;
				timestamp_el.appendChild(span);
				timestamp_el.querySelector('time').style.display = 'none';
			}
		}
	});

	isAttaching = false;
}

// Display Post Absolute Timestamps - RV1
function displayPostAbsoluteTimestampsRV1() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('.sitetable > .thing[data-context="listing"]');
	let postArray = [...posts];

	// Loop through each post and attach absolute timestamp if not already attached
	postArray.forEach((element) => {
		if (!element.querySelector('.re-post-absolute-timestamp')) {
			const timestamp_el = element.querySelector('.live-timestamp');
			const datetime_str = timestamp_el.getAttribute('datetime') || '';
			const relative_str = timestamp_el.textContent || '';
			if (datetime_str) {
				const span = document.createElement('span');
				span.className = 're-post-absolute-timestamp';
				let localTimestamp;
				if (post_timestamp_format) {
					localTimestamp = formatDateTime(datetime_str, post_timestamp_format) ?? convertUTCToLocal(datetime_str);
				} else {
					localTimestamp = convertUTCToLocal(datetime_str);
				}
				span.textContent = `(${localTimestamp}) (${relative_str})`;
				timestamp_el.insertAdjacentElement('afterend', span);
				timestamp_el.style.display = 'none';
			}
		}
	});

	isAttaching = false;
}

// Update Post Absolute Timestamps
export function updatePostAbsoluteTimestamps(format) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed', 'post_page'];
	if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName)) {
		// Remove current timestamps
		const posts = document.querySelectorAll('shreddit-post');
		let postArray = [...posts];
		postArray.forEach((element) => {
			if (element.querySelector('.re-post-absolute-timestamp')) element.querySelector('.re-post-absolute-timestamp').remove();
		});
		post_timestamp_format = format;
		displayPostAbsoluteTimestampsRV3();
	} else if (redditVersion === 'old') {
		// Remove current timestamps
		const posts = document.querySelectorAll('#siteTable > .thing');
		let postArray = [...posts];
		postArray.forEach((element) => {
			if (element.querySelector('.re-post-absolute-timestamp')) element.querySelector('.re-post-absolute-timestamp').remove();
		});
		post_timestamp_format = format;
		displayPostAbsoluteTimestampsRV1();
	}
}

// ─── Comments ───────────────────────────────────────────────────────────────

let comment_timestamp_format;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadShowCommentAbsoluteTimestamp() {
	BROWSER_API.storage.sync.get(['showCommentAbsoluteTimestamp', 'commentAbsoluteTimestampFormat'], function (result) {
		if (result.commentAbsoluteTimestampFormat) comment_timestamp_format = result.commentAbsoluteTimestampFormat ?? '';
		if (result.showCommentAbsoluteTimestamp) showCommentAbsoluteTimestamp(true);
	});
}

// Store cleanup functions for the scroll events
let commentsScrollRV3Cleanup = null;
let commentsScrollRV1Cleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function showCommentAbsoluteTimestamp(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['post_page', 'comments_page'];

	if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName) && value) {
		// Initial pass
		displayCommentAbsoluteTimestampsRV3();

		// Clean up any existing scroll events first
		if (commentsScrollRV3Cleanup) {
			commentsScrollRV3Cleanup();
		}

		// Add scroll event listener for post_detail pages with debounce
		if (document.querySelector('shreddit-app[pagetype="post_detail"]')) {
			const debouncedScrollHandler = debounce(() => {
				displayCommentAbsoluteTimestampsRV3();
			}, 100);

			window.addEventListener('scroll', debouncedScrollHandler);
			commentsScrollRV3Cleanup = () => {
				window.removeEventListener('scroll', debouncedScrollHandler);
			};
		}
	} else if (redditVersion === 'old' && value) {
		// Initial pass
		displayCommentAbsoluteTimestampsRV1();

		// Clean up any existing scroll events first
		if (commentsScrollRV1Cleanup) {
			commentsScrollRV1Cleanup();
		}

		// Add scroll event listener for post_detail pages with debounce
		if (document.querySelector('body.comments-page')) {
			const debouncedScrollHandler = debounce(() => {
				displayCommentAbsoluteTimestampsRV1();
			}, 100);

			window.addEventListener('scroll', debouncedScrollHandler);
			commentsScrollRV1Cleanup = () => {
				window.removeEventListener('scroll', debouncedScrollHandler);
			};
		}
	} else if (redditVersion === 'newnew' && !value) {
		// Cleanup scroll event listener
		if (commentsScrollRV3Cleanup) {
			commentsScrollRV3Cleanup();
			commentsScrollRV3Cleanup = null;
		}

		// Remove all added absolute timestamps and restore relative timestamps
		document.querySelectorAll('.re-comment-absolute-timestamp').forEach((el) => {
			el.remove();
		});
		document.querySelectorAll('shreddit-comment a > time').forEach((time) => {
			time.style.display = '';
		});
	} else if (redditVersion === 'old' && !value) {
		// Cleanup scroll event listener
		if (commentsScrollRV1Cleanup) {
			commentsScrollRV1Cleanup();
			commentsScrollRV1Cleanup = null;
		}

		// Remove all added absolute timestamps and restore relative timestamps
		document.querySelectorAll('.re-comment-absolute-timestamp').forEach((el) => {
			el.remove();
		});
		document.querySelectorAll('.thing.comment .live-timestamp').forEach((time) => {
			time.style.display = '';
		});
	}
}

let isAttachingComments = false;

// Display Comment Absolute Timestamps - RV3
function displayCommentAbsoluteTimestampsRV3() {
	if (isAttachingComments) return;
	isAttachingComments = true;

	// Get a NodeList of currently displaying comments and convert it to an array
	const comments = document.querySelectorAll('shreddit-comment');
	let commentArray = [...comments];

	// Loop through each comment and attach absolute timestamp if not already attached
	commentArray.forEach((element) => {
		if (!element.querySelector('.re-comment-absolute-timestamp')) {
			const timestamp_el = element.querySelector('a:has(time)');
			const datetime_str = timestamp_el.querySelector('time')?.getAttribute('datetime') || '';
			const relative_str = timestamp_el.querySelector('time')?.textContent || '';
			const url = timestamp_el.href ?? '';
			if (datetime_str) {
				const new_time_el = document.createElement('a');
				new_time_el.className = 're-comment-absolute-timestamp';
				let localTimestamp;
				if (comment_timestamp_format) {
					localTimestamp = formatDateTime(datetime_str, comment_timestamp_format) ?? convertUTCToLocal(datetime_str);
				} else {
					localTimestamp = convertUTCToLocal(datetime_str);
				}
				new_time_el.textContent = `${localTimestamp} (${relative_str})`;
				new_time_el.href = url;
				timestamp_el.appendChild(new_time_el);
				timestamp_el.insertAdjacentElement('afterend', new_time_el);
				timestamp_el.querySelector('time').style.display = 'none';
			}
		}
	});

	isAttachingComments = false;
}

// Display Comment Absolute Timestamps - RV1
function displayCommentAbsoluteTimestampsRV1() {
	if (isAttachingComments) return;
	isAttachingComments = true;

	// Get a NodeList of currently displaying comments and convert it to an array
	const comments = document.querySelectorAll('[id^="siteTable_"] .comment');
	let commentArray = [...comments];

	// Loop through each comment and attach absolute timestamp if not already attached
	commentArray.forEach((element) => {
		if (!element.querySelector('.re-comment-absolute-timestamp')) {
			const timestamp_el = element.querySelector('.live-timestamp');
			const datetime_str = timestamp_el.getAttribute('datetime') || '';
			const relative_str = timestamp_el.textContent || '';
			if (datetime_str) {
				const span = document.createElement('span');
				span.className = 're-comment-absolute-timestamp';
				let localTimestamp;
				if (comment_timestamp_format) {
					localTimestamp = formatDateTime(datetime_str, comment_timestamp_format) ?? convertUTCToLocal(datetime_str);
				} else {
					localTimestamp = convertUTCToLocal(datetime_str);
				}
				span.textContent = `${localTimestamp} (${relative_str})`;
				timestamp_el.insertAdjacentElement('afterend', span);
				timestamp_el.style.display = 'none';
			}
		}
	});

	isAttachingComments = false;
}

// Update Comment Absolute Timestamps
export function updateCommentAbsoluteTimestamps(format) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	if (redditVersion === 'newnew' && ['post_page'].includes(routeName)) {
		// Remove current timestamps
		const comments = document.querySelectorAll('shreddit-comment');
		let commentArray = [...comments];
		commentArray.forEach((element) => {
			if (element.querySelector('.re-comment-absolute-timestamp')) {
				element.querySelector('.re-comment-absolute-timestamp').remove();
			}
		});
		comment_timestamp_format = format;
		displayCommentAbsoluteTimestampsRV3();
	} else if (redditVersion === 'old') {
		// Remove current timestamps
		const comments = document.querySelectorAll('[id^="siteTable_"] .comment');
		let commentArray = [...comments];
		commentArray.forEach((element) => {
			if (element.querySelector('.re-comment-absolute-timestamp')) {
				element.querySelector('.re-comment-absolute-timestamp').remove();
			}
		});
		comment_timestamp_format = format;
		displayCommentAbsoluteTimestampsRV1();
	}
}

// Convert UTC datetime string to local datetime string
function convertUTCToLocal(datetime_str) {
	// Convert GMT to local time
	const datetime = new Date(datetime_str);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	};
	return datetime.toLocaleString(undefined, options);
}

// Customise datetime format
function formatDateTime(datetime_str, formatStr) {
	const date = typeof datetime_str === 'string' ? new Date(datetime_str) : datetime_str;

	const is12Hour = formatStr.includes('AP') || formatStr.includes('ap');
	const hours = is12Hour ? date.getHours() % 12 || 12 : date.getHours();

	const tokens = {
		dddd: date.toLocaleDateString('en-GB', { weekday: 'long' }),
		ddd: date.toLocaleDateString('en-GB', { weekday: 'short' }),
		dd: String(date.getDate()).padStart(2, '0'),
		d: String(date.getDate()),
		MMMM: date.toLocaleDateString('en-GB', { month: 'long' }),
		MMM: date.toLocaleDateString('en-GB', { month: 'short' }),
		MM: String(date.getMonth() + 1).padStart(2, '0'),
		M: String(date.getMonth() + 1),
		yyyy: String(date.getFullYear()),
		yy: String(date.getFullYear()).slice(-2),
		hh: String(hours).padStart(2, '0'),
		h: String(hours),
		mm: String(date.getMinutes()).padStart(2, '0'),
		m: String(date.getMinutes()),
		ss: String(date.getSeconds()).padStart(2, '0'),
		s: String(date.getSeconds()),
		zzz: String(date.getMilliseconds()).padStart(3, '0'),
		z: String(date.getMilliseconds()),
		AP: date.getHours() >= 12 ? 'PM' : 'AM',
		ap: date.getHours() >= 12 ? 'pm' : 'am',
		t: date.toLocaleTimeString('en-GB', { timeZoneName: 'short' }).split(' ').pop(),
	};

	// Sort by length (longest first) to avoid partial matches
	const pattern = Object.keys(tokens)
		.sort((a, b) => b.length - a.length)
		.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		.join('|');

	return formatStr.replace(new RegExp(pattern, 'g'), (match) => tokens[match]);
}
