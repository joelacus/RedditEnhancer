/* ===== Restore Popup UI / Font ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Font" options.

export function restorePopupFontOptions() {
	/* = Font Size = */

	// "Post Title" Font Size
	BROWSER_API.storage.sync.get(['postTitleFontSize'], function (result) {
		let value = parseInt(result.postTitleFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-post-title-font-size').value = value;
			document.querySelector('#post-title-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-post-title-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-post-title-font-size').value = 9;
			document.querySelector('#post-title-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Post Title" Font Size: ' + value);
	});

	// "Post Content" Font Size
	BROWSER_API.storage.sync.get(['postContentFontSize'], function (result) {
		let value = parseInt(result.postContentFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-post-content-font-size').value = value;
			document.querySelector('#post-content-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-post-content-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-post-content-font-size').value = 9;
			document.querySelector('#post-content-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Post Content" Font Size: ' + value);
	});

	// "Post Comments" Font Size
	BROWSER_API.storage.sync.get(['postCommentsFontSize'], function (result) {
		let value = parseInt(result.postCommentsFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-post-comments-font-size').value = value;
			document.querySelector('#post-comments-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-post-comments-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-post-comments-font-size').value = 9;
			document.querySelector('#post-comments-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Post Comments" Font Size: ' + value);
	});

	// "Feed Post Title" Font Size
	BROWSER_API.storage.sync.get(['feedPostTitleFontSize'], function (result) {
		let value = parseInt(result.feedPostTitleFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-feed-post-title-font-size').value = value;
			document.querySelector('#feed-post-title-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-feed-post-title-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-feed-post-title-font-size').value = 9;
			document.querySelector('#feed-post-title-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Feed Post Title" Font Size: ' + value);
	});

	// "Feed Post Content" Font Size
	BROWSER_API.storage.sync.get(['feedPostContentFontSize'], function (result) {
		let value = parseInt(result.feedPostContentFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-feed-post-content-font-size').value = value;
			document.querySelector('#feed-post-content-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-feed-post-content-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-feed-post-content-font-size').value = 9;
			document.querySelector('#feed-post-content-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Feed Post Content" Font Size: ' + value);
	});

	// "Create Post: Title" Font Size
	BROWSER_API.storage.sync.get(['createPostTitleFontSize'], function (result) {
		let value = parseInt(result.createPostTitleFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-create-post-title-font-size').value = value;
			document.querySelector('#create-post-title-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-create-post-title-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-create-post-title-font-size').value = 9;
			document.querySelector('#create-post-title-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Create Post: Title" Font Size: ' + value);
	});

	// "Create Post: Body" Font Size
	BROWSER_API.storage.sync.get(['createPostBodyFontSize'], function (result) {
		let value = parseInt(result.createPostBodyFontSize);
		if (value >= 10 && value <= 40) {
			document.querySelector('#input-create-post-body-font-size').value = value;
			document.querySelector('#create-post-body-font-size-value').innerText = `${value}px`;
			document.querySelector('.icon-create-post-body-font-size').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
			value = `${value}px`;
		} else {
			document.querySelector('#input-create-post-body-font-size').value = 9;
			document.querySelector('#create-post-body-font-size-value').innerText = '';
			value = 'default';
		}
		console.log('"Create Post: Body" Font Size: ' + value);
	});

	/* = Font Weight = */

	// "Post Title" Font Weight
	BROWSER_API.storage.sync.get(['postTitleFontWeight'], function (result) {
		let value = parseInt(result.postTitleFontWeight);
		if (value >= 100 && value <= 900) {
			document.querySelector('#input-post-title-font-weight').value = value;
			document.querySelector('#post-title-font-weight-value').innerText = value;
			document.querySelector('.icon-post-title-font-weight').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
		} else {
			document.querySelector('#input-post-title-font-weight').value = 0;
			document.querySelector('#post-title-font-weight-value').innerText = '';
			value = 'default';
		}
		console.log('"Post Title" Font Weight: ' + value);
	});

	// "Post Content" Font Weight
	BROWSER_API.storage.sync.get(['postContentFontWeight'], function (result) {
		let value = parseInt(result.postContentFontWeight);
		if (value >= 100 && value <= 900) {
			document.querySelector('#input-post-content-font-weight').value = value;
			document.querySelector('#post-content-font-weight-value').innerText = value;
			document.querySelector('.icon-post-content-font-weight').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
		} else {
			document.querySelector('#input-post-content-font-weight').value = 0;
			document.querySelector('#post-content-font-weight-value').innerText = '';
			value = 'default';
		}
		console.log('"Post Content" Font Weight: ' + value);
	});

	// "Post Comments" Font Weight
	BROWSER_API.storage.sync.get(['postCommentsFontWeight'], function (result) {
		let value = parseInt(result.postCommentsFontWeight);
		if (value >= 100 && value <= 900) {
			document.querySelector('#input-post-comments-font-weight').value = value;
			document.querySelector('#post-comments-font-weight-value').innerText = value;
			document.querySelector('.icon-post-comments-font-weight').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
		} else {
			document.querySelector('#input-post-comments-font-weight').value = 0;
			document.querySelector('#post-comments-font-weight-value').innerText = '';
			value = 'default';
		}
		console.log('"Post Comments" Font Weight: ' + value);
	});

	// "Feed Post Title" Font Weight
	BROWSER_API.storage.sync.get(['feedPostTitleFontWeight'], function (result) {
		let value = parseInt(result.feedPostTitleFontWeight);
		if (value >= 100 && value <= 900) {
			document.querySelector('#input-feed-post-title-font-weight').value = value;
			document.querySelector('#feed-post-title-font-weight-value').innerText = value;
			document.querySelector('.icon-feed-post-title-font-weight').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
		} else {
			document.querySelector('#input-feed-post-title-font-weight').value = 0;
			document.querySelector('#feed-post-title-font-weight-value').innerText = '';
			value = 'default';
		}
		console.log('"Feed Post Title" Font Weight: ' + value);
	});

	// "Feed Post Content" Font Weight
	BROWSER_API.storage.sync.get(['feedPostContentFontWeight'], function (result) {
		let value = result.feedPostContentFontWeight;
		if (value >= 100 && value <= 900) {
			document.querySelector('#input-feed-post-content-font-weight').value = value;
			document.querySelector('#feed-post-content-font-weight-value').innerText = value;
			document.querySelector('.icon-feed-post-content-font-weight').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('font');
		} else {
			document.querySelector('#input-feed-post-content-font-weight').value = 0;
			document.querySelector('#feed-post-content-font-weight-value').innerText = '';
			value = 'default';
		}
		console.log('"Feed Post Content" Font Weight: ' + value);
	});

	// Custom Fonts
	BROWSER_API.storage.sync.get(['customFonts'], function (result) {
		const value = result.customFonts === true;
		document.querySelector('#checkbox-custom-fonts').checked = value;
		document.querySelector('.icon-custom-fonts').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('font');
		console.log('Custom Fonts: ' + value);
	});
}
