// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Font Tweaks
// ────────────────────────────────────────────────────────────────────────────

import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';

// ─── Font Size ──────────────────────────────────────────────────────────────

// Slider - Post Title Font Size
const savePostTitleFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ postTitleFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-post-title-font-size').addEventListener('input', function () {
	document.querySelector('.icon-post-title-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#post-title-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ postTitleFontSize: this.value });
	savePostTitleFontSize(this.value);
});

// Slider - Post Content Font Size
const savePostContentFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ postContentFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-post-content-font-size').addEventListener('input', function () {
	document.querySelector('.icon-post-content-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#post-content-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ postContentFontSize: this.value });
	savePostContentFontSize(this.value);
});

// Slider - Feed Post Title Font Size
const saveFeedPostTitleFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ feedPostTitleFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-feed-post-title-font-size').addEventListener('input', function () {
	document.querySelector('.icon-feed-post-title-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-title-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ feedPostTitleFontSize: this.value });
	saveFeedPostTitleFontSize(this.value);
});

// Slider - Feed Post Content Font Size
const saveFeedPostContentFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ feedPostContentFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-feed-post-content-font-size').addEventListener('input', function () {
	document.querySelector('.icon-feed-post-content-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-content-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ feedPostContentFontSize: this.value });
	saveFeedPostContentFontSize(this.value);
});

// Slider - Post Comments Font Size
const savePostCommentsFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ postCommentsFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-post-comments-font-size').addEventListener('input', function () {
	document.querySelector('.icon-post-comments-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#post-comments-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ postCommentsFontSize: this.value });
	savePostCommentsFontSize(this.value);
});

// Slider - "Create Post: Title" Font Size
const saveCreatePostTitleFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ createPostTitleFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-create-post-title-font-size').addEventListener('input', function () {
	document.querySelector('.icon-create-post-title-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#create-post-title-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ createPostTitleFontSize: this.value });
	saveCreatePostTitleFontSize(this.value);
});

// Slider - "Create Post: Body" Font Size
const saveCreatePostBodyFontSize = debounce(function (value) {
	BROWSER_API.storage.sync.set({ createPostBodyFontSize: value != 9 ? value : false });
}, 500);
document.querySelector('#input-create-post-body-font-size').addEventListener('input', function () {
	document.querySelector('.icon-create-post-body-font-size').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	document.querySelector('#create-post-body-font-size-value').innerText = this.value != 9 ? `${this.value}px` : '';
	sendMessage({ createPostBodyFontSize: this.value });
	saveCreatePostBodyFontSize(this.value);
});

// ─── Font Weight ────────────────────────────────────────────────────────────

// Slider - Post Title Font Weight
const savePostTitleFontWeight = debounce(function (value) {
	BROWSER_API.storage.sync.set({ postTitleFontWeight: value });
}, 500);
document.querySelector('#input-post-title-font-weight').addEventListener('input', function () {
	document.querySelector('.icon-post-title-font-weight').style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	document.querySelector('#post-title-font-weight-value').innerText = this.value != 0 ? this.value : '';
	sendMessage({ postTitleFontWeight: this.value });
	savePostTitleFontWeight(this.value);
});

// Slider - Post Content Font Weight
const savePostContentFontWeight = debounce(function (value) {
	BROWSER_API.storage.sync.set({ postContentFontWeight: value });
}, 500);
document.querySelector('#input-post-content-font-weight').addEventListener('input', function () {
	document.querySelector('.icon-post-content-font-weight').style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	document.querySelector('#post-content-font-weight-value').innerText = this.value != 0 ? this.value : '';
	sendMessage({ postContentFontWeight: this.value });
	savePostContentFontWeight(this.value);
});

// Slider - Feed Post Title Font Weight
const saveFeedPostTitleFontWeight = debounce(function (value) {
	BROWSER_API.storage.sync.set({ feedPostTitleFontWeight: value });
}, 500);
document.querySelector('#input-feed-post-title-font-weight').addEventListener('input', function () {
	document.querySelector('.icon-feed-post-title-font-weight').style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-title-font-weight-value').innerText = this.value != 0 ? this.value : '';
	sendMessage({ feedPostTitleFontWeight: this.value });
	saveFeedPostTitleFontWeight(this.value);
});

// Slider - Feed Post Content Font Weight
const saveFeedPostContentFontWeight = debounce(function (value) {
	BROWSER_API.storage.sync.set({ feedPostContentFontWeight: value });
}, 500);
document.querySelector('#input-feed-post-content-font-weight').addEventListener('input', function () {
	document.querySelector('.icon-feed-post-content-font-weight').style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-content-font-weight-value').innerText = this.value != 0 ? this.value : '';
	sendMessage({ feedPostContentFontWeight: this.value });
	saveFeedPostContentFontWeight(this.value);
});

// Slider - Post Comments Font Weight
const savePostCommentsFontWeight = debounce(function (value) {
	BROWSER_API.storage.sync.set({ postCommentsFontWeight: value });
}, 500);
document.querySelector('#input-post-comments-font-weight').addEventListener('input', function () {
	document.querySelector('.icon-post-comments-font-weight').style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	document.querySelector('#post-comments-font-weight-value').innerText = this.value != 0 ? this.value : '';
	sendMessage({ postCommentsFontWeight: this.value });
	savePostCommentsFontWeight(this.value);
});

// Toggle - Custom Fonts
document.querySelector('#checkbox-custom-fonts').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ customFonts: this.checked });
	sendMessage({ customFonts: this.checked });
	document.querySelector('.icon-custom-fonts').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});
