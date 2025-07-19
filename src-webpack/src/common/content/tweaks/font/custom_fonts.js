/**
 * Tweaks: Fonts - Set sans-serif as Old UI font/Customise UI fonts
 *
 * @name customFonts
 * @description Set custom fonts for Reddit interfaces. Defaults for each interface:
 *              - Old UI (2005–): Verdana, Arial, Helvetica, sans-serif;
 *              - Old New UI (2018–2024): Noto Sans for post content and comments, IBM Plex Sans for everything else;
 *              - New New UI (2023–): whatever system UI uses (Segoe UI for Windows, San Fransisco for iOS/macOS, Roboto for Android etc.)
 *
 * Notes: Currently, this function only sets sans-serif as UI font on Old UI. Other UIs may be considered later.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadCustomFonts() {
	BROWSER_API.storage.sync.get(['customFonts']).then((result) => {
		if (result.customFonts) customFonts(true);
	});
}

/* === Enable/Disable The Feature === */
export function customFonts(value) {
	if (redditVersion === 'old' && value) {
		if (!document.head.querySelector('style[id="re-custom-fonts"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-custom-fonts';
			styleElement.textContent = `
                    html body, html textarea {
                        font: normal 12px/1.4 sans-serif;
                    }
                    form#search input[type="text"],
                    div.crossposting-modal div.modal-body,
                    div.crossposting-modal div.modal-body h1,
                    div.crossposting-modal div.modal-body form#cross_post *,
                    div.crossposting-modal select.crosspost-field.crosspost-subreddit {
                        font-family: inherit;
                    }
                    div#header-bottom-left,
                    span.pagename {
                        font-size: 1.1em;
                    }
                    .side div.md {
                        font-size: small;
                    }
                    p.tagline,
                    div.menuarea,
                    .link p.title,
                    span.domain,
                    .commentarea div.menuarea .toggle a,
                    div.reddit-infobar.with-icon div.md,
                    .sidebox div.subtitle,
                    div.crossposting-modal div.modal-body :not(h1):not(.crosspost-field) {
                        font-size: inherit;
                    }
                    div.tagline {
                        font-size: 0.83333em;
                    }
                    div.morelink {
                        font-size: 1.16em;
                        letter-spacing: normal;
                    }
                    .tabmenu {
                        margin-bottom: -0.15em;
                    }
                    div.crossposting-modal div.modal-body {
                        padding: 1rem;
                    }
                    /* Style normal flairs as formatted flairs */
	                span.linkflairlabel {
	                	font-size: inherit;
	                	font-weight: 500;
	                	line-height: 1.3;
	                	border-radius: 2px;
	                	display: inline-block;
	                	height: 1rem;
	                	margin: 0 5px 0 0;
	                	overflow: hidden;
	                	padding: 0 4px;
	                	text-overflow: ellipsis;
	                	vertical-align: middle;
	                	white-space: nowrap;
	                	max-width: none;
	                }
	                a.title + span.linkflairlabel {
	                    margin-left: 5px;
                    }
	                .link span.flair {
	                    font-size: inherit;
	                }
                    `;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-custom-fonts"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
