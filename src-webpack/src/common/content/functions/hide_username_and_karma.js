// Hide Username
let hideUsername = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		if (value == true) {
			document.querySelector('.re-username').classList.add("re-hide");
		} else if (value == false) {
			document.querySelector('.re-username').classList.remove("re-hide");
			// Remove stylesheet
			/*const styleSheets = document.querySelectorAll('link[rel="stylesheet"], style');
			styleSheets.forEach((sheet) => {
				if (sheet.sheet && sheet.sheet.cssRules) {
					const cssRules = sheet.sheet.cssRules;
					for (let i = 0; i < cssRules.length; i++) {
						if (cssRules[i].cssText.includes('#header-bottom-right .user a')) {
							sheet.parentNode.removeChild(sheet);
							break;
						}
					}
				}
			});*/
		}
	} else { // new reddit
		if (value == true) {
			document.querySelector('.re-username').classList.add("re-hide");
		} else if (value == false) {
			document.querySelector('.re-username').classList.remove("re-hide");
			// Remove stylesheet
			/*const styleSheets = document.querySelectorAll('link[rel="stylesheet"], style');
			styleSheets.forEach((sheet) => {
				if (sheet.sheet && sheet.sheet.cssRules) {
					const cssRules = sheet.sheet.cssRules;
					for (let i = 0; i < cssRules.length; i++) {
						if (cssRules[i].cssText.includes('#email-collection-tooltip-id span span:first-child')) {
							sheet.parentNode.removeChild(sheet);
							break;
						}
					}
				}
			});*/
		}
	}
}
export { hideUsername };


// Hide Karma
let hideKarma = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		if (value == true) {
			document.querySelector('.re-karma').classList.add("re-hide");
			document.querySelector('.re-karma').parentNode.style.color = "transparent"
		} else if (value == false) {
			document.querySelector('.re-karma').classList.remove("re-hide");
			document.querySelector('.re-karma').parentNode.style.color = ""
			// Remove stylesheet
			/*const styleSheets = document.querySelectorAll('link[rel="stylesheet"], style');
			styleSheets.forEach((sheet) => {
				if (sheet.sheet && sheet.sheet.cssRules) {
					const cssRules = sheet.sheet.cssRules;
					for (let i = 0; i < cssRules.length; i++) {
						if (cssRules[i].cssText.includes('#header-bottom-right .user span')) {
							sheet.parentNode.removeChild(sheet);
							break;
						}
					}
				}
			});*/
		}
	} else { // new reddit
		if (value == true) {
			document.querySelector('.re-karma').classList.add("re-hide");
		} else if (value == false) {
			document.querySelector('.re-karma').classList.remove("re-hide");
			// Remove stylesheet
			/*const styleSheets = document.querySelectorAll('link[rel="stylesheet"], style');
			styleSheets.forEach((sheet) => {
				if (sheet.sheet && sheet.sheet.cssRules) {
					const cssRules = sheet.sheet.cssRules;
					for (let i = 0; i < cssRules.length; i++) {
						if (cssRules[i].cssText.includes('#email-collection-tooltip-id span span:last-child')) {
							sheet.parentNode.removeChild(sheet);
							break;
						}
					}
				}
			});*/
		}
	}
}
export { hideKarma };
