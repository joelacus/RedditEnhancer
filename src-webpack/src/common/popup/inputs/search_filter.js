/* ===== Inputs / Search Filter ===== */

/*  Filter all the options in the extension when the user types in the search box.
    It will use the option label text to match against the search input, so will work in the supported languages.
	Additional query words the user might search for, but may not contained within the option label text, currently only support English.
	See popup.html/options.html for elements/options with the "data-query-words" attribute.
*/

const Fuse = require('fuse.js');
const fuzzyOptions = {
	includeScore: false,
	threshold: 0.3,
	keys: ['option_query_words_str'],
};

function search_filter() {
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		const ul = document.querySelector('#main-menu');
		const li = ul.querySelectorAll('.sub-list li');

		if (result.redditVersion) {
			const version = `r-${result.redditVersion}`;

			function performFuzzySearch(element) {
				// Get the relevant query words from the option attribute.
				let option_query_words_str = element.dataset?.queryWords?.split(',').join(' ') || '';

				// Get the option label text and add it to the query words.
				element.querySelectorAll('[data-lang]').forEach((el) => {
					option_query_words_str = [option_query_words_str, el.textContent || el.innerText].join(' ').trim().replace(':', '');
				});

				// Turn the string into an array, removing double or more spaces.
				const option_query_words_ary = option_query_words_str
					.replace(/ +(?= )/g, '')
					.split(' ')
					.map((word) => ({ option_query_words_str: word }));

				// Get the user's search input.
				const search_input = document.querySelector('#search').value.toLowerCase().trim();
				const search_input_words = search_input.split(' ');
				const fuse = new Fuse(option_query_words_ary, fuzzyOptions);

				// Perform fuzzy search of the user's input against the option query words.
				return search_input_words.every((word) => {
					const result = fuse.search(word);
					return result.length > 0;
				});
			}

			// Loop through all the options
			for (let i = 0; i < li.length; i++) {
				// Initially hide everything. If an option is found, this attribute will be set to "true" and will be shown.
				li[i].setAttribute('data-search-result', false);

				// If the list item has a "search" attribute containing related query words.
				if (li[i].dataset.queryWords) {
					const found = performFuzzySearch(li[i]);
					if (found && li[i].classList.contains(version)) li[i].setAttribute('data-search-result', true);
				} else if (li[i].querySelector(':scope > div')) {
					// If the list item does not have a search attribute and has "div" children (option groups).
					li[i].querySelectorAll(':scope > div').forEach((div) => {
						// Skip any "div" items that do not start with "container" in the class name.
						if (!Array.from(div.classList).some((className) => className.startsWith('container'))) return;

						div.setAttribute('data-search-result', false);
						const found = performFuzzySearch(div);

						// If an option contains the search query, make it and its parent visible.
						if (found && div.classList.contains(version)) {
							div.setAttribute('data-search-result', true);
							div.parentNode.setAttribute('data-search-result', true);
						}

						// Hide any divider elements
						if (div.nextElementSibling?.classList.contains('divider')) {
							div.nextElementSibling.setAttribute('data-search-result', false);
						}
					});
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
				document.querySelectorAll('[data-search-result]').forEach((item) => {
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
