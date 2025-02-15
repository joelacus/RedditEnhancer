/* ===== Inputs / Resize Feed/Post ===== */

import { sendMessage } from '../send_message';

// Toggle - Resize Layout
document.querySelector('#checkbox-expand-layout').addEventListener('change', function (e) {
	const expandLayout = document.querySelector('#checkbox-expand-layout').checked;
	if (expandLayout === true) {
		BROWSER_API.storage.sync.set({ expandLayout: true });
		const icons = document.querySelectorAll('.icon-resize-elements, .icon-expand-layout, .icon-resize-width, .icon-resize-offset');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = 'var(--accent)';
		});
		sendMessage({ expandLayout: true });
	} else if (expandLayout === false) {
		BROWSER_API.storage.sync.set({ expandLayout: false });
		const icons = document.querySelectorAll('.icon-resize-elements, .icon-expand-layout, .icon-resize-width, .icon-resize-offset');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		BROWSER_API.storage.sync.set({ layoutCentre: false });
		document.querySelector('.icon-centre').style.backgroundColor = '';
		document.querySelector('#checkbox-layout-centre').checked = false;
		sendMessage({ expandLayout: false });
		sendMessage({ layoutCentre: false });
	}
});

// Slider - Resize Home Width
document.querySelector('#input-expand-view-width').addEventListener('input', function (e) {
	const widthDisplay = document.querySelector('#expand-view-width');
	widthDisplay.innerText = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandLayoutWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-view-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandLayoutWidth: e.target.value });
});

// Slider - Resize Post Overlay Width
document.querySelector('#input-expand-post-overlay-width').addEventListener('input', function (e) {
	document.querySelector('#expand-post-overlay-width').textContent = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandPostOverlayWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-post-overlay-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandPostOverlayWidth: e.target.value });
});

// Slider - Resize Post Width
document.querySelector('#input-expand-post-width').addEventListener('input', function (e) {
	document.querySelector('#expand-post-width').textContent = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandPostWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-post-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandPostWidth: e.target.value });
});

// Slider - Resize Sub Reddit Width
document.querySelector('#input-expand-sub-width').addEventListener('input', function (e) {
	document.querySelector('#expand-sub-width').textContent = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandSubWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-sub-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandSubWidth: e.target.value });
});

// Slider - Resize User Profile Width
document.querySelector('#input-expand-user-profile-width').addEventListener('input', function (e) {
	document.querySelector('#expand-user-profile-width').textContent = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandUserProfileWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-user-profile-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandUserProfileWidth: e.target.value });
});

// Slider - Resize Topic Feed Width
document.querySelector('#input-expand-topic-feed-width').addEventListener('input', function (e) {
	document.querySelector('#expand-topic-feed-width').textContent = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandTopicFeedWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-topic-feed-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandTopicFeedWidth: e.target.value });
});

// Slider - Resize Custom Feed Width
document.querySelector('#input-expand-custom-feed-width').addEventListener('input', function (e) {
	document.querySelector('#expand-custom-feed-width').textContent = e.target.value + '%';
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			sendMessage({ expandCustomFeedWidth: e.target.value });
		}
	});
});
document.querySelector('#input-expand-custom-feed-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandCustomFeedWidth: e.target.value });
});

// Toggle - Centre Layout
document.querySelector('#checkbox-layout-centre').addEventListener('change', function (e) {
	const expandLayout = document.querySelector('#checkbox-expand-layout').checked;
	if (expandLayout) {
		const state = document.querySelector('#checkbox-layout-centre').checked;
		if (state === true) {
			BROWSER_API.storage.sync.set({ layoutCentre: true });
			document.querySelector('.icon-centre').style.backgroundColor = 'var(--accent)';
			sendMessage({ layoutCentre: true });
		} else {
			BROWSER_API.storage.sync.set({ layoutCentre: false });
			document.querySelector('.icon-centre').style.backgroundColor = '';
			sendMessage({ layoutCentre: false });
		}
	} else {
		document.querySelector('#checkbox-layout-centre').checked = false;
	}
});

// Input - Auto Expand Feed/Post To 100% At Value
document.querySelector('#auto-expand-value').addEventListener('keyup', function (e) {
	BROWSER_API.storage.sync.set({ autoExpandValue: e.target.value });
	sendMessage({ autoExpandValue: e.target.value });
});

// Slider - Layout Offset
document.querySelector('#input-layout-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-offset-value').textContent = e.target.value + '%';
	sendMessage({ layoutOffset: e.target.value });
});
document.querySelector('#input-layout-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutOffset: e.target.value });
});

// Slider - Layout Sub Offset
document.querySelector('#input-layout-sub-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-sub-offset-value').textContent = e.target.value + '%';
	sendMessage({ layoutSubOffset: e.target.value });
});
document.querySelector('#input-layout-sub-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutSubOffset: e.target.value });
});

// Slider - Layout Post Offset
document.querySelector('#input-layout-post-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-post-offset-value').textContent = e.target.value + '%';
	sendMessage({ layoutPostOffset: e.target.value });
});
document.querySelector('#input-layout-post-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutPostOffset: e.target.value });
});

// Slider - Layout User Profile Offset
document.querySelector('#input-layout-user-profile-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-user-profile-offset-value').textContent = e.target.value + '%';
	sendMessage({ layoutUserProfileOffset: e.target.value });
});
document.querySelector('#input-layout-user-profile-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutUserProfileOffset: e.target.value });
});

// Slider - Layout Search Page Offset
document.querySelector('#input-layout-search-page-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-search-page-offset-value').textContent = e.target.value + '%';
	sendMessage({ layoutSearchPageOffset: e.target.value });
});
document.querySelector('#input-layout-search-page-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutSearchPageOffset: e.target.value });
});

// Toggle - Resize Main Container
document.querySelector('#checkbox-resize-main-container').addEventListener('change', function (e) {
	const resizeMainContainer = document.querySelector('#checkbox-resize-main-container').checked;
	if (resizeMainContainer) {
		document.querySelector('.icon-resize-main-container').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-resize-main-container-width').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-resize-main-container').style.backgroundColor = '';
		document.querySelector('.icon-resize-main-container-width').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ resizeMainContainer: resizeMainContainer });
	sendMessage({ resizeMainContainer: resizeMainContainer });
});

// Slider - Resize Main Container Width
document.querySelector('#input-resize-main-container-width').addEventListener('input', function (e) {
	document.querySelector('#resize-main-container-width-value').textContent = e.target.value + '%';
	sendMessage({ resizeMainContainerWidth: e.target.value });
});
document.querySelector('#input-resize-main-container-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ resizeMainContainerWidth: e.target.value });
});
