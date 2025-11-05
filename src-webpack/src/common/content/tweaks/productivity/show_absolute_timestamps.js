/**
 * Tweaks: Productivity - Show Post And Comment Absolute Local Timestamps
 *
 * @name showPostAndCommentAbsoluteTimestamps
 * @description Display the absolute timestamps of posts and comments in local time, as well as the relative timestamps.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* ===== Posts ===== */

let post_timestamp_format;

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowPostAbsoluteTimestamp() {
	BROWSER_API.storage.sync.get(['showPostAbsoluteTimestamp', 'postAbsoluteTimestampFormat'], function (result) {
		if (result.postAbsoluteTimestampFormat) post_timestamp_format = result.postAbsoluteTimestampFormat ?? '';
		if (result.showPostAbsoluteTimestamp) showPostAbsoluteTimestamp(true);
	});
}

/* === Enable/Disable The Feature === */
export function showPostAbsoluteTimestamp(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed', 'post_page'];

	if (value) {
		if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName)) {
			displayPostAbsoluteTimestampsRV3();
			if (document.querySelector('shreddit-feed')) postObserver.observe(document.querySelector('shreddit-feed'), { childList: true });
		} else if (redditVersion === 'old') {
			displayPostAbsoluteTimestampsRV1();
		}
	} else {
		// Disconnect the observer
		postObserver.disconnect();
		// Remove all added absolute timestamps and restore relative timestamps
		document.querySelectorAll('.re-post-absolute-timestamp').forEach((el) => {
			el.remove();
		});
		document.querySelectorAll('shreddit-post faceplate-timeago time').forEach((time) => {
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
	postArray.forEach((element) => {
		if (!element.querySelector('.re-post-absolute-timestamp')) {
			const timestamp_el = element.querySelector('faceplate-timeago');
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
	const posts = document.querySelectorAll('#siteTable > .thing');
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

// Observer for watching new posts in feed
const postObserver = new MutationObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (addedNode) {
				if (['TIME', 'ARTICLE', 'DIV'].includes(addedNode.nodeName) && redditVersion === 'newnew') {
					displayPostAbsoluteTimestampsRV3();
				}
			});
		});
	}, 100)
);

// Allowing some timeout between post number attachment to prevent performance issues
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
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

/* ===== Comments ===== */

let comment_timestamp_format;

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowCommentAbsoluteTimestamp() {
	BROWSER_API.storage.sync.get(['showCommentAbsoluteTimestamp', 'commentAbsoluteTimestampFormat'], function (result) {
		if (result.commentAbsoluteTimestampFormat) comment_timestamp_format = result.commentAbsoluteTimestampFormat ?? '';
		if (result.showCommentAbsoluteTimestamp) showCommentAbsoluteTimestamp(true);
	});
}

/* === Enable/Disable The Feature === */
export function showCommentAbsoluteTimestamp(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['post_page'];

	if (value) {
		if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName)) {
			displayCommentAbsoluteTimestampsRV3();
			if (document.querySelector('shreddit-comment-tree')) commentObserver.observe(document.querySelector('shreddit-comment-tree'), { childList: true });
		} else if (redditVersion === 'old') {
			displayCommentAbsoluteTimestampsRV1();
		}
	} else {
		// Disconnect the observer
		commentObserver.disconnect();
		// Remove all added absolute timestamps and restore relative timestamps
		document.querySelectorAll('.re-comment-absolute-timestamp').forEach((el) => {
			el.remove();
		});
		document.querySelectorAll('shreddit-comment a > time').forEach((time) => {
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
			if (datetime_str) {
				const span = document.createElement('span');
				span.className = 're-comment-absolute-timestamp';
				let localTimestamp;
				if (comment_timestamp_format) {
					localTimestamp = formatDateTime(datetime_str, comment_timestamp_format) ?? convertUTCToLocal(datetime_str);
				} else {
					localTimestamp = convertUTCToLocal(datetime_str);
				}
				span.textContent = `(${localTimestamp}) (${relative_str})`;
				timestamp_el.appendChild(span);
				timestamp_el.insertAdjacentElement('afterend', span);
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
				span.textContent = `(${localTimestamp}) (${relative_str})`;
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

// Observe the comment tree for dynamic changes
const commentObserver = new ResizeObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			displayCommentAbsoluteTimestampsRV3();
		});
	}, 100)
);

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
