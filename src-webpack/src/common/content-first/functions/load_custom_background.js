// Custom Background
export function loadCustomBackground() {
	BROWSER_API.storage.sync.get(['useCustomBackground','customBackground','bgBlur'], function(result) {
		// Set custom background if true
		if (result.useCustomBackground == true) {
			// Create new style element
			const style = document.createElement('style');

			// Check reddit version
			var link = window.location.href
			if (link.indexOf("old.reddit.com") >= 0) { // old reddit
				// Set style content
				style.textContent = 'body {\
										background: var(--re-background-image) no-repeat center center / cover !important;\
										backdrop-filter: blur(var(--re-background-blur));\
										background-attachment: fixed !important;\
									}'
			} else { // new reddit
				// Set style content
				style.textContent = '.ListingLayout-backgroundContainer {\
										--pseudo-before-background: var(--re-background-image) no-repeat center center / cover !important;\
									}\
									.ListingLayout-backgroundContainer:before {\
										filter: blur(var(--re-background-blur));\
										transform: scale(1.22);\
										overflow:hidden;\
									}';
			}

			// Append style element to the head
			document.head.insertBefore(style, document.head.firstChild)

			// Set css root variables
			document.documentElement.style.setProperty('--re-background-image', 'url("'+result.customBackground+'")');
			document.documentElement.style.setProperty('--re-background-blur', result.bgBlur+'px');
		}
	});
}
