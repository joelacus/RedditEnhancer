/**
 * Tweaks: Style - Classic Old Header
 * @name classicOldHeader
 * @description Attempt to revert to the 2005–2008 Reddit header design. nostalgic
 *
 * Applies to: Old UI (2005–)
 */

// Get the feature state from browser sync storage
export function loadClassicOldHeader() {
    BROWSER_API.storage.sync.get(['classicOldHeader']).then((result) => {
        if (result.classicOldHeader) classicOldHeader(true);
    });
}

/* Activate the feature based on Reddit version
 * NOTE: although it is technically possible to completely recreate the blue tab strip, Reddit has since introduced
 * the multireddit side menu and put span.pagename next to ul.tabmenu, which makes setting the width for ul.tabmenu
 * unpredictable. If its width is too much, it gets pushed down under the logo... let's just say it does not look good
 * Uncomment and/or replace the CSS lines, and browse around to see what I mean
 */
export function classicOldHeader(value) {
    if (value) {
        if (redditVersion === 'old') {
            if (!document.head.querySelector('style[id="re-classic-old-header"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-classic-old-header';
                styleElement.textContent =
                    `
                    div#header,
                    .res-nightmode div#header {
                        background-color: unset;
                        border-bottom: none;
                    }
                    .res-nightmode a#header-img {
                        filter: invert(1);
                    }
                    div#header-bottom-right,
                    .res-nightmode div#header-bottom-right {
                        background-color: unset;
                    }
                    ul.tabmenu li {
                        font-weight: normal;
                        margin: 0 1px; /* margin: 0; */
                        
                        & a {
                            background-color: rgba(198, 222, 247, 0.5);
                            color: black;
                            padding: 2px 7px;
                            /* border-right: 2px solid white !important; */
                        }
                    }
                    .res-nightmode ul.tabmenu li a {
                        background-color: #444;
                        color: #aaa;
                    }
                    ul.tabmenu li a:hover,
                    ul.tabmenu li.selected a,
                    .res-nightmode ul.tabmenu li.selected a {
                        background-color: #369;
                        color: white;
                        border: none;
                    }
                    .res-nightmode .tabmenu li a {
                        color: white;
                    }
                    ul.tabmenu {
                        margin-bottom: 0;
                        /* width: calc(100% - 137px);
                        background-color: rgba(198, 222, 247);
                    }
                    .with-listing-chooser.listing-chooser-collapsed ul.tabmenu {
                        width: calc(100% - 129px); */
                    }
                    div.linkinfo {
                        background-color: #eee;
                        border: 1px solid black;
                    }
                    div.morelink,
                    div.morelink:hover {
                        background: none;
                    }
                    div.morelink:hover {
                        background-color: #369;
                        color: white;
                    }
                    div.nub {
                        display: none;
                        visibility: hidden;
                    }
                    `;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        }
    } else {
        const dynamicStyleElements = document.head.querySelectorAll('style[id="re-classic-old-header"]');
        dynamicStyleElements.forEach((element) => {
            document.head.removeChild(element);
        });
    }
}