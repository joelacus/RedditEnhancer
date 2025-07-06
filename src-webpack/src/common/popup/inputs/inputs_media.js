/* ===== Inputs / Media Tweaks ===== */

import { sendMessage } from '../send_message';

/* = Images = */

// Toggle - Add Scrollbar To Tall Images
document.querySelector('#checkbox-image-scroll').addEventListener('change', function (e) {
	const imageScroll = document.querySelector('#checkbox-image-scroll').checked;
	if (imageScroll) {
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
	document.querySelector('.icon-image-scroll').style.backgroundColor = imageScroll == true ? 'var(--accent)' : '';
	sendMessage({ imageScroll: imageScroll });
	BROWSER_API.storage.sync.set({ imageScroll: imageScroll });
});

// Toggle - Scale Post To Fit Image
document.querySelector('#checkbox-scale-post-to-fit-image').addEventListener('change', function (e) {
	const scalePostToFitImage = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	if (scalePostToFitImage) {
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
	document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = scalePostToFitImage == true ? 'var(--accent)' : '';
	sendMessage({ scalePostToFitImage: scalePostToFitImage });
	BROWSER_API.storage.sync.set({ scalePostToFitImage: scalePostToFitImage });
});

// Slider - Max Image Width ("Add Scrollbar To Tall Images" or "Scale Post To Fit Image" must be enabled)
document.querySelector('#input-max-image-width').addEventListener('input', function (e) {
	const value = e.target.value;
	const imageScrollValue = document.querySelector('#checkbox-image-scroll').checked;
	const scalePostToFitImageValue = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	const maxImageWidth = document.querySelector('#max-image-width-value');
	if (imageScrollValue || scalePostToFitImageValue) {
		document.querySelector('.icon-max-image-width').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	}
	maxImageWidth.textContent = value != 9 ? `${value}%` : '100%';
	sendMessage({ setMaxImageWidth: value });
});
document.querySelector('#input-max-image-width').addEventListener('mouseup', function (e) {
	const value = e.target.value;
	document.querySelector('#max-image-width-value').textContent = value != 9 ? value + '%' : '100%';
	BROWSER_API.storage.sync.set({ maxImageWidth: e.target.value });
});

// Slider - Max Image Post Height ("Add Scrollbar To Tall Images" or "Scale Post To Fit Image" must be enabled)
document.querySelector('#input-max-image-post-height').addEventListener('input', function (e) {
	const value = e.target.value;
	const imageScrollValue = document.querySelector('#checkbox-image-scroll').checked;
	const scalePostToFitImageValue = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	const maxImagePostHeight = document.querySelector('#max-image-post-height-value');
	if (imageScrollValue || scalePostToFitImageValue) {
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = value != 98 ? 'var(--accent)' : '';
	}
	maxImagePostHeight.textContent = value != 98 ? `${value}px` : '∞';
	sendMessage({ setMaxImagePostHeight: value });
});
document.querySelector('#input-max-image-post-height').addEventListener('mouseup', function (e) {
	const value = e.target.value;
	document.querySelector('#max-image-post-height-value').textContent = value != 98 ? value + 'px' : '∞';
	BROWSER_API.storage.sync.set({ maxImagePostHeight: e.target.value });
});

// Toggle - Hide Blurred Media Background
document.querySelector('#checkbox-hide-blurred-media-background').addEventListener('change', function () {
	const hideBlurredMediaBackground = document.querySelector('#checkbox-hide-blurred-media-background').checked;
	if (hideBlurredMediaBackground) {
		document.querySelector('.icon-hide-blurred-media-background').classList.remove('icon-show');
		document.querySelector('.icon-hide-blurred-media-background').classList.add('icon-hide');
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-blurred-media-background').classList.remove('icon-hide');
		document.querySelector('.icon-hide-blurred-media-background').classList.add('icon-show');
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideBlurredMediaBackground: hideBlurredMediaBackground });
	sendMessage({ hideBlurredMediaBackground: hideBlurredMediaBackground });
});

// Toggle - Just Open The Image
document.querySelector('#checkbox-just-open-the-image').addEventListener('change', function (e) {
	const justOpenTheImage = document.querySelector('#checkbox-just-open-the-image').checked;
	if (justOpenTheImage === true) {
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
	} else if (justOpenTheImage === false) {
		BROWSER_API.storage.sync.set({ justOpenTheImage: false });
		document.querySelector('.icon-just-open-the-image').style.backgroundColor = '';
		BROWSER_API.runtime.sendMessage({ justOpenTheImage: false });
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

/* = Video = */

// Toggle - Scale Post To Fit Video
document.querySelector('#checkbox-scale-post-to-fit-video').addEventListener('change', function (e) {
	const scalePostToFitVideoValue = document.querySelector('#checkbox-scale-post-to-fit-video').checked;
	const maxVideoWidthValue = document.querySelector('#input-max-video-width').value;
	const maxVideoPostHeightValue = document.querySelector('#input-max-video-post-height').value;
	document.querySelector('.icon-scale-post-to-fit-video').style.backgroundColor = scalePostToFitVideoValue == true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ scalePostToFitVideo: scalePostToFitVideoValue });
	sendMessage({ scalePostToFitVideo: scalePostToFitVideoValue });
	if (scalePostToFitVideoValue) {
		document.querySelector('.icon-max-video-width').style.backgroundColor = maxVideoWidthValue != 9 ? 'var(--accent)' : '';
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = maxVideoPostHeightValue != 98 ? 'var(--accent)' : '';
	} else {
		document.querySelector('.icon-max-video-width').style.backgroundColor = '';
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = '';
	}
});

// Slider - Max Video Width (Scale Post To Fit Video must be enabled)
document.querySelector('#input-max-video-width').addEventListener('input', function (e) {
	const value = e.target.value;
	const scalePostToFitVideo = document.querySelector('#checkbox-scale-post-to-fit-video').checked;
	const maxVideoWidthValue = document.querySelector('#limit-video-width-value');
	if (scalePostToFitVideo) {
		document.querySelector('.icon-max-video-width').style.backgroundColor = value != 9 ? 'var(--accent)' : '';
	}
	maxVideoWidthValue.textContent = value != 9 ? `${value}%` : '100%';
	sendMessage({ setMaxVideoWidth: value });
});
document.querySelector('#input-max-video-width').addEventListener('mouseup', function (e) {
	const value = e.target.value;
	document.querySelector('#limit-video-width-value').textContent = value != 9 ? value + '%' : '100%';
	BROWSER_API.storage.sync.set({ maxVideoWidth: e.target.value });
});

// Slider - Max Video Post Height ("Scale Post To Fit Video" must be enabled)
document.querySelector('#input-max-video-post-height').addEventListener('input', function (e) {
	const value = e.target.value;
	const scalePostToFitVideo = document.querySelector('#checkbox-scale-post-to-fit-video').checked;
	const maxVideoPostHeightValue = document.querySelector('#max-video-post-height-value');
	if (scalePostToFitVideo) {
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = value != 98 ? 'var(--accent)' : '';
	}
	maxVideoPostHeightValue.textContent = value != 98 ? `${value}px` : '∞';
	sendMessage({ setMaxVideoPostHeight: value });
});
document.querySelector('#input-max-video-post-height').addEventListener('mouseup', function (e) {
	const value = e.target.value;
	document.querySelector('#max-video-post-height-value').textContent = value != 98 ? value + 'px' : '∞';
	BROWSER_API.storage.sync.set({ maxVideoPostHeight: e.target.value });
});

// Toggle - New Video Player
document.querySelector('#checkbox-new-player').addEventListener('change', function (e) {
	var newPlayer = document.querySelector('#checkbox-new-player').checked;
	if (newPlayer == true) {
		BROWSER_API.storage.sync.set({ newPlayer: true });
		document.querySelector('.icon-new-player').style.backgroundColor = 'var(--accent)';
		sendMessage({ newPlayer: true });
	} else if (newPlayer == false) {
		BROWSER_API.storage.sync.set({ newPlayer: false });
		document.querySelector('.icon-new-player').style.backgroundColor = '';
		sendMessage({ newPlayer: false });
	}
});

// Toggle - Add Video Download Button
/*document.querySelector('#checkbox-add-download-video-button').addEventListener('change', function (e) {
	const addDownloadVideoButton = document.querySelector('#checkbox-add-download-video-button').checked;
	if (addDownloadVideoButton === true) {
		BROWSER_API.storage.sync.set({ addDownloadVideoButton: true });
		document.querySelector('.icon-add-download-video-button').style.backgroundColor = 'var(--accent)';
		sendMessage({ addDownloadVideoButton: true });
	} else if (addDownloadVideoButton === false) {
		BROWSER_API.storage.sync.set({ addDownloadVideoButton: false });
		document.querySelector('.icon-add-download-video-button').style.backgroundColor = '';
		sendMessage({ addDownloadVideoButton: false });
	}
});*/

/* = Text = */

// Slider - Text Post Preview Max Height
document.querySelector('#input-text-post-preview-max-height').addEventListener('input', function (e) {
	document.querySelector('#text-post-preview-max-height').textContent = e.target.value != -1 ? e.target.value + 'px' : '';
	document.querySelector('.icon-text-post-preview-height').style.backgroundColor = e.target.value != -1 ? 'var(--accent)' : '';
	sendMessage({ textPostPreviewMaxHeight: e.target.value });
});
document.querySelector('#input-text-post-preview-max-height').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ textPostPreviewMaxHeight: e.target.value });
});

// Toggle - Text Post Preview Fade
document.querySelector('#checkbox-text-post-preview-fade').addEventListener('change', function (e) {
	const textPostPreviewFade = document.querySelector('#checkbox-text-post-preview-fade').checked;
	if (textPostPreviewFade) {
		document.querySelectorAll('.icon-text-post-preview-fade').forEach((icon) => {
			icon.classList.add('active');
		});
	} else {
		document.querySelectorAll('.icon-text-post-preview-fade').forEach((icon) => {
			icon.classList.remove('active');
		});
	}
	BROWSER_API.storage.sync.set({ textPostPreviewFade: textPostPreviewFade });
	sendMessage({ textPostPreviewFade: textPostPreviewFade });
});

// Slider - Text Post Preview Fade Height
document.querySelector('#input-text-post-preview-fade-height').addEventListener('input', function (e) {
	const textPostPreviewFade = document.querySelector('#checkbox-text-post-preview-fade').checked;
	if (textPostPreviewFade) {
		document.querySelector('.icon-text-post-preview-fade-height').style.backgroundColor = e.target.value != -1 ? 'var(--accent)' : '';
	}
	document.querySelector('#text-post-preview-fade-height').textContent = e.target.value != -1 ? e.target.value + 'px' : '';
	sendMessage({ textPostPreviewFadeHeight: e.target.value });
});
document.querySelector('#input-text-post-preview-fade-height').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ textPostPreviewFadeHeight: e.target.value });
});

// Toggle - Add Scroll To Text Post
document.querySelector('#checkbox-text-scroll-post').addEventListener('change', function (e) {
	const textPostScroll = document.querySelector('#checkbox-text-scroll-post').checked;
	if (textPostScroll == true) {
		BROWSER_API.storage.sync.set({ textPostScroll: true });
		document.querySelector('.icon-text-scroll-post').style.backgroundColor = 'var(--accent)';
		sendMessage({ textPostScroll: true });
	} else if (textPostScroll == false) {
		BROWSER_API.storage.sync.set({ textPostScroll: false });
		document.querySelector('.icon-text-scroll-post').style.backgroundColor = '';
		sendMessage({ textPostScroll: false });
	}
});

// Toggle - Replace Post Images With Links
document.querySelector('#checkbox-replace-post-images-with-links').addEventListener('change', function (e) {
	const replacePostImagesWithLinks = document.querySelector('#checkbox-replace-post-images-with-links').checked;
	BROWSER_API.storage.sync.set({ replacePostImagesWithLinks: replacePostImagesWithLinks });
	sendMessage({ replacePostImagesWithLinks: replacePostImagesWithLinks });
	if (replacePostImagesWithLinks) {
		document.querySelector('.icon-replace-post-images-with-links').classList.remove('icon-images');
		document.querySelector('.icon-replace-post-images-with-links').classList.add('icon-link');
	} else {
		document.querySelector('.icon-replace-post-images-with-links').classList.remove('icon-link');
		document.querySelector('.icon-replace-post-images-with-links').classList.add('icon-images');
	}
	document.querySelector('.icon-replace-post-images-with-links').style.backgroundColor = replacePostImagesWithLinks ? 'var(--accent)' : '';
});

// Toggle - Replace Post Videos With Links
document.querySelector('#checkbox-replace-post-videos-with-links').addEventListener('change', function (e) {
	const replacePostVideosWithLinks = document.querySelector('#checkbox-replace-post-videos-with-links').checked;
	BROWSER_API.storage.sync.set({ replacePostVideosWithLinks: replacePostVideosWithLinks });
	sendMessage({ replacePostVideosWithLinks: replacePostVideosWithLinks });
	if (replacePostVideosWithLinks) {
		document.querySelector('.icon-replace-post-videos-with-links').classList.remove('icon-film');
		document.querySelector('.icon-replace-post-videos-with-links').classList.add('icon-link');
	} else {
		document.querySelector('.icon-replace-post-videos-with-links').classList.remove('icon-link');
		document.querySelector('.icon-replace-post-videos-with-links').classList.add('icon-film');
	}
	document.querySelector('.icon-replace-post-videos-with-links').style.backgroundColor = replacePostVideosWithLinks ? 'var(--accent)' : '';
});

// Toggle - Compact Post Link Preview
document.querySelector('#checkbox-compact-post-link-preview').addEventListener('change', function (e) {
	const compactPostLinkPreview = document.querySelector('#checkbox-compact-post-link-preview').checked;
	if (compactPostLinkPreview) {
		BROWSER_API.storage.sync.set({ compactPostLinkPreview: true });
		document.querySelector('.icon-compact-post-link-preview').style.backgroundColor = 'var(--accent)';
		sendMessage({ compactPostLinkPreview: true });
	} else {
		BROWSER_API.storage.sync.set({ compactPostLinkPreview: false });
		document.querySelector('.icon-compact-post-link-preview').style.backgroundColor = '';
		sendMessage({ compactPostLinkPreview: false });
	}
});
