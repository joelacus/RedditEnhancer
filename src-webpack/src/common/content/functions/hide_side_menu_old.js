// Hide Side Menu Old
let hideSideMenuOld = function (value) {
	var link = window.location.href;
	var el = document.querySelector('.listing-chooser');
	if (value === true) {
		el.classList.add('re-hide');
	} else if (value === false) {
		el.classList.remove('re-hide');
	}
};
export { hideSideMenuOld };
