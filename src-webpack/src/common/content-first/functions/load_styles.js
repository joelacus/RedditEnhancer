// Load styles into the document head for tweaked elements

export function loadStyles() {
	// Remove any existing main stylesheets
	const dynamicStyleElements = document.querySelectorAll('style[id="re-styles"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});

	// Create new style element
	const styleElement = document.createElement('style');
	styleElement.id = 're-styles';
	styleElement.textContent =
		styleHide +
		styleLayoutCentre +
		styleOther +
		styleScrollText +
		styleOldReddit +
		stylePagination +
		styleLoadMore +
		styleScrollToComment +
		stylePostNumber +
		styleBionicReader +
		styleBreakReminder +
		styleShowPostAuthor +
		layoutOffset;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

const layoutOffset = `
					shreddit-app[routename="frontpage"] #main-content,
					shreddit-app[routename="all"] #main-content,
					shreddit-app[routename="popular"] #main-content {
						transform: translateX(var(--re-layout-offset))
					}
					shreddit-app[routename="subreddit"] #main-content {
						transform: translateX(var(--re-layout-sub-offset))
					}
					shreddit-app[routename="post_page"] #main-content,
					shreddit-app[routename="profile_post_page"] #main-content {
						transform: translateX(var(--re-layout-post-offset))
					}
					shreddit-app[routename="profile_overview"] #main-content {
						transform: translateX(var(--re-layout-user-profile-offset))
					}`;

const styleShowPostAuthor = `
							shreddit-post .re-post-author {
								color: var(--color-neutral-content-weak);
								font-weight: 600;
							}
							shreddit-post .hover-card {
								display: none;
								position: absolute;
								width: 290px;
								height: fit-content;
								font: var(--font-12-16-semibold);
								background-color: var(--color-tooltip-bg-neutral);
								color: var(--color-tooltip-text-neutral);
								border-radius: var(--radius-md);
								box-shadow: 0var(--boxshadow-tooltip);
								padding: 0.5rem;
								z-index: 999;
							}
							shreddit-post .hover-card img {
								border-radius: 50%;
								width: auto;
								height: 60px;
							}
							shreddit-post .hover-card .button {
								text-decoration: none;
							}`;

const styleBreakReminder = `
							.re-break-reminder {
								display: flex;
								align-items: center;
								justify-content: center;
								height: 300px;
								font-size: 24px;
							}`;

const styleBionicReader = `.re-bold {
								font-weight: bold !important;
							}
							.re-hide {
								display: none !important;
							}
							.re-bionic-modified-comments {
								margin-top: 0;
							}`;

const stylePostNumber = `.re-post-number {
							margin-top: 8px;
						}`;

const styleScrollToComment = `.re-scroll-to-comment-container {
								position: fixed;
								top: calc(50% - 32px);
								top: calc(var(--re-scroll-to-root-comment-position-v) - 32px);
								left: 48px;
								left: var(--re-scroll-to-root-comment-position);
								display: flex;
								flex-direction: column;
								grid-gap: 8px;
								z-index: 9999;
							}
							#re-next-comment,#re-prev-comment {
								cursor: pointer;
								padding: 4px;
								border-radius: 2px;
								background-color: rgba(0,0,0,0.4);
								color: #fff;
								height: 22px;
							}
							#re-next-comment:before {
								content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512"><path opacity="1" fill="white" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>');
							}
							#re-prev-comment:before {
								content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512"><path opacity="1" fill="white" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>');
							}
							#re-next-comment:hover ,#re-prev-comment:hover {
								background-color: rgba(0,0,0,0.6);
							}`;

const styleLoadMore = `.re-load-more {
							width: 100%;
							height: 30px;
							text-align: center;
							margin-top: 30px;
						}
						.re-load-more:hover {
							text-decoration: underline;
						}`;

const stylePagination = `.re-post.hide {
							display: none;
						}`;

const styleOldReddit = `#re-main .listing-chooser {
							position: absolute !important;
							top: 70px !important;
							z-index: 10;
						}
						#header-bottom-right {
							display: flex;
						}
						#header a, #header span {
							color: #369;
						}`;

const styleOther = `.re-to-top-button:hover, .re-all-button:hover {
						cursor: pointer;
					}
					.re-sidemenu-feed-top a:hover {
						background-color: var(--newCommunityTheme-menuButtonBackground-hover);
					}
					.re-to-top-button {
						display: flex;
						align-items: center;
						width: 40px;
					}
					.re-to-top-button span {
						color: inherit;
						font-size: inherit;
					}
					.re-sort {
						position: relative;
					}
					.re-sidebar-sub {
						width: 312px !important;
					}
					#overlayScrollContainer .undefined {
						min-width: 16px
					}`;

const styleScrollText = `.re-text-scroll div[data-click-id="text"][style="max-height: 250px;"], .re-text-scroll div[data-click-id="text"][style="max-height:250px"] {
							overflow-y: auto;
							mask-image: linear-gradient(180deg,#000 90%,transparent)
						}`;

const styleHide = `.re-hide {
						display: none !important;
					}
					.re-invisible {
						visibility: hidden !important;
					}`;

const styleLayoutCentre = `.re-feed.re-centre-feed-1 {
								translate: 168px;
							}
							.re-feed.re-centre-feed-2 {
								translate: 34px;
							}
							.re-feed.re-centre-feed-3 {
								translate: -136px;
							}`;
