/**
 * Tweaks: Style - Classic Old UI
 *
 * @name classicOldUI
 * @description Attempt to replicate to the 2005–2008 Reddit interface design. nostalgic
 *
 * Credit: Huge thanks to jre and shockawer (userstyles.world) for much of the CSS code.
 *
 * Note: although it is technically possible to completely recreate the blue tab strip, Reddit has since introduced
 *       the multireddit side menu and put span.pagename next to ul.tabmenu, which makes setting the width for ul.tabmenu
 *       unpredictable. If its width is too much, it gets pushed down under the logo... let's just say it does not look good.
 *       Uncomment and/or replace the CSS lines, and browse around to see what I mean
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadClassicOldUI() {
	BROWSER_API.storage.sync.get(['classicOldUI']).then((result) => {
		if (result.classicOldUI) classicOldUI(true);
	});
}

/* === Enable/Disable The Feature === */
export function classicOldUI(value) {
	if (value) {
		if (redditVersion === 'old') {
			if (!document.head.querySelector('style[id="re-classic-old-ui"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-classic-old-ui';
				styleElement.textContent = `
                    /* HEADER */
                    div#sr-header-area {
                        border-bottom: none;
                    }
                    div#header,
                    .res-nightmode div#header {
                        background-color: unset;
                        border-bottom: none;
                    }
                    #header .tabmenu:not(.formtab) li:first-child a:before {
                        content: none;
                    }
                    .res-nightmode a#header-img {
                        filter: invert(1);
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
                    div#header-bottom-right,
                    .res-nightmode div#header-bottom-right {
                        background-color: unset;
                    }
                    /* SIDEBAR */
                    form#search input[type="text"] {
                        border: 1px solid #369;
                        margin: 0px;
                    }
                    #search input[type="submit"] {
                        display: none;
                    }
                    div.linkinfo {
                        background-color: #eee;
                        border: 1px solid black;
                    }
                    div.morelink,
                    div.morelink:hover,
                    .disabled div.morelink,
                    .disabled div.morelink:hover {
                        background: none;
                        letter-spacing: normal;
                        font-weight: normal;
                        text-align: left;
                        border: none;
                    }
                    div:not(.disabled) > div.morelink:hover a {
                        color: #ff0202;
                    }
                    div.nub {
                        display: none;
                        visibility: hidden;
                    }
                    .res-nightmode div.sidebox,
                    .res-nightmode div.morelink {
                        background-color: unset;
                    }
                    .sidebox div.subtitle {
                        margin-left: 0;
                    }
                    div.sidecontentbox .content {
                        border: none;
                        border-left: 2px solid lightgray;
                        padding: 0 5px 5px 5px;
                    }
                    div.sidecontentbox .title h1 {
                        font-weight: bold;
                        text-transform: lowercase;
                        color: gray;
                        font-size: 1.16em;
                    }
                    /* POSTS */
                    div.reddit-infobar.with-icon {
                        background-color: unset;
                        border-color: #f58e8e;
                        min-height: 6px !important;
                        padding: 0 0 0 10px;
                        height: 1.75rem;
                    }
                    div.reddit-infobar.with-icon::before,
                    div.archived-infobar.with-icon::before {
                        background: none;
                    }
                    div.md blockquote {
                        border-left: 2px solid #369;
                    }
                    .entry ul.buttons li {
                        padding-right: .5em;
                    }
                    .entry ul.buttons li a {
                        background-color: #f0f0f0;
                        color: #555;
                        padding: 0 2px;
                        font-weight: normal;
                    }
                    .res-nightmode .entry ul.buttons li a {
                        background-color: #222;
                    }
                    div.panestack-title {
                        padding: 2px 0;
                        border-bottom: 1px dotted #369;
                        /* background-color: whitesmoke;
                    }
                    .res-nightmode div.panestack-title {
                        background-color: #333; */
                    }
                    div.panestack-title .title {
                        font-size: 1.16em;
                        font-weight: bold;
                    }
                    html:not(.res-nightmode) div.panestack-title .title {
                        color: #369;
                    }
                    div.infobar,
                    div.gold-accent {
                        background-color: unset;
                        border-color: #f58e8e;
                    }
                    .res-nightmode div.infobar,
                    .res-nightmode div.gold-accent {
                        background-color: unset;
                    }
                    div.infobar.commentsignupbar {
                        display: none;
                    }
                    /* SIGNUP BANNER & MISCELLANEOUS */
                    section.infobar.listingsignupbar {
                        background: none !important;
                        background-color: #FFFF99 !important;
                        height: 23px;
                    }
                    a.listingsignupbar__container {
                        padding: 0 10px;
                    }
                    h2.listingsignupbar__title {
                        font-size: 0.9em;
                        font-weight: normal;
                        margin: 2px 0 3px 0;
                        color: black;
                        text-transform: lowercase;
                        width: 995px !important;
                    }
                    h2.listingsignupbar__title::after {
                        content: ' reddit is a source for what\\'s new and popular online. reddit learns what you like as you vote on existing links or submit your own\\!';
                    }
                    a.listingsignupbar__close,
                    div.listingsignupbar__cta-container,
                    p.listingsignupbar__desc {
                        display: none;
                    }
                    div.read-next-container {
                        display: none;
                    }
                    span.nextprev a,
                    .next-suggestions a {
                        font-weight: normal;
                        background: none;
                        border: none;
                    }
                    span.nextprev a:hover {
                        background: none;
                        border: none;
                        text-decoration: underline;
                    }
                    .res-nightmode span.nextprev a {
                        background: none;
                        border: none;
                    }
                    `;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-classic-old-ui"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
