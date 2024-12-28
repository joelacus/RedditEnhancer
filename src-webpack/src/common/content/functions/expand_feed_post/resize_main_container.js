/* ===== Tweaks - Expand Feed/Post - Resize Main Container ===== */

/* === Triggered On Page Load === */
export function loadResizeMainContainer() {
    BROWSER_API.storage.sync.get(['resizeMainContainer', 'resizeMainContainerWidth'], function (result) {
        if (result.resizeMainContainer) resizeMainContainer(true);
        resizeMainContainerWidth(result.resizeMainContainerWidth);
    });
}

/* === Main Function === */
export function resizeMainContainer(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableResizeMainContainer();
        } else {
            disableResizeMainContainer();
        }
    }
}

// Function - Enable Resize Main Container
function enableResizeMainContainer() {
    const styleElement = document.createElement('style');
    styleElement.id = 're-resize-main-container';
    styleElement.textContent = 
        `@media (min-width: 960px) {
            div.main-container {
                width: var(--re-main-container-width) !important;
                margin: 0 auto;
            }
        }`;
    document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Resize Main Container
function disableResizeMainContainer() {
    const styleElement = document.head.querySelectorAll('style[id="re-resize-main-container"]');
    styleElement.forEach((element) => {
        document.head.removeChild(element);
    });
}

// Function - Expand Main Container Width
export function resizeMainContainerWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-main-container-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-main-container-width', '80%');
	}
}