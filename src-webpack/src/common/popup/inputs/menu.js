// Input - Menu

import Sortable from 'sortablejs';

// Menu Button - Dark Mode
document.querySelector('.btn-dark-mode > div').addEventListener('click', function (e) {
	var el = document.querySelector('.menu-dark-mode');
	if (el.classList.contains('hidden')) {
		document.querySelector('.btn-dark-mode').classList.add('active');
		el.classList.remove('hidden');
		document.querySelector('.btn-dark-mode').scrollIntoView();
	} else {
		document.querySelector('.btn-dark-mode').classList.remove('active');
		el.classList.add('hidden');
	}
});

// Menu Button - Expand View
document.querySelector('.btn-expand-view').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-expand-view').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-expand-view').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-expand-view').scrollIntoView();
		} else {
			document.querySelector('.btn-expand-view').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});

// Menu Button - Hide Elements
document.querySelector('.btn-hide-elements').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-hide-elements').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-hide-elements').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-hide-elements').scrollIntoView();
		} else {
			document.querySelector('.btn-hide-elements').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});

// Menu Button - Productivity Tweaks
document.querySelector('.btn-productivity-tweaks').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-productivity-tweaks').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-productivity-tweaks').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-productivity-tweaks').scrollIntoView();
		} else {
			document.querySelector('.btn-productivity-tweaks').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});

// Menu Button - Style Tweaks
document.querySelector('.btn-style-tweaks').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-style-tweaks').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-style-tweaks').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-style-tweaks').scrollIntoView();
		} else {
			document.querySelector('.btn-style-tweaks').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});

// Menu Button - Background
document.querySelector('.btn-bg-image').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-bg-image').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-bg-image').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-bg-image').scrollIntoView();
		} else {
			document.querySelector('.btn-bg-image').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});

// Menu Button - Accessibility
document.querySelector('.btn-accessibility').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-accessibility').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-accessibility').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-accessibility').scrollIntoView();
		} else {
			document.querySelector('.btn-accessibility').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});

// Menu Button - Account Switcher
/*document.querySelector('.btn-account-switcher').addEventListener('click', function (e) {
	document.querySelectorAll('.menu-account-switcher').forEach(function (el) {
		if (el.classList.contains('hidden')) {
			document.querySelector('.btn-account-switcher').classList.add('active');
			el.classList.remove('hidden');
			document.querySelector('.btn-account-switcher').scrollIntoView();
		} else {
			document.querySelector('.btn-account-switcher').classList.remove('active');
			el.classList.add('hidden');
		}
	});
});*/

// Init Sortablejs
const menu = document.querySelector('#main-menu');
new Sortable(menu, {
	handle: '.menu-item-handle',
	animation: 150,
	onEnd: function (evt) {
		saveMenuList();
	},
});

// Save Menu Item Order
function saveMenuList() {
	let order = [];
	const items = document.querySelectorAll('#main-menu > li');
	for (let i = 0; i < items.length; i++) {
		const index = items[i].getAttribute('data-index');
		order.push(index);
	}
	BROWSER_API.storage.sync.set({ menuOrder: order.join(',') });
}

// Reorder Menu
function reorderList(order) {
	const container = document.querySelector('#main-menu');
	const items = Array.from(container.children);
	order.forEach((index) => {
		const item = items.find((item) => item.dataset.index === index);
		if (item) {
			container.appendChild(item);
		}
	});
}

// Restore Menu Item Order
BROWSER_API.storage.sync.get(['menuOrder'], function (result) {
	if (typeof result.menuOrder != 'undefined') {
		const newOrder = result.menuOrder.split(',');
		reorderList(newOrder);
	}
});
