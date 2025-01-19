/* ===== Popup / Functions / Init Top Category Menu ===== */

import { initTopCategoryMenuAccordion } from './accordion';

export function initTopCategoryMenu() {
	document.addEventListener('DOMContentLoaded', function () {
		const mainMenu = document.querySelector('#main-menu');
		const menuItems = document.querySelectorAll('#top-menu a');
		const scrollItems = document.querySelectorAll('#main-menu > li');
		let lastId = '';

		// Restore Menu Item Order
		BROWSER_API.storage.sync.get(['menuOrder'], function (result) {
			if (typeof result.menuOrder != 'undefined') {
				const newOrder = result.menuOrder.split(',');
				reorderList(newOrder);
			}
		});

		// Reorder Menu
		function reorderList(order) {
			const quickMenu = document.querySelector('#top-menu');
			const items = Array.from(quickMenu.children);
			order.forEach((index) => {
				const item = items.find((item) => item.dataset.index === index);
				if (item) {
					quickMenu.appendChild(item);
				}
			});
		}

		// Remove the last divider
		setTimeout(() => {
			const menuItems = document.querySelectorAll('#top-menu > div');
			for (let i = menuItems.length - 1; i >= 0; i--) {
				const item = menuItems[i];
				if (!item.classList.contains('hidden')) {
					const vdivider = item.querySelector('.vdivider');
					vdivider.remove();
					break;
				}
			}
		}, 200);

		// Init Accordion
		setTimeout(() => {
			initTopCategoryMenuAccordion();
		}, 300);
		setTimeout(() => {
			initTopCategoryMenuAccordion();
		}, 500);

		// Open sub menu on item click
		menuItems.forEach((item) => {
			const id = item.getAttribute('href');
			item.addEventListener('click', function (e) {
				document.querySelector(`${id} .menu-item-link`).classList.add('active');
				document.querySelector(`${id} ul.sub-list`).classList.remove('hidden');
			});
		});

		// Underline menu item when the user scrolls over it
		mainMenu.addEventListener('scroll', function () {
			const fromTop = mainMenu.scrollTop;
			let cur = Array.from(scrollItems).filter((item) => {
				// Calculate the item's position relative to the scrollable container
				return item.offsetTop < fromTop + mainMenu.clientHeight && item.offsetTop + item.clientHeight > fromTop;
			});
			const id = cur.length ? cur[cur.length - 1].id : '';
			if (lastId !== id) {
				lastId = id;
				menuItems.forEach((item) => {
					item.classList.remove('underline');
					if (item.getAttribute('href') === `#${id}`) {
						if (!document.querySelector(`#${id} ul.sub-list`).classList.contains('hidden')) {
							item.classList.add('underline');
						}
					}
				});
			}
		});
	});
}
