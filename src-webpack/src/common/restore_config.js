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
		console.log('[RedditEnhancer] Backup file loaded');
		document.querySelector('.form-container').classList.remove('red');
		document.querySelector('.form-container').classList.add('green');
		document.querySelector('#restore-backup').removeAttribute('disabled');
		window.jsonData = json;
	} else {
		console.log('[RedditEnhancer] Invalid backup file');
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
		console.log('[RedditEnhancer] Backup file loaded');
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
		console.log('[RedditEnhancer] Invalid backup file');
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
				'addDownloadVideoButton',
				'addDropShadow',
				'addonTheme',
				'addProfilePicturesToComments',
				'alwaysShowCommentOptions',
				'alwaysShowPostOptions',
				'attachSideMenuHeader',
				'autoCollapseAutoModeratorComment',
				'autoExpandValue',
				'autoLoadMoreComments',
				'autoLoadMoreCommentsDownvotedOnly',
				'autoplayCommentGifs',
				'autoplayGifs',
				'autoplayVideos',
				'autoRedirectVersion',
				'betterCommentBox',
				'bgBlur',
				'bionicReaderBgColour',
				'bionicReaderBgColourCSS',
				'bionicReaderComments',
				'bionicReaderFontColour',
				'bionicReaderFontColourCSS',
				'bionicReaderPosts',
				'borderRadiusAmount',
				'cannedMessages',
				'cannedMessagesList',
				'classicOldUI',
				'cleanLink',
				'commentAbsoluteTimestampFormat',
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
				'defaultCommentsSortOption',
				'defaultFeedSortOption',
				'defaultHomeFeedSortOption',
				'enableDefaultCommentsSortOption',
				'enableDefaultFeedSortOption',
				'expandCustomFeedWidth',
				'expandLayout',
				'expandLayoutWidth',
				'expandPostWidth',
				'expandSubWidth',
				'expandTopicFeedWidth',
				'expandUserProfileWidth',
				'feedPostContentFontSize',
				'feedPostContentFontWeight',
				'feedPostTitleFontSize',
				'feedPostTitleFontWeight',
				'forceDarkMode',
				'forceShowVoteButtons',
				'fullWidthBanner',
				'fullWidthExpandos',
				'galleryKeyboardNavigation',
				'hideAdvertiseButton',
				'hideAiInSearch',
				'hideAnnouncementNotifications',
				'hideAwards',
				'hideBlockedKeywordPosts',
				'hideBlockedKeywordPostsList',
				'hideBlockedLinkPosts',
				'hideBlockedLinkPostsList',
				'hideBlockedUserPosts',
				'hideBlockedUserPostsList',
				'hideBlockedSubredditPosts',
				'hideBlockedSubredditPostsList',
				'hideBlockedKeywordComments',
				'hideBlockedKeywordCommentsList',
				'hideBlurredMediaBackground',
				'hideChatButton',
				'hideCommentAwardOption',
				'hideCommentFollowOption',
				'hideCommentReportOption',
				'hideCommentSaveOption',
				'hideCommentShareOption',
				'hideCommunityHighlights',
				'hideCommunityStatus',
				'hideCompactViewBlankThumbnails',
				'hideCompactViewThumbnails',
				'hideCreatePostButton',
				'hideCustomFeedSidebar',
				'hideGamificationNotifications',
				'hideGap',
				'hideGetAppButton',
				'hideGetNewReddit',
				'hideHeaderBar',
				'hideHeaderSubBar',
				'hideHomeFeed',
				'hideHomeSidebar',
				'hideJoinButtonOnPosts',
				'hideJoinConversation',
				'hideKarma',
				'hideLogoInSearch',
				'hideModerationButton',
				'hideNotificationButton',
				'hideNSFW',
				'hideNsfwInSearchResults',
				'hidePageFooter',
				'hidePostBackButton',
				'hidePostBrandAwarenessOption',
				'hidePostComments',
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
				'hideRelatedCommunities',
				'hideRelatedPostsSection',
				'hideSearchSidebar',
				'hideSearchSidebarNsfwUsers',
				'hideSideMenu',
				'hideSideMenuCommunitiesSection',
				'hideSideMenuCustomFeedsSection',
				'hideSideMenuFavouriteButton',
				'hideSideMenuGamesSection',
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
				'hideUsernameInSubSidebar',
				'hideUserProfilePics',
				'hideUserSidebar',
				'hideVideoRecommendations',
				'highlightOp',
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
				'markPostAsReadButton',
				'markReadOnOpenExpandos',
				'maxImagePostHeight',
				'maxImageWidth',
				'maxVideoPostHeight',
				'maxVideoWidth',
				'menuOrder',
				'moderniseOldReddit',
				'moderniseOldRedditLight',
				'multicolouredThreadLines',
				'nonStickyHeaderBar',
				'numberedPostImages',
				'openPostInNewTab',
				'openSubInNewTab',
				'optOutAttachSideMenu',
				'overrideDropShadow',
				'overrideDropShadowCSS',
				'postAbsoluteTimestampFormat',
				'postClassicHeight',
				'postCommentsFontSize',
				'postCommentsFontWeight',
				'postContentFontSize',
				'postContentFontWeight',
				'postSeparatorHeight',
				'postTableBorderColour',
				'postTitleFontSize',
				'postTitleFontWeight',
				'redditVersion',
				'rememberSideMenuSectionHiddenState',
				'rememberSideMenuSectionHiddenStateValues',
				'removeCommentButtonIcons',
				'replacePostImagesWithLinks',
				'replacePostImagesWithLinksHome',
				'replacePostImagesWithLinksSubreddits',
				'replacePostVideosWithLinks',
				'replaceSearchPlaceholderText',
				'resizeMainContainerWidth',
				'rightSidePostThumbnails',
				'scalePostToFitImage',
				'scalePostToFitVideo',
				'scrollToNextRootComment',
				'scrollToNextRootCommentPosition',
				'scrollToPost',
				'shortenCleanLink',
				'showCommentAbsoluteTimestamp',
				'showCommunitiesFilter',
				'showPostAbsoluteTimestamp',
				'showPostAuthor',
				'showPostFlair',
				'showPostNumbers',
				'showToTopButton',
				'showToTopButtonFloat',
				'sidebarToggleButton',
				'sideMenuIconsOnly',
				'sideMenuToggleButton',
				'sideMenuToggleButtonHiddenState',
				'sideMenuWidth',
				'snapSidebar',
				'solidColourBackground',
				'solidColourBackgroundCSS',
				'stickySort',
				'subredditDisplayNameBanner',
				'textPostPreviewFade',
				'textPostPreviewFadeHeight',
				'textPostPreviewMaxHeight',
				'themeBlur',
				'themeCodeBlockColourCSS',
				'themeExceptionMode',
				'themeExceptionsEnable',
				'themeExceptionSubList',
				'themeHeaderBackgroundColour',
				'themeHeaderBackgroundColourCSS',
				'themeHeaderTextColour',
				'themeHeaderTextColourCSS',
				'themeOpCommentHighlightColour',
				'themeOpCommentHighlightColourCSS',
				'themePostBackgroundColour',
				'themePostBackgroundColourCSS',
				'themePostBorderColour',
				'themePostBorderColourCSS',
				'themePostCommentsTextColour1',
				'themePostCommentsTextColour1CSS',
				'themePostCommentsTextColour2',
				'themePostCommentsTextColour2CSS',
				'themePostFollowedTextColour',
				'themePostFollowedTextColourCSS',
				'themePostTextColour1',
				'themePostTextColour1CSS',
				'themePostTextColour2',
				'themePostTextColour2CSS',
				'themePostUpvoteColour',
				'themePostUpvoteColourCSS',
				'themePostVisitedTextColour',
				'themePostVisitedTextColourCSS',
				'themeSearchbarBgColour',
				'themeSearchbarBgColourCSS',
				'themeSearchbarDropdownBgColour',
				'themeSearchbarDropdownBgColourCSS',
				'themeSidebarBgColour',
				'themeSidebarBgColourCSS',
				'themeSidebarTextColour',
				'themeSidebarTextColourCSS',
				'themeSidemenuBgColour',
				'themeSidemenuBgColourCSS',
				'themeSidemenuButtonHoverColour',
				'themeSidemenuButtonHoverColourCSS',
				'themeSidemenuTextColour',
				'themeSidemenuTextColourCSS',
				'themeSubHeaderBackgroundColour',
				'themeSubHeaderBackgroundColourCSS',
				'underlineLinks',
				'useCustomBackground',
				'usernameHoverPopupDelay',
				'viewCrossposts',
				//'themeSearchbarBorderColour',
				//'themeSearchbarBorderColourCSS',
				//'breakReminder',
				//'breakReminderFrequency',
				//'darkMode',
				//'darkModeAuto',
				//'darkModeTimeEnd',
				//'darkModeTimeStart',
				//'dragImageToResize',
				//'dragImageToResizeInitialSize',
				//'limitInfinityScroll',
			].includes(key)
		) {
			validKeys.push(key);
		}
	}
	// Keep only valid keys
	Object.keys(json).forEach((key) => validKeys.includes(key) || delete json[key]);

	// Send json data to background.js to save to storage.sync
	BROWSER_API.runtime.sendMessage({ restore: json }).then((response) => {
		if (response.success) {
			restoreComplete();
		} else {
			restoreFailed();
			console.error('Error:', response);
		}
	});

	function restoreComplete() {
		document.querySelector('.main').style.display = 'none';
		document.querySelector('.complete').style.display = 'flex';
		console.log('[RedditEnhancer] Restore complete!');
	}

	function restoreFailed() {
		document.querySelector('.main').style.display = 'none';
		document.querySelector('.failed').style.display = 'flex';
		console.error('[RedditEnhancer] Restore failed!');
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
			showSupportNotice: false,
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
