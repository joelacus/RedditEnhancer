let limitInfinityScroll = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			// start observer and hide all posts
			postObserver(true);

			// show the first batch of hidden posts
			const hiddenPosts = document.querySelectorAll('.re-post.hide');
			for (let i = 0; i < 25 && i < hiddenPosts.length; i++) {
				console.log(hiddenPosts[i])
				hiddenPosts[i].classList.remove('hide');
			}

			// load more posts
			function loadMore() {
				window.scrollTo({top: 0, behavior: 'smooth'});
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
				setTimeout(function(){
					window.scrollTo({top: 0, behavior: 'smooth'});
				}, 500)
			}

			// create load more button
			const loadMoreButton = document.createElement('button');
			loadMoreButton.classList.add('re-load-more');
			loadMoreButton.textContent = 'Load More';
			loadMoreButton.addEventListener('click', loadMore);

			// append button to end of feed
			const feed = document.querySelector('.re-feed').firstChild;
			feed.appendChild(loadMoreButton);

			// hide pseudo loading post
			loadMoreButton.previousSibling.classList.add('re-hide');

		} else if ((value == false)||(value == undefined)) {
			// stop observer
			postObserver(false);
			// show all posts
			const posts = document.querySelectorAll('.re-post');
			posts.forEach(function(post) {
				post.classList.remove('hide');
			});
			// remove load more button
			document.querySelector('.re-load-more').remove();
		}
	}
}
export { limitInfinityScroll };


// Observe for posts added to post container
const observer = new MutationObserver(function(mutations_list) {
	// detect post and hide it
	mutations_list.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(node) {
			if (node.tagName === 'DIV') {
				if (node.querySelector('.Post')) { // check if it isn't an ad
					node.classList.add('re-post', 'hide');
				}
			}
		});
	});

	// remove new posts if max threshold is reached
	const feedContainer = document.querySelector('.re-feed-container');
	const maxItems = 50;
	mutations_list.forEach(mutation => {
		if (mutation.addedNodes.length) {
			const currentItems = feedContainer.childElementCount;
			console.log(currentItems)
			if (currentItems >= maxItems) {
				console.log("remove node")
				mutation.addedNodes.forEach(node => {
					node.remove();
				});
			}
			// reddit for some reason adds empty divs to the body and could cause the page to lag.
			// get all top level divs in body
			const divs = document.body.querySelectorAll(':scope > div');
			divs.forEach(function(div) {
				// remove if div is empty
				if (div.innerHTML === "") {
					console.log("remove div")
					div.remove();
				}
			});
		}
	});
});


// Toggle Observer
export function postObserver(i) {
	if (i === true) {
		// get existing posts
		document.querySelector('.re-feed-container').querySelectorAll(':scope > div').forEach((div) => {
			if (div.querySelector('.Post')) {
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
