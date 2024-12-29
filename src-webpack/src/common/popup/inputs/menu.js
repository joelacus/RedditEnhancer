/* ===== Inputs / Menu ===== */

import Sortable from 'sortablejs';

// Event listeners for the menu category buttons.

// Menu Button - Dark Mode
document.querySelectorAll('.btn-dark-mode .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-dark-mode');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-dark-mode').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-dark-mode');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-dark-mode').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Resize Feed/Post
document.querySelectorAll('.btn-resize-elements .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-resize-elements');
		if (menu.classList.contains('hidden') === true) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-resize-elements').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('#main-menu .btn-resize-elements');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-resize-elements').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Hide Elements
document.querySelectorAll('.btn-hide-elements .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-hide-elements');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-hide-elements').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-hide-elements');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-hide-elements').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Productivity Tweaks
document.querySelectorAll('.btn-productivity-tweaks .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-productivity-tweaks');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-productivity-tweaks').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-productivity-tweaks');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-productivity-tweaks').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Style Tweaks
document.querySelectorAll('.btn-style-tweaks .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-style-tweaks');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-style-tweaks').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-style-tweaks');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-style-tweaks').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Background
document.querySelectorAll('.btn-background .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-background');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-background').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-background');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-background').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Accessibility
document.querySelectorAll('.btn-accessibility .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-accessibility');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-accessibility').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-accessibility');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-accessibility').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Font
document.querySelectorAll('.btn-font .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		optionsPageFunctions();
		const menu = document.querySelector('.menu-font');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-font').forEach((btn) => {
				btn.classList.add('active');
			});
			scrollIntoView('.btn-font');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-font').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});

// Menu Button - Account Switcher
/*document.querySelectorAll('.btn-account-switcher .menu-item-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		const menu = document.querySelector('.menu-account-switcher');
		if (menu.classList.contains('hidden')) {
			menu.classList.remove('hidden');
			document.querySelectorAll('.btn-account-switcher').forEach((btn) => {
				btn.classList.ad('active');
			});
			scrollIntoView('.btn-account-switcher');
		} else {
			menu.classList.add('hidden');
			document.querySelectorAll('.btn-account-switcher').forEach((btn) => {
				btn.classList.remove('active');
			});
		}
	});
});*/

function scrollIntoView(btn) {
	if (document.querySelector('body#popup')) {
		document.querySelector(btn).scrollIntoView();
	}
}

function optionsPageFunctions() {
	if (document.querySelector('body#options-page') && window.innerWidth >= 1000) {
		document.querySelectorAll('.menu-item-link').forEach((item) => {
			item.classList.remove('active');
		});
		document.querySelectorAll('.sub-list').forEach((sub) => {
			sub.classList.add('hidden');
		});
		document.querySelector('#settings').classList.add('hidden');
		document.querySelector('#changelog').classList.add('hidden');
	}
}

// Detect Popup/Options Page
let menus;
if (document.querySelector('body#popup')) {
	menus = document.querySelectorAll('#main-menu');
} else {
	menus = document.querySelectorAll('.side-menu ul, #main-menu');
}

// Init Sortable
menus.forEach((menu) => {
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
		const items = menu.querySelectorAll(':scope > li');
		for (let i = 0; i < items.length; i++) {
			const index = items[i].getAttribute('data-index');
			order.push(index);
		}
		BROWSER_API.storage.sync.set({ menuOrder: order.join(',') });
	}

	// Restore Menu Item Order
	BROWSER_API.storage.sync.get(['menuOrder'], function (result) {
		if (typeof result.menuOrder != 'undefined') {
			const newOrder = result.menuOrder.split(',');
			reorderList(newOrder);
		}
	});

	// Reorder Menu
	function reorderList(order) {
		const items = Array.from(menu.children);
		order.forEach((index) => {
			const item = items.find((item) => item.dataset.index === index);
			if (item) {
				menu.appendChild(item);
			}
		});
	}
});
