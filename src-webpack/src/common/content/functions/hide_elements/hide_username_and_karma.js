// Hide Username and Karma

// Hide Username
export function hideUsername(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHideUsernameOld();
		} else if (value === false) {
			disableHideUsernameOld();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			enableHideUsernameNew();
		} else if (value === false) {
			disableHideUsernameNew();
		}
	}
}

// Function - Enable Hide Username - Old
function enableHideUsernameOld() {
	const style = document.createElement('style');
	style.id = 're-hide-username';
	style.textContent = `#header-bottom-right .user a {
							display: none !important;
						}`;
	document.head.insertBefore(style, document.head.firstChild);
}

// Function - Disable Hide Username - Old
function disableHideUsernameOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-username"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide Username - New
function enableHideUsernameNew() {
	const style = document.createElement('style');
	style.id = 're-hide-username';
	style.textContent = `#email-collection-tooltip-id > span span:first-child {
							display: none !important;
						}`;
	document.head.insertBefore(style, document.head.firstChild);
}

// Function - Disable Hide Username - New
function disableHideUsernameNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-username"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Hide Karma
export function hideKarma(value) {
	if (redditVersion === 'old') {
		if (value == true) {
			enableHideKarmaOld();
		} else if (value == false) {
			disableHideKarmaOld();
		}
	} else if (redditVersion === 'new') {
		if (value == true) {
			enableHideKarmaNew();
		} else if (value == false) {
			disableHideKarmaNew();
		}
	}
}

// Function - Enable Hide Karma - Old
function enableHideKarmaOld() {
	const style = document.createElement('style');
	style.id = 're-hide-karma';
	style.textContent = `#header-bottom-right .user span {
							display: none !important;
						}`;
	document.head.insertBefore(style, document.head.firstChild);
}

// Function - Disable Hide Karma - Old
function disableHideKarmaOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide Karma - New
function enableHideKarmaNew() {
	const style = document.createElement('style');
	style.id = 're-hide-karma';
	style.textContent = `#email-collection-tooltip-id > span span:last-child {
							display: none !important;
						}`;
	document.head.insertBefore(style, document.head.firstChild);
}

// Function - Disable Hide Karma - New
function disableHideKarmaNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
