// Hide Create Post
let hideCreatePost = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		var createPost = document.querySelector('.re-create-post');
		if (createPost) {
			if (value == true) {
				createPost.classList.add('re-hide');
			} else if (value == false) {
				createPost.classList.remove('re-hide');
			}
		}
	}
};
export { hideCreatePost };
