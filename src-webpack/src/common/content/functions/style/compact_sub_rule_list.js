/* ===== Tweaks - Style - Compact Sub Rule List ===== */

/* === Triggered On Page Load === */
export function loadCompactSubRuleList() {
    BROWSER_API.storage.sync.get(['compactSubRuleList'], function (result) {
        if (result.compactSubRuleList) compactSubRuleList(true);
    });
}

/* === Main Function === */
export function compactSubRuleList(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableCompactSubRuleList();
        } else {
            disableCompactSubRuleList();
        }
    }
}

// Function - Enable Compact Rule List
function enableCompactSubRuleList() {
    const styleElement = document.createElement('style');
    styleElement.id = 're-compact-sub-rule-list';
    styleElement.textContent = 
        `div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] span,
        div#right-sidebar-container div.-mx-xs.-mt-xs > div span {
        	align-items: start;
        	justify-content: start;
        	width: fit-content;
        	padding: 0;
        	gap: .3rem;
        }
        div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] > li div,
        div#right-sidebar-container div.-mx-xs.-mt-xs > div {
        	padding: .35rem .5rem 0 .5rem;
        }
        div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] span:first-of-type > span:first-of-type span::after,
        div#right-sidebar-container div.-mx-xs.-mt-xs div span:first-of-type > span:first-of-type span::after {
        	content: "."
        }
        div#right-sidebar-container details:has(faceplate-tracker[source="rules_widget"]) div.ml-xl {
        	margin-left: .5rem;
        }
        div#right-sidebar-container details:has(faceplate-tracker[source="rules_widget"]) ul,
        div#right-sidebar-container details:has(faceplate-tracker[source="rules_widget"]) ol {
            padding-left: 1rem;
        }
        div#right-sidebar-container li.group:not(:has(span[avatar=""])) > div {
	        padding-left: 0.5rem;
        }`;
    document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Compact Rule List
function disableCompactSubRuleList() {
    const styleElement = document.head.querySelectorAll('style[id="re-compact-sub-rule-list"]');
    styleElement.forEach((element) => {
        document.head.removeChild(element);
    });
}