// Input - Reddit Version Select

// Show Tweaks For New Reddit
function tabShowNewVersion() {
	document.querySelector('#search').value = '';
	var rNew = document.querySelectorAll('.r-new');
	rNew.forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hide');
		} else {
			item.classList.remove('hide');
		}
	});
	var rOld = document.querySelectorAll('.r-old');
	rOld.forEach(function (item) {
		item.classList.add('hide');
	});
}

// Show Tweaks For Old Reddit
export function tabShowOldVersion() {
	document.querySelector('#search').value = '';
	var rNew = document.querySelectorAll('.r-new');
	rNew.forEach(function (item) {
		item.classList.add('hide');
	});
	var rOld = document.querySelectorAll('.r-old');
	rOld.forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add('hide');
		} else {
			item.classList.remove('hide');
		}
	});
}

// Version Select Dropdown Menu
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
version_dropdownMenu.addEventListener('click', function (event) {
	if (event.target.tagName.toLowerCase() === 'li') {
		document.querySelector('#select-version .select').querySelector('span').textContent = event.target.textContent;
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
		if (event.target.id == 'new-reddit') {
			tabShowNewVersion();
			BROWSER_API.storage.sync.set({ redditVersion: 'new' });
		} else if (event.target.id == 'old-reddit') {
			tabShowOldVersion();
			BROWSER_API.storage.sync.set({ redditVersion: 'old' });
		}
	}
	if (event.target.tagName.toLowerCase() === 'span') {
		document.querySelector('#select-version .select').querySelector('span').textContent = event.target.textContent;
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
		if (event.target.parentNode.id == 'new-reddit') {
			tabShowNewVersion();
			BROWSER_API.storage.sync.set({ redditVersion: 'new' });
		} else if (event.target.parentNode.id == 'old-reddit') {
			tabShowOldVersion();
			BROWSER_API.storage.sync.set({ redditVersion: 'old' });
		}
	}
});
