/**
 * Tweaks: Productivity - Show Post Author
 *
 * @name showPostAuthor
 * @description Show missing post author on Home/Popular/Search feeds.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowPostAuthor() {
	BROWSER_API.storage.sync.get(['showPostAuthor', 'usernameHoverPopupDelay'], function (result) {
		if (result.showPostAuthor) showPostAuthor(true, result.usernameHoverPopupDelay);
	});
}

/* === Enable/Disable The Feature === */
let hover_delay = 500;
export function showPostAuthor(value, delay) {
	if (delay) hover_delay = delay * 1000;
	const routename = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutes = ['frontpage', 'popular', 'custom_feed', 'profile_saved'];
	const searchRoutes = ['global_serp', 'community_serp', 'custom_feed_serp'];

	if (redditVersion === 'newnew' && value === true) {
		document.documentElement.classList.add('re-post-author-active');
		document.querySelectorAll('shreddit-post, #main-content > div > search-telemetry-tracker').forEach(attachUsername);
		observer.observe(document.querySelector('shreddit-feed, #main-content'), { childList: true, subtree: true })
	} else {
		// Remove all post author names and hovercards.
		document.documentElement.classList.remove('re-post-author-active');
		document.querySelectorAll('.re-post-author').forEach(item => item.remove());
		observer.disconnect();
	}
}

// Attach post author to post header.
export async function attachUsername(post) {
	let author = post.getAttribute('author');
	if (!author) {
		try {
			// Look up post ID from the URL and query post data Reddit's public API.
			const url = post.querySelector('a')?.href;
			if (url) {
				const postID = "t3_" + url.match(/\/comments\/([a-z0-9]+)(?:\/|$)/i)[1] ?? null;
				const postData = (await BROWSER_API.runtime.sendMessage({
					actions: [
						{
							action: 'fetchData',
							url: `https://www.reddit.com/api/info.json?id=${postID}`,
						},
					],
				})).data.children[0].data ?? null;
				author = postData.author;
			}
		} catch (error) {
			console.error(error);
		}
	}

	if (!post.querySelector('.re-post-author')) {
		const a = document.createElement('span');
		a.classList.add('re-post-author');
		a.innerHTML = `<a href="/user/${author}">u/${author}</a>`;

		let hoverTimer;
		if (author !== '[deleted]') {
			a.addEventListener('mouseenter', () => {
				hoverTimer = setTimeout(function () {
					showHoverCard(post, author);
				}, hover_delay);
			});
			a.addEventListener('mouseleave', () => {
				clearTimeout(hoverTimer);
			});
		}
		const tag = post.querySelector('shreddit-distinguished-post-tags');
		if (tag) {
			tag.remove();
			a.appendChild(tag);
		}
		const selectors = ['[slot="credit-bar"] > span:has(faceplate-timeago)', '[slot="credit-bar"] > div', 'span:has([bundlename="faceplate_hovercard"])', '.post-credit-row > span'];
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

	// Check if hover card already exists
	const existingHoverCard = post.querySelector('.hover-card');
	if (existingHoverCard) {
		existingHoverCard.style.display = 'block';
		return;
	}

	// Fetch user data
	const userData = (await BROWSER_API.runtime.sendMessage({
		actions: [
			{
				action: 'fetchData',
				url: `https://www.reddit.com/user/${username}/about.json`,
			},
		],
	})).data ?? null;

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
		<div class="flex flex-row justify-items-start items-center">
			<div class="mr-sm">
				<img class="mb-0" src="${userData.snoovatar_img ? userData.snoovatar_img : userData.icon_img}" alt="User Avatar">
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
		<div class="mt-md flex flex-row text-neutral-content">
			<div class="flex flex-col">
				<span data-testid="karma-number" class="font-semibold text-14">${userData.total_karma.toLocaleString()}</span>
				<div class="text-neutral-content-weak text-12">Post karma</div>
			</div>
			<div class="flex flex-col ml-md">
				<span data-testid="karma-number" class="font-semibold text-14">${userCommentKarama}</span>
				<div class="text-neutral-content-weak text-12">Comment karma</div>
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
	`;
	return hoverCard;
}

// Observe feed for new posts
const observer = new MutationObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (addedNode) {
				if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-TRACKER', 'FACEPLATE-LOADER', 'SEARCH-TELEMETRY-TRACKER', 'HR'].includes(addedNode.nodeName)) {
					document.querySelectorAll('shreddit-post, #main-content > div > search-telemetry-tracker').forEach(attachUsername);
				}
			});
		});
	}, 100)
);

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
