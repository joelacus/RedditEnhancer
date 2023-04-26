// Hide Get New Reddit on old.reddit
let loadHideGetNewReddit = function() {
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function(result) {
		if (result.hideGetNewReddit === true) {
			// Create new style element
			const style = document.createElement('style');
			style.textContent = '#redesign-beta-optin-btn {\
									display: none;\
								}'
			// Append style element to the head
			document.head.insertBefore(style, document.head.firstChild);
		}
	});
}
export { loadHideGetNewReddit };
