/**
 * Tweaks: Fonts - Set sans-serif as Old UI font/Customise UI fonts
 * @name customFonts
 * @description Set custom fonts for Reddit interfaces. Defaults for each interface:
 * - Old UI (2005–): Verdana, Arial, Helvetica, sans-serif;
 * - Old New UI (2018–2024): Noto Sans for post content and comments, IBM Plex Sans for everything else;
 * - New New UI (2023–): whatever system UI uses (Segoe UI for Windows, San Fransisco for iOS/macOS, Roboto for Android etc.)
 * Currently, this function only sets sans-serif as UI font on Old UI. Other UIs may be considered later.
 *
 * Applies to: Old UI (2006–)
 */

// Get the feature state from browser sync storage
export function loadCustomFonts() {
    BROWSER_API.storage.sync.get(['customFonts']).then((result) => {
        if (result.customFonts) customFonts(true);
    });
}

// Activate the feature based on Reddit version
export function customFonts(value) {
    if (value) {
        if (redditVersion === 'old') {
            if (!document.head.querySelector('style[id="re-custom-fonts"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-custom-fonts';
                styleElement.textContent =
                    `
                    html body, html textarea {
                        font: normal 12px/1.4 sans-serif;
                    }
                    div#header-bottom-left,
                    p.tagline,
                    div.menuarea,
                    .link p.title,
                    span.domain {
                        font-size: inherit;
                    }
                    div.morelink {
                        font-size: 1.25em;
                        letter-spacing: 0;
                    }
                    .tabmenu {
                        margin-bottom: -1.725px;
                    }
                    `;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        }
    } else {
        const dynamicStyleElements = document.head.querySelectorAll('style[id="re-custom-fonts"]');
        dynamicStyleElements.forEach((element) => {
            document.head.removeChild(element);
        });
    }
}