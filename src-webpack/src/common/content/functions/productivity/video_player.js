/* ===== Tweaks - Productivity - New Player ===== */

import { videoObserver } from '../../video_observer';

/* === Triggered On Page Load === */
export function loadNewPlayer() {
	BROWSER_API.storage.sync.get(['newPlayer'], function (result) {
		if (result.newPlayer) newPlayer(true);
	});
}

/* === Main Function === */
export function newPlayer(value) {
	if (redditVersion === 'new') {
		if (value == true) {
			videoObserver(true);
			removeNewVideoPlayerCSS();
			addNewVideoPlayerCSS();
		} else if (value == false) {
			videoObserver(false);
			removeNewVideoPlayerCSS();
		}
	}
}

// Function - Add New Video Player CSS
function addNewVideoPlayerCSS() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-new-video-player';
	styleElement.textContent = `.video-js .vjs-big-play-button,
										.video-js:hover .vjs-big-play-button,
										.video-js .vjs-big-play-button:focus {
											border: 0 !important;
											background-color: rgba(26, 26, 27, 0.7) !important;
											border-radius: 50% !important;
											line-height: 2em !important;
											height: 2em !important;
											width: 2em !important;
											color: #ff4500 !important;
											margin-top: -1.5em !important;
											margin-left: -1em !important;
										}
										.video-js .vjs-play-progress {
											background-color: #ff4500 !important;
										}
										.video-js .vjs-control-bar {
											background-color: rgba(26, 26, 27, 0.7) !important;
										}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Remove New Video Player CSS
function removeNewVideoPlayerCSS() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-new-video-player"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
