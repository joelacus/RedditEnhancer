import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

// Import via button
let form = document.querySelector('#import-backup');
let file = document.querySelector('#backup-file');
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
	event.preventDefault();
	if (!file.value.length) return; // If there's no file, do nothing
	let reader = new FileReader(); // Create a new FileReader() object
	reader.onload = checkFile; // Setup the callback event to run when the file is read
	reader.readAsText(file.files[0]); // Read the file
}

// Disable drag/drop on body
document.body.addEventListener('dragover', function (event) {
	event.preventDefault();
});
document.body.addEventListener('drop', function (event) {
	event.preventDefault();
});

// Import via drag/drop
let dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragenter', handleDragEnter, false);
dropArea.addEventListener('dragleave', handleDragLeave, false);
dropArea.addEventListener('dragover', handleDragOver, false);
dropArea.addEventListener('drop', handleDrop, false);

function handleDragEnter(e) {
	e.preventDefault();
	e.stopPropagation();
	document.querySelector('#drop-area').classList.remove('highlight');
	document.querySelector('#drop-area').classList.add('highlight');
}

function handleDragLeave(e) {
	e.preventDefault();
	e.stopPropagation();
	document.querySelector('#drop-area').classList.remove('highlight');
}

function handleDragOver(e) {
	e.preventDefault();
	e.stopPropagation();
	document.querySelector('#drop-area').classList.remove('highlight');
	document.querySelector('#drop-area').classList.add('highlight');
}

function handleDrop(e) {
	e.preventDefault();
	e.stopPropagation();
	let dt = e.dataTransfer;
	let files = dt.files;
	handleFiles(files);
}

function handleFiles(files) {
	[...files].forEach(function (file) {
		window.inputFile = file;
		if (file.type === 'application/json') {
			let reader = new FileReader();
			reader.onload = checkDroppedFile;
			reader.readAsText(file);
		} else {
			document.querySelector('#dropped-file-name').textContent = 'Invalid File';
			document.querySelector('#drop-area').classList.remove('highlight');
			document.querySelector('#drop-area').classList.remove('green');
			document.querySelector('#drop-area').classList.add('red');
			document.querySelector('#restore-backup').setAttribute('disabled', 'disabled');
		}
	});
}

// Import via button file check
function checkFile(event) {
	let str = event.target.result;
	let json = JSON.parse(str);
	const file = json.file;
	if (file === 'RedditEnhancer_backup') {
		console.log('backup file ok');
		document.querySelector('.form-container').classList.remove('red');
		document.querySelector('.form-container').classList.add('green');
		document.querySelector('#restore-backup').removeAttribute('disabled');
		window.jsonData = json;
	} else {
		console.log('bad file');
		document.querySelector('.form-container').classList.remove('green');
		document.querySelector('.form-container').classList.add('red');
		document.querySelector('#restore-backup').setAttribute('disabled', 'disabled');
	}
}

function checkDroppedFile(event) {
	let str = event.target.result;
	let json = JSON.parse(str);
	const file = json.file;
	if (file === 'RedditEnhancer_backup') {
		console.log('backup file ok');
		if (typeof inputFile != 'undefined') {
			const name = inputFile.name;
			document.querySelector('#dropped-file-name').textContent = name;
			document.querySelector('#drop-area').classList.remove('highlight');
			document.querySelector('#drop-area').classList.remove('red');
			document.querySelector('#drop-area').classList.add('green');
			window.jsonData = json;
		}
		document.querySelector('#restore-backup').removeAttribute('disabled');
	} else {
		console.log('bad file');
		document.querySelector('#dropped-file-name').textContent = 'Invalid File';
		document.querySelector('#drop-area').classList.remove('highlight');
		document.querySelector('#drop-area').classList.remove('green');
		document.querySelector('#drop-area').classList.add('red');
		document.querySelector('#restore-backup').setAttribute('disabled', 'disabled');
	}
}

// Restore button
document.querySelector('#restore-backup').addEventListener('click', function () {
	restoreBackup(jsonData);
});

// Restore Backup
async function restoreBackup(json) {
	var validKeys = [];
	for (var key in json) {
		if (
			[
				'addonTheme',
				'addProfilePicturesToComments',
				'alwaysShowPostOptions',
				'alwaysShowRisingButton',
				'autoCollapseAutoModeratorComment',
				'autoExpandComments',
				'autoExpandValue',
				'autoRedirectVersion',
				'autoLoadMoreComments',
				'betterCommentBox',
				'bgBlur',
				'bionicReaderBgColour',
				'bionicReaderBgColourCSS',
				'bionicReaderComments',
				'bionicReaderFontColour',
				'bionicReaderFontColourCSS',
				'bionicReaderPosts',
				'borderRadiusAmount',
				'breakReminder',
				'breakReminderFrequency',
				'classicOldUI',
				'commentsLimit',
				'compactHeaderSideMenu',
				'compactPostLinkPreview',
				'compactSubRuleList',
				'createPostBodyFontSize',
				'createPostTitleFontSize',
				'customBackground',
				'customBackgrounds',
				'customFonts',
				'customHeaderLogo',
				'customHeaderLogoUrl',
				'darkMode',
				'darkModeAuto',
				'darkModeTimeEnd',
				'darkModeTimeStart',
				'defaultCommentsSortOption',
				'defaultFeedSortOption',
				'defaultHomeFeedSortOption',
				'dragImageToResize',
				'dragImageToResizeInitialSize',
				'enableDefaultCommentsSortOption',
				'enableDefaultFeedSortOption',
				'enableHideBlockedKeywordPosts',
				'expandCustomFeedWidth',
				'expandLayout',
				'expandLayoutWidth',
				'expandPostOverlayWidth',
				'expandPostWidth',
				'expandSubWidth',
				'expandTopicFeedWidth',
				'expandUserProfileWidth',
				'feedPostContentFontSize',
				'feedPostContentFontWeight',
				'feedPostTitleFontSize',
				'feedPostTitleFontWeight',
				'fullWidthBanner',
				'hideAdvertiseButton',
				'hideBlockedKeywordPosts',
				'hideBlockedKeywordPostsList',
				'hideBlurredMediaBackground',
				'hideChatButton',
				'hideCommunityHighlights',
				'hideCommunityStatus',
				'hideCompactViewBlankThumbnails',
				'hideCompactViewThumbnails',
				'hideCreatePostButton',
				'hideCustomFeedSidebar',
				'hideGap',
				'hideGetNewReddit',
				'hideHeaderBar',
				'hideHeaderSubBar',
				'hideHomeFeed',
				'hideHomeSidebar',
				'hideJoinButtonOnPosts',
				'hideKarma',
				'hideModerationButton',
				'hideNotificationButton',
				'hideNSFW',
				'hideNsfwInSearchResults',
				'hidePostBackButton',
				'hidePostBrandAwarenessOption',
				'hidePostDeleteOption',
				'hidePostDivider',
				'hidePostEditOption',
				'hidePostHiddenMessage',
				'hidePostHideOption',
				'hidePostKarma',
				'hidePostNotificationOption',
				'hidePostNsfwOption',
				'hidePostReportOption',
				'hidePostSaveOption',
				'hidePostSidebar',
				'hidePostSpoilerOption',
				'hidePromoted',
				'hideRecentPosts',
				'hideRecommended',
				'hideRedditPremium',
				'hideRelatedPostsSection',
				'hideSearchSidebar',
				'hideSearchSidebarNsfwUsers',
				'hideSideMenu',
				'hideSideMenuCommunitiesSection',
				'hideSideMenuCustomFeedsSection',
				'hideSideMenuFavouriteButton',
				'hideSideMenuModerationSection',
				'hideSideMenuOld',
				'hideSideMenuRecentSection',
				'hideSideMenuResourcesSection',
				'hideSideMenuTopicsSection',
				'hideSideMenuTopSection',
				'hideSubSidebar',
				'hideSubSidebarExceptionMode',
				'hideSubSidebarExceptionsEnable',
				'hideSubSidebarExceptionSubList',
				'hideTrendingTodayInSearchResults',
				'hideUsername',
				'hideUserProfilePics',
				'hideUserSidebar',
				'hideVideoRecommendations',
				'imageScroll',
				'justOpenTheImage',
				'language',
				'largerClassicPost',
				'layoutCentre',
				'layoutOffset',
				'layoutPostOffset',
				'layoutSearchPageOffset',
				'layoutSubOffset',
				'layoutUserProfileOffset',
				'leftSideVoteButtons',
				'limitInfinityScroll',
				'markReadOnOpenExpandos',
				'maxImagePostHeight',
				'maxImageWidth',
				'maxVideoPostHeight',
				'maxVideoWidth',
				'menuOrder',
				'moderniseOldReddit',
				'multicolouredThreadLines',
				'newPlayer',
				'nonStickyHeaderBar',
				'openPostInNewTab',
				'openSubInNewTab',
				'overrideDropShadow',
				'overrideDropShadowCSS',
				'postClassicHeight',
				'postCommentsFontSize',
				'postCommentsFontWeight',
				'postContentFontSize',
				'postContentFontWeight',
				'postHeight',
				'postHeightSize',
				'postSeparatorHeight',
				'postTableBorderColour',
				'postTitleFontSize',
				'postTitleFontWeight',
				'redditVersion',
				'rememberSideMenuSectionHiddenState',
				'rememberSideMenuSectionHiddenStateValues',
				'replacePostImagesWithLinks',
				'replacePostVideosWithLinks',
				'resizeMainContainer',
				'resizeMainContainerWidth',
				'rightSidePostThumbnails',
				'scalePostToFitImage',
				'scalePostToFitVideo',
				'scrollToNextRootComment',
				'scrollToNextRootCommentPosition',
				'shadows',
				'showAllButton',
				'showControversialSortButton',
				'showPostAuthor',
				'showPostFlair',
				'showPostNumbers',
				'showToTopButton',
				'sidebarToggleButton',
				'sidemenuFeedTop',
				'sideMenuIconsOnly',
				'sideMenuToggleButton',
				'sideMenuToggleButtonHiddenState',
				'sideMenuWidth',
				'stickySort',
				'subredditDisplayNameBanner',
				'textPostScroll',
				'textPostPreviewFade',
				'textPostPreviewFadeHeight',
				'textPostPreviewMaxHeight',
				'themeBlur',
				'themeCodeBlockColourCSS',
				'themeCreatePostBackgroundColour',
				'themeCreatePostBackgroundColourCSS',
				'themeCreatePostBorderColour',
				'themeCreatePostBorderColourCSS',
				'themeExceptionMode',
				'themeExceptionsEnable',
				'themeExceptionSubList',
				'themeHeaderBackgroundColour',
				'themeHeaderBackgroundColourCSS',
				'themeHeaderTextColour',
				'themeHeaderTextColourCSS',
				'themePostBackgroundColour',
				'themePostBackgroundColourCSS',
				'themePostBorderColour',
				'themePostBorderColourCSS',
				'themePostCommentsTextColour1',
				'themePostCommentsTextColour1CSS',
				'themePostCommentsTextColour2',
				'themePostCommentsTextColour2CSS',
				'themePostTextColour1',
				'themePostTextColour1CSS',
				'themePostTextColour2',
				'themePostTextColour2CSS',
				'themePostUpvoteColour',
				'themePostUpvoteColourCSS',
				'themePostVisitedTitleColour',
				'themePostVisitedTitleColourCSS',
				'themeSearchbarBgColour',
				'themeSearchbarBgColourCSS',
				'themeSearchbarDropdownBgColour',
				'themeSearchbarDropdownBgColourCSS',
				'themeSidebarBgColour',
				'themeSidebarBgColourCSS',
				'themeSidebarBorderColour',
				'themeSidebarBorderColourCSS',
				'themeSidebarTextColour',
				'themeSidebarTextColourCSS',
				'themeSidemenuBgColour',
				'themeSidemenuBgColourCSS',
				'themeSidemenuButtonHoverColour',
				'themeSidemenuButtonHoverColourCSS',
				'themeSidemenuTextColour',
				'themeSidemenuTextColourCSS',
				'themeSortBackgroundColour',
				'themeSortBackgroundColourCSS',
				'themeSortBorderColour',
				'themeSortBorderColourCSS',
				'themeSortTextColour',
				'themeSortTextColour2',
				'themeSortTextColour2CSS',
				'themeSortTextColourCSS',
				'underlineLinks',
				'useCustomBackground',
				'usernameHoverPopupDelay',
				'viewCrossposts',
				'attachSideMenuHeader',
				'optOutAttachSideMenu',
			].includes(key)
		) {
			validKeys.push(key);
		}
	}
	// Keep only valid keys
	Object.keys(json).forEach((key) => validKeys.includes(key) || delete json[key]);

	// Chunkify json
	function splitObjectIntoChunks(obj, chunkSize) {
		const keys = Object.keys(obj);
		const numChunks = Math.ceil(keys.length / chunkSize);
		const result = [];
		for (let i = 0; i < numChunks; i++) {
			const start = i * chunkSize;
			const end = start + chunkSize;
			const chunkKeys = keys.slice(start, end);
			const chunk = {};
			chunkKeys.forEach((key) => {
				chunk[key] = obj[key];
			});
			result.push(chunk);
		}
		return result;
	}
	// Send json data to background.js to save to storage.sync
	if (Object.keys(json).length > 120) {
		document.querySelector('.main').style.display = 'none';
		document.querySelector('.restoring').style.display = 'flex';
		const count = Object.keys(json).length;
		document.querySelector('#item-count').textContent = count;
		console.log('config items (' + count + ') exceeds 120. config will be chunkified');
		const result = splitObjectIntoChunks(json, 120);
		// restore first chunk
		function restoreChunk1() {
			BROWSER_API.runtime.sendMessage({ restore: result[0] }).then((response) => {
				if (response.success === true) {
					restoreChunk2();
				} else {
					console.error('Error:', response);
					setTimeout(() => {
						restoreChunk1();
					}, 60000);
				}
			});
		}
		restoreChunk1();
		// restore second chunk
		function restoreChunk2() {
			setTimeout(() => {
				console.log('please wait 60 seconds');
			}, 1000);
			// update countdown timer
			let seconds = 60;
			const timerElement = document.querySelector('#timer');
			function updateTimer() {
				seconds--;
				timerElement.textContent = seconds;
				if (seconds === 0) {
					clearInterval(timerInterval);
				}
			}
			const timerInterval = setInterval(updateTimer, 1000);

			setTimeout(() => {
				BROWSER_API.runtime.sendMessage({ restore: result[1] }).then((response) => {
					if (response.success === true) {
						backupFinished();
					} else {
						console.error('Error:', response);
						setTimeout(() => {
							restoreChunk2();
						}, 60000);
					}
				});
			}, 60000);
		}
	} else {
		BROWSER_API.runtime.sendMessage({ restore: json });
		backupFinished();
	}

	// Hide file inputs and show 'done'
	function backupFinished() {
		document.querySelector('.main').style.display = 'none';
		document.querySelector('.restoring').style.display = 'none';
		document.querySelector('.done').style.display = 'flex';
		console.log('done');
	}
}

// Get Language
const url = window.location.href;
const searchParams = new URLSearchParams(url);
const lang = searchParams.get('lang');
init_i18n(lang);

// Init Translation
function init_i18n(lang) {
	i18next
		.use(HttpBackend)
		.init({
			lng: lang,
			fallbackLng: 'en',
			backend: {
				loadPath: '/_locales/{{lng}}/messages.json',
			},
		})
		.then(() => {
			translate();
		});
}

// Translate based on selected language
function translate() {
	document.querySelectorAll('[data-lang]').forEach(function (item) {
		const text = item.getAttribute('data-lang');
		item.textContent = i18next.t(text + '.message');
	});
}

// Add an event listener to the file input element
const fileInput = document.getElementById('backup-file');
const fileLabel = document.getElementById('file-label');
fileInput.addEventListener('change', function () {
	// Get the selected file name
	const fileName = this.files[0].name;

	// Update the label text with the selected file name
	fileLabel.textContent = fileName;
});
