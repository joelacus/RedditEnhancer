/* ===== Restore Popup UI / Resize/Offset Elements ===== */

import { highlightMenuIcon, highlightOptionIcon } from '../popup_restore';

// Restore UI settings for "Resize Feed/Post" options.

export function restorePopupResizeFeedOptions() {
	// Expand/Resize Layout
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (typeof result.expandLayout == 'undefined' || result.expandLayout == false) {
			document.querySelector('#checkbox-expand-layout').checked = false;
			var value = false;
		} else if (result.expandLayout == true) {
			document.querySelector('#checkbox-expand-layout').checked = true;
			highlightMenuIcon('resize-elements');
			highlightOptionIcon('expand-layout');
			highlightOptionIcon('resize-width');
			highlightOptionIcon('resize-offset');
			highlightOptionIcon('auto-resize');
			var value = true;
		}
		console.log('Expand Layout: ' + value);
	});

	// Auto Expand Feed/Post To 100% At Value
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		if (typeof result.autoExpandValue != 'undefined') {
			document.querySelector('#auto-expand-value').value = result.autoExpandValue;
			var value = result.autoExpandValue;
		} else {
			document.querySelector('#auto-expand-value').value = 1000;
			var value = 1000;
		}
		console.log('Expand Post/Feed To 100% At Width: ' + value + 'px');
	});

	// Resize Home Feed
	BROWSER_API.storage.sync.get(['expandLayoutWidth'], function (result) {
		if (typeof result.expandLayoutWidth != 'undefined') {
			document.querySelector('#input-expand-view-width').value = result.expandLayoutWidth;
			document.querySelector('#expand-view-width').innerText = result.expandLayoutWidth + '%';
			var value = result.expandLayoutWidth;
		}
		if (typeof result.expandLayoutWidth == 'undefined') {
			document.querySelector('#input-expand-view-width').value = 80;
			document.querySelector('#expand-view-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Home Width: ' + value + '%');
	});

	// Resize Post Overlay
	BROWSER_API.storage.sync.get(['expandPostOverlayWidth'], function (result) {
		if (typeof result.expandPostOverlayWidth != 'undefined') {
			document.querySelector('#input-expand-post-overlay-width').value = result.expandPostOverlayWidth;
			document.querySelector('#expand-post-overlay-width').innerText = result.expandPostOverlayWidth + '%';
			var value = result.expandPostOverlayWidth;
		}
		if (typeof result.expandPostOverlayWidth == 'undefined') {
			document.querySelector('#input-expand-post-overlay-width').value = 80;
			document.querySelector('#expand-post-overlay-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Post Overlay Width: ' + value + '%');
	});

	// Resize Post
	BROWSER_API.storage.sync.get(['expandPostWidth'], function (result) {
		if (typeof result.expandPostWidth != 'undefined') {
			document.querySelector('#input-expand-post-width').value = result.expandPostWidth;
			document.querySelector('#expand-post-width').innerText = result.expandPostWidth + '%';
			var value = result.expandPostWidth;
		}
		if (typeof result.expandPostWidth == 'undefined') {
			document.querySelector('#input-expand-post-width').value = 80;
			document.querySelector('#expand-post-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Post Width: ' + value + '%');
	});

	// Resize Sub Reddit
	BROWSER_API.storage.sync.get(['expandSubWidth'], function (result) {
		if (typeof result.expandSubWidth != 'undefined') {
			document.querySelector('#input-expand-sub-width').value = result.expandSubWidth;
			document.querySelector('#expand-sub-width').innerText = result.expandSubWidth + '%';
			var value = result.expandSubWidth;
		}
		if (typeof result.expandSubWidth == 'undefined') {
			document.querySelector('#input-expand-sub-width').value = 80;
			document.querySelector('#expand-sub-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Sub Width: ' + value + '%');
	});

	// Resize User Profile
	BROWSER_API.storage.sync.get(['expandUserProfileWidth'], function (result) {
		if (typeof result.expandUserProfileWidth != 'undefined') {
			document.querySelector('#input-expand-user-profile-width').value = result.expandUserProfileWidth;
			document.querySelector('#expand-user-profile-width').innerText = result.expandUserProfileWidth + '%';
			var value = result.expandUserProfileWidth;
		}
		if (typeof result.expandUserProfileWidth == 'undefined') {
			document.querySelector('#input-expand-user-profile-width').value = 80;
			document.querySelector('#expand-user-profile-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand User Profile Width: ' + value + '%');
	});

	// Resize Topic Feed
	BROWSER_API.storage.sync.get(['expandTopicFeedWidth'], function (result) {
		if (typeof result.expandTopicFeedWidth != 'undefined') {
			document.querySelector('#input-expand-topic-feed-width').value = result.expandTopicFeedWidth;
			document.querySelector('#expand-topic-feed-width').innerText = result.expandTopicFeedWidth + '%';
			var value = result.expandTopicFeedWidth;
		}
		if (typeof result.expandTopicFeedWidth == 'undefined') {
			document.querySelector('#input-expand-topic-feed-width').value = 80;
			document.querySelector('#expand-topic-feed-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Topic Feed Width: ' + value + '%');
	});

	// Resize Custom Feed
	BROWSER_API.storage.sync.get(['expandCustomFeedWidth'], function (result) {
		if (typeof result.expandCustomFeedWidth != 'undefined') {
			document.querySelector('#input-expand-custom-feed-width').value = result.expandCustomFeedWidth;
			document.querySelector('#expand-custom-feed-width').innerText = result.expandCustomFeedWidth + '%';
			var value = result.expandCustomFeedWidth;
		}
		if (typeof result.expandCustomFeedWidth == 'undefined') {
			document.querySelector('#input-expand-custom-feed-width').value = 80;
			document.querySelector('#expand-custom-feed-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Custom Feed Width: ' + value + '%');
	});

	// Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		if (result.layoutCentre == true) {
			document.querySelector('#checkbox-layout-centre').checked = true;
			document.querySelector('.icon-centre').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-resize-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.layoutCentre == 'undefined' || result.layoutCentre == false) {
			document.querySelector('#checkbox-layout-centre').checked = false;
			var value = false;
		}
		console.log('Layout Centre: ' + value);
	});

	// Home Feed Offset
	BROWSER_API.storage.sync.get(['layoutOffset'], function (result) {
		if (typeof result.layoutOffset != 'undefined') {
			var value = result.layoutOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-offset').value = value;
		document.querySelector('#layout-offset-value').innerText = value + '%';
		console.log('Layout Home Offset: ' + value + '%');
	});

	// Sub Feed Offset
	BROWSER_API.storage.sync.get(['layoutSubOffset'], function (result) {
		if (typeof result.layoutSubOffset != 'undefined') {
			var value = result.layoutSubOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-sub-offset').value = value;
		document.querySelector('#layout-sub-offset-value').innerText = value + '%';
		console.log('Layout Sub Offset: ' + value + '%');
	});

	// Post Offset
	BROWSER_API.storage.sync.get(['layoutPostOffset'], function (result) {
		if (typeof result.layoutPostOffset != 'undefined') {
			var value = result.layoutPostOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-post-offset').value = value;
		document.querySelector('#layout-post-offset-value').innerText = value + '%';
		console.log('Layout Post Offset: ' + value + '%');
	});

	// User Profile Feed Offset
	BROWSER_API.storage.sync.get(['layoutUserProfileOffset'], function (result) {
		if (typeof result.layoutUserProfileOffset != 'undefined') {
			var value = result.layoutUserProfileOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-user-profile-offset').value = value;
		document.querySelector('#layout-user-profile-offset-value').innerText = value + '%';
		console.log('Layout User Profile Offset: ' + value + '%');
	});

	// Search Results Page Offset
	BROWSER_API.storage.sync.get(['layoutSearchPageOffset'], function (result) {
		if (typeof result.layoutSearchPageOffset != 'undefined') {
			var value = result.layoutSearchPageOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-search-page-offset').value = value;
		document.querySelector('#layout-search-page-offset-value').innerText = value + '%';
		console.log('Layout Search Page Offset: ' + value + '%');
	});

	// Side Menu Width
	BROWSER_API.storage.sync.get(['sideMenuWidth'], function (result) {
		if (parseInt(result.sideMenuWidth) >= 200) {
			document.querySelector('#input-side-menu-width').value = result.sideMenuWidth;
			document.querySelector('#side-menu-width-value').textContent = result.sideMenuWidth + 'px';
			document.querySelector('.icon-side-menu-width').style.backgroundColor = 'var(--accent)';
			//document.querySelector('.menu-item-link .icon-expand-layout').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('resize-elements');
			var value = result.sideMenuWidth + 'px';
		} else {
			document.querySelector('#input-side-menu-width').value = 199;
			document.querySelector('#side-menu-width-value').textContent = 'off';
			var value = 'false';
		}
		console.log('Side Menu Width: ' + value);
	});

	// Resize Main Container & Resize Main Container Width
	BROWSER_API.storage.sync.get(['resizeMainContainer', 'resizeMainContainerWidth'], function (result) {
		const resizeMainContainer = result.resizeMainContainer;
		const resizeMainContainerWidth = result.resizeMainContainerWidth;

		document.querySelector('#checkbox-resize-main-container').checked = !!resizeMainContainer;
		if (resizeMainContainer) {
			const icons = document.querySelectorAll('.icon-resize-main-container, .icon-resize-main-container-width');
			icons.forEach(icon => icon.style.backgroundColor = 'var(--accent)');
			highlightMenuIcon('resize-elements');
		}
		console.log('Resize Main Container: ' + !!resizeMainContainer);

		const widthValue = resizeMainContainerWidth !== undefined ? resizeMainContainerWidth : 80;
		document.querySelector('#input-resize-main-container-width').value = widthValue;
		document.querySelector('#resize-main-container-width-value').innerText = widthValue + '%';
		console.log('Resize Main Container Width: ' + widthValue + '%');
	});
}
