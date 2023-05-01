// Load styles into the document head for tweaked elements

export function loadStyles() {
	styleHide();
	styleResize();
	styleHideGap();
	styleDropShadow();
	styleStickySort();
	styleImageOptions();
	styleLayoutCentre();
	styleOther();
	styleVideoPlayer();
	styleScrollText();
	styleOldReddit();
	styleModerniseOldReddit();
	stylePagination();
	styleLoadMore();
}


function styleLoadMore() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = `.re-load-more {
							width: 100%;
							height: 30px;
							text-align: center;
						}`
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function stylePagination() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = `.re-post.hide {
							display: none;
						}`
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}

function styleModerniseOldReddit() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = 'body.re-modernise {\
							background-color: #030303 !important;\
						}\
						.re-modernise #siteTable {\
							margin: 0 0 0 24px;\
						}\
						.re-modernise #siteTable .thing {\
							maring-bottom: 16px;\
							padding: 8px;\
							border: solid 1px #343536;\
							border-radius: 4px;\
							background-color: #1a1a1b;\
						}\
						.re-modernise #siteTable .thing:hover {\
							border-color: #fff; !important;\
						}\
						.re-modernise #siteTable .thing .title {\
							color: #fff;\
							text-transform: capitalize;\
						}\
						.re-modernise .listing-chooser {\
							position: relative !important;\
							top: 0 !important;\
							z-index: 2 !important;\
							background: #1a1a1b;\
						}\
						.re-modernise .listing-chooser .grippy::before, .re-modernise .listing-chooser .grippy::after {\
							border-left: solid 1px #343536 !important;\
							background-color: #343536 !important;\
						}\
						.re-modernise .content {\
							margin: 0 !important;\
							width: 100%; !important\
						}\
						.re-modernise .side {\
							min-width: 300px;\
							height: fit-content !important;\
							margin: 24px !important;\
							padding: 8px;\
							border-radius: 2px;\
							background-color: #1a1a1b !important;\
						}\
						.re-modernise .side .morelink {\
							background-image: none !important;\
							background: transparent !important;\
							border: solid 1px #343536 !important;\
							border-radius: 2px;\
						}\
						.re-modernise .side .morelink:hover {\
							border-color: #fff !important;\
							background: rgba(255,255,255,0.04) !important;\
						}\
						.re-modernise .side .morelink a {\
							color: #fff !important;\
						}\
						.re-modernise .side .morelink .nub {\
							display: none !important;\
						}\
						.re-modernise #sr-header-area {\
							background-color: transparent !important;\
							border-bottom: solid 1px #343536 !important;\
						}\
						.re-modernise #sr-header-area a {\
							color: #fff;\
						}\
						.re-modernise #sr-more-link {\
							background-color: #1a1a1b !important;\
						}\
						.re-modernise #header {\
							background-color: #1a1a1b !important;\
							border-bottom: solid 1px #343536 !important;\
							height: 48px !important;\
						}\
						.re-modernise #header-img {\
							margin-left: 20px;\
							width: 160px !important;\
						}\
						.re-modernise #header-bottom-left {\
							display: flex;\
							align-items: center;\
							grid-gap: 8px;\
							height: 50px;\
							position: relative !important;\
							width: 100% !important;\
						}\
						.re-modernise #header a, .re-modernise #header span {\
							text-transform: capitalize;\
							color: #fff !important\
						}\
						.re-modernise #search input[type="text"] {\
							border-radius: 50px;\
							height: 42px;\
							width: 100% !important;\
							background-color: #272729;\
							border: solid 1px #343536 !important;\
							color: #fff;\
							outline: none;\
							font-family: Verdana, sans-serif !important;\
							font-size: 14px !important;\
							padding-left: 16px !important;\
						}\
						.re-modernise #search input[type="text"]::placeholder {\
							text-transform: capitalize;\
						}\
						.re-modernise #search input[type="text"]:hover, .re-modernise #search input[type="text"]:focus {\
							border-color: #fff !important;\
						}\
						.re-modernise #search input[type="submit"] {\
							margin-left: -28px !important;\
						}\
						.re-modernise #search {\
							width: 100%;\
							height: 42px;\
							margin-left: 48px;\
							margin-right: 48px;\
						}\
						.re-modernise #searchexpando {\
							position: absolute;\
						}\
						.re-modernise .re-header-container {\
							display: flex;\
						}\
						.re-modernise #header-bottom-right {\
							position: relative !important;\
							align-items: center;\
							grid-gap: 16px;\
							height: 50px;\
							padding: 0 !important;\
							padding-right: 24px !important;\
							border-radius: 0 !important;\
							font-size: 14px;\
							background-color: transparent !important;\
							color: #fff;\
							font-size: 14px;\
						}\
						.re-modernise #header-bottom-right .user span {\
							color: #a8aaab !important;\
						}\
						.re-modernise #header-bottom-right .user a {\
							color: #fff !important;\
						}\
						.re-modernise #header-bottom-right .separator {\
							display: none;\
						}\
						.re-modernise #header-bottom-right a {\
							color: #fff !important;\
							font-weight: normal;\
						}\
						.re-modernise #header-bottom-left .dropdown {\
							height: 28px;\
							min-width: 252px;\
							line-height: 28px;\
							padding: 4px 8px;\
							border: solid 1px transparent;\
							border-radius: 4px;\
							font-size: 14px;\
							cursor: pointer;\
						}\
						.re-modernise #header-bottom-left .dropdown:hover {\
							border: solid 1px #343536;\
						}\
						.re-modernise #header-bottom-left .dropdown span {\
							margin-left: 0 !important;\
							margin-right: 0 !important;\
							padding-right: 0 !important;\
							color: #fff;\
							width: 100%;\
						}\
						.re-modernise #header-bottom-left .drop-choices.srdrop {\
							max-height: 400px;\
							min-width: 270px;\
							overflow-x: hidden;\
							overflow-y: scroll;\
							border-radius: 0 0 4px 4px;\
							margin-top: 14px;\
							margin-left: 0;\
							background-color: #1a1a1b;\
							border: solid 1px #343536 !important;\
							border-top: none !important;\
						}\
						.re-modernise #header-bottom-left .drop-choices .sub-filter {\
							margin: 8px;\
							height: 30px;\
							width: calc(100% - 26px);\
							padding: 0 4px 0 4px;\
							border-radius: 2px;\
							outline: none;\
							background-color: #1a1a1b;\
							border: solid 1px #343536 !important;\
							color: #fff;\
						}\
						.re-modernise #header-bottom-left .drop-choices .sub-filter:hover, .re-modernise #header-bottom-left .drop-choices .sub-filter:focus {\
							border-color: #fff !important;\
						}\
						.re-modernise #header-bottom-left .drop-choices a.choice {\
							height: 24px;\
							line-height: 24px;\
							padding: 4px 16px;\
							color: #fff;\
							font-size: 16px;\
						}\
						.re-modernise #header-bottom-left .drop-choices a.choice:hover {\
							background-color: rgba(255,255,255,0.04);\
						}\
						.re-modernise .tabmenu {\
							display: flex !important;\
							align-items: center;\
							grid-gap: 8px;\
							height: 50px;\
							margin: 24px 0 16px 24px !important;\
							width: calc(100% - 50px);\
							background-color: #1a1a1b;\
							border: solid 1px #343536;\
							border-radius: 4px;\
							padding: 4px 12px !important;\
						}\
						.re-modernise .tabmenu li a {\
							background-color: transparent !important;\
							color: #818384;\
							font-size: 14px !important;\
							border: none !important;\
							border-radius: 20px;\
							text-transform: capitalize;\
							padding: 8px 16px !important;\
						}\
						.re-modernise .tabmenu li a:hover {\
							background-color: rgba(255,255,255,0.04) !important;\
						}\
						.re-modernise .tabmenu li.selected a {\
							background-color: #272729 !important;\
							color: #d7dadc !important;\
						}\
						.re-modernise .nav-buttons {\
							display:flex;\
							justify-content: center;\
						}\
						.re-modernise .nav-buttons .nextprev {\
							color: #fff;\
						}\
						.re-modernise .nav-buttons a {\
							padding: 4px 8px !important;\
						}\
						.re-modernise .sitetable.nestedlisting {\
							background-color: #1a1a1b;\
							border-radius: 2px;\
							padding: 8px;\
						}\
						.re-modernise .usertext-edit textarea {\
							background-color: #1a1a1b;\
							border: solid 1px #343536;\
							border-radius: 4px;\
							color: #fff;\
							outline: none;\
						}\
						.re-modernise .usertext-edit textarea:focus {\
							border-color: #fff;\
						}\
						.re-modernise .sitetable.nestedlisting .usertext-body p, .re-modernise .usertext-body li {\
							color: #fff;\
						}\
						.re-modernise .markhelp tbody td {\
							color:#fff;\
						}\
						.markhelp tbody tr:first-child td {\
							color:#000;\
						}\
						.re-modernise .side .titlebox, .re-modernise .side p {\
							color: #fff;\
						}\
						.re-modernise .side h1, .re-modernise .side h2, .re-modernise .side .titlebox a {\
							color: #fff;\
						}\
						.re-modernise .side .titlebox a:hover {\
							text-decoration: underline;\
						}\
						.re-modernise #pref-form {\
							background-color: #1a1a1b;\
							color: #fff;\
						}\
						.re-modernise #header-bottom-left span a {\
							left: 0;\
							top: 0;\
							height: 100%;\
							max-width: 185px;\
							background-size: 100% auto;\
							background-position: center;\
						}'
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}

function styleOldReddit() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = "#re-main {\
							display: flex;\
							width: 100%;\
							justify-content: center;\
						}\
						#re-container {\
							display: flex;\
							width: 100%;\
						}\
						#re-container.re-resize {\
							width: var(--re-content-width) !important;\
						}\
						#re-main .listing-chooser {\
							position: absolute !important;\
							top: 70px !important;\
							z-index: 10;\
						}\
						#header {\
							position: sticky !important;\
							top: 0 !important;\
						}\
						#header-bottom-right {\
							display: flex;\
						}\
						#re-container .content {\
							width: 100% !important;\
						}\
						#header a, #header span {\
							color: #369;\
						}"
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}

function styleOther() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = ".re-to-top-button:hover, .re-all-button:hover {\
							cursor: pointer;\
						}\
						.re-sidemenu-feed-top a:hover {\
							background-color: var(--newCommunityTheme-menuButtonBackground-hover);\
						}\
						.re-to-top-button {\
							display: flex;\
							align-items: center;\
							width: 40px;\
						}\
						.re-to-top-button span {\
							color: inherit;\
							font-size: inherit;\
						}"
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}

function styleScrollText() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = '.re-text-scroll div[data-click-id="text"][style="max-height: 250px;"], .re-text-scroll div[data-click-id="text"][style="max-height:250px"] {\
							overflow-y: scroll;\
							mask-image: linear-gradient(180deg,#000 90%,transparent)\
						}'
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}

function styleVideoPlayer() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = ".video-js .vjs-big-play-button,\
						.video-js:hover .vjs-big-play-button,\
						.video-js .vjs-big-play-button:focus {\
							border: 0 !important;\
							background-color: rgba(26, 26, 27, 0.7) !important;\
							border-radius: 50% !important;\
							line-height: 2em !important;\
							height: 2em !important;\
							width: 2em !important;\
							color: #ff4500 !important;\
							margin-top: -1.5em !important;\
							margin-left: -1em !important;\
						}\
						.video-js .vjs-play-progress {\
							background-color: #ff4500 !important;\
						}\
						.video-js .vjs-control-bar {\
							background-color: rgba(26, 26, 27, 0.7) !important;\
						}"
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleImageOptions() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = '.re-fit-image .ImageBox-image {\
							height: 100%;\
						}\
						.re-fit-image figure > div {\
							height:inherit;\
						}\
						.re-fit-image figure a > div {\
							height:inherit;\
						}\
						.re-fit-image figure img {\
							width: 100%;\
							height: 100%;\
							object-fit: contain;\
							overflow: hidden;\
						}\
						.re-image-scroll .media-element div:first-child {\
							overflow-y: scroll;\
						}\
						.re-image-scroll figure div:first-child {\
							overflow-y: scroll;\
							height: 100%;\
						}\
						.re-hide-see-full-image .media-element div:last-child {\
							display: none;\
						}'
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleStickySort() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = ".re-sticky-sort {\
							position: sticky;\
							top: 48px;\
							z-index: 99;\
						}"
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleDropShadow() {
	// Create new style element
	const boxShadow = "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
	const style = document.createElement('style');
	style.textContent = '.re-drop-shadow {\
							box-shadow: '+boxShadow+';\
						}\
						.re-drop-shadow-children > div {\
							box-shadow: '+boxShadow+';\
						}\
						.re-feed-container {\
							box-shadow: none !important;\
						}'
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleHide() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = '.re-hide {\
							display: none !important;\
						}\
						.re-invisible {\
							visibility: hidden !important;\
						}'
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleResize() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = '.re-feed.re-resize {\
							width: var(--re-content-width);\
							max-width: var(--re-content-width);\
						}\
						.re-feed.re-resize > div {\
							width: 100%;\
							max-width: 100%;\
						}\
						.re-search.re-resize {\
							min-width: calc(var(--re-content-width) - 48px) !important;\
							max-width: calc(var(--re-content-width) - 48px) !important;\
						}\
						.re-search-parent.re-resize {\
							min-width: 100%;\
							margin: 0;\
						}\
						.re-post-container.re-resize {\
							width: 100% !important;\
							max-width: 100% !important;\
						}\
						.re-post-container.re-resize .Comment div:nth-child(3) {\
							max-width: 100% !important;\
						}\
						.re-resize [data-test-id="post-content"] [data-click-id="text"] {\
							max-width: 100% !important;\
						}\
						.re-centre-container-old {\
							transform: translateX(182px);\
						}'
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleHideGap() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = ".re-feed.re-hide-gap {\
							padding: 0;\
						}\
						.re-feed.re-hide-gap div > div {\
							border-radius: 0;\
							margin-top: 0;\
						}\
						.re-feed.re-hide-gap > div {\
							margin-left: 0 !important;\
						}\
						.feed-container.re-hide-gap {\
							padding: 0;\
						}\
						.re-sidebar.re-hide-gap > div {\
							margin: 0;\
						}\
						.re-sidebar.re-hide-gap div {\
							border-radius: 0;\
						}\
						.re-sidebar.re-hide-gap > div > div {\
							margin-top: 0 !important;\
						}\
						.re-sort.re-hide-gap, .re-create-post.re-hide-gap {\
							margin: 0;\
						}\
						.re-search.re-hide-gap {\
							padding: 0;\
						}\
						.re-search-sidebar.re-hide-gap {\
							margin-left: 0;\
						}\
						.re-posts-list.re-hide-gap div {\
							border-radius: 0;\
						}\
						.re-search-results-nav.re-hide-gap {\
							margin: 10px 10px 2px 10px;\
						}\
						.re-search-results-subnav.re-hide-gap {\
							margin: 0 10px 0 10px;\
							display: flex;\
							justify-content: center;\
						}\
						.re-post-container.re-hide-gap {\
							max-width: 100% !important;\
						}"
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}


function styleLayoutCentre() {
	// Create new style element
	const style = document.createElement('style');
	style.textContent = ".re-feed.re-centre-feed-1 {\
							translate: 168px;\
						}\
						.re-feed.re-centre-feed-2 {\
							translate: 34px;\
						}\
						.re-feed.re-centre-feed-3 {\
							translate: -136px;\
						}"
	// Append style element to the head
	document.head.insertBefore(style, document.head.firstChild);
}
