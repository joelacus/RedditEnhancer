/**
 * @name showBannerMessage
 * @description Show an info, warning or error message as a banner at the top of the browser viewport.
 *
 * Applies to: New New UI (2023-)
 *
 * @param {string} type - Type of message to show: info, warning, or error
 * @param {string} message - Message to display in the banner
 */

export function showBannerMessage(type, message) {
    // Create a div block for showing the message
    const e = Object.assign(document.createElement('div'), {
        // className: `re-banner ${type} flex items-center sticky px-lg h-xl z-[4] overflow-hidden`,
        className: `re-banner ${type} block sticky m-0 px-lg py-2xs max-h-2xl z-[4] overflow-hidden`,
        innerHTML: message,
    });
    e.addEventListener('click', () => e.remove());
    const a = document.querySelector('shreddit-app div#subgrid-container');
    a.insertBefore(e, a.firstChild);

    const b = document.querySelector('div.re-banner');
    setTimeout(() => {
        b?.remove();
    }, 10000);
}