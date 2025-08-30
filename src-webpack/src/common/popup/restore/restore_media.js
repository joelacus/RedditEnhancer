/* ===== Restore Popup UI / Media ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Media" options.

export function restorePopupMediaOptions() {
	/* = Images = */

	// Add Scrollbar To Tall Images
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		if (result.imageScroll == true) {
			document.querySelector('#checkbox-image-scroll').checked = true;
			document.querySelector('.icon-image-scroll').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.imageScroll == 'undefined' || result.imageScroll == false) {
			document.querySelector('#checkbox-image-scroll').checked = false;
			var value = false;
		}
		console.log('Scroll Tall Images: ' + value);
	});

	// Scale Post To Fit Image
	BROWSER_API.storage.sync.get(['scalePostToFitImage'], function (result) {
		if (result.scalePostToFitImage == true) {
			document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-scale-post-to-fit-image').checked = true;
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.scalePostToFitImage == 'undefined' || result.scalePostToFitImage == false) {
			document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
			var value = false;
		}
		console.log('Scale Post To Fit Image: ' + value);
	});

	// Max Image Width
	BROWSER_API.storage.sync.get(['maxImageWidth', 'imageScroll', 'scalePostToFitImage'], function (result) {
		if (typeof result.maxImageWidth != 'undefined') {
			if (result.maxImageWidth > 9 && result.maxImageWidth <= 100) {
				highlightMenuIcon('media-tweaks');
				if (result.imageScroll == true || result.scalePostToFitImage == true) {
					document.querySelector('.icon-max-image-width').style.backgroundColor = 'var(--accent)';
				}
				document.querySelector('#input-max-image-width').value = result.maxImageWidth;
				document.querySelector('#max-image-width-value').innerText = result.maxImageWidth + '%';
				var value = result.maxImageWidth + 'px';
			} else {
				document.querySelector('#input-max-image-width').value = 9;
				document.querySelector('#max-image-width-value').innerText = '100%';
				var value = 'default (100%)';
			}
		} else if (typeof result.maxImageWidth == 'undefined') {
			document.querySelector('#input-max-image-width').value = 9;
			document.querySelector('#max-image-width-value').innerText = '100%';
			var value = 'default (100%)';
		}
		console.log('Max Image Width: ' + value);
	});

	// Max Image Post Height
	BROWSER_API.storage.sync.get(['maxImagePostHeight', 'imageScroll', 'scalePostToFitImage'], function (result) {
		if (typeof result.maxImagePostHeight != 'undefined') {
			if (result.maxImagePostHeight > 98 && result.maxImagePostHeight <= 1000) {
				highlightMenuIcon('media-tweaks');
				if (result.imageScroll == true || result.scalePostToFitImage == true) {
					document.querySelector('.icon-max-image-post-height').style.backgroundColor = 'var(--accent)';
				}
				document.querySelector('#input-max-image-post-height').value = result.maxImagePostHeight;
				document.querySelector('#max-image-post-height-value').innerText = result.maxImagePostHeight + 'px';
				var value = result.maxImagePostHeight + 'px';
			} else {
				document.querySelector('#input-max-image-post-height').value = 98;
				document.querySelector('#max-image-post-height-value').innerText = '∞';
				var value = 'default (∞)';
			}
		} else if (typeof result.maxImagePostHeight == 'undefined') {
			document.querySelector('#input-max-image-post-height').value = 98;
			document.querySelector('#max-image-post-height-value').innerText = '∞';
			var value = 'default (∞)';
		}
		console.log('Max Image Post Height: ' + value);
	});

	// Hide Blurred Media Background
	BROWSER_API.storage.sync.get(['hideBlurredMediaBackground'], function (result) {
		const hideBlurredMediaBackground = result.hideBlurredMediaBackground === true;
		if (hideBlurredMediaBackground) highlightMenuIcon('media-tweaks');
		document.querySelector('#checkbox-hide-blurred-media-background').checked = hideBlurredMediaBackground;
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = hideBlurredMediaBackground ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-blurred-media-background').classList.toggle('icon-show', !hideBlurredMediaBackground);
		document.querySelector('.icon-hide-blurred-media-background').classList.toggle('icon-hide', hideBlurredMediaBackground);
		console.log('Hide Blurred Media Background: ' + hideBlurredMediaBackground);
	});

	// Just Open The Image
	BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
		if (result.justOpenTheImage == true) {
			if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
				BROWSER_API.permissions.contains(
					{
						permissions: ['webRequest', 'webRequestBlocking'],
						origins: ['*://*.redd.it/*'],
					},
					(result) => {
						if (result) {
							document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
							document.querySelector('#checkbox-just-open-the-image').checked = true;
							highlightMenuIcon('media-tweaks');
							var value = true;
						} else {
							var value = 'false. Optional permissions not granted';
						}
						console.log('Just Open The Image: ' + value);
					}
				);
			} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
				document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
				document.querySelector('#checkbox-just-open-the-image').checked = true;
				highlightMenuIcon('media-tweaks');
				console.log('Just Open The Image: (true)');
			}
		} else if (typeof result.justOpenTheImage == 'undefined' || result.justOpenTheImage == false) {
			document.querySelector('#checkbox-just-open-the-image').checked = false;
			console.log('Just Open The Image: (false)');
		}
	});

	// Drag Image to Resize
	/*BROWSER_API.storage.sync.get(['dragImageToResize'], function (result) {
		if (result.dragImageToResize == true) {
			document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-drag-image-to-resize').checked = true;
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.dragImageToResize == 'undefined' || result.dragImageToResize == false) {
			document.querySelector('#checkbox-drag-image-to-resize').checked = false;
			var value = false;
		}
		console.log('Drag Image to Resize: ' + value);
	});

	// Drag Image to Resize Initial Size
	BROWSER_API.storage.sync.get(['dragImageToResizeInitialSize'], function (result) {
		if (typeof result.dragImageToResizeInitialSize != 'undefined') {
			if (result.dragImageToResizeInitialSize > 99 && result.dragImageToResizeInitialSize <= 1000) {
				highlightMenuIcon('media-tweaks');
				const dragImageToResize = document.querySelector('#checkbox-drag-image-to-resize').checked;
				if (dragImageToResize === true) {
					document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = 'var(--accent)';
				}
				document.querySelector('#input-drag-image-to-resize-initial-size').value = result.dragImageToResizeInitialSize;
				document.querySelector('#drag-image-to-resize-initial-size-value').innerText = result.dragImageToResizeInitialSize + 'px';
				var value = result.dragImageToResizeInitialSize + 'px';
			} else {
				document.querySelector('#input-drag-image-to-resize-initial-size').value = 99;
				document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
				var value = 'default (350px)';
			}
		} else if (typeof result.dragImageToResizeInitialSize == 'undefined') {
			document.querySelector('#input-drag-image-to-resize-initial-size').value = 99;
			document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
			var value = 'default (350px)';
		}
		console.log('Drag Image to Resize Initial Size: ' + value);
	});*/

	/* = Video = */

	// Scale Post To Fit Video
	BROWSER_API.storage.sync.get(['scalePostToFitVideo'], function (result) {
		if (result.scalePostToFitVideo == true) {
			document.querySelector('.icon-scale-post-to-fit-video').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-scale-post-to-fit-video').checked = true;
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.scalePostToFitVideo == 'undefined' || result.scalePostToFitVideo == false) {
			document.querySelector('#checkbox-scale-post-to-fit-video').checked = false;
			var value = false;
		}
		console.log('Scale Post To Fit Video: ' + value);
	});

	// Max Video Width
	BROWSER_API.storage.sync.get(['maxVideoWidth', 'scalePostToFitVideo'], function (result) {
		if (typeof result.maxVideoWidth != 'undefined') {
			if (result.maxVideoWidth > 9 && result.maxVideoWidth <= 100) {
				highlightMenuIcon('media-tweaks');
				if (result.scalePostToFitVideo == true) {
					document.querySelector('.icon-max-video-width').style.backgroundColor = 'var(--accent)';
				}
				document.querySelector('#input-max-video-width').value = result.maxVideoWidth;
				document.querySelector('#limit-video-width-value').innerText = result.maxVideoWidth + '%';
				var value = result.maxVideoWidth + 'px';
			} else {
				document.querySelector('#input-max-video-width').value = 9;
				document.querySelector('#limit-video-width-value').innerText = '100%';
				var value = 'default (100%)';
			}
		} else if (typeof result.maxVideoWidth == 'undefined') {
			document.querySelector('#input-max-video-width').value = 9;
			document.querySelector('#limit-video-width-value').innerText = '100%';
			var value = 'default (100%)';
		}
		console.log('Max Video Width: ' + value);
	});

	// Max Video Post Height
	BROWSER_API.storage.sync.get(['maxVideoPostHeight', 'scalePostToFitVideo'], function (result) {
		if (typeof result.maxVideoPostHeight != 'undefined') {
			if (result.maxVideoPostHeight > 98 && result.maxVideoPostHeight <= 1000) {
				highlightMenuIcon('media-tweaks');
				if (result.scalePostToFitVideo == true) {
					document.querySelector('.icon-max-video-post-height').style.backgroundColor = 'var(--accent)';
				}
				document.querySelector('#input-max-video-post-height').value = result.maxVideoPostHeight;
				document.querySelector('#max-video-post-height-value').innerText = result.maxVideoPostHeight + 'px';
				var value = result.maxVideoPostHeight + 'px';
			} else {
				document.querySelector('#input-max-video-post-height').value = 98;
				document.querySelector('#max-video-post-height-value').innerText = '∞';
				var value = 'default (∞)';
			}
		} else if (typeof result.maxVideoPostHeight == 'undefined') {
			document.querySelector('#input-max-video-post-height').value = 98;
			document.querySelector('#max-video-post-height-value').innerText = '∞';
			var value = 'default (∞)';
		}
		console.log('Max Video Post Height: ' + value);
	});

	// Add Download Video Button
	BROWSER_API.storage.sync.get(['addDownloadVideoButton'], function (result) {
		if (result.addDownloadVideoButton === true) {
			document.querySelector('.icon-add-download-video-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-add-download-video-button').checked = true;
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.addDownloadVideoButton == 'undefined' || result.addDownloadVideoButton == false) {
			document.querySelector('#checkbox-add-download-video-button').checked = false;
			var value = false;
		}
		console.log('Add Download Video Button: ' + value);
	});

	/* = Text = */

	// Text Post Preview Max Height
	BROWSER_API.storage.sync.get(['textPostPreviewMaxHeight'], function (result) {
		const value = result.textPostPreviewMaxHeight || -1;
		document.querySelector('#input-text-post-preview-max-height').value = value;
		document.querySelector('#text-post-preview-max-height').innerText = value >= 0 ? value + 'px' : '';
		if (value > -1) {
			document.querySelector('.icon-text-post-preview-height').style.backgroundColor = 'var(--accent)';
		}
		console.log(`Text Post Preview Max Height: ${value >= 0 ? value + 'px' : 'default'}`);
	});

	// Text Post Preview Fade
	BROWSER_API.storage.sync.get(['textPostPreviewFade'], function (result) {
		const textPostPreviewFade = result.textPostPreviewFade === true;
		document.querySelector('#checkbox-text-post-preview-fade').checked = textPostPreviewFade;
		if (textPostPreviewFade) {
			highlightMenuIcon('media-tweaks');
			document.querySelectorAll('.icon-text-post-preview-fade').forEach((icon) => {
				icon.classList.add('active');
			});
		}
		console.log('Text Post Preview Fade: ' + textPostPreviewFade);
	});

	// Text Post Preview Fade Height
	BROWSER_API.storage.sync.get(['textPostPreviewFade', 'textPostPreviewFadeHeight'], function (result) {
		const value = result.textPostPreviewFadeHeight || -1;
		document.querySelector('#input-text-post-preview-fade-height').value = value;
		document.querySelector('#text-post-preview-fade-height').innerText = value >= 0 ? value + 'px' : '';
		if (result.textPostPreviewFade === true && value > -1) {
			document.querySelector('.icon-text-post-preview-fade-height').style.backgroundColor = 'var(--accent)';
		}
		console.log(`Text Post Preview Fade Height: ${value >= 0 ? value + 'px' : 'default'}`);
	});

	// Replace Post Images With Links
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks'], function (result) {
		if (result.replacePostImagesWithLinks === true) {
			document.querySelector('#checkbox-replace-post-images-with-links').checked = true;
			document.querySelector('.icon-replace-post-images-with-links').classList.remove('icon-images');
			document.querySelector('.icon-replace-post-images-with-links').classList.add('icon-link');
			document.querySelector('.icon-replace-post-images-with-links').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.replacePostImagesWithLinks == 'undefined' || result.replacePostImagesWithLinks === false) {
			document.querySelector('#checkbox-replace-post-images-with-links').checked = false;
			var value = false;
		}
		console.log('Replace Post Images With Links: ' + value);
	});

	// Replace Post Videos With Links
	BROWSER_API.storage.sync.get(['replacePostVideosWithLinks'], function (result) {
		if (result.replacePostVideosWithLinks === true) {
			document.querySelector('#checkbox-replace-post-videos-with-links').checked = true;
			document.querySelector('.icon-replace-post-videos-with-links').classList.remove('icon-film');
			document.querySelector('.icon-replace-post-videos-with-links').classList.add('icon-link');
			document.querySelector('.icon-replace-post-videos-with-links').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.replacePostVideosWithLinks == 'undefined' || result.replacePostVideosWithLinks === false) {
			document.querySelector('#checkbox-replace-post-videos-with-links').checked = false;
			var value = false;
		}
		console.log('Replace Post Videos With Links: ' + value);
	});

	// Compact Post Link Preview
	BROWSER_API.storage.sync.get(['compactPostLinkPreview'], function (result) {
		if (result.compactPostLinkPreview === true) {
			document.querySelector('#checkbox-compact-post-link-preview').checked = true;
			document.querySelector('.icon-compact-post-link-preview').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('media-tweaks');
			var value = true;
		} else if (typeof result.compactPostLinkPreview === 'undefined' || result.compactPostLinkPreview === false) {
			document.querySelector('#checkbox-compact-post-link-preview').checked = false;
			var value = false;
		}
		console.log('Compact Post Link Preview: ' + value);
	});

    // Full Width Expandos
    BROWSER_API.storage.sync.get(['fullWidthExpandos'], function (result) {
        if (result.fullWidthExpandos === true) {
            document.querySelector('#checkbox-full-width-expandos').checked = true;
            document.querySelector('.icon-full-width-expandos').style.backgroundColor = 'var(--accent)';
            highlightMenuIcon('media-tweaks');
            var value = true;
        } else if (typeof result.fullWidthExpandos === 'undefined' || result.fullWidthExpandos === false) {
            document.querySelector('#checkbox-full-width-expandos').checked = false;
            var value = false;
        }
        console.log('Full Width Expandos: ' + value);
    });
}
