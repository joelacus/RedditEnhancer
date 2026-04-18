// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Menu
// ────────────────────────────────────────────────────────────────────────────

import Sortable from 'sortablejs';

// ─── Event listeners for the menu category buttons ──────────────────────────

const menuConfigs = [
	{ btn: '.btn-accessibility', menu: '.menu-accessibility', scroll: '.btn-accessibility' },
	//{ btn: '.btn-account-switcher', menu: '.menu-account-switcher', scroll: '.btn-account-switcher' },
	{ btn: '.btn-background', menu: '.menu-background', scroll: '.btn-background' },
	{ btn: '.btn-block', menu: '.menu-block', scroll: '.btn-block' },
	{ btn: '.btn-dark-mode', menu: '.menu-dark-mode', scroll: '.btn-dark-mode' },
	{ btn: '.btn-font', menu: '.menu-font', scroll: '.btn-font' },
	{ btn: '.btn-hide-elements', menu: '.menu-hide-elements', scroll: '.btn-hide-elements' },
	{ btn: '.btn-media-tweaks', menu: '.menu-media-tweaks', scroll: '.btn-media-tweaks' },
	{ btn: '.btn-productivity-tweaks', menu: '.menu-productivity-tweaks', scroll: '.btn-productivity-tweaks' },
	{ btn: '.btn-resize-elements', menu: '.menu-resize-elements', scroll: '.btn-resize-elements' },
	{ btn: '.btn-style-tweaks', menu: '.menu-style-tweaks', scroll: '.btn-style-tweaks' },
];

menuConfigs.forEach(({ btn, menu, scroll }) => {
	document.querySelectorAll(`${btn} .menu-item-btn`).forEach((button) => {
		button.addEventListener('click', () => {
			optionsPageFunctions();
			const menuEl = document.querySelector(menu);
			const isHidden = menuEl.classList.contains('hidden');
			menuEl.classList.toggle('hidden');
			document.querySelectorAll(btn).forEach((b) => b.classList.toggle('active', isHidden));
			if (isHidden) scrollIntoView(scroll);
		});
	});
});

// ─── Sortable ───────────────────────────────────────────────────────────────

// Detect Popup/Options Page
let menus;
if (document.querySelector('body#popup')) {
	menus = document.querySelectorAll('#main-menu');
} else {
	menus = document.querySelectorAll('.side-menu ul, #main-menu');
}

// Init
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

// ─── Helpers ────────────────────────────────────────────────────────────────

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
