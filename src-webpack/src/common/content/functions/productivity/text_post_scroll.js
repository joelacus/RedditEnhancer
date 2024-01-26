// Add Scroll To Long Text Posts

export function textPostScroll(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			document.body.classList.add('re-text-scroll');
		} else if (value === false || value == undefined) {
			document.body.classList.remove('re-text-scroll');
		}
	}
}
