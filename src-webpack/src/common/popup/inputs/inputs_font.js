/* ===== Inputs / Font Tweaks ===== */

import { sendMessage } from '../send_message';

/* === Font Size === */

// Slider - Post Title Font Size
document.querySelector('#input-post-title-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-post-title-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#post-title-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ postTitleFontSize: value });
});
document.querySelector('#input-post-title-font-size').addEventListener('mouseup', (e) => {
	// save value on mouseup to significantly reduce api writes.
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ postTitleFontSize: value });
});

// Slider - Post Content Font Size
document.querySelector('#input-post-content-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-post-content-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#post-content-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ postContentFontSize: value });
});
document.querySelector('#input-post-content-font-size').addEventListener('mouseup', (e) => {
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ postContentFontSize: value });
});

// Slider - Feed Post Title Font Size
document.querySelector('#input-feed-post-title-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-feed-post-title-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-title-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ feedPostTitleFontSize: value });
});
document.querySelector('#input-feed-post-title-font-size').addEventListener('mouseup', (e) => {
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ feedPostTitleFontSize: value });
});

// Slider - Feed Post Content Font Size
document.querySelector('#input-feed-post-content-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-feed-post-content-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-content-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ feedPostContentFontSize: value });
});
document.querySelector('#input-feed-post-content-font-size').addEventListener('mouseup', (e) => {
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ feedPostContentFontSize: value });
});

// Slider - Post Comments Font Size
document.querySelector('#input-post-comments-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-post-comments-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#post-comments-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ postCommentsFontSize: value });
});
document.querySelector('#input-post-comments-font-size').addEventListener('mouseup', (e) => {
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ postCommentsFontSize: value });
});

// Slider - "Create Post: Title" Font Size
document.querySelector('#input-create-post-title-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-create-post-title-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#create-post-title-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ createPostTitleFontSize: value });
});
document.querySelector('#input-create-post-title-font-size').addEventListener('mouseup', (e) => {
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ createPostTitleFontSize: value });
});

// Slider - "Create Post: Body" Font Size
document.querySelector('#input-create-post-body-font-size').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-create-post-body-font-size').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	document.querySelector('#create-post-body-font-size-value').innerText = value != 9 ? `${e.target.value}px` : '';
	sendMessage({ createPostBodyFontSize: value });
});
document.querySelector('#input-create-post-body-font-size').addEventListener('mouseup', (e) => {
	const value = e.target.value !== 9 ? e.target.value : false;
	BROWSER_API.storage.sync.set({ createPostBodyFontSize: value });
});

/* === Font Weight === */

// Slider - Post Title Font Weight
document.querySelector('#input-post-title-font-weight').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-post-title-font-weight').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
	document.querySelector('#post-title-font-weight-value').innerText = value != 0 ? e.target.value : '';
	sendMessage({ postTitleFontWeight: value });
});
document.querySelector('#input-post-title-font-weight').addEventListener('mouseup', (e) => {
	BROWSER_API.storage.sync.set({ postTitleFontWeight: e.target.value });
});

// Slider - Post Content Font Weight
document.querySelector('#input-post-content-font-weight').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-post-content-font-weight').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
	document.querySelector('#post-content-font-weight-value').innerText = value != 0 ? e.target.value : '';
	sendMessage({ postContentFontWeight: value });
});
document.querySelector('#input-post-content-font-weight').addEventListener('mouseup', (e) => {
	BROWSER_API.storage.sync.set({ postContentFontWeight: e.target.value });
});

// Slider - Feed Post Title Font Weight
document.querySelector('#input-feed-post-title-font-weight').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-feed-post-title-font-weight').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-title-font-weight-value').innerText = value != 0 ? e.target.value : '';
	sendMessage({ feedPostTitleFontWeight: value });
});
document.querySelector('#input-feed-post-title-font-weight').addEventListener('mouseup', (e) => {
	BROWSER_API.storage.sync.set({ feedPostTitleFontWeight: e.target.value });
});

// Slider - Feed Post Content Font Weight
document.querySelector('#input-feed-post-content-font-weight').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-feed-post-content-font-weight').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
	document.querySelector('#feed-post-content-font-weight-value').innerText = value != 0 ? e.target.value : '';
	sendMessage({ feedPostContentFontWeight: value });
});
document.querySelector('#input-feed-post-content-font-weight').addEventListener('mouseup', (e) => {
	BROWSER_API.storage.sync.set({ feedPostContentFontWeight: e.target.value });
});

// Slider - Post Comments Font Weight
document.querySelector('#input-post-comments-font-weight').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-post-comments-font-weight').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
	document.querySelector('#post-comments-font-weight-value').innerText = value != 0 ? e.target.value : '';
	sendMessage({ postCommentsFontWeight: value });
});
document.querySelector('#input-post-comments-font-weight').addEventListener('mouseup', (e) => {
	BROWSER_API.storage.sync.set({ postCommentsFontWeight: e.target.value });
});

// Toggle - Custom Fonts
document.querySelector('#checkbox-custom-fonts').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ customFonts: value });
	document.querySelector('.icon-custom-fonts').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ customFonts: value });
});
