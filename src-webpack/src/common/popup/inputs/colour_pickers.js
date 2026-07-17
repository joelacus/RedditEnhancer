// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Colour Pickers
// ────────────────────────────────────────────────────────────────────────────

import ColorPicker from '../libs/colorpicker.js';
import { sendMessage } from '../../utilities/send_message.js';
import { debounce } from '../../utilities/debounce.js';

// Create global colour picker element array for restoring colour values.
window.colour_pickers = [];

const storage = {};

const saveStorage = debounce((data) => {
	BROWSER_API.storage.sync.set(data);
	for (const key in data) delete data[key];
}, 250);

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
		submitMode: 'instant',
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
				storage.solidColourBackgroundCSS = hex;
				sendMessage({ solidColourBackgroundCSS: hex });
				break;
			case 'header-bg':
				storage.themeHeaderBackgroundColourCSS = rgba;
				sendMessage({ themeHeaderBackgroundColourCSS: rgba });
				break;
			case 'header-fg':
				storage.themeHeaderTextColourCSS = hex;
				sendMessage({ themeHeaderTextColourCSS: hex });
				break;
			case 'searchbar-bg':
				storage.themeSearchbarBgColourCSS = rgba;
				sendMessage({ themeSearchbarBgColourCSS: rgba });
				break;
			/*case 'searchbar-border':
				storage.themeSearchbarBorderColourCSS = rgba;
				sendMessage({ themeSearchbarBorderColourCSS: rgba });
				break;*/
			case 'searchbar-dropdown-bg':
				storage.themeSearchbarDropdownBgColourCSS = rgba;
				sendMessage({ themeSearchbarDropdownBgColourCSS: rgba });
				break;
			case 'post-bg':
				storage.themePostBackgroundColourCSS = rgba;
				sendMessage({ themePostBackgroundColourCSS: rgba });
				break;
			case 'post-fg':
				storage.themePostTextColour1CSS = hex;
				sendMessage({ themePostTextColour1CSS: hex });
				break;
			case 'post-fg-2':
				storage.themePostTextColour2CSS = hex;
				sendMessage({ themePostTextColour2CSS: hex });
				break;
			case 'post-code-fg':
				storage.themeCodeBlockColourCSS = hex;
				sendMessage({ themeCodeBlockColourCSS: hex });
				break;
			case 'post-fg-visited':
				storage.themePostVisitedTextColourCSS = hex;
				sendMessage({ themePostVisitedTextColourCSS: hex });
				break;
			case 'post-fg-followed':
				storage.themePostFollowedTextColourCSS = hex;
				sendMessage({ themePostFollowedTextColourCSS: hex });
				break;
			case 'post-comments-fg':
				storage.themePostCommentsTextColour1CSS = hex;
				sendMessage({ themePostCommentsTextColour1CSS: hex });
				break;
			case 'post-comments-fg-2':
				storage.themePostCommentsTextColour2CSS = hex;
				sendMessage({ themePostCommentsTextColour2CSS: hex });
				break;
			case 'post-comment-action-row-fg':
				storage.themePostCommentActionRowColourCSS = hex;
				sendMessage({ themePostCommentActionRowColourCSS: hex });
				break;
			case 'post-border':
				storage.themePostBorderColourCSS = rgba;
				sendMessage({ themePostBorderColourCSS: rgba });
				break;
			case 'post-and-comment-links':
				storage.themePostContentAndCommentsLinkColourCSS = hex;
				sendMessage({ themePostContentAndCommentsLinkColourCSS: hex });
				break;
			case 'post-upvote':
				storage.themePostUpvoteColourCSS = hex;
				sendMessage({ themePostUpvoteColourCSS: hex });
				break;
			case 'sidebar-fg':
				storage.themeSidebarTextColourCSS = hex;
				sendMessage({ themeSidebarTextColourCSS: hex });
				break;
			case 'sidebar-bg':
				storage.themeSidebarBgColourCSS = rgba;
				sendMessage({ themeSidebarBgColourCSS: rgba });
				break;
			case 'sidemenu-fg':
				storage.themeSidemenuTextColourCSS = hex;
				sendMessage({ themeSidemenuTextColourCSS: hex });
				break;
			case 'sidemenu-bg':
				storage.themeSidemenuBgColourCSS = rgba;
				sendMessage({ themeSidemenuBgColourCSS: rgba });
				break;
			case 'sidemenu-btn-hover':
				storage.themeSidemenuButtonHoverColourCSS = rgba;
				sendMessage({ themeSidemenuButtonHoverColourCSS: rgba });
				break;
			case 'op-comment-highlight':
				storage.themeOpCommentHighlightColourCSS = rgba;
				sendMessage({ themeOpCommentHighlightColourCSS: rgba });
				break;
			case 'sub-header-bg':
				storage.themeSubHeaderBackgroundColourCSS = rgba;
				sendMessage({ themeSubHeaderBackgroundColourCSS: rgba });
				break;
			default:
				break;
		}
		saveStorage(storage);
	});
});
