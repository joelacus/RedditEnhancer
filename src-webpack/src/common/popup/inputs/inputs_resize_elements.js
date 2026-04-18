// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Resize Feed/Post
// ────────────────────────────────────────────────────────────────────────────

import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';

// Toggle - Resize Layout
document.querySelector('#checkbox-expand-layout').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ expandLayout: this.checked });
	sendMessage({ expandLayout: this.checked });
	const icons = document.querySelectorAll('.icon-resize-elements, .icon-expand-layout, .icon-resize-width, .icon-resize-offset');
	icons.forEach(
		function (icon) {
			icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
		}.bind(this),
	);
	if (!this.checked) {
		BROWSER_API.storage.sync.set({ layoutCentre: false });
		sendMessage({ layoutCentre: false });
		document.querySelector('#checkbox-layout-centre').checked = false;
		document.querySelector('.icon-centre').style.backgroundColor = '';
	}
});

// Slider - Resize Home Width
const saveExpandViewWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ expandLayoutWidth: value });
}, 500);
document.querySelector('#input-expand-view-width').addEventListener('input', function () {
	document.querySelector('#expand-view-width').innerText = `${this.value}%`;
	sendMessage({ expandLayoutWidth: this.value });
	saveExpandViewWidth(this.value);
});

// Slider - Resize Post Width
const saveExpandPostWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ expandPostWidth: value });
}, 500);
document.querySelector('#input-expand-post-width').addEventListener('input', function () {
	document.querySelector('#expand-post-width').textContent = `${this.value}%`;
	sendMessage({ expandPostWidth: this.value });
	saveExpandPostWidth(this.value);
});

// Slider - Resize Sub Reddit Width
const saveExpandSubWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ expandSubWidth: value });
}, 500);
document.querySelector('#input-expand-sub-width').addEventListener('input', function () {
	document.querySelector('#expand-sub-width').textContent = `${this.value}%`;
	sendMessage({ expandSubWidth: this.value });
	saveExpandSubWidth(this.value);
});

// Slider - Resize User Profile Width
const saveExpandUserProfileWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ expandUserProfileWidth: value });
}, 500);
document.querySelector('#input-expand-user-profile-width').addEventListener('input', function () {
	document.querySelector('#expand-user-profile-width').textContent = `${this.value}%`;
	sendMessage({ expandUserProfileWidth: this.value });
	saveExpandUserProfileWidth(this.value);
});

// Slider - Resize Topic Feed Width
const saveExpandTopicFeedWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ expandTopicFeedWidth: value });
}, 500);
document.querySelector('#input-expand-topic-feed-width').addEventListener('input', function () {
	document.querySelector('#expand-topic-feed-width').textContent = `${this.value}%`;
	sendMessage({ expandTopicFeedWidth: this.value });
	saveExpandTopicFeedWidth(this.value);
});

// Slider - Resize Custom Feed Width
const saveExpandCustomFeedWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ expandCustomFeedWidth: value });
}, 500);
document.querySelector('#input-expand-custom-feed-width').addEventListener('input', function () {
	document.querySelector('#expand-custom-feed-width').textContent = `${this.value}%`;
	sendMessage({ expandCustomFeedWidth: this.value });
	saveExpandCustomFeedWidth(this.value);
});

// Toggle - Centre Layout
document.querySelector('#checkbox-layout-centre').addEventListener('change', function () {
	const resizeFeedEnabled = document.querySelector('#checkbox-expand-layout').checked;
	if (resizeFeedEnabled) {
		BROWSER_API.storage.sync.set({ layoutCentre: this.checked });
		document.querySelector('.icon-centre').style.backgroundColor = this.checked ? 'var(--accent)' : '';
		sendMessage({ layoutCentre: this.checked });
	} else {
		document.querySelector('#checkbox-layout-centre').checked = false;
	}
});

// Input - Auto Expand Feed/Post To 100% At Value
document.querySelector('#auto-expand-value').addEventListener(
	'input',
	debounce(function () {
		BROWSER_API.storage.sync.set({ autoExpandValue: this.value });
		sendMessage({ autoExpandValue: this.value });
	}, 500),
);

// Slider - Layout Offset
const saveLayoutOffset = debounce(function (value) {
	BROWSER_API.storage.sync.set({ layoutOffset: value });
}, 500);
document.querySelector('#input-layout-offset').addEventListener('input', function () {
	document.querySelector('#layout-offset-value').textContent = `${this.value}%`;
	sendMessage({ layoutOffset: this.value });
	saveLayoutOffset(this.value);
});

// Slider - Layout Sub Offset
const saveLayoutSubOffset = debounce(function (value) {
	BROWSER_API.storage.sync.set({ layoutSubOffset: value });
}, 500);
document.querySelector('#input-layout-sub-offset').addEventListener('input', function () {
	document.querySelector('#layout-sub-offset-value').textContent = `${this.value}%`;
	sendMessage({ layoutSubOffset: this.value });
	saveLayoutSubOffset(this.value);
});

// Slider - Layout Post Offset
const saveLayoutPostOffset = debounce(function (value) {
	BROWSER_API.storage.sync.set({ layoutPostOffset: value });
}, 500);
document.querySelector('#input-layout-post-offset').addEventListener('input', function () {
	document.querySelector('#layout-post-offset-value').textContent = `${this.value}%`;
	sendMessage({ layoutPostOffset: this.value });
	saveLayoutPostOffset(this.value);
});

// Slider - Layout User Profile Offset
const saveLayoutUserProfileOffset = debounce(function (value) {
	BROWSER_API.storage.sync.set({ layoutUserProfileOffset: value });
}, 500);
document.querySelector('#input-layout-user-profile-offset').addEventListener('input', function () {
	document.querySelector('#layout-user-profile-offset-value').textContent = `${this.value}%`;
	sendMessage({ layoutUserProfileOffset: this.value });
	saveLayoutUserProfileOffset(this.value);
});

// Slider - Layout Search Page Offset
const saveLayoutSearchPageOffset = debounce(function (value) {
	BROWSER_API.storage.sync.set({ layoutSearchPageOffset: value });
}, 500);
document.querySelector('#input-layout-search-page-offset').addEventListener('input', function () {
	document.querySelector('#layout-search-page-offset-value').textContent = `${this.value}%`;
	sendMessage({ layoutSearchPageOffset: this.value });
	saveLayoutSearchPageOffset(this.value);
});

// Toggle - Snap Sidebar
document.querySelector('#checkbox-snap-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ snapSidebar: this.checked });
	sendMessage({ snapSidebar: this.checked });
	document.querySelector('.icon-snap-sidebar').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	document.querySelector('#input-resize-main-container-width').disabled = this.checked;
	if (this.checked) {
		document.querySelector('#input-resize-main-container-width').value = 100;
		document.querySelector('#resize-main-container-width-value').textContent = '100%';
	}
});

// Slider - Resize Main Container Width
const saveResizeMainContainerWidth = debounce(function (value) {
	BROWSER_API.storage.sync.set({ resizeMainContainerWidth: value });
}, 500);
document.querySelector('#input-resize-main-container-width').addEventListener('input', function () {
	document.querySelector('#resize-main-container-width-value').textContent = `${this.value}%`;
	sendMessage({ resizeMainContainerWidth: this.value });
	saveResizeMainContainerWidth(this.value);
});
