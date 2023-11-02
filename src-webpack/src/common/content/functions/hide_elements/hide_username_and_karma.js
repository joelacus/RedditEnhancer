// Hide Username
let hideUsername = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		if (value == true) {
			document.querySelector('.re-username').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-username').classList.remove('re-hide');
			document.querySelector('#re-hide-username').remove();
		}
	} else {
		// new reddit
		if (value == true) {
			document.querySelector('.re-username').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-username').classList.remove('re-hide');
			document.querySelector('#re-hide-username').remove();
		}
	}
};
export { hideUsername };

// Hide Karma
let hideKarma = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		if (value == true) {
			document.querySelector('.re-karma').classList.add('re-hide');
			document.querySelector('.re-karma').parentNode.style.color = 'transparent';
		} else if (value == false) {
			document.querySelector('.re-karma').classList.remove('re-hide');
			document.querySelector('.re-karma').parentNode.style.color = '';
			document.querySelector('#re-hide-karma').remove();
		}
	} else {
		// new reddit
		if (value == true) {
			document.querySelector('.re-karma').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-karma').classList.remove('re-hide');
			document.querySelector('#re-hide-karma').remove();
		}
	}
};
export { hideKarma };
