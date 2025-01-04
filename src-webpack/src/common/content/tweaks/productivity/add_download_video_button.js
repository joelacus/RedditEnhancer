/* ===== Tweaks - Productivity - Add Download Video Button ===== */

/* === Triggered On Page Load === 
export function loadAddDownloadVideoButton() {
	BROWSER_API.storage.sync.get(['addDownloadVideoButton'], function (result) {
		if (result.addDownloadVideoButton) addDownloadVideoButton(true);
	});
}*/

/* === Main Function === 
export function addDownloadVideoButton(value) {
	if (redditVersion === 'newnew' && value === true) {
		document.querySelectorAll('shreddit-post').forEach((post) => {
			if (post.querySelector(':has(shreddit-player)')) {
				const container = post.shadowRoot.querySelector('div:has([name="comments-action-button"])');
				enableAddVideoDownloadButtonNewNew(container);
			}
		});
		observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
	} else {
		observer.disconnect();
		disableAddVideoDownloadButtonAll();
	}
}*/

// Function - Enable Add Download Video Button - New New
/*function enableAddVideoDownloadButtonNewNew(container) {
	if (!container.querySelector('.re-video-download-btn')) {
		const btn = document.createElement('div');
		btn.classList.add('re-video-download-btn');
		btn.setAttribute('style', 'cursor: pointer;text-decoration: underline;z-index: 99;');
		btn.textContent = 'Download Video';
		btn.addEventListener('click', function (e) {
			e.stopPropagation();
			const post = e.currentTarget.getRootNode().host;
			//const videoUrl = post.querySelector('shreddit-player').getAttribute('src');
			//if (!videoUrl.includes('.mp4') && videoUrl.includes('.m3u8')) {
			const videoURL = post.querySelector('shreddit-player').getAttribute('preview');
			console.log(videoURL);
			BROWSER_API.runtime.sendMessage({ action: 'testQualities', url: videoURL }, (response) => {
				console.log('Received response from background script:', response);
			});
		});
		container.appendChild(btn);
	}
}

// Function - Disable Add Download Video Button - All
function disableAddVideoDownloadButtonAll() {
	document.querySelectorAll('shreddit-post').forEach((post) => {
		if (post.shadowRoot.querySelector('.re-video-download-btn')) {
			post.shadowRoot.querySelector('.re-video-download-btn').remove();
		}
	});
}

// Observe feed for new posts
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				setTimeout(() => {
					if (addedNode.closest('shreddit-post').querySelector(':has(shreddit-player)')) {
						const container = addedNode.closest('shreddit-post').shadowRoot.querySelector('div:has([name="comments-action-button"])');
						enableAddVideoDownloadButtonNewNew(container);
					}
				}, 1000);
			}
		});
	});
});*/
