/* ===== Tweaks - Productivity - Show Missing Post Author On Home/Popular/Search Feeds ===== */

/* === Triggered On Page Load === */
export function loadShowPostAuthor() {
	BROWSER_API.storage.sync.get(['showPostAuthor'], function (result) {
		if (result.showPostAuthor) showPostAuthor(true);
	});
}

/* === Main Function === */
export function showPostAuthor(value) {
	const routename = document.querySelector('shreddit-app').getAttribute('routename');
	const feedRoutes = ['frontpage', 'popular', 'custom_feed'];
	const searchRoutes = ['global_serp', 'community_serp', 'custom_feed_serp'];

	if (redditVersion === 'newnew' && value === true) {
		if (feedRoutes.includes(routename)) {
			document.querySelectorAll('shreddit-post').forEach((post) => {
				attachUsername(post);
			});
			observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
		} else if (searchRoutes.includes(routename)) {
			document.querySelectorAll('search-telemetry-tracker').forEach((post) => {
				attachUsername(post);
			});
			// legacy selector
			document.querySelectorAll('faceplate-tracker[data-testid="search-post"]').forEach((post) => {
				attachUsername(post);
			});
			observer.observe(document.querySelector('reddit-feed'), { childList: true, subtree: true });
		}
	} else if (redditVersion === 'newnew' && value === false) {
		if (routes.includes(routename)) {
			observer.disconnect();
			removeUsername();
		}
	}
}

// Remove all post author names and hover cards.
function removeUsername() {
	document.querySelectorAll('shreddit-post').forEach((post) => {
		if (post.querySelector('.re-post-author')) {
			post.querySelector('.re-post-author').remove();
		}
	});
}

// Attach post author to post header.
// TODO: replace "Posted by" with "Crossposted by" on x-posted posts (no screenshot available?)
async function attachUsername(post) {
	let author = post.getAttribute('author');
	if (!author) {
		// Fetch Author From URL Lookup
		const url = post.querySelector('a').href;
		const userData = await fetchUserData(false, url);
		author = findAuthorFromPostData(userData);
	}

	if (!post.querySelector('.re-post-author')) {
		const a = document.createElement('span');
		a.classList.add('re-post-author');
		a.innerHTML = `Posted by <a href="/user/${author}">u/${author}</a>`;

		let hoverTimer;
		if (author !== '[deleted]') {
			a.addEventListener('mouseenter', () => {
				hoverTimer = setTimeout(function () {
					showHoverCard(post, author);
				}, 500);
			});
			a.addEventListener('mouseleave', () => {
				clearTimeout(hoverTimer);
			});
		}
		const selectors = ['[slot="credit-bar"] > span:has(faceplate-timeago)', '[slot="credit-bar"] > div', 'span:has([bundlename="faceplate_hovercard"])'];
		let container = selectors.map((selector) => post.querySelector(selector)).find((el) => el);
		container.querySelector('faceplate-timeago').before(a);
	}
}

// Function to show the hover card
async function showHoverCard(post, username) {
	// Hide all other hover cards
	document.querySelectorAll('.hover-card').forEach((card) => {
		card.style.display = 'none';
	});

	// Set post Z-Index so the card isn't covered by another post
	document.querySelectorAll('shreddit-post').forEach((post) => {
		post.style.zIndex = '';
	});
	document.querySelectorAll('faceplate-tracker').forEach((post) => {
		post.style.zIndex = '';
	});
	post.style.zIndex = 9;

	// Check if hover card already exists
	const existingHoverCard = post.querySelector('.hover-card');
	if (existingHoverCard) {
		existingHoverCard.style.display = 'block';
		return;
	}

	// Fetch user data
	const userData = await fetchUserData(username, false);

	// Create the hover card
	const hoverCard = createHoverCard(userData);

	const linkRect = post.querySelector('.re-post-author');
	hoverCard.style.left = linkRect.offsetLeft + 'px';
	hoverCard.style.top = linkRect.offsetTop + 20 + 'px';

	// Append the hover card to the body
	const selectors = ['[slot="credit-bar"] > span:has(faceplate-timeago)', '[slot="credit-bar"] > div', 'span:has([bundlename="faceplate_hovercard"])'];
	let container = selectors.map((selector) => post.querySelector(selector)).find((el) => el);
	container.querySelector('faceplate-timeago').before(hoverCard);
	post.querySelector('.hover-card').style.display = 'block';
}

// Function to fetch user data from Reddit API
async function fetchUserData(username, url) {
	if (username) {
		var fetchURL = `https://www.reddit.com/user/${username}/about.json`;
	} else if (url) {
		const cleanedPath = url.replace(/\/+$/, '');
		var fetchURL = `${cleanedPath}.json`;
	}

	return new Promise((resolve, reject) => {
		BROWSER_API.runtime.sendMessage(
			{
				actions: [{ action: 'changeFetchUrl', newFetchUrl: fetchURL }, { action: 'fetchData' }],
			},
			function (response) {
				const data = JSON.parse(response.data);
				if (data.data) {
					resolve(data.data);
				} else {
					resolve(data);
				}
			}
		);
	});
}

// Find The Author From Post Data
function findAuthorFromPostData(data) {
	// check current object
	if (data.hasOwnProperty('author')) {
		return data['author'];
	}
	// check nested objects
	for (const k in data) {
		if (typeof data[k] === 'object' && data[k] !== null) {
			const result = findAuthorFromPostData(data[k], 'author');
			if (result !== undefined) {
				return result;
			}
		}
	}
}

// Function to create the hover card
function createHoverCard(userData) {
	const hoverCard = document.createElement('div');
	hoverCard.classList.add('hover-card', 'user-hover-card', 'max-w-[352px]', 'min-w-[272px]');
	hoverCard.addEventListener('mouseleave', (e) => {
		e.target.style.display = 'none';
	});
	let userDisplayName, userProfileLink, userCommentKarama;
	if (!userData.subreddit) {
		userDisplayName = userData.name;
		userProfileLink = 'https://www.reddit.com/user/' + userData.name;
	} else {
		userDisplayName = userData.subreddit.display_name_prefixed;
		userProfileLink = userData.subreddit.url;
	}
	if (!userData.comment_karma) {
		userCommentKarama = 0;
	} else {
		userCommentKarama = userData.comment_karma.toLocaleString();
	}
	hoverCard.innerHTML = `
		<div class="p-md flex flex-col">
			<div class="flex flex-row justify-items-start">
				<div class="mr-sm">
					<img src="${userData.snoovatar_img}" alt="User Avatar">
				</div>
				<div class="flex flex-col max-w-[calc(100%-60px)] mr-[-4px]">
					<div class="flex overflow-hidden text-ellipsis w-[calc(100%+4px)]">
						<div class="flex items-center">
							<a rpl="" class="font-bold text-18 text-neutral-content-strong a no-visited hover:underline" href="${userProfileLink}">${userData.name}</a>
						</div>
					</div>
					<div class="flex items-start justify-start text-neutral-content-weak">
						<span class="truncate">${userDisplayName}</span>
					</div>
					<div class="flex items-center text-neutral-content-weak">
						<svg rpl="" class="mr-2xs" fill="currentColor" height="16" icon-name="cake-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
							<path d="m19.426 8.687-8.3-4.73A5.1 5.1 0 0 0 7.746.948c-.84 0-3.587 1.758-3.587 4.125 0 .112.023.218.032.328l-3.816 3.4A1.1 1.1 0 0 0 0 9.623v8.214a1.153 1.153 0 0 0 1.175 1.125L18.819 19c.318 0 .623-.124.85-.347a1.092 1.092 0 0 0 .331-.778V9.652a1.117 1.117 0 0 0-.574-.965ZM7.7 2.195c.387.076 2.382 1.308 2.382 2.878a2.34 2.34 0 1 1-4.675 0C5.409 3.5 7.4 2.271 7.7 2.195ZM18.75 14.75H4.451V16h14.3v1.75l-17.5-.037V11.25h17.5l-.001 3.5Zm0-4.75H1.25v-.3l3.325-2.967a3.555 3.555 0 0 0 6.717-1.24L18.75 9.74V10Z"></path>
						</svg>
						<time datetime="" data-testid="cake-day" title="">
							${new Date(userData.created_utc * 1000).toLocaleDateString()}
						</time>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-row text-neutral-content">
			<div class="flex flex-col">
				<span data-testid="karma-number" class="font-semibold text-14">
					${userData.total_karma.toLocaleString()}
				</span>
				<div class="text-neutral-content-weak text-12">
					Post Karma
				</div>
			</div>
		<div class="flex flex-col ml-md">
			<span data-testid="karma-number" class="font-semibold text-14">
				${userCommentKarama}
			</span>
				<div class="text-neutral-content-weak text-12">
					Comment Karma
				</div>
			</div>
		</div>

		<a rpl="" aria-label="Open chat" class="button-small px-[var(--rem10)] button-secondary button inline-flex items-center justify-center mt-md" href="https://chat.reddit.com/user/${userData.name}" target="_blank">
			<span class="flex items-center justify-center">
				<span class="flex mr-xs">
					<svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="chat-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.61 19.872a10.013 10.013 0 0 0 6.51-4.035A9.999 9.999 0 0 0 12.275.264c-1.28-.3-2.606-.345-3.903-.132a10.05 10.05 0 0 0-8.25 8.311 9.877 9.877 0 0 0 1.202 6.491l-1.24 4.078a.727.727 0 0 0 .178.721.72.72 0 0 0 .72.19l4.17-1.193A9.87 9.87 0 0 0 9.998 20c.54 0 1.079-.043 1.612-.128ZM1.558 18.458l1.118-3.69-.145-.24A8.647 8.647 0 0 1 1.36 8.634a8.778 8.778 0 0 1 7.21-7.27 8.765 8.765 0 0 1 8.916 3.995 8.748 8.748 0 0 1-2.849 12.09 8.763 8.763 0 0 1-3.22 1.188 8.68 8.68 0 0 1-5.862-1.118l-.232-.138-3.764 1.076ZM6.006 9a1.001 1.001 0 0 0-.708 1.707A1 1 0 1 0 6.006 9Zm4.002 0a1.001 1.001 0 0 0-.195 1.981 1 1 0 1 0 .195-1.98Zm4.003 0a1.001 1.001 0 1 0 0 2.003 1.001 1.001 0 0 0 0-2.003Z"></path>
					</svg>
				</span>
				<span class="flex items-center gap-xs">Chat</span>
			</span>
		</a>
	</div>
	`;
	return hoverCard;
}

// Observe feed for new posts
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'ARTICLE') {
				setTimeout(() => {
					const post = addedNode.querySelector('shreddit-post');
					if (addedNode) {
						attachUsername(post);
					}
				}, 1000);
			}
			if (addedNode.nodeName === 'FACEPLATE-TRACKER') {
				setTimeout(() => {
					attachUsername(addedNode);
				}, 1000);
			}
		});
	});
});
