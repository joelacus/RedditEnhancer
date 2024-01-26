// Input - Menu

// Menu Button - Dark Mode
document.querySelector('.btn-dark-mode').addEventListener('click', function (e) {
	var el = document.querySelector('.menu-dark-mode'); //.forEach(function(el){
	if (el.classList.contains('hide')) {
		document.querySelector('.btn-dark-mode').classList.add('active');
		el.classList.remove('hide');
		document.querySelector('.btn-dark-mode').scrollIntoView();
	} else {
		document.querySelector('.btn-dark-mode').classList.remove('active');
		el.classList.add('hide');
	}
});

// Menu Button - Expand View
document.querySelector('.btn-expand-view').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-expand-view').forEach(function (el) {
		if (el.classList.contains('hide')) {
			document.querySelector('.btn-expand-view').classList.add('active');
			el.classList.remove('hide');
			document.querySelector('.btn-expand-view').scrollIntoView();
		} else {
			document.querySelector('.btn-expand-view').classList.remove('active');
			el.classList.add('hide');
		}
	});
});

// Menu Button - Hide Elements
document.querySelector('.btn-hide-elements').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-hide-elements').forEach(function (el) {
		if (el.classList.contains('hide')) {
			document.querySelector('.btn-hide-elements').classList.add('active');
			el.classList.remove('hide');
			document.querySelector('.btn-hide-elements').scrollIntoView();
		} else {
			document.querySelector('.btn-hide-elements').classList.remove('active');
			el.classList.add('hide');
		}
	});
});

// Menu Button - Productivity Tweaks
document.querySelector('.btn-productivity-tweaks').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-productivity-tweaks').forEach(function (el) {
		if (el.classList.contains('hide')) {
			document.querySelector('.btn-productivity-tweaks').classList.add('active');
			el.classList.remove('hide');
			document.querySelector('.btn-productivity-tweaks').scrollIntoView();
		} else {
			document.querySelector('.btn-productivity-tweaks').classList.remove('active');
			el.classList.add('hide');
		}
	});
});

// Menu Button - Style Tweaks
document.querySelector('.btn-style-tweaks').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-style-tweaks').forEach(function (el) {
		if (el.classList.contains('hide')) {
			document.querySelector('.btn-style-tweaks').classList.add('active');
			el.classList.remove('hide');
			document.querySelector('.btn-style-tweaks').scrollIntoView();
		} else {
			document.querySelector('.btn-style-tweaks').classList.remove('active');
			el.classList.add('hide');
		}
	});
});

// Menu Button - Background
document.querySelector('.btn-bg-image').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-bg-image').forEach(function (el) {
		if (el.classList.contains('hide')) {
			document.querySelector('.btn-bg-image').classList.add('active');
			el.classList.remove('hide');
			document.querySelector('.btn-bg-image').scrollIntoView();
		} else {
			document.querySelector('.btn-bg-image').classList.remove('active');
			el.classList.add('hide');
		}
	});
});

// Menu Button - Accessibility
document.querySelector('.btn-accessibility').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-accessibility').forEach(function (el) {
		if (el.classList.contains('hide')) {
			document.querySelector('.btn-accessibility').classList.add('active');
			el.classList.remove('hide');
			document.querySelector('.btn-accessibility').scrollIntoView();
		} else {
			document.querySelector('.btn-accessibility').classList.remove('active');
			el.classList.add('hide');
		}
	});
});
