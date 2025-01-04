/* ===== Tweaks - Productivity - Add User Profile Pictures To Comments (Old UI) ===== */

/* === Triggered On Page Load === */
export function loadAddProfilePicturesToComments() {
	BROWSER_API.storage.sync.get(['addProfilePicturesToComments'], function (result) {
		if (result.addProfilePicturesToComments) addProfilePicturesToComments(true);
	});
}

/* === Main Function === */
export function addProfilePicturesToComments(value) {
	const comments_page = document.querySelector('body').classList.contains('comments-page');
	if (redditVersion === 'old' && value === true && comments_page === true) {
		document.querySelectorAll('.commentarea > .sitetable .thing').forEach((post) => {
			attachProfilePicture(post);
		});
	} else if (redditVersion === 'old' && value === false) {
		removeProfilePictures();
	}
}

// Remove all user profile pics
function removeProfilePictures() {
	document.querySelectorAll('.thing .tagline').forEach((comment) => {
		if (comment.querySelector('.re-user-pic')) {
			comment.querySelector('.re-user-pic').remove();
		}
	});
}

// Attach user profile picture to comment
async function attachProfilePicture(comment) {
	if (!comment.querySelector('.re-user-pic')) {
		if (comment.getAttribute('data-author')) {
			// get comment author
			const comment_author = comment.getAttribute('data-author');
			const user_data = await fetchUserData(comment_author);
			const icon_img = user_data.icon_img.split('?')[0];
			// build <img>
			let img = document.createElement('img');
			img.classList.add('author-tooltip__avatar', 're-user-pic');
			img.src = icon_img;
			// append <img> to comment
			const tagline = comment.querySelector('.tagline');
			tagline.insertBefore(img, tagline.firstChildElement);
		}
	}
}

// Function to fetch user data from Reddit API
async function fetchUserData(user) {
	const fetch_url = `https://www.reddit.com/user/${user}/about.json`;
	return new Promise((resolve, reject) => {
		BROWSER_API.runtime.sendMessage(
			{
				actions: [{ action: 'changeFetchUrl', newFetchUrl: fetch_url }, { action: 'fetchData' }],
			},
			function (response) {
				const data = JSON.parse(response.data);
				resolve(data.data);
			}
		);
	});
}
