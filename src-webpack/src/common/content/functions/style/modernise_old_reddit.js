// Modernise Old Reddit
let moderniseOldReddit = function () {
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			if (result.moderniseOldReddit === true) {
				document.querySelector('body').classList.add('re-modernise');
				// Header
				const header_container = document.querySelector('.re-header-container');
				if (!header_container) {
					const header = document.querySelector('#header');
					const headerLeft = document.querySelector('#header-bottom-left');
					const headerRight = document.querySelector('#header-bottom-right');
					const headerContainer = document.createElement('div');
					headerContainer.classList.add('re-header-container');
					headerContainer.append(headerLeft);
					headerContainer.append(headerRight);
					header.append(headerContainer);
				}

				// Search
				const search = document.querySelector('#search');
				const headerLeft = document.querySelector('#header-bottom-left');
				if (search) {
					headerLeft.append(search);
				}

				// Sub List
				const dropdown_btn = document.querySelector('#sr-header-area .dropdown.srdrop');
				const dropdown_menu = document.querySelector('#sr-header-area .drop-choices.srdrop');
				headerLeft.insertBefore(dropdown_menu, search);
				headerLeft.insertBefore(dropdown_btn, dropdown_menu);

				// Sub Filter
				const searchFilter = document.createElement('input');
				searchFilter.type = 'text';
				searchFilter.classList.add('sub-filter');
				searchFilter.placeholder = 'Filter';
				searchFilter.addEventListener('keyup', function (e) {
					var input, filter, div, a, i, txtValue;
					filter = e.target.value.toUpperCase();
					div = document.querySelector('.drop-choices.srdrop');
					a = div.getElementsByTagName('a');
					for (i = 0; i < a.length; i++) {
						txtValue = a[i].textContent || a[i].innerText;
						if (txtValue.toUpperCase().indexOf(filter) > -1) {
							a[i].style.display = '';
						} else {
							a[i].style.display = 'none';
						}
					}
				});
				dropdown_menu.insertBefore(searchFilter, dropdown_menu.firstChild);

				searchFilter.addEventListener('click', function (e) {
					e.stopPropagation();
				});

				dropdown_btn.addEventListener('click', function (e) {
					searchFilter.value = '';
					searchFilter.focus();
					const list = document.querySelector('.drop-choices.srdrop').querySelectorAll('a');
					list.forEach(function (item) {
						item.style.display = '';
					});
				});

				// Main
				const reMain = document.querySelector('#re-main');
				if (!reMain) {
					const main = document.createElement('div');
					main.id = 're-main';
					const container = document.createElement('div');
					container.id = 're-container';
					const body = document.querySelector('body');
					const sidemenu = document.querySelector('.listing-chooser');
					const side = document.querySelector('.side');
					const content = document.querySelector('.content[role="main"]');
					const sort = document.querySelector('#header .tabmenu');
					body.insertBefore(main, side);
					if (sidemenu) {
						main.append(sidemenu);
					}
					container.append(content);
					container.append(side);
					main.append(container);
					content.insertBefore(sort, content.firstChild);
				} else {
					const content = document.querySelector('.content');
					const sort = document.querySelector('#header .tabmenu');
					content.insertBefore(sort, content.firstChild);
				}
				if (link.indexOf('old.reddit.com/prefs/') >= 0) {
					const body = document.querySelector('body');
					const header = document.querySelector('#header');
					const main = document.querySelector('#re-main');
					body.insertBefore(main, header.nextSibling);
				}

				// Expand Post
				/*const posts = document.querySelectorAll('#siteTable .thing');
				posts.forEach(function(post) {
					const expando = post.querySelector('.expando-button');
					if (expando) {
						post.addEventListener('click', function(event) {
							 // Get the clicked element
							  const clickedElement = event.target;

							  // Get the target element of the event
							  const targetElement = event.currentTarget;

							  // Check if the clicked element is the same as the target element
							  if (clickedElement === targetElement) {
							    // Ignore the event
							    return;
							  }

							  // Check if the clicked element is a hyperlink
							  if (clickedElement.tagName === 'A') {
							    // Handle hyperlink event
							    console.log('Clicked a hyperlink');
							  } else {
							  	console.log(clickedElement)
							    // Handle other event
							    console.log('Clicked an element with an event');
							  }
						});	
					}
				});*/
			}
		}
	});
};
export { moderniseOldReddit };
