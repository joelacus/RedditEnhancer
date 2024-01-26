// Limit Infinity Scroll

export function limitInfinityScroll(value) {
	const link = window.location.href;
	if (link.indexOf('old.reddit.com') <= 0 && link.indexOf('/comments/') <= 0 && link.indexOf('/settings/') <= 0 && link.indexOf('/user/') <= 0) {
		// new reddit, not post, not settings, not user
		if (value == true) {
			// start observer and hide all posts
			postObserver(true);

			// show the first batch of hidden posts
			const hiddenPosts = document.querySelectorAll('.re-post.hide');
			for (let i = 0; i < 25 && i < hiddenPosts.length; i++) {
				hiddenPosts[i].classList.remove('hide');
			}

			// load more posts
			function loadMore() {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				// get all posts
				const posts = document.querySelectorAll('.re-post');

				// clear the first 25 posts
				for (let i = 0; i < 25 && i < posts.length; i++) {
					posts[i].remove();
				}

				// get all hidden posts
				const hiddenPosts = document.querySelectorAll('.re-post.hide');

				// show the next batch of hidden posts
				for (let i = 0; i < 25 && i < hiddenPosts.length; i++) {
					hiddenPosts[i].classList.remove('hide');
				}

				// scroll to the top
				setTimeout(() => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}, 500);
			}

			// create load more button
			const loadMoreButton = document.createElement('button');
			loadMoreButton.classList.add('re-load-more');

			// get language and set text
			BROWSER_API.storage.sync.get(['language'], function (result) {
				if (typeof result.language == 'undefined') {
					var lang = 'en';
				} else {
					var lang = result.language;
				}
				if (lang === 'en' || lang === 'en-GB' || lang === 'en-US') {
					var loadMoreText = 'Load More';
				} else if (lang === 'de') {
					var loadMoreText = 'Mehr laden';
				} else if (lang === 'es') {
					var loadMoreText = 'Carga más';
				} else if (lang === 'fr') {
					var loadMoreText = 'Charger plus';
				} else if (lang === 'it') {
					var loadMoreText = 'Carica altro';
				} else if (lang === 'nl') {
					var loadMoreText = 'Meer laden';
				} else if (lang === 'pl') {
					var loadMoreText = 'Załaduj więcej';
				} else if (lang === 'pt') {
					var loadMoreText = 'Carregue mais';
				} else if (lang === 'uk') {
					var loadMoreText = 'Завантажити ще';
				} else {
					var loadMoreText = 'Load More';
				}

				loadMoreButton.textContent = loadMoreText;
				loadMoreButton.addEventListener('click', loadMore);

				// append button to end of feed
				const feed = document.querySelector('.re-feed').firstChild;
				feed.appendChild(loadMoreButton);

				// hide pseudo loading post
				loadMoreButton.previousSibling.classList.add('re-hide');
			});
		} else if (value == false || value == undefined) {
			// stop observer
			postObserver(false);
			// show all posts
			const posts = document.querySelectorAll('.re-post');
			posts.forEach(function (post) {
				post.classList.remove('hide');
			});
			// remove load more button
			if (document.querySelector('.re-load-more')) {
				document.querySelector('.re-load-more').remove();
			}
		}
	}
}

// Observe for posts added to post container
const observer = new MutationObserver(function (mutations_list) {
	// detect post and hide it
	mutations_list.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (node) {
			if (node.tagName === 'DIV') {
				if (node.querySelector('.Post:not(.promotedlink)')) {
					// check if it isn't an ad
					node.classList.add('re-post', 'hide');
				}
			}
		});
	});

	// remove new posts if max threshold is reached
	/*const feedContainer = document.querySelector('.re-feed-container');
	const maxItems = 50;
	mutations_list.forEach((mutation) => {
		if (mutation.addedNodes.length) {
			const currentItems = feedContainer.childElementCount;
			if (currentItems >= maxItems) {
				mutation.addedNodes.forEach((node) => {
					node.remove();
				});
			}
			const hiddenPosts = document.querySelectorAll('.re-post');
			for (let i = 0; i < 25 && i < hiddenPosts.length; i++) {
				hiddenPosts[i].classList.remove('hide');
			}
		}
	});*/
});

// Toggle Observer
function postObserver(i) {
	if (i === true) {
		// get existing posts
		document
			.querySelector('.re-feed-container')
			.querySelectorAll(':scope > div')
			.forEach((div) => {
				if (div.querySelector('.Post:not(.promotedlink)')) {
					div.classList.add('re-post', 'hide');
				}
			});
		// start observer
		observer.observe(document.querySelector('.re-feed-container'), { childList: true, subtree: true });
	} else if (i === false) {
		// stop observer
		observer.disconnect();
	}
}
