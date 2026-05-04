// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Media
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { validateInt, validatePercentage } from './validation';

// Restore UI settings for "Media" options.

export function restorePopupMediaOptions() {
	/* = Images = */

	// Add Scrollbar To Tall Images
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		const value = result.imageScroll === true;
		document.querySelector('#checkbox-image-scroll').checked = value;
		document.querySelector('.icon-image-scroll').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('media-tweaks');
		console.log('Scroll Tall Images: ' + value);
	});

	// Scale Post To Fit Image
	BROWSER_API.storage.sync.get(['scalePostToFitImage'], function (result) {
		const value = result.scalePostToFitImage === true;
		document.querySelector('#checkbox-scale-post-to-fit-image').checked = value;
		document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('media-tweaks');
		console.log('Scale Post To Fit Image: ' + value);
	});

	// Max Image Width
	BROWSER_API.storage.sync.get(['maxImageWidth', 'imageScroll', 'scalePostToFitImage'], function (result) {
		const value = validatePercentage(parseInt(result.maxImageWidth), 9);
		const displayValue = value === 9 ? '100%' : `${value}%`;
		const hasAccent = value > 9 && (result.imageScroll === true || result.scalePostToFitImage === true);
		document.querySelector('#input-max-image-width').value = value;
		document.querySelector('#max-image-width-value').innerText = displayValue;
		document.querySelector('.icon-max-image-width').style.backgroundColor = hasAccent ? 'var(--accent)' : '';
		console.log('Max Image Width: ' + (value === 9 ? 'default (100%)' : `${value}%`));
	});

	// Max Image Post Height
	BROWSER_API.storage.sync.get(['maxImagePostHeight', 'imageScroll', 'scalePostToFitImage'], function (result) {
		const value = validateInt(parseInt(result.maxImagePostHeight), 98, 1000, 98);
		const displayValue = value === 98 ? '∞' : `${value}px`;
		const hasAccent = value > 98 && (result.imageScroll === true || result.scalePostToFitImage === true);
		document.querySelector('#input-max-image-post-height').value = value;
		document.querySelector('#max-image-post-height-value').innerText = displayValue;
		document.querySelector('.icon-max-image-post-height').style.backgroundColor = hasAccent ? 'var(--accent)' : '';
		console.log('Max Image Post Height: ' + (value === 98 ? 'default (∞)' : `${value}px`));
	});

	// Hide Blurred Media Background
	BROWSER_API.storage.sync.get(['hideBlurredMediaBackground'], function (result) {
		const checked = result.hideBlurredMediaBackground === true;
		if (checked) highlightMenuIcon('media-tweaks');
		document.querySelector('#checkbox-hide-blurred-media-background').checked = checked;
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = checked ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-blurred-media-background').classList.toggle('icon-show', !checked);
		document.querySelector('.icon-hide-blurred-media-background').classList.toggle('icon-hide', checked);
		console.log('Hide Blurred Media Background: ' + checked);
	});

	// Replace Post Images With Links
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks'], function (result) {
		const checked = result.replacePostImagesWithLinks === true;
		const icon = document.querySelector('.icon-replace-post-images-with-links');
		icon.classList.replace(checked ? 'icon-images' : 'icon-link', checked ? 'icon-link' : 'icon-images');
		if (checked) highlightMenuIcon('media-tweaks');
		document.querySelector('#checkbox-replace-post-images-with-links').checked = checked;
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		console.log('Replace Post Images With Links: ' + checked);
	});

	// Replace Post Images With Links (Home)
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks', 'replacePostImagesWithLinksHome'], function (result) {
		const enabled = result.replacePostImagesWithLinks === true;
		const checked = result.replacePostImagesWithLinksHome !== false;
		const icon = document.querySelector('.icon-replace-post-images-with-links-home');
		icon.classList.replace(checked ? 'icon-images' : 'icon-link', checked ? 'icon-link' : 'icon-images');
		document.querySelector('#checkbox-replace-post-images-with-links-home').checked = checked;
		icon.style.backgroundColor = enabled && checked ? 'var(--accent)' : '';
		console.log('Replace Post Images With Links on the Home Feed: ' + checked);
	});

	// Replace Post Images With Links (Subreddits)
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks', 'replacePostImagesWithLinksSubreddits'], function (result) {
		const enabled = result.replacePostImagesWithLinks === true;
		const checked = result.replacePostImagesWithLinksSubreddits !== false;
		const icon = document.querySelector('.icon-replace-post-images-with-links-subs');
		icon.classList.replace(checked ? 'icon-images' : 'icon-link', checked ? 'icon-link' : 'icon-images');
		document.querySelector('#checkbox-replace-post-images-with-links-subs').checked = checked;
		icon.style.backgroundColor = enabled && checked ? 'var(--accent)' : '';
		console.log('Replace Post Images With Links on Subreddit Feed: ' + checked);
	});

	// Just Open The Image
	BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
		if (result.justOpenTheImage === true) {
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
							console.log('Just Open The Image: true');
						} else {
							console.log('Just Open The Image: false. Optional permissions not granted');
						}
					},
				);
			} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
				document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
				document.querySelector('#checkbox-just-open-the-image').checked = true;
				highlightMenuIcon('media-tweaks');
				console.log('Just Open The Image: (true)');
			}
		} else {
			document.querySelector('#checkbox-just-open-the-image').checked = false;
			console.log('Just Open The Image: false');
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
		const checked = result.scalePostToFitVideo === true;
		document.querySelector('#checkbox-scale-post-to-fit-video').checked = checked;
		document.querySelector('.icon-scale-post-to-fit-video').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('media-tweaks');
		console.log('Scale Post To Fit Video: ' + checked);
	});

	// Max Video Width
	BROWSER_API.storage.sync.get(['maxVideoWidth', 'scalePostToFitVideo'], function (result) {
		const value = validatePercentage(parseInt(result.maxVideoWidth), 9);
		const displayValue = value === 9 ? '100%' : `${value}%`;
		const hasAccent = value > 9 && result.scalePostToFitVideo === true;
		document.querySelector('#input-max-video-width').value = value;
		document.querySelector('#limit-video-width-value').innerText = displayValue;
		document.querySelector('.icon-max-video-width').style.backgroundColor = hasAccent ? 'var(--accent)' : '';
		console.log('Max Video Width: ' + (value === 9 ? 'default (100%)' : `${value}%`));
	});

	// Max Video Post Height
	BROWSER_API.storage.sync.get(['maxVideoPostHeight', 'scalePostToFitVideo'], function (result) {
		const value = validateInt(parseInt(result.maxVideoPostHeight), 98, 1000, 98);
		const displayValue = value === 98 ? '∞' : `${value}px`;
		const hasAccent = value > 98 && result.scalePostToFitVideo === true;
		document.querySelector('#input-max-video-post-height').value = value;
		document.querySelector('#max-video-post-height-value').innerText = displayValue;
		document.querySelector('.icon-max-video-post-height').style.backgroundColor = hasAccent ? 'var(--accent)' : '';
		console.log('Max Video Post Height: ' + (value === 98 ? 'default (∞)' : `${value}px`));
	});

	// Add Download Video Button
	BROWSER_API.storage.sync.get(['addDownloadVideoButton'], function (result) {
		let value = false;
		if (result.addDownloadVideoButton) {
			BROWSER_API.permissions.contains({ permissions: ['downloads'] }, (granted) => {
				if (granted) {
					console.debug('[RedditEnhancer] addDownloadVideoButton: "downloads" permission granted');
					document.querySelector('.icon-add-download-video-button').style.backgroundColor = 'var(--accent)';
					highlightMenuIcon('media-tweaks');
					value = true;
				} else {
					console.debug('[RedditEnhancer] addDownloadVideoButton: "downloads" permission not granted');
				}
				document.querySelector('#checkbox-add-download-video-button').checked = value;
				console.log('Add Download Video Button: ' + value);
			});
		} else {
			document.querySelector('#checkbox-add-download-video-button').checked = false;
			console.log('Add Download Video Button: false');
		}
	});

	// Replace Post Videos With Links
	BROWSER_API.storage.sync.get(['replacePostVideosWithLinks'], function (result) {
		const checked = result.replacePostVideosWithLinks === true;
		const icon = document.querySelector('.icon-replace-post-videos-with-links');
		icon.classList.replace(checked ? 'icon-film' : 'icon-link', checked ? 'icon-link' : 'icon-film');
		if (checked) highlightMenuIcon('media-tweaks');
		document.querySelector('#checkbox-replace-post-videos-with-links').checked = checked;
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		console.log('Replace Post Videos With Links: ' + checked);
	});

	/* = Text = */

	// Text Post Preview Max Height
	BROWSER_API.storage.sync.get(['textPostPreviewMaxHeight'], function (result) {
		const value = validateInt(parseInt(result.textPostPreviewMaxHeight), -1, 500, -1);
		document.querySelector('#input-text-post-preview-max-height').value = value;
		document.querySelector('#text-post-preview-max-height').innerText = value >= 0 ? `${value}px` : '';
		if (value > -1) {
			document.querySelector('.icon-text-post-preview-height').style.backgroundColor = 'var(--accent)';
		}
		console.log(`Text Post Preview Max Height: ${value >= 0 ? value + 'px' : 'default'}`);
	});

	// Text Post Preview Fade
	BROWSER_API.storage.sync.get(['textPostPreviewFade'], function (result) {
		const checked = result.textPostPreviewFade === true;
		document.querySelector('#checkbox-text-post-preview-fade').checked = checked;
		if (checked) {
			highlightMenuIcon('media-tweaks');
			document.querySelectorAll('.icon-text-post-preview-fade').forEach((icon) => {
				icon.classList.add('active');
			});
		}
		console.log('Text Post Preview Fade: ' + checked);
	});

	// Text Post Preview Fade Height
	BROWSER_API.storage.sync.get(['textPostPreviewFade', 'textPostPreviewFadeHeight'], function (result) {
		const value = validateInt(parseInt(result.textPostPreviewFadeHeight), -1, 500, -1);
		document.querySelector('#input-text-post-preview-fade-height').value = value;
		document.querySelector('#text-post-preview-fade-height').innerText = value >= 0 ? `${value}px` : '';
		if (result.textPostPreviewFade === true && value > -1) {
			document.querySelector('.icon-text-post-preview-fade-height').style.backgroundColor = 'var(--accent)';
		}
		console.log(`Text Post Preview Fade Height: ${value >= 0 ? value + 'px' : 'default'}`);
	});

	// Compact Post Link Preview
	BROWSER_API.storage.sync.get(['compactPostLinkPreview'], function (result) {
		const checked = result.compactPostLinkPreview === true;
		document.querySelector('#checkbox-compact-post-link-preview').checked = checked;
		document.querySelector('.icon-compact-post-link-preview').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('media-tweaks');
		console.log('Compact Post Link Preview: ' + checked);
	});

	// Full Width Expandos
	BROWSER_API.storage.sync.get(['fullWidthExpandos'], function (result) {
		const checked = result.fullWidthExpandos === true;
		document.querySelector('#checkbox-full-width-expandos').checked = checked;
		document.querySelector('.icon-full-width-expandos').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('media-tweaks');
		console.log('Full Width Expandos: ' + checked);
	});
}
