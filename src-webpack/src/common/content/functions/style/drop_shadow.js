// Dropshadows
let addDropShadow = function (value) {
	//remove existing shadow
	var dsc = document.getElementsByClassName('re-drop-shadow-children');
	for (var i = 0; i < dsc.length; ++i) {
		var item = dsc[i];
		item.classList.remove('re-drop-shadow-children');
	}
	var dsc = document.getElementsByClassName('re-drop-shadow');
	for (var i = 0; i < dsc.length; ++i) {
		var item = dsc[i];
		item.classList.remove('re-drop-shadow');
	}
	// add shadow
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		// add shadow class based on page
		var link = window.location.href;
		if (link.indexOf('/comments/') >= 0) {
			// post
			if (value == true) {
				document.querySelector('.re-sidebar').firstChild.classList.add('re-drop-shadow-children');
				document.querySelector('.re-post-container').classList.add('re-drop-shadow');
			} else if (value == false) {
				document.querySelector('.re-sidebar').firstChild.classList.remove('re-drop-shadow-children');
				document.querySelector('.re-post-container').classList.remove('re-drop-shadow');
			}
		} else if (link.indexOf('/search/') >= 0) {
			// search
			document.querySelector('.re-sidebar').parentNode.style.boxShadow = 'none';
			if (value == true) {
				document.querySelector('.re-sidebar').classList.add('re-drop-shadow-children');
				document.querySelector('.re-post-container').classList.add('re-drop-shadow-children');
			} else if (value == false) {
				document.querySelector('.re-sidebar').classList.remove('re-drop-shadow-children');
				document.querySelector('.re-post-container').classList.remove('re-drop-shadow-children');
			}
		} else if (link.indexOf('/user/') >= 0) {
			// user
			if (value == true) {
				document.querySelector('.re-sidebar').firstChild.classList.add('re-drop-shadow-children');
				document.querySelector('.re-feed-container').classList.add('re-drop-shadow-children');
			} else if (value == false) {
				document.querySelector('.re-sidebar').firstChild.classList.remove('re-drop-shadow-children');
				document.querySelector('.re-feed-container').classList.remove('re-drop-shadow-children');
			}
		} else {
			// feed
			if (value == true) {
				var createPost = document.querySelector('.re-create-post');
				if (createPost) {
					createPost.classList.add('re-drop-shadow');
				}
				var sort = document.querySelector('.re-sort');
				if (sort) {
					sort.classList.add('re-drop-shadow');
				}
				var sidebar = document.querySelector('.re-sidebar');
				if (sidebar) {
					sidebar.classList.add('re-drop-shadow-children');
				}
				var feedContainer = document.querySelector('.re-feed-container');
				if (feedContainer) {
					feedContainer.classList.add('re-drop-shadow-children');
				}
				var live = document.querySelector('.re-live');
				if (live) {
					live.classList.add('re-drop-shadow');
				}
			} else if (value == false) {
				var createPost = document.querySelector('.re-create-post');
				if (createPost) {
					createPost.classList.remove('re-drop-shadow');
				}
				var sort = document.querySelector('.re-sort');
				if (sort) {
					sort.classList.remove('re-drop-shadow');
				}
				var sidebar = document.querySelector('.re-sidebar');
				if (sidebar) {
					sidebar.classList.remove('re-drop-shadow-children');
				}
				var feedContainer = document.querySelector('.re-feed-container');
				if (feedContainer) {
					feedContainer.classList.remove('re-drop-shadow-children');
				}
				var live = document.querySelector('.re-live');
				if (live) {
					live.classList.remove('re-drop-shadow');
				}
			}
		}
		// remove shadow from "back to top"
		if (document.querySelector('.re-sidebar-post')) {
			document.querySelector('.re-sidebar-post .re-drop-shadow-children').lastElementChild.style.boxShadow = 'none';
		} else if (document.querySelector('.re-sidebar-sub')) {
			document.querySelector('.re-sidebar-sub.re-drop-shadow-children').lastElementChild.style.boxShadow = 'none';
		} else if (document.querySelector('.re-sidebar')) {
			document.querySelector('.re-sidebar').lastElementChild.style.boxShadow = 'none';
		}
	}
};
export { addDropShadow };