/**
 * Tweaks: Productivity - Add User Profile Pictures To Comments
 *
 * @name addProfilePicturesToComments
 * @description Add the comment author's profile picture to their comment.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadAddProfilePicturesToComments() {
	BROWSER_API.storage.sync.get(['addProfilePicturesToComments'], function (result) {
		if (result.addProfilePicturesToComments) addProfilePicturesToComments(true);
	});
}

/* === Enable/Disable The Feature === */
export function addProfilePicturesToComments(value) {
	const comments_page = document.querySelector('body').classList.contains('comments-page');
	if (redditVersion === 'old' && value && comments_page === true) {
		document.querySelectorAll('.commentarea > .sitetable .thing').forEach((post) => {
			attachProfilePicture(post);
		});
	} else {
		removeProfilePicturesRV1();
	}
}

// Remove all user profile pics
function removeProfilePicturesRV1() {
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
	return new Promise((resolve, reject) => {
		BROWSER_API.runtime.sendMessage(
			{
				actions: [
					{
						action: 'fetchData',
						url: `https://www.reddit.com/user/${user}/about.json`,
					},
				],
			},
			function (response) {
				resolve(response.data);
			}
		);
	});
}
