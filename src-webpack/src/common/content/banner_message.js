/**
 * @name showBannerMessage
 * @description Show an info, warning or error message as a banner at the top of the browser viewport.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 *
 * @param {string} type - Type of message to show: info, warning, or error
 * @param {string} message - Message to display in the banner
 */

export function showBannerMessage(type, message) {
	const banner = document.querySelector('.re-banner');
	const bannerText = banner?.textContent;
	if (banner && bannerText === message) return;

	// Create a div block for showing the message
	const el = document.createElement('div');
	el.className = `re-banner ${type} block sticky m-0 px-lg py-2xs max-h-2xl z-[4] overflow-hidden`;
	el.textContent = message;
	el.addEventListener('click', () => el.remove());
	const a = document.querySelector('shreddit-app div#subgrid-container');
	a.insertBefore(el, a.firstChild);
	setTimeout(() => {
		el.remove();
	}, 10000);
}
