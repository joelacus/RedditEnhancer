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
function restoreBackup(json) {
	var validKeys = [];
	for (var key in json) {
		if (
			[
				'addonTheme',
				'alwaysShowPostOptions',
				'alwaysShowRisingButton',
				'autoCollapseAutoModeratorComment',
				'autoExpandComments',
				'autoExpandValue',
				'autoRedirectVersion',
				'bgBlur',
				'bionicReaderComments',
				'bionicReaderPosts',
				'bionicReaderFontColour',
				'bionicReaderFontColourCSS',
				'bionicReaderBgColour',
				'bionicReaderBgColourCSS',
				'breakReminder',
				'breakReminderFrequency',
				'commentsLimit',
				'customBackground',
				'customBackgrounds',
				'darkMode',
				'darkModeAuto',
				'darkModeTimeEnd',
				'darkModeTimeStart',
				'defaultCommentsSortOption',
				'defaultFeedSortOption',
				'dragImageToResize',
				'dragImageToResizeInitialSize',
				'enableDefaultCommentsSortOption',
				'enableDefaultFeedSortOption',
				'expandLayout',
				'expandLayoutWidth',
				'expandPostOverlayWidth',
				'expandPostWidth',
				'expandSubWidth',
				'expandUserProfileWidth',
				'fitImage',
				'hideAdvertiseButton',
				'hideChatButton',
				'hideCreatePost',
				'hideCreatePostButton',
				'hideGap',
				'hideGetNewReddit',
				'hideHeaderBar',
				'hideHeaderSubBar',
				'hideHomeSidebar',
				'hideKarma',
				'hideModerationButton',
				'hideNSFW',
				'hideNotificationButton',
				'hideOriginalScrollToTop',
				'hidePopularButton',
				'hidePostHiddenMessage',
				'hidePostOverlaySidebar',
				'hidePostSidebar',
				'hidePromoted',
				'hideRedditPremium',
				'hideRelatedPostsSection',
				'hideSeeFullImage',
				'hideSideMenu',
				'hideSideMenuCommunitiesSection',
				'hideSideMenuModerationSection',
				'hideSideMenuOld',
				'hideSideMenuRecentSection',
				'hideSideMenuResourcesSection',
				'hideSideMenuTopSection',
				'hideSidebarPolicy',
				'hideSubSidebar',
				'hideSubSidebarExceptionMode',
				'hideSubSidebarExceptionSubList',
				'hideSubSidebarExceptionsEnable',
				'hideTurnOnNotificationsPopup',
				'hideUserProfilePics',
				'hideUserSidebar',
				'hideUsername',
				'imageScroll',
				'imageScrollMaxImageWidth',
				'justOpenTheImage',
				'language',
				'largerClassicPost',
				'layoutCentre',
				'layoutOffset',
				'layoutPostOffset',
				'layoutSubOffset',
				'layoutUserProfileOffset',
				'limitInfinityScroll',
				'moderniseOldReddit',
				'newPlayer',
				'nonStickyHeaderBar',
				'openPostInNewTab',
				'openSubInNewTab',
				'overrideDropShadow',
				'overrideDropShadowCSS',
				'postClassicHeight',
				'postTitleFontSize',
				'postContentFontSize',
				'postCommentsFontSize',
				'postHeight',
				'postHeightSize',
				'redditVersion',
				'removePageSideMargin',
				'scalePostToFitImage',
				'scalePostToFitImageMaxImageWidth',
				'scrollToNextRootComment',
				'scrollToNextRootCommentPosition',
				'scrollToNextRootCommentPositionV',
				'shadows',
				'showAllButton',
				'showControversialSortButton',
				'showPostAuthor',
				'showPostFlair',
				'showPostNumbers',
				'showScrollToNextRootComment',
				'showToTopButton',
				'sidemenuFeedTop',
				'stickySort',
				'textPostScroll',
				'themeBlur',
				'themeCreatePostBackgroundColour',
				'themeCreatePostBackgroundColourCSS',
				'themeCreatePostBorderColour',
				'themeCreatePostBorderColourCSS',
				'themeExceptionMode',
				'themeExceptionSubList',
				'themeExceptionsEnable',
				'themeHeaderBackgroundColour',
				'themeHeaderBackgroundColourCSS',
				'themeHeaderTextColour',
				'themeHeaderTextColourCSS',
				'themePostBackgroundColour',
				'themePostBackgroundColourCSS',
				'themePostBorderColour',
				'themePostBorderColourCSS',
				'themePostTextColour1',
				'themePostTextColour1CSS',
				'themePostTextColour2',
				'themePostTextColour2CSS',
				'themePostVisitedTitleColour',
				'themePostVisitedTitleColourCSS',
				'themePostCommentsTextColour1',
				'themePostCommentsTextColour1CSS',
				'themePostCommentsTextColour2',
				'themePostCommentsTextColour2CSS',
				'themeSortBackgroundColour',
				'themeSortBackgroundColourCSS',
				'themeSortBorderColour',
				'themeSortBorderColourCSS',
				'themeSortTextColour',
				'themeSortTextColourCSS',
				'themeSortTextColour2',
				'themeSortTextColour2CSS',
				'useCustomBackground',
				'themeSidebarTextColour',
				'themeSidebarTextColourCSS',
				'themeSidebarBgColour',
				'themeSidebarBgColourCSS',
				'themeSidebarBorderColour',
				'themeSidebarBorderColourCSS',
				'themeSidemenuTextColour',
				'themeSidemenuTextColourCSS',
				'themeSidemenuBgColour',
				'themeSidemenuBgColourCSS',
				'menuOrder',
			].includes(key)
		) {
			validKeys.push(key);
		}
	}
	// Keep only valid keys
	Object.keys(json).forEach((key) => validKeys.includes(key) || delete json[key]);

	// Send json data to background.js to save to storage.sync
	BROWSER_API.runtime.sendMessage({ restore: json });

	// Hide file inputs and show 'done'
	document.querySelector('.main').style.display = 'none';
	document.querySelector('.done').style.display = 'flex';
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
