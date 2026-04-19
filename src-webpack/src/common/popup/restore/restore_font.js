// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Font
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { validateInt, validateEnum } from './validation';

const FONT_WEIGHTS = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// Restore UI settings for "Font" options.

export function restorePopupFontOptions() {
	// ─── Font Size ──────────────────────────────────────────────────────────

	// "Post Title" Font Size
	BROWSER_API.storage.sync.get(['postTitleFontSize'], function (result) {
		const value = validateInt(parseInt(result.postTitleFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-post-title-font-size').value = value;
		document.querySelector('#post-title-font-size-value').innerText = displayValue;
		document.querySelector('.icon-post-title-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Post Title" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// "Post Content" Font Size
	BROWSER_API.storage.sync.get(['postContentFontSize'], function (result) {
		const value = validateInt(parseInt(result.postContentFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-post-content-font-size').value = value;
		document.querySelector('#post-content-font-size-value').innerText = displayValue;
		document.querySelector('.icon-post-content-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Post Content" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// "Post Comments" Font Size
	BROWSER_API.storage.sync.get(['postCommentsFontSize'], function (result) {
		const value = validateInt(parseInt(result.postCommentsFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-post-comments-font-size').value = value;
		document.querySelector('#post-comments-font-size-value').innerText = displayValue;
		document.querySelector('.icon-post-comments-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Post Comments" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// "Feed Post Title" Font Size
	BROWSER_API.storage.sync.get(['feedPostTitleFontSize'], function (result) {
		const value = validateInt(parseInt(result.feedPostTitleFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-feed-post-title-font-size').value = value;
		document.querySelector('#feed-post-title-font-size-value').innerText = displayValue;
		document.querySelector('.icon-feed-post-title-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Feed Post Title" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// "Feed Post Content" Font Size
	BROWSER_API.storage.sync.get(['feedPostContentFontSize'], function (result) {
		const value = validateInt(parseInt(result.feedPostContentFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-feed-post-content-font-size').value = value;
		document.querySelector('#feed-post-content-font-size-value').innerText = displayValue;
		document.querySelector('.icon-feed-post-content-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Feed Post Content" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// "Create Post: Title" Font Size
	BROWSER_API.storage.sync.get(['createPostTitleFontSize'], function (result) {
		const value = validateInt(parseInt(result.createPostTitleFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-create-post-title-font-size').value = value;
		document.querySelector('#create-post-title-font-size-value').innerText = displayValue;
		document.querySelector('.icon-create-post-title-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Create Post: Title" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// "Create Post: Body" Font Size
	BROWSER_API.storage.sync.get(['createPostBodyFontSize'], function (result) {
		const value = validateInt(parseInt(result.createPostBodyFontSize), 9, 40, 9);
		const displayValue = value === 9 ? '' : `${value}px`;
		document.querySelector('#input-create-post-body-font-size').value = value;
		document.querySelector('#create-post-body-font-size-value').innerText = displayValue;
		document.querySelector('.icon-create-post-body-font-size').style.backgroundColor = value !== 9 ? 'var(--accent)' : '';
		if (value !== 9) highlightMenuIcon('font');
		console.log('"Create Post: Body" Font Size: ' + (value !== 9 ? displayValue : 'default'));
	});

	// ─── Font Weight ────────────────────────────────────────────────────────

	// "Post Title" Font Weight
	BROWSER_API.storage.sync.get(['postTitleFontWeight'], function (result) {
		const value = validateEnum(parseInt(result.postTitleFontWeight), FONT_WEIGHTS, 0);
		const displayValue = value === 0 ? '' : value;
		document.querySelector('#input-post-title-font-weight').value = value;
		document.querySelector('#post-title-font-weight-value').innerText = displayValue;
		document.querySelector('.icon-post-title-font-weight').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
		if (value !== 0) highlightMenuIcon('font');
		console.log('"Post Title" Font Weight: ' + (value !== 0 ? value : 'default'));
	});

	// "Post Content" Font Weight
	BROWSER_API.storage.sync.get(['postContentFontWeight'], function (result) {
		const value = validateEnum(parseInt(result.postContentFontWeight), FONT_WEIGHTS, 0);
		const displayValue = value === 0 ? '' : value;
		document.querySelector('#input-post-content-font-weight').value = value;
		document.querySelector('#post-content-font-weight-value').innerText = displayValue;
		document.querySelector('.icon-post-content-font-weight').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
		if (value !== 0) highlightMenuIcon('font');
		console.log('"Post Content" Font Weight: ' + (value !== 0 ? value : 'default'));
	});

	// "Post Comments" Font Weight
	BROWSER_API.storage.sync.get(['postCommentsFontWeight'], function (result) {
		const value = validateEnum(parseInt(result.postCommentsFontWeight), FONT_WEIGHTS, 0);
		const displayValue = value === 0 ? '' : value;
		document.querySelector('#input-post-comments-font-weight').value = value;
		document.querySelector('#post-comments-font-weight-value').innerText = displayValue;
		document.querySelector('.icon-post-comments-font-weight').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
		if (value !== 0) highlightMenuIcon('font');
		console.log('"Post Comments" Font Weight: ' + (value !== 0 ? value : 'default'));
	});

	// "Feed Post Title" Font Weight
	BROWSER_API.storage.sync.get(['feedPostTitleFontWeight'], function (result) {
		const value = validateEnum(parseInt(result.feedPostTitleFontWeight), FONT_WEIGHTS, 0);
		const displayValue = value === 0 ? '' : value;
		document.querySelector('#input-feed-post-title-font-weight').value = value;
		document.querySelector('#feed-post-title-font-weight-value').innerText = displayValue;
		document.querySelector('.icon-feed-post-title-font-weight').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
		if (value !== 0) highlightMenuIcon('font');
		console.log('"Feed Post Title" Font Weight: ' + (value !== 0 ? value : 'default'));
	});

	// "Feed Post Content" Font Weight
	BROWSER_API.storage.sync.get(['feedPostContentFontWeight'], function (result) {
		const value = validateEnum(parseInt(result.feedPostContentFontWeight), FONT_WEIGHTS, 0);
		const displayValue = value === 0 ? '' : value;
		document.querySelector('#input-feed-post-content-font-weight').value = value;
		document.querySelector('#feed-post-content-font-weight-value').innerText = displayValue;
		document.querySelector('.icon-feed-post-content-font-weight').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
		if (value !== 0) highlightMenuIcon('font');
		console.log('"Feed Post Content" Font Weight: ' + (value !== 0 ? value : 'default'));
	});

	// Custom Fonts
	BROWSER_API.storage.sync.get(['customFonts'], function (result) {
		const checked = result.customFonts === true;
		document.querySelector('#checkbox-custom-fonts').checked = checked;
		document.querySelector('.icon-custom-fonts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('font');
		console.log('Custom Fonts: ' + checked);
	});
}
