/* ===== Inputs / Colour Pickers ===== */

import ColorPicker from '../colorpicker.js';
import { sendMessage } from '../send_message.js';

// Create global colour picker element array for restoring colour values.
window.colour_pickers = [];

// Init all colour pickers
document.querySelectorAll('.colour-picker').forEach((input) => {
	const id = input.dataset.styleId;

	// disable alpha for certain colour pickers
	const hasAlpha = !['background', 'header-fg', 'post-fg', 'post-fg-2', 'post-code-fg', 'post-fg-visited', 'post-comments-fg', 'post-comments-fg-2', 'post-comment-action-row', 'post-and-comment-links', 'post-upvote', 'sidebar-fg', 'sidemenu-fg'].includes(id);

	const picker = new ColorPicker(input, {
		toggleStyle: 'input',
		enableAlpha: hasAlpha,
		formats: ['hex', 'rgb', 'hsv', 'hsl'],
		defaultFormat: 'rgb',
		submitMode: 'confirm', // 'instant' | 'confirm'
		showClearButton: true,
		dismissOnOutsideClick: true,
		staticPlacement: 'center center',
	});
	input.placeholder = 'Select Colour';
	colour_pickers.push({ id, picker });

	// Set and save colour on pick
	picker.on('pick', (colour) => {
		if (!colour) return;
		const hex = colour.string('hex') ?? '';
		//const rgb = colour.string('rgb') ?? '';
		const rgba = colour.string('rgba') ?? '';
		switch (id) {
			case 'background':
				BROWSER_API.storage.sync.set({ solidColourBackgroundCSS: hex });
				sendMessage({ solidColourBackgroundCSS: hex });
				break;
			case 'header-bg':
				BROWSER_API.storage.sync.set({ themeHeaderBackgroundColourCSS: rgba });
				sendMessage({ themeHeaderBackgroundColourCSS: rgba });
				break;
			case 'header-fg':
				BROWSER_API.storage.sync.set({ themeHeaderTextColourCSS: hex });
				sendMessage({ themeHeaderTextColourCSS: hex });
				break;
			case 'searchbar-bg':
				BROWSER_API.storage.sync.set({ themeSearchbarBgColourCSS: rgba });
				sendMessage({ themeSearchbarBgColourCSS: rgba });
				break;
			/*case 'searchbar-border':
				BROWSER_API.storage.sync.set({ themeSearchbarBorderColourCSS: rgba });
				sendMessage({ themeSearchbarBorderColourCSS: rgba });
				break;*/
			case 'searchbar-dropdown-bg':
				BROWSER_API.storage.sync.set({ themeSearchbarDropdownBgColourCSS: rgba });
				sendMessage({ themeSearchbarDropdownBgColourCSS: rgba });
				break;
			case 'post-bg':
				BROWSER_API.storage.sync.set({ themePostBackgroundColourCSS: rgba });
				sendMessage({ themePostBackgroundColourCSS: rgba });
				break;
			case 'post-fg':
				BROWSER_API.storage.sync.set({ themePostTextColour1CSS: hex });
				sendMessage({ themePostTextColour1CSS: hex });
				break;
			case 'post-fg-2':
				BROWSER_API.storage.sync.set({ themePostTextColour2CSS: hex });
				sendMessage({ themePostTextColour2CSS: hex });
				break;
			case 'post-code-fg':
				BROWSER_API.storage.sync.set({ themeCodeBlockColourCSS: hex });
				sendMessage({ themeCodeBlockColourCSS: hex });
				break;
			case 'post-fg-visited':
				BROWSER_API.storage.sync.set({ themePostVisitedTextColourCSS: hex });
				sendMessage({ themePostVisitedTextColourCSS: hex });
				break;
			case 'post-fg-followed':
				BROWSER_API.storage.sync.set({ themePostFollowedTextColourCSS: hex });
				sendMessage({ themePostFollowedTextColourCSS: hex });
				break;
			case 'post-comments-fg':
				BROWSER_API.storage.sync.set({ themePostCommentsTextColour1CSS: hex });
				sendMessage({ themePostCommentsTextColour1CSS: hex });
				break;
			case 'post-comments-fg-2':
				BROWSER_API.storage.sync.set({ themePostCommentsTextColour2CSS: hex });
				sendMessage({ themePostCommentsTextColour2CSS: hex });
				break;
			case 'post-comment-action-row-fg':
				BROWSER_API.storage.sync.set({ themePostCommentActionRowColourCSS: hex });
				sendMessage({ themePostCommentActionRowColourCSS: hex });
				break;
			case 'post-border':
				BROWSER_API.storage.sync.set({ themePostBorderColourCSS: rgba });
				sendMessage({ themePostBorderColourCSS: rgba });
				break;
			case 'post-and-comment-links':
				BROWSER_API.storage.sync.set({ themePostContentAndCommentsLinkColourCSS: hex });
				sendMessage({ themePostContentAndCommentsLinkColourCSS: hex });
				break;
			case 'post-upvote':
				BROWSER_API.storage.sync.set({ themePostUpvoteColourCSS: hex });
				sendMessage({ themePostUpvoteColourCSS: hex });
				break;
			case 'sidebar-fg':
				BROWSER_API.storage.sync.set({ themeSidebarTextColourCSS: hex });
				sendMessage({ themeSidebarTextColourCSS: hex });
				break;
			case 'sidebar-bg':
				BROWSER_API.storage.sync.set({ themeSidebarBgColourCSS: rgba });
				sendMessage({ themeSidebarBgColourCSS: rgba });
				break;
			case 'sidemenu-fg':
				BROWSER_API.storage.sync.set({ themeSidemenuTextColourCSS: hex });
				sendMessage({ themeSidemenuTextColourCSS: hex });
				break;
			case 'sidemenu-bg':
				BROWSER_API.storage.sync.set({ themeSidemenuBgColourCSS: rgba });
				sendMessage({ themeSidemenuBgColourCSS: rgba });
				break;
			case 'sidemenu-btn-hover':
				BROWSER_API.storage.sync.set({ themeSidemenuButtonHoverColourCSS: rgba });
				sendMessage({ themeSidemenuButtonHoverColourCSS: rgba });
				break;
			case 'op-comment-highlight':
				BROWSER_API.storage.sync.set({ themeOpCommentHighlightColourCSS: rgba });
				sendMessage({ themeOpCommentHighlightColourCSS: rgba });
				break;
			default:
				break;
		}
	});
});
