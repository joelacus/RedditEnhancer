// Input - Reddit Version Select

// Show Tweaks For Old Reddit
export function filterShowOldVersion() {
	document.querySelector('#search').value = '';
	document.querySelectorAll('.r-new').forEach(function (item) {
		item.classList.add('hide');
	});
	document.querySelectorAll('.r-newnew').forEach(function (item) {
		item.classList.add('hide');
	});
	document.querySelectorAll('.r-old').forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hide');
		} else {
			item.classList.remove('hide');
		}
	});
	document.querySelectorAll('.menu-item-link').forEach((el) => {
		el.classList.remove('active');
	});
}

// Show Tweaks For New Reddit
export function filterShowNewVersion() {
	document.querySelector('#search').value = '';
	document.querySelectorAll('.r-old').forEach(function (item) {
		item.classList.add('hide');
	});
	document.querySelectorAll('.r-newnew').forEach(function (item) {
		item.classList.add('hide');
	});
	document.querySelectorAll('.r-new').forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hide');
		} else {
			item.classList.remove('hide');
		}
	});
	document.querySelectorAll('.menu-item-link').forEach((el) => {
		el.classList.remove('active');
	});
}

// Show Tweaks For New New Reddit
export function filterShowNewNewVersion() {
	document.querySelector('#search').value = '';
	document.querySelectorAll('.r-old').forEach(function (item) {
		item.classList.add('hide');
	});
	document.querySelectorAll('.r-new').forEach(function (item) {
		item.classList.add('hide');
	});
	document.querySelectorAll('.r-newnew').forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hide');
		} else {
			item.classList.remove('hide');
		}
	});
	document.querySelectorAll('.menu-item-link').forEach((el) => {
		el.classList.remove('active');
	});
}

// Filter Version - Select
const version_dropdown = document.querySelector('#select-version');
const version_dropdownMenu = document.querySelector('#select-version-menu');
document.querySelector('#select-version .select').addEventListener('click', function () {
	if (version_dropdown.classList.contains('active')) {
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
	} else {
		version_dropdown.classList.add('active');
		version_dropdownMenu.style.maxHeight = version_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!version_dropdown.contains(event.target)) {
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
	}
});

// Filter Version - Buttons
export function selectFilterShowOldVersion(version) {
	document.querySelector('#select-version .select span').textContent = version;
	filterShowOldVersion();
	BROWSER_API.storage.sync.set({ redditVersion: 'old' });
	version_dropdown.classList.remove('active');
	version_dropdownMenu.style.maxHeight = '0';
}
document.querySelector('#old-reddit').addEventListener('click', function (e) {
	selectFilterShowOldVersion(e.target.textContent);
});

export function selectFilterShowNewVersion(version) {
	document.querySelector('#select-version .select span').textContent = version;
	filterShowNewVersion();
	BROWSER_API.storage.sync.set({ redditVersion: 'new' });
	version_dropdown.classList.remove('active');
	version_dropdownMenu.style.maxHeight = '0';
}
document.querySelector('#new-reddit').addEventListener('click', function (e) {
	selectFilterShowNewVersion(e.target.textContent);
});

export function selectFilterShowNewNewVersion(version) {
	document.querySelector('#select-version .select span').textContent = version;
	filterShowNewNewVersion();
	BROWSER_API.storage.sync.set({ redditVersion: 'newnew' });
	version_dropdown.classList.remove('active');
	version_dropdownMenu.style.maxHeight = '0';
}
document.querySelector('#newnew-reddit').addEventListener('click', function (e) {
	selectFilterShowNewNewVersion(e.target.textContent);
});
