// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Resize/Offset Elements
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon, highlightOptionIcon } from '../popup_restore';
import { validateInt, validatePercentage } from './validation';

// Restore UI settings for "Resize Feed/Post" options.

export function restorePopupResizeFeedOptions() {
	// Expand/Resize Layout
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		const checked = result.expandLayout === true;
		document.querySelector('#checkbox-expand-layout').checked = checked;
		if (checked) {
			highlightMenuIcon('resize-elements');
			highlightOptionIcon('expand-layout');
			highlightOptionIcon('resize-width');
			highlightOptionIcon('resize-offset');
			highlightOptionIcon('auto-resize');
		}
		console.log('Expand Layout: ' + checked);
	});

	// Auto Expand Feed/Post To 100% At Value
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		const value = validateInt(parseInt(result.autoExpandValue), 0, 9999, 1000);
		document.querySelector('#auto-expand-value').value = value;
		console.log('Expand Post/Feed To 100% At Width: ' + value + 'px');
	});

	// Resize Home Feed
	BROWSER_API.storage.sync.get(['expandLayoutWidth'], function (result) {
		const value = validatePercentage(parseInt(result.expandLayoutWidth), 80);
		document.querySelector('#input-expand-view-width').value = value;
		document.querySelector('#expand-view-width').textContent = value + '%';
		console.log('Expand Home Width: ' + value + '%');
	});

	// Resize Post
	BROWSER_API.storage.sync.get(['expandPostWidth'], function (result) {
		const value = validatePercentage(parseInt(result.expandPostWidth), 80);
		document.querySelector('#input-expand-post-width').value = value;
		document.querySelector('#expand-post-width').textContent = value + '%';
		console.log('Expand Post Width: ' + value + '%');
	});

	// Resize Sub Reddit
	BROWSER_API.storage.sync.get(['expandSubWidth'], function (result) {
		const value = validatePercentage(parseInt(result.expandSubWidth), 80);
		document.querySelector('#input-expand-sub-width').value = value;
		document.querySelector('#expand-sub-width').textContent = value + '%';
		console.log('Expand Sub Width: ' + value + '%');
	});

	// Resize User Profile
	BROWSER_API.storage.sync.get(['expandUserProfileWidth'], function (result) {
		const value = validatePercentage(parseInt(result.expandUserProfileWidth), 80);
		document.querySelector('#input-expand-user-profile-width').value = value;
		document.querySelector('#expand-user-profile-width').textContent = value + '%';
		console.log('Expand User Profile Width: ' + value + '%');
	});

	// Resize Topic Feed
	BROWSER_API.storage.sync.get(['expandTopicFeedWidth'], function (result) {
		const value = validatePercentage(parseInt(result.expandTopicFeedWidth), 80);
		document.querySelector('#input-expand-topic-feed-width').value = value;
		document.querySelector('#expand-topic-feed-width').textContent = value + '%';
		console.log('Expand Topic Feed Width: ' + value + '%');
	});

	// Resize Custom Feed
	BROWSER_API.storage.sync.get(['expandCustomFeedWidth'], function (result) {
		const value = validatePercentage(parseInt(result.expandCustomFeedWidth), 80);
		document.querySelector('#input-expand-custom-feed-width').value = value;
		document.querySelector('#expand-custom-feed-width').textContent = value + '%';
		console.log('Expand Custom Feed Width: ' + value + '%');
	});

	// Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		const checked = result.layoutCentre === true;
		document.querySelector('#checkbox-layout-centre').checked = checked;
		document.querySelector('.icon-centre').style.backgroundColor = checked ? 'var(--accent)' : '';
		console.log('Layout Centre: ' + checked);
	});

	// Home Feed Offset
	BROWSER_API.storage.sync.get(['layoutOffset'], function (result) {
		const value = validateInt(parseInt(result.layoutOffset), -100, 100, 0);
		document.querySelector('#input-layout-offset').value = value;
		document.querySelector('#layout-offset-value').innerText = value + '%';
		console.log('Layout Home Offset: ' + value + '%');
	});

	// Sub Feed Offset
	BROWSER_API.storage.sync.get(['layoutSubOffset'], function (result) {
		const value = validateInt(parseInt(result.layoutSubOffset), -100, 100, 0);
		document.querySelector('#input-layout-sub-offset').value = value;
		document.querySelector('#layout-sub-offset-value').innerText = value + '%';
		console.log('Layout Sub Offset: ' + value + '%');
	});

	// Post Offset
	BROWSER_API.storage.sync.get(['layoutPostOffset'], function (result) {
		const value = validateInt(parseInt(result.layoutPostOffset), -100, 100, 0);
		document.querySelector('#input-layout-post-offset').value = value;
		document.querySelector('#layout-post-offset-value').innerText = value + '%';
		console.log('Layout Post Offset: ' + value + '%');
	});

	// User Profile Feed Offset
	BROWSER_API.storage.sync.get(['layoutUserProfileOffset'], function (result) {
		const value = validateInt(parseInt(result.layoutUserProfileOffset), -100, 100, 0);
		document.querySelector('#input-layout-user-profile-offset').value = value;
		document.querySelector('#layout-user-profile-offset-value').innerText = value + '%';
		console.log('Layout User Profile Offset: ' + value + '%');
	});

	// Search Results Page Offset
	BROWSER_API.storage.sync.get(['layoutSearchPageOffset'], function (result) {
		const value = validateInt(parseInt(result.layoutSearchPageOffset), -100, 100, 0);
		document.querySelector('#input-layout-search-page-offset').value = value;
		document.querySelector('#layout-search-page-offset-value').innerText = value + '%';
		console.log('Layout Search Page Offset: ' + value + '%');
	});

	// Side Menu Width
	BROWSER_API.storage.sync.get(['sideMenuWidth'], function (result) {
		const value = validateInt(parseInt(result.sideMenuWidth), 199, 300, 199);
		const hasValue = value >= 200;
		document.querySelector('#input-side-menu-width').value = value;
		document.querySelector('#side-menu-width-value').textContent = hasValue ? value + 'px' : '';
		document.querySelector('.icon-side-menu-width').style.backgroundColor = hasValue ? 'var(--accent)' : '';
		if (hasValue) highlightMenuIcon('resize-elements');
		console.log('Side Menu Width: ' + (hasValue ? value + 'px' : 'false'));
	});

	// Snap Sidebar
	BROWSER_API.storage.sync.get(['snapSidebar'], function (result) {
		const checked = result.snapSidebar === true;
		document.querySelector('#checkbox-snap-sidebar').checked = checked;
		document.querySelector('.icon-snap-sidebar').style.backgroundColor = checked ? 'var(--accent)' : '';
		document.querySelector('#input-resize-main-container-width').disabled = checked;
		console.log('Snap Sidebar: ' + checked);
	});

	// Resize Main Container Width
	BROWSER_API.storage.sync.get(['resizeMainContainerWidth'], function (result) {
		const value = validatePercentage(parseInt(result.resizeMainContainerWidth), 80);
		document.querySelector('#input-resize-main-container-width').value = value;
		document.querySelector('#resize-main-container-width-value').textContent = value + '%';
		console.log('Resize Main Container Width: ' + value + '%');
	});
}
