// Input - Search Filter

var i, query, filter, txtValue;
var ul = document.querySelector('.menu');
var li = ul.querySelectorAll('li');

function search_filter() {
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		if (result.redditVersion != undefined) {
			var v = 'r-' + result.redditVersion;

			document.querySelectorAll('.sub-list').forEach((sub) => {
				if (sub.classList.contains(v)) {
					sub.classList.remove('hide');
				}
			});
			document.querySelectorAll('.sub-search-title').forEach((sub) => {
				sub.classList.remove('hide');
			});
			document.querySelectorAll('.menu-item-link').forEach((item) => {
				item.style.display = 'none';
			});
			for (i = 0; i < li.length; i++) {
				if (li[i].classList.contains(v)) {
					txtValue = '';
					query = li[i].querySelectorAll('[data-search]');
					if (query != undefined) {
						query.forEach(function (span) {
							txtValue = txtValue + ',' + span.dataset.search + ',' + span.textContent || span.innerText;
						});
						filter = document.querySelector('#search').value.toLowerCase();
						if (txtValue.toLowerCase().indexOf(filter) > -1) {
							li[i].style.display = 'grid';
						} else {
							li[i].style.display = 'none';
						}
					} else {
						li[i].style.display = 'none';
					}
					if (document.querySelector('#search').value == '') {
						document.querySelectorAll('.sub-list').forEach((sub) => {
							sub.classList.add('hide');
						});
						li[i].style.display = null;
						document.querySelectorAll('.sub-search-title').forEach((title) => {
							title.classList.add('hide');
						});
						document.querySelectorAll('.menu-item-link').forEach((btn) => {
							btn.classList.remove('active');
						});
						document.querySelectorAll('.menu-item-link').forEach((item) => {
							item.style.display = '';
						});
					}
				}
			}

			// Check if each menu list contain search results
			document.querySelectorAll('.menu-list').forEach(function (menuList) {
				// unhide all menu lists
				menuList.classList.remove('hide');
			});
			if (document.querySelector('#search').value != '') {
				// check each menu list for result
				document.querySelectorAll('.menu-list').forEach(function (menuList) {
					const containers = menuList.querySelectorAll('.container');
					function hasVisibleResultsFunc() {
						for (const element of containers) {
							if (element.style.display === 'grid') {
								return true;
							}
						}
						return false;
					}
					const hasVisibleResults = hasVisibleResultsFunc();
					// hide menu list if it contains no search result
					if (!hasVisibleResults) {
						menuList.classList.add('hide');
					}
				});
				// if no results, show no results page to user
				document.querySelectorAll('.container').forEach(function (container) {
					const containers = document.querySelectorAll('.container');
					function anyVisibleResultsFunc() {
						for (const element of containers) {
							if (element.style.display === 'grid') {
								return true;
							}
						}
						return false;
					}
					const anyVisibleResults = anyVisibleResultsFunc();
					if (anyVisibleResults === true) {
						document.querySelector('#no-search-results').style.display = 'none';
					} else {
						document.querySelector('#no-search-results').style.display = 'flex';
					}
				});
			} else {
				document.querySelectorAll('.sub-list').forEach(function (sub) {
					sub.classList.add('hide');
				});
			}
		}
	});
}
document.querySelector('#search').addEventListener('keyup', function (e) {
	search_filter(e);
});
