// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Media Tweaks
// ────────────────────────────────────────────────────────────────────────────

import { sendMessage } from '../../utilities/send_message';

// ─── Images ─────────────────────────────────────────────────────────────────

// Toggle - Add Scrollbar To Tall Images
document.querySelector('#checkbox-image-scroll').addEventListener('change', function () {
	if (this.checked) {
		// disable other image options
		document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ scalePostToFitImage: false });
		document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = '';
		/*document.querySelector('#checkbox-drag-image-to-resize').checked = false;
		BROWSER_API.storage.sync.set({ dragImageToResize: false });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';*/
		const maxImageWidthValue = document.querySelector('#input-max-image-width').value;
		const maxImagePostHeightValue = document.querySelector('#input-max-image-post-height').value;
		document.querySelector('.icon-max-image-width').style.backgroundColor = maxImageWidthValue != 9 ? 'var(--accent)' : '';
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = maxImagePostHeightValue != 98 ? 'var(--accent)' : '';
	} else {
		document.querySelector('.icon-max-image-width').style.backgroundColor = '';
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ imageScroll: this.checked });
	sendMessage({ imageScroll: this.checked });
	document.querySelector('.icon-image-scroll').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Scale Post To Fit Image
document.querySelector('#checkbox-scale-post-to-fit-image').addEventListener('change', function () {
	if (this.checked) {
		// disable other image options
		document.querySelector('#checkbox-image-scroll').checked = false;
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-image-scroll').style.backgroundColor = '';
		//document.querySelector('#checkbox-drag-image-to-resize').checked = false;
		//BROWSER_API.storage.sync.set({ dragImageToResize: false });
		//document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		//document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';
		const maxImageWidthValue = document.querySelector('#input-max-image-width').value;
		const maxImagePostHeightValue = document.querySelector('#input-max-image-post-height').value;
		document.querySelector('.icon-max-image-width').style.backgroundColor = maxImageWidthValue != 9 ? 'var(--accent)' : '';
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = maxImagePostHeightValue != 98 ? 'var(--accent)' : '';
	} else {
		document.querySelector('.icon-max-image-width').style.backgroundColor = '';
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ scalePostToFitImage: this.checked });
	sendMessage({ scalePostToFitImage: this.checked });
	document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Max Image Width ("Add Scrollbar To Tall Images" or "Scale Post To Fit Image" must be enabled)
document.querySelector('#input-max-image-width').addEventListener('input', function () {
	const imageScrollValue = document.querySelector('#checkbox-image-scroll').checked;
	const scalePostToFitImageValue = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	if (imageScrollValue || scalePostToFitImageValue) {
		document.querySelector('.icon-max-image-width').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	}
	sendMessage({ setMaxImageWidth: this.value });
	document.querySelector('#max-image-width-value').textContent = this.value != 9 ? `${this.value}%` : '100%';
});
document.querySelector('#input-max-image-width').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ maxImageWidth: this.value });
	document.querySelector('#max-image-width-value').textContent = this.value != 9 ? `${this.value}%` : '100%';
});

// Slider - Max Image Post Height ("Add Scrollbar To Tall Images" or "Scale Post To Fit Image" must be enabled)
document.querySelector('#input-max-image-post-height').addEventListener('input', function () {
	const imageScrollValue = document.querySelector('#checkbox-image-scroll').checked;
	const scalePostToFitImageValue = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	const maxImagePostHeight = document.querySelector('#max-image-post-height-value');
	if (imageScrollValue || scalePostToFitImageValue) {
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = this.value != 98 ? 'var(--accent)' : '';
	}
	maxImagePostHeight.textContent = this.value != 98 ? `${this.value}px` : '∞';
	sendMessage({ setMaxImagePostHeight: this.value });
});
document.querySelector('#input-max-image-post-height').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ maxImagePostHeight: this.value });
	document.querySelector('#max-image-post-height-value').textContent = this.value != 98 ? `${this.value}px` : '∞';
});

// Toggle - Hide Blurred Media Background
document.querySelector('#checkbox-hide-blurred-media-background').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideBlurredMediaBackground: this.checked });
	sendMessage({ hideBlurredMediaBackground: this.checked });
	if (this.checked) {
		document.querySelector('.icon-hide-blurred-media-background').classList.remove('icon-show');
		document.querySelector('.icon-hide-blurred-media-background').classList.add('icon-hide');
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-blurred-media-background').classList.remove('icon-hide');
		document.querySelector('.icon-hide-blurred-media-background').classList.add('icon-show');
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = '';
	}
});

// Toggle - Just Open The Image
document.querySelector('#checkbox-just-open-the-image').addEventListener('change', function () {
	if (this.checked) {
		// Detect addon manifest version
		if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
			// Request the optional permissions for Firefox
			BROWSER_API.permissions
				.request({
					permissions: ['webRequest', 'webRequestBlocking'],
					origins: ['*://*.redd.it/*'],
				})
				.then((granted) => {
					if (granted) {
						console.log('Optional permissions granted');
						BROWSER_API.storage.sync.set({ justOpenTheImage: true });
						document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
						BROWSER_API.runtime.sendMessage({ justOpenTheImage: true });
					} else {
						console.log('Optional permissions not granted');
						document.querySelector('#checkbox-just-open-the-image').checked = false;
					}
				});
		} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
			BROWSER_API.storage.sync.set({ justOpenTheImage: true });
			document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
			BROWSER_API.runtime.sendMessage({ justOpenTheImage: true });
		}
	} else if (!this.checked) {
		BROWSER_API.storage.sync.set({ justOpenTheImage: false });
		document.querySelector('.icon-just-open-the-image').style.backgroundColor = '';
		BROWSER_API.runtime.sendMessage({ justOpenTheImage: false });
		if (IS_CHROME) alert('Changes will take effect after a reload or the next time you load Reddit.');
	}
});

// Toggle - Drag Image To Resize
/*document.querySelector('#checkbox-drag-image-to-resize').addEventListener('change', function (e) {
	const dragImageToResize = document.querySelector('#checkbox-drag-image-to-resize').checked;
	if (dragImageToResize === true) {
		// disable other image options
		document.querySelector('#checkbox-image-scroll').checked = false;
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-image-scroll').style.backgroundColor = '';
		//document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
		//BROWSER_API.storage.sync.set({ scalePostToFitImage: false });
		//document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = '';
		// enable
		BROWSER_API.storage.sync.set({ dragImageToResize: true });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = 'var(--accent)';
		sendMessage({ dragImageToResize: true });
	} else if (dragImageToResize === false) {
		BROWSER_API.storage.sync.set({ dragImageToResize: false });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';
		sendMessage({ dragImageToResize: false });
	}
});*/

// Slider - Drag Image To Resize Initial Height
/*document.querySelector('#input-drag-image-to-resize-initial-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	const dragImageToResize = document.querySelector('#checkbox-drag-image-to-resize').checked;
	console.log(value);
	console.log(dragImageToResize);
	if (dragImageToResize === true) {
		if (value != 99) {
			document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = 'var(--accent)';
		} else {
			document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';
		}
	}
	if (value != 99) {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
	}
});
document.querySelector('#input-drag-image-to-resize-initial-size').addEventListener('mouseup', function (e) {
	if (e.target.value != 99) {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
	}
	// apply
	sendMessage({ dragImageToResizeInitialSize: e.target.value });
	// save
	BROWSER_API.storage.sync.set({ dragImageToResizeInitialSize: e.target.value });
});*/

// ─── Video ──────────────────────────────────────────────────────────────────

// Toggle - Scale Post To Fit Video
document.querySelector('#checkbox-scale-post-to-fit-video').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ scalePostToFitVideo: this.checked });
	sendMessage({ scalePostToFitVideo: this.checked });
	const maxVideoWidthValue = document.querySelector('#input-max-video-width').value;
	const maxVideoPostHeightValue = document.querySelector('#input-max-video-post-height').value;
	document.querySelector('.icon-scale-post-to-fit-video').style.backgroundColor = this.checked == true ? 'var(--accent)' : '';
	if (this.checked) {
		document.querySelector('.icon-max-video-width').style.backgroundColor = maxVideoWidthValue != 9 ? 'var(--accent)' : '';
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = maxVideoPostHeightValue != 98 ? 'var(--accent)' : '';
	} else {
		document.querySelector('.icon-max-video-width').style.backgroundColor = '';
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = '';
	}
});

// Slider - Max Video Width (Scale Post To Fit Video must be enabled)
document.querySelector('#input-max-video-width').addEventListener('input', function () {
	if (this.checked) {
		document.querySelector('.icon-max-video-width').style.backgroundColor = this.value != 9 ? 'var(--accent)' : '';
	}
	sendMessage({ setMaxVideoWidth: this.value });
	document.querySelector('#limit-video-width-value').textContent = this.value != 9 ? `${this.value}%` : '100%';
});
document.querySelector('#input-max-video-width').addEventListener('mouseup', function () {
	document.querySelector('#limit-video-width-value').textContent = this.value != 9 ? `${this.value}%` : '100%';
	BROWSER_API.storage.sync.set({ maxVideoWidth: this.value });
});

// Slider - Max Video Post Height ("Scale Post To Fit Video" must be enabled)
document.querySelector('#input-max-video-post-height').addEventListener('input', function () {
	if (document.querySelector('#checkbox-scale-post-to-fit-video').checked) {
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = this.value != 98 ? 'var(--accent)' : '';
	}
	sendMessage({ setMaxVideoPostHeight: this.value });
	document.querySelector('#max-video-post-height-value').textContent = this.value != 98 ? `${this.value}px` : '∞';
});
document.querySelector('#input-max-video-post-height').addEventListener('mouseup', function () {
	document.querySelector('#max-video-post-height-value').textContent = this.value != 98 ? this.value + 'px' : '∞';
	BROWSER_API.storage.sync.set({ maxVideoPostHeight: this.value });
});

// Toggle - Add Video Download Button
document.querySelector('#checkbox-add-download-video-button').addEventListener('change', function () {
	if (this.checked) {
		BROWSER_API.permissions
			.request({ permissions: ['downloads'] })
			.then((granted) => {
				if (granted) {
					console.debug('[RedditEnhancer] addDownloadVideoButton: "downloads" permission granted');
					enabled(true);
				} else {
					console.debug('[RedditEnhancer] addDownloadVideoButton: "downloads" permission denied');
					document.querySelector('#checkbox-add-download-video-button').checked = false;
				}
			})
			.catch((e) => {
				console.error('[RedditEnhancer] addDownloadVideoButton: Error requesting "downloads" permission: ', e);
				document.querySelector('#checkbox-add-download-video-button').checked = false;
			});
	} else {
		enabled(false);
	}
	function enabled(value) {
		BROWSER_API.storage.sync.set({ addDownloadVideoButton: value });
		sendMessage({ addDownloadVideoButton: value });
		document.querySelector('.icon-add-download-video-button').style.backgroundColor = value ? 'var(--accent)' : '';
	}
});

// ─── Text ───────────────────────────────────────────────────────────────────

// Slider - Text Post Preview Max Height
document.querySelector('#input-text-post-preview-max-height').addEventListener('input', function () {
	sendMessage({ textPostPreviewMaxHeight: this.value });
	document.querySelector('#text-post-preview-max-height').textContent = this.value != -1 ? `${this.value}px` : '';
	document.querySelector('.icon-text-post-preview-height').style.backgroundColor = this.value != -1 ? 'var(--accent)' : '';
});
document.querySelector('#input-text-post-preview-max-height').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ textPostPreviewMaxHeight: this.value });
});

// Toggle - Text Post Preview Fade
document.querySelector('#checkbox-text-post-preview-fade').addEventListener('change', function () {
	document.querySelectorAll('.icon-text-post-preview-fade').forEach((icon) => {
		this.checked ? icon.classList.add('active') : icon.classList.remove('active');
	});
	BROWSER_API.storage.sync.set({ textPostPreviewFade: this.checked });
	sendMessage({ textPostPreviewFade: this.checked });
});

// Slider - Text Post Preview Fade Height
document.querySelector('#input-text-post-preview-fade-height').addEventListener('input', function () {
	if (this.value) {
		document.querySelector('.icon-text-post-preview-fade-height').style.backgroundColor = this.value != -1 ? 'var(--accent)' : '';
	}
	sendMessage({ textPostPreviewFadeHeight: this.value });
	document.querySelector('#text-post-preview-fade-height').textContent = this.value != -1 ? `${this.value}px` : '';
});
document.querySelector('#input-text-post-preview-fade-height').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ textPostPreviewFadeHeight: this.value });
});

// Toggle - Replace Post Images With Links
document.querySelector('#checkbox-replace-post-images-with-links').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ replacePostImagesWithLinks: this.checked });
	sendMessage({ replacePostImagesWithLinks: this.checked });
	const icon = document.querySelector('.icon-replace-post-images-with-links');
	this.checked ? icon.classList.remove('icon-images') : icon.classList.add('icon-images');
	this.checked ? icon.classList.add('icon-link') : icon.classList.remove('icon-link');
	document.querySelector('.icon-replace-post-images-with-links').style.backgroundColor = this.checked ? 'var(--accent)' : '';

	const homeEnabled = document.querySelector('#checkbox-replace-post-images-with-links-home').checked;
	document.querySelector('.icon-replace-post-images-with-links-home').style.backgroundColor = homeEnabled ? 'var(--accent)' : '';
	const subsEnabled = document.querySelector('#checkbox-replace-post-images-with-links-subs').checked;
	document.querySelector('.icon-replace-post-images-with-links-subs').style.backgroundColor = subsEnabled ? 'var(--accent)' : '';
});

// Toggle - Replace Post Images With Links (Home)
document.querySelector('#checkbox-replace-post-images-with-links-home').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ replacePostImagesWithLinksHome: this.checked });
	sendMessage({ replacePostImagesWithLinksHome: this.checked });
	const icon = document.querySelector('.icon-replace-post-images-with-links-home');
	this.checked ? icon.classList.remove('icon-images') : icon.classList.add('icon-images');
	this.checked ? icon.classList.add('icon-link') : icon.classList.remove('icon-link');
	document.querySelector('.icon-replace-post-images-with-links-home').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Replace Post Images With Links (Subreddits)
document.querySelector('#checkbox-replace-post-images-with-links-subs').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ replacePostImagesWithLinksSubreddits: this.checked });
	sendMessage({ replacePostImagesWithLinksSubreddits: this.checked });
	const icon = document.querySelector('.icon-replace-post-images-with-links-subs');
	this.checked ? icon.classList.remove('icon-images') : icon.classList.add('icon-images');
	this.checked ? icon.classList.add('icon-link') : icon.classList.remove('icon-link');
	document.querySelector('.icon-replace-post-images-with-links-subs').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Replace Post Videos With Links
document.querySelector('#checkbox-replace-post-videos-with-links').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ replacePostVideosWithLinks: this.checked });
	sendMessage({ replacePostVideosWithLinks: this.checked });
	const icon = document.querySelector('.icon-replace-post-videos-with-links');
	this.checked ? icon.classList.remove('icon-film') : icon.classList.add('icon-film');
	this.checked ? icon.classList.add('icon-link') : icon.classList.remove('icon-link');
	document.querySelector('.icon-replace-post-videos-with-links').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Compact Post Link Preview
document.querySelector('#checkbox-compact-post-link-preview').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ compactPostLinkPreview: this.checked });
	sendMessage({ compactPostLinkPreview: this.checked });
	document.querySelector('.icon-compact-post-link-preview').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Full Width Expandos
document.querySelector('#checkbox-full-width-expandos').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ fullWidthExpandos: this.checked });
	sendMessage({ fullWidthExpandos: this.checked });
	document.querySelector('.icon-full-width-expandos').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});
