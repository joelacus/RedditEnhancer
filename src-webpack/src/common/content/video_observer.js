/* ===== Video Player Observer And Replacer ===== */

// Add videojs styles
let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = BROWSER_API.runtime.getURL('/videojs/video-js.css');
document.head.appendChild(link);

// Replace the reddit video player
function replaceVideoPlayer(target) {
	// Check if the new player is already added
	var videoSibling = target.parentNode.querySelectorAll('.video-js');
	if (videoSibling.length === 0) {
		// Get reddit video source and poster
		const poster = target.querySelector('shreddit-player').getAttribute('poster');
		const type = target.querySelector('shreddit-player').querySelector('source').getAttribute('type');
		const src = target.querySelector('shreddit-player').getAttribute('src');
		const source = src.split('.m3u8')[0] + '.m3u8';
		const preview = target.querySelector('shreddit-player').getAttribute('preview');

		// Create new video player
		const video = document.createElement('video');
		video.setAttribute('class', 'video-js');
		video.setAttribute('controls', '');
		video.setAttribute('preload', 'auto');
		video.setAttribute('width', '100%');
		video.setAttribute('height', '100%');
		video.setAttribute('poster', poster);
		video.setAttribute('data-setup', '{"playbackRates": [0.5, 1, 1.5, 2, 2.5, 3, 4, 5]}');
		video.setAttribute('style', 'width: 100%;height: 100%;');

		const sourceElement = document.createElement('source');
		sourceElement.setAttribute('src', source);
		sourceElement.setAttribute('type', type);
		video.appendChild(sourceElement);

		// Check if videojs script has been added to the page
		if (!document.querySelector('script[src="/videojs/video.min.js"]')) {
			// Add videojs script to the page
			let script = document.createElement('script');
			script.src = BROWSER_API.runtime.getURL('/videojs/video.min.js');
			document.body.appendChild(script);
		}

		// Hide original player
		target.style.display = 'none';

		// Attach new player to DOM
		target.insertAdjacentElement('afterend', video);
	}
	var videoSibling = Array.prototype.slice.call(target.parentNode.querySelectorAll('.video-js'), 0, -1);
	videoSibling.forEach(function (item) {
		item.remove();
	});
}

// Observe html for videos to trigger replacement function
const observer = new MutationObserver((mutationsList) => {
	for (let mutation of mutationsList) {
		for (let node of mutation.addedNodes) {
			if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'MEDIA-TELEMETRY-OBSERVER') {
				replaceVideoPlayer(node);
			}
		}
	}
});

// Toggle Observer
export function videoObserver(i) {
	if (i === true) {
		// check for any existing players
		document.querySelectorAll('media-telemetry-observer').forEach((node) => {
			replaceVideoPlayer(node);
		});
		// start observer
		observer.observe(document.body, { childList: true, subtree: true });
	} else if (i === false) {
		// stop observer
		observer.disconnect();
		// show original players
		document.querySelectorAll('media-telemetry-observer').forEach((node) => {
			node.style.display = '';
		});
		// remove new players
		document.querySelectorAll('.video-js').forEach((node) => {
			node.remove();
		});
	}
}
