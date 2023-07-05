// Hide Username And Karma
let loadHideUsernameAndKarma = function () {
	BROWSER_API.storage.sync.get(['hideUsername', 'hideKarma'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			if (result.hideUsername == true) {
				// Create new style element
				const style = document.createElement('style');
				style.textContent =
					'#header-bottom-right .user a {\
										display: none !important;\
									}';
				// Append style element to the head
				document.head.insertBefore(style, document.head.firstChild);
			}
			if (result.hideKarma == true) {
				// Create new style element
				const style = document.createElement('style');
				style.textContent =
					'#header-bottom-right .user span {\
										display: none !important;\
									}\
									#header-bottom-right .user {\
										color: transparent;\
									}';
				// Append style element to the head
				document.head.insertBefore(style, document.head.firstChild);
			}
		} else {
			// new reddit
			if (result.hideUsername == true) {
				// Create new style element
				const style = document.createElement('style');
				style.textContent =
					'#email-collection-tooltip-id span span:first-child {\
										display: none !important;\
									}';
				// Append style element to the head
				document.head.insertBefore(style, document.head.firstChild);
			}
			if (result.hideKarma == true) {
				// Create new style element
				const style = document.createElement('style');
				style.textContent =
					'#email-collection-tooltip-id span span:last-child {\
										display: none !important;\
									}';
				// Append style element to the head
				document.head.insertBefore(style, document.head.firstChild);
			}
		}
	});
};
export { loadHideUsernameAndKarma };
