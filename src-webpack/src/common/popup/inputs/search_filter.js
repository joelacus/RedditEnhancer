/* ===== Inputs / Search Filter ===== */

const Fuse = require('fuse.js');
const fuzzyOptions = {
	includeScore: false,
	threshold: 0.3,
	keys: ['combined_item_text_str'],
};

function search_filter() {
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		var i, data_search_attributes, search_input, combined_item_text_str;
		const ul = document.querySelector('#main-menu');
		const li = ul.querySelectorAll('li');

		if (result.redditVersion != undefined) {
			const version = 'r-' + result.redditVersion;

			// iterate through all options
			for (i = 0; i < li.length; i++) {
				if (li[i].classList.contains(version) && Array.from(li[i].classList).some((className) => className.startsWith('container'))) {
					combined_item_text_str = '';
					data_search_attributes = li[i].querySelectorAll('[data-search]');
					if (data_search_attributes != undefined) {
						// create dataset for option to search against
						data_search_attributes.forEach(function (span) {
							combined_item_text_str = [combined_item_text_str, span.dataset.search.split(',').join(' '), span.textContent || span.innerText].join(' ').trim().replace(':', '');
						});
						const combined_item_text_ary = combined_item_text_str.split(' ').map((word) => ({ combined_item_text_str: word }));
						// get user search input
						search_input = document.querySelector('#search').value.toLowerCase().trim();
						const search_input_words = search_input.split(' ');
						// fuzzy search
						const fuse = new Fuse(combined_item_text_ary, fuzzyOptions);
						const found = search_input_words.every((word) => {
							const result = fuse.search(word);
							return result.length > 0;
						});
						// set search result if found as an attribute in the option (false will be hidden)
						if (found) {
							li[i].setAttribute('data-search-result', true);
						} else {
							li[i].setAttribute('data-search-result', false);
						}
					} else {
						li[i].setAttribute('data-search-result', false);
					}

					// if the item is a sub sub menu
					const items = li[i].querySelectorAll(':scope > div');
					for (let i = 0; i < items.length; i++) {
						combined_item_text_str = '';
						const span = items[i].querySelector('[data-search]');
						if (span != undefined) {
							// create dataset for option to search against
							combined_item_text_str = [span.dataset.search.split(',').join(' '), span.textContent || span.innerText].join(' ').trim().replace(':', '');
							const combined_item_text_ary = combined_item_text_str.split(' ').map((word) => ({ combined_item_text_str: word }));
							// get user search input
							search_input = document.querySelector('#search').value.toLowerCase().trim();
							const search_input_words = search_input.split(' ');
							// fuzzy search
							const fuse = new Fuse(combined_item_text_ary, fuzzyOptions);
							const found = search_input_words.every((word) => {
								const result = fuse.search(word);
								return result.length > 0;
							});
							// set search result if found as an attribute in the option (false will be hidden)
							if (found) {
								items[i].setAttribute('data-search-result', true);
							} else {
								items[i].setAttribute('data-search-result', false);
								if (items[i].nextElementSibling) {
									if (items[i].nextElementSibling.classList.contains('divider')) {
										items[i].nextElementSibling.setAttribute('data-search-result', false);
									}
								}
							}
						} else if (!items[i].parentElement.querySelector('.dropdown')) {
							items[i].style.display = 'none';
						}
					}
				}
			}

			// show/hide elements depending if the search is being used
			if (document.querySelector('#search').value != '') {
				// hide extension settings and changelog
				if (document.querySelector('body#options-page')) {
					document.querySelector('#settings').classList.add('hidden');
					document.querySelector('#changelog').classList.add('hidden');
					document.querySelectorAll('#main-menu .menu-item-link').forEach((el) => {
						el.classList.add('hidden');
					});
				}

				// show search input clear button
				document.querySelector('#btn-clear-search').classList.remove('hidden');

				// add class to main menu to hide certain elements during search
				document.querySelector('#main-menu').classList.add('search-mode');

				// unhide all sub menus
				document.querySelectorAll('#main-menu .sub-list').forEach(function (menuList) {
					menuList.classList.remove('hidden');
				});

				// hide menu list if it contains no search results
				document.querySelectorAll('#main-menu .sub-list').forEach(function (menuList) {
					if (menuList.querySelector('[data-search-result="true"]')) {
						menuList.classList.remove('hidden');
					} else {
						menuList.classList.add('hidden');
					}
				});

				// if no results, show no results page
				if (!document.querySelector('[data-search-result="true"]')) {
					document.querySelector('#no-search-results').classList.remove('hidden');
				} else {
					document.querySelector('#no-search-results').classList.add('hidden');
				}
			} else {
				// options page - default back to active category
				setTimeout(() => {
					if (document.querySelector('body#options-page') && document.querySelector('.side-menu .active')) {
						const active = document.querySelector('.side-menu .active').id;
						if (active && active !== 'btn-settings' && active !== 'btn-changelog') {
							if (document.querySelector(`#main-menu #${active}`)) {
								document.querySelector(`#main-menu #${active}`).nextElementSibling.classList.remove('hidden');
							}
						} else if (active === 'btn-settings') {
							document.querySelector(`#settings`).classList.remove('hidden');
						} else if (active === 'btn-changelog') {
							document.querySelector(`#changelog`).classList.remove('hidden');
						}
						document.querySelectorAll('#main-menu .menu-item-link').forEach((el) => {
							el.classList.remove('hidden');
						});
					}
				}, 100);

				// hide search input clear button
				document.querySelector('#btn-clear-search').classList.add('hidden');

				// add class to main menu to hide certain elements during search
				document.querySelector('#main-menu').classList.remove('search-mode');

				// remove search result attribute from options
				document.querySelectorAll('[class^="container"]').forEach((item) => {
					item.removeAttribute('data-search-result');
				});

				// hide all sub menu lists
				document.querySelectorAll('.sub-list').forEach((sub) => {
					sub.classList.add('hidden');
				});

				// hide no results page
				document.querySelector('#no-search-results').classList.add('hidden');
			}
		}
	});
}

// Input - Search Input
document.querySelector('#search').addEventListener('keyup', function () {
	search_filter();
});

// Button - Clear Search Input
document.querySelector('#btn-clear-search').addEventListener('click', function () {
	document.querySelector('#search').value = '';
	search_filter();
});
