/* ===== Tweaks - Style - Modernise Old Reddit ===== */

/* === Triggered On Page Load === */
export function loadModerniseOldReddit() {
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		if (result.moderniseOldReddit) moderniseOldReddit(true);
	});
}

/* === Main Function === */
export function moderniseOldReddit(value) {
	const link = window.location.href;
	if (value === true) {
		styleModerniseOldReddit(value);
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

function styleModerniseOldReddit(value) {
	if (value === true) {
		if (!document.head.querySelector('style[id="re-modernise-old-reddit"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-modernise-old-reddit';
			styleElement.textContent = `body{
											background-color: #030303 !important;
										}
										#header {
											position: sticky !important;
											top: 0 !important;
										}
										#siteTable {
											margin: 0 24px 0 24px;
										}
										.content > .menuarea {
											margin-right: 24px
										}
										#siteTable .thing {
											maring-bottom: 16px;
											padding: 8px;
											border: solid 1px #343536;
											border-radius: 4px;
											background-color: #1a1a1b;
										}
										#siteTable .thing:hover {
											border-color: #fff; !important;
										}
										#siteTable .thing .title {
											color: #fff;
										}
										.listing-chooser {
											position: relative !important;
											top: 0 !important;
											z-index: 2 !important;
											background: #1a1a1b;
										}
										.listing-chooser .grippy::before, .listing-chooser .grippy::after {
											border-left: solid 1px #343536 !important;
											background-color: #343536 !important;
										}
										.content {
											margin: 0 !important;
											width: 100%; !important
										}
										.side {
											min-width: 300px;
											height: fit-content !important;
											margin: 24px !important;
											padding: 8px;
											border-radius: 2px;
											background-color: #1a1a1b !important;
										}
										.side .morelink {
											background-image: none !important;
											background: transparent !important;
											border: solid 1px #343536 !important;
											border-radius: 2px;
										}
										.side .morelink:hover {
											border-color: #fff !important;
											background: rgba(255,255,255,0.04) !important;
										}
										.side .morelink a {
											color: #fff !important;
										}
										.side .morelink .nub {
											display: none !important;
										}
										#sr-header-area {
											background-color: transparent !important;
											border-bottom: solid 1px #343536 !important;
										}
										#sr-header-area a {
											color: #fff;
										}
										#sr-more-link {
											background-color: #1a1a1b !important;
										}
										#header {
											background-color: #1a1a1b !important;
											border-bottom: solid 1px #343536 !important;
										}
										#header-img {
											margin-left: 20px;
											width: 160px !important;
										}
										#header-bottom-left {
											display: flex;
											align-items: center;
											grid-gap: 8px;
											height: 50px;
											position: relative !important;
											width: 100% !important;
										}
										#header a, #header span {
											color: #fff !important
										}
										#search input[type="text"] {
											border-radius: 50px;
											height: 42px;
											width: 100% !important;
											background-color: #272729;
											border: solid 1px #343536 !important;
											color: #fff;
											outline: none;
											font-family: Verdana, sans-serif !important;
											font-size: 14px !important;
											padding-left: 16px !important;
										}
										#search input[type="text"]::placeholder {
											text-transform: capitalize;
										}
										#search input[type="text"]:hover, #search input[type="text"]:focus {
											border-color: #fff !important;
										}
										#search input[type="submit"] {
											margin-left: -28px !important;
										}
										#search {
											width: 100%;
											height: 42px;
											margin-left: 48px;
											margin-right: 48px;
										}
										#searchexpando {
											position: absolute;
										}
										.re-header-container {
											display: flex;
										}
										#header-bottom-right {
											position: relative !important;
											top: 0 !important;
											align-items: center;
											grid-gap: 16px;
											height: 50px;
											padding: 0 !important;
											padding-right: 24px !important;
											border-radius: 0 !important;
											font-size: 14px;
											background-color: transparent !important;
											color: #fff;
											font-size: 14px;
										}
										#header-bottom-right .user span {
											color: #a8aaab !important;
										}
										#header-bottom-right .user a {
											color: #fff !important;
										}
										#header-bottom-right .separator {
											display: none;
										}
										#header-bottom-right a {
											color: #fff !important;
											font-weight: normal;
										}
										#header-bottom-left .dropdown {
											height: 28px;
											min-width: 252px;
											line-height: 28px;
											padding: 4px 8px;
											border: solid 1px transparent;
											border-radius: 4px;
											font-size: 14px;
											cursor: pointer;
										}
										#header-bottom-left .dropdown:hover {
											border: solid 1px #343536;
										}
										#header-bottom-left .dropdown span {
											margin-left: 0 !important;
											margin-right: 0 !important;
											padding-right: 0 !important;
											color: #fff;
											width: 100%;
										}
										#header-bottom-left .drop-choices.srdrop {
											max-height: 400px;
											min-width: 270px;
											overflow-x: hidden;
											overflow-y: scroll;
											border-radius: 0 0 4px 4px;
											margin-top: 14px;
											margin-left: 0;
											background-color: #1a1a1b;
											border: solid 1px #343536 !important;
											border-top: none !important;
										}
										#header-bottom-left .drop-choices .sub-filter {
											margin: 8px;
											height: 30px;
											width: calc(100% - 26px);
											padding: 0 4px 0 4px;
											border-radius: 2px;
											outline: none;
											background-color: #1a1a1b;
											border: solid 1px #343536 !important;
											color: #fff;
										}
										#header-bottom-left .drop-choices .sub-filter:hover, #header-bottom-left .drop-choices .sub-filter:focus {
											border-color: #fff !important;
										}
										#header-bottom-left .drop-choices a.choice {
											height: 24px;
											line-height: 24px;
											padding: 4px 16px;
											color: #fff;
											font-size: 16px;
										}
										#header-bottom-left .drop-choices a.choice:hover {
											background-color: rgba(255,255,255,0.04);
										}
										.tabmenu {
											display: flex !important;
											align-items: center;
											grid-gap: 8px;
											height: 50px;
											margin: 24px 24px 16px 24px !important;
											width: calc(100% - 50px);
											background-color: #1a1a1b;
											border: solid 1px #343536;
											border-radius: 4px;
											padding: 4px 12px !important;
										}
										.tabmenu li a {
											background-color: transparent !important;
											color: #818384;
											font-size: 14px !important;
											border: none !important;
											border-radius: 20px;
											text-transform: capitalize;
											padding: 8px 16px !important;
										}
										.tabmenu li a:hover {
											background-color: rgba(255,255,255,0.04) !important;
										}
										.tabmenu li.selected a {
											background-color: #272729 !important;
											color: #d7dadc !important;
										}
										.nav-buttons {
											display:flex;
											justify-content: center;
										}
										.nav-buttons .nextprev {
											color: #fff;
										}
										.nav-buttons a {
											padding: 4px 8px !important;
										}
										.sitetable.nestedlisting {
											background-color: #1a1a1b;
											border-radius: 2px;
											padding: 8px;
										}
										.usertext-edit textarea {
											background-color: #1a1a1b;
											border: solid 1px #343536;
											border-radius: 4px;
											color: #fff;
											outline: none;
										}
										.usertext-edit textarea:focus {
											border-color: #fff;
										}
										.sitetable.nestedlisting .usertext-body p, .usertext-body li {
											color: #fff;
										}
										.markhelp tbody td {
											color:#fff;
										}
										.markhelp tbody tr:first-child td {
											color:#000;
										}
										.side .titlebox, .side p {
											color: #fff;
										}
										.side h1, .side h2, .side .titlebox a {
											color: #fff;
										}
										.side .titlebox a:hover {
											text-decoration: underline;
										}
										#pref-form {
											background-color: #1a1a1b;
											color: #fff;
										}
										#header-bottom-left span a {
											left: 0;
											top: 0;
											height: 100%;
											max-width: 185px;
											background-size: 100% auto;
											background-position: center;
										}
										.md-container .md {
											background-color: #1a1a1b !important;
										}
										.md-container .md p {
											color: #fff !important;
										}
										.commentarea {
											border: solid 1px #343536;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	}
}
