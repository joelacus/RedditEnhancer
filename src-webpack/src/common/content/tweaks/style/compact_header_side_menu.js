/* ===== Tweak - Style - Compact Header Bar & Side Menu ===== */

/* === Triggered On Page Load === */
export function loadCompactHeaderSideMenu() {
    BROWSER_API.storage.sync.get(['compactHeaderSideMenu'], function (result) {
        if (result.compactHeaderSideMenu) compactHeaderSideMenu(true);
    });
}

/* === Main Function === */
export function compactHeaderSideMenu(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableCompactHeaderSideMenu();
        } else {
            disableCompactHeaderSideMenu();
        }
    }
}

// Function - Enable Compact Header Bar & Side Menu
function enableCompactHeaderSideMenu() {
    const styleElement = document.createElement('style');
    styleElement.id = 're-compact-header-side-menu';
    styleElement.textContent = 
        `shreddit-app {
        	--shreddit-header-height: 48px !important;
        	--shreddit-header-large-height: 48px !important;
        }
        .pt-md {
        	padding-top: initial !important;
        }
        nav.h-header-large > div:nth-child(2) div {
        	top: 0.25rem !important;
        }
        shreddit-app reddit-sidebar-nav#left-sidebar {
        	padding: 0;
        }
        shreddit-app reddit-sidebar-nav#left-sidebar hr {
        	display: none;
        	visibility: hidden;
        }`;
    document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Compact Header Bar & Side Menu
function disableCompactHeaderSideMenu() {
    const styleElement = document.head.querySelectorAll('style[id="re-compact-header-side-menu"]');
    styleElement.forEach((element) => {
        document.head.removeChild(element);
    });
}