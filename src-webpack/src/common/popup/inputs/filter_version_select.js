/* ===== Inputs / Reddit Version Select ===== */

// Filter the list of options based on the selected Reddit version.

// Show Tweaks For Old Reddit
export function filterShowOldVersion() {
	document.querySelector('#search').value = '';
	document.querySelectorAll('.r-new').forEach(function (item) {
		item.classList.add('hidden');
	});
	document.querySelectorAll('.r-newnew').forEach(function (item) {
		item.classList.add('hidden');
	});
	document.querySelectorAll('.r-old').forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hidden');
		} else {
			item.classList.remove('hidden');
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
		item.classList.add('hidden');
	});
	document.querySelectorAll('.r-new').forEach(function (item) {
		item.classList.add('hidden');
	});
	document.querySelectorAll('.r-newnew').forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hidden');
		} else {
			item.classList.remove('hidden');
		}
	});
	document.querySelectorAll('.menu-item-link').forEach((el) => {
		el.classList.remove('active');
	});
}

// Filter Version - Select
export function initFilter() {
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

	// Dismiss dropdown
	document.addEventListener('click', function (event) {
		if (!version_dropdown.contains(event.target)) {
			version_dropdown.classList.remove('active');
			version_dropdownMenu.style.maxHeight = '0';
		}
	});

	// Filter Old UI options
	document.querySelector('#old-reddit').addEventListener('click', function (e) {
		selectFilterShowOldVersion(e.target.textContent);
	});

	// Filter New New UI options
	document.querySelector('#newnew-reddit').addEventListener('click', function (e) {
		selectFilterShowNewNewVersion(e.target.textContent);
	});
}

// Filter Version - Buttons
export function selectFilterShowOldVersion(version) {
	const version_dropdown = document.querySelector('#select-version');
	const version_dropdownMenu = document.querySelector('#select-version-menu');
	document.querySelector('#select-version .select span').textContent = version;
	filterShowOldVersion();
	BROWSER_API.storage.sync.set({ redditVersion: 'old' });
	version_dropdown.classList.remove('active');
	version_dropdownMenu.style.maxHeight = '0';
}

export function selectFilterShowNewNewVersion(version) {
	const version_dropdown = document.querySelector('#select-version');
	const version_dropdownMenu = document.querySelector('#select-version-menu');
	document.querySelector('#select-version .select span').textContent = version;
	filterShowNewNewVersion();
	BROWSER_API.storage.sync.set({ redditVersion: 'newnew' });
	version_dropdown.classList.remove('active');
	version_dropdownMenu.style.maxHeight = '0';
}
