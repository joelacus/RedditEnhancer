/* ===== Tweaks - Media - Replace Post Videos With Links ===== */

// Hide post videos and show links instead on feeds.

/* === Triggered On Page Load === */
export function loadReplacePostVideosWithLinks() {
	BROWSER_API.storage.sync.get(['replacePostVideosWithLinks'], function (result) {
		replacePostVideosWithLinks(result.replacePostVideosWithLinks);
	});
}

/* === Main Functions === */

export function replacePostVideosWithLinks(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableReplacePostVideosWithLinks();
			if (document.querySelector('shreddit-feed')) {
				observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
			}
		} else {
			observer.disconnect();
			disableReplacePostVideosWithLinks();
		}
	}
}

// Function - Enable Replace Videos With Links
function enableReplacePostVideosWithLinks() {
	// Append Stylesheet
	if (!document.head.querySelector('style[id="re-replace-post-videos-with-links"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-replace-post-videos-with-links';
		styleElement.textContent = `.re-media-link {
										position: relative;
										display: block;
										margin-bottom: 12px;
										z-index: 9;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// Initial Video Posts
	document.querySelectorAll('shreddit-feed shreddit-post:has(shreddit-player-2)').forEach((post) => {
		if (post.querySelector('shreddit-blurred-container')) return;
		try {
			if (post.getAttribute('data-re-link') === 'true') return;
			const url = post.querySelector('shreddit-player-2')?.shadowRoot?.querySelector('video')?.src || post.querySelector('shreddit-player-2 source')?.src;
			if (url.includes('.mp4') || url.includes('.gif')) {
				appendLink(post, url);
				post.setAttribute('data-re-link', 'true');
				post.querySelector('[slot="post-media-container"]').style.display = 'none';
			}
		} catch (e) {}
	});

	// Create and Append Link
	function appendLink(post, url) {
		// Edit URL
		const urlObj = new URL(url);
		urlObj.search = '';
		const image_url = urlObj.toString();

		// Create and Append Text Link
		const a = document.createElement('a');
		a.classList.add('re-media-link');
		a.href = url;
		a.target = '_blank';
		a.textContent = image_url;
		post.append(a);
	}
}

// Function - Disable Replace Videos With Links
function disableReplacePostVideosWithLinks() {
	document.querySelectorAll('shreddit-feed shreddit-post:has(shreddit-player-2) [slot="post-media-container"]').forEach((container) => {
		// Show Videos
		container.removeAttribute('style');

		// Remove Text Links
		container
			.closest('shreddit-post')
			.querySelectorAll('.re-media-link')
			.forEach((link) => {
				link.remove();
			});

		// Remove "Done" Attributes
		container.closest('shreddit-post').removeAttribute('data-re-link');
	});

	// Remove Stylesheet
	const dynamicStyleElements = document.head.querySelectorAll('style[id="replace-post-videos-with-links"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			enableReplacePostVideosWithLinks();
		});
	});
});

/*
const blurred_observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			console.log(node);
		});
	});
});

blurred_observer.observe(document.querySelector('shreddit-post:has(shreddit-blurred-container)'), { childList: true, subtree: true });
*/
