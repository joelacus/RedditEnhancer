// Auto Expand Feed/Post To 100% At Value
let autoExpandValue = function (widthVariable) {
	const styleSheetId = 're-auto-expand';
	let styleSheet = document.getElementById(styleSheetId);

	// If style sheet already exists
	if (!styleSheet) {
		styleSheet = document.createElement('style');
		styleSheet.id = styleSheetId;
		document.head.appendChild(styleSheet);
	}

	// If variable doesn't exist
	if (!widthVariable) {
		var widthVariable = 1000;
	}

	// Rule template
	const mediaQuery = `@media only screen and (max-width: ${widthVariable}px) {
							.re-feed.re-resize {
								width: 100% !important;
								max-width: 100% !important;
							}
							.re-feed.re-centre-feed-1 {
								translate: none !important;
							}
						}`;

	// Remove any existing rules
	while (styleSheet.sheet.cssRules.length > 0) {
		styleSheet.sheet.deleteRule(0);
	}

	// Add the new rule
	styleSheet.sheet.insertRule(mediaQuery, 0);
};
export { autoExpandValue };
