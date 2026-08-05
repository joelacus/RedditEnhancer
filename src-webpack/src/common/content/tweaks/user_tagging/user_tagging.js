/**
 * Tweaks: User Tagging - User Tagging
 *
 * @name userTaggingEnabled
 * @description - Adds a tag button next to usernames, either to create a new tag, or show an existing tag.
				- Tags can be fully customised (label text, background colour, foreground colour, and an optional icon).
				- Optionally add a note to a tagged user to show more information.
				- Create preset tags, adding them to a list to quickly apply a frequently used tag to a user.
				- Import and export tags to a backup file. Supports importing tags from a RES backup file.
				- Added a User Tagging Manager to view all tagged users, manually add new tags, or edit/delete existing tags and notes.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import i18next from 'i18next';
import ColorPicker from '../../../popup/libs/colorpicker.js';
import { debounce } from '../../../utilities/debounce.js';
import { escapeHtml } from '../../../utilities/escape_html.js';
import { getColourPickerCSS } from './colour_picker._css.js';
import { getContrastTextColour } from '../../../utilities/colour_functions.js';
import { getUserTaggingCSS } from './user_tagging_css.js';

let scrollCleanup = null;
let popoverEl = null;
let popoverUsername = null;
let colourPickerBg = null;
let colourPickerFg = null;
let currentPopoverTag = null;
let messageListenerActive = false;

const ICON_OPTIONS = [
	['none', 'None'],
	['star', 'Star'],
	['heart', 'Heart'],
	['crown', 'Crown'],
	['peace', 'Peace'],
	['tick', 'Tick'],
	['thumbs-up', 'Thumbs Up'],
	['thumbs-down', 'Thumbs Down'],
	['ban', 'Ban'],
	['swear', 'Swear'],
	['toxic', 'Toxic'],
	['paw', 'Paw'],
	['lemon', 'Lemon'],
	['rocket', 'Rocket'],
	['pawn', 'Pawn'],
	['game', 'Game'],
	['car', 'Car'],
	['user', 'User'],
	['mod', 'Mod'],
];

// ─── Button Placement Rules ──────────────────────────────────────────────────
// Maps username selectors to their tag button placement anchor.
// Each rule matches a username element and returns the element after which
// the tag/create button should be inserted. Defaults to the username element itself.

const TAG_BUTTON_PLACEMENT = [
	{
		match: 'shreddit-post [noun="user_profile"] > a[href*="/user/"]',
		getAnchor: (el) => el.closest('faceplate-hovercard') || el,
	},
	{
		match: 'shreddit-comment [noun="comment_author"] a[href*="/user/"]',
		getAnchor: (el) => el.closest('.author-hovercard-trigger') || el,
	},
	{
		match: 'shreddit-post .re-post-author > a[href*="/user/"]',
		getAnchor: (el) => el.closest('faceplate-hovercard') || el,
	},
	{
		match: 'shreddit-post[author]',
		getAnchor: (el) => el.querySelector('faceplate-timeago') || el,
	},
];

function getButtonAnchor(el) {
	for (const rule of TAG_BUTTON_PLACEMENT) {
		if (el.matches(rule.match)) {
			return rule.getAnchor(el);
		}
	}
	return el;
}

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadUserTagging() {
	BROWSER_API.storage.sync.get(['userTaggingEnabled'], function (result) {
		if (result.userTaggingEnabled === true) {
			userTaggingEnabled(true);
		} else {
			userTaggingEnabled(false);
		}
	});

	if (!messageListenerActive) {
		BROWSER_API.runtime.onMessage.addListener((msg) => {
			if (msg.userTagging === 'refresh') {
				scanPage(true);
			}
		});
		messageListenerActive = true;
	}
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function userTaggingEnabled(value) {
	if (value === true) {
		// Clean up any existing scroll events first
		if (scrollCleanup) {
			scrollCleanup();
		}
		removeAllInlineTags();
		injectStyles();
		scanPage();
		// Add scroll event listener for username with debounce
		const debouncedScrollHandler = debounce(() => {
			scanPage();
		}, 100);

		window.addEventListener('scroll', debouncedScrollHandler);
		scrollCleanup = () => {
			window.removeEventListener('scroll', debouncedScrollHandler);
		};
	} else {
		if (scrollCleanup) {
			scrollCleanup();
		}
		removeStyles();
		removeAllPopovers();
		removeAllInlineTags();
	}
}

// ─── Styles ─────────────────────────────────────────────────────────────────

function injectStyles() {
	if (!document.head.querySelector('style[id="re-user-tagging"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-user-tagging';
		styleElement.textContent = getUserTaggingCSS();
		document.head.insertBefore(styleElement, document.head.firstChild);
		document.documentElement.classList.add('re-user-tagging');
	}
	if (!document.head.querySelector('style[id="re-colour-picker"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-colour-picker';
		styleElement.textContent = getColourPickerCSS();
		document.head.insertBefore(styleElement, document.head.firstChild);
		document.documentElement.classList.add('re-colour-picker');
	}
}

function removeStyles() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-user-tagging"],style[id="re-colour-picker"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}

// ─── Scanning ───────────────────────────────────────────────────────────────

function fetchUsernameTagsRV3(username) {
	return `shreddit-post .re-post-author > a[href*="/user/${username}"],
			shreddit-post [noun="user_profile"] > a[href*="/user/${username}"],
			shreddit-post [data-id="user-hover-card"] [noun="user_profile"] a[href*="/user/${username}"],
			[data-testid="profile-prefixed-name"] > span,
			shreddit-comment [noun="comment_author"] a[href*="/user/${username}"],
			shreddit-profile-comment [data-id="user-hover-card"] a > span`;
}

const usernameElementsRV1 = ['.entry .author', '.entry a.author'];

function scanPage(refresh = false, username = '') {
	if (refresh) {
		removeAllInlineTags();
	}
	let links = [];
	if (redditVersion === 'newnew') {
		links = Array.from(document.querySelectorAll(fetchUsernameTagsRV3(username)));
		if (links.length === 0) links = Array.from(document.querySelectorAll('shreddit-post[author]'));
	} else if (redditVersion === 'old') {
		links = Array.from(document.querySelectorAll(usernameElementsRV1.join(',')));
	}

	links.forEach((link) => {
		processUsernameElement(link);
	});
}

// ─── Username Processing ────────────────────────────────────────────────────

function processUsernameElement(el) {
	if (el.dataset.reUserTagProcessed === 'true') return;
	if (el.parentElement.querySelector('.re-user-tag, .re-create-tag-btn')) return;
	const author = el.getAttribute('author') || el.getAttribute('href') || el.textContent || '';
	const username = normaliseUsername(author);
	if (!username) return;

	readTags().then((tags) => {
		if (tags[username]) {
			renderTag(el, tags[username]);
		} else {
			renderCreateButton(el);
		}
	});
}

function normaliseUsername(input) {
	if (!input) return '';
	let username = input.trim();
	if (username.includes('/user/')) username = username.split('/user/')[1];
	if (username.startsWith('u/')) username = username.slice(2);
	username = username.replace(/\/+$/, '');
	return username;
}

// ─── Inline Rendering ───────────────────────────────────────────────────────

function renderTag(usernameEl, tag) {
	const anchor = getButtonAnchor(usernameEl);
	const existing = anchor.nextElementSibling;
	if (existing && (existing.classList.contains('re-user-tag') || existing.classList.contains('re-create-tag-btn'))) {
		existing.remove();
	}

	const chip = document.createElement('div');
	chip.className = 're-user-tag';
	chip.style.backgroundColor = tag.colourBg || '#666';
	chip.style.setProperty('--tag-fg', tag.colourFg || getContrastTextColour(tag.colourBg || '#666'));

	if (tag.icon && tag.icon !== 'none') {
		const icon = document.createElement('span');
		icon.className = `icon icon-${tag.icon}`;
		chip.append(icon);
	}

	const label = document.createElement('span');
	label.textContent = escapeHtml(tag.label);
	chip.append(label);

	const tooltip = document.createElement('div');
	tooltip.className = 're-user-tag-tooltip';
	const tooltipLabel = document.createElement('div');
	tooltipLabel.className = 're-tooltip-label';
	tooltipLabel.textContent = escapeHtml(tag.label);
	tooltip.append(tooltipLabel);
	if (tag.note) {
		const tooltipNote = document.createElement('div');
		tooltipNote.className = 're-tooltip-note';
		tooltipNote.innerHTML = escapeHtml(tag.note).replace(/\n/g, '<br>');
		tooltip.append(tooltipNote);
	}
	chip.append(tooltip);

	chip.dataset.username = normaliseUsername(usernameEl.closest('shreddit-post')?.getAttribute('author') || usernameEl.getAttribute('href') || '');

	chip.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const uname = chip.dataset.username;
		openTagPopover(e, uname, tag);
	});

	const blockBtn = anchor.closest('shreddit-comment')?.querySelector('.re-block-user-btn');
	if (blockBtn) {
		blockBtn.parentElement.insertBefore(chip, blockBtn.nextSibling);
	} else {
		anchor.insertAdjacentElement('afterend', chip);
	}
	usernameEl.dataset.reUserTagProcessed = 'true';
}

function renderCreateButton(usernameEl) {
	const anchor = getButtonAnchor(usernameEl);
	const existing = anchor.nextElementSibling;
	if (existing && (existing.classList.contains('re-user-tag') || existing.classList.contains('re-create-tag-btn'))) {
		existing.remove();
	}

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-create-tag-btn icon-tag';
	btn.title = i18next.t('AddUserTag.message');
	btn.dataset.username = normaliseUsername(usernameEl.getAttribute('author') || usernameEl.closest('shreddit-post')?.getAttribute('author') || usernameEl.getAttribute('href') || '');

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const uname = btn.dataset.username;
		openTagPopover(e, uname, null);
	});

	const blockBtn = anchor.closest('shreddit-comment')?.querySelector('.re-block-user-btn');
	if (blockBtn) {
		blockBtn.parentElement.insertBefore(btn, blockBtn.nextSibling);
	} else {
		anchor.insertAdjacentElement('afterend', btn);
	}
	usernameEl.dataset.reUserTagProcessed = 'true';
}

function removeAllInlineTags() {
	document.querySelectorAll('.re-user-tag, .re-create-tag-btn').forEach((el) => el.remove());
	document.querySelectorAll('[data-re-user-tag-processed]').forEach((el) => delete el.dataset.reUserTagProcessed);
}

// ─── Popover ────────────────────────────────────────────────────────────────

function openTagPopover(event, username, existingTag) {
	closeTagPopover();

	popoverUsername = username;
	currentPopoverTag = existingTag ? { ...existingTag } : null;

	const popover = document.createElement('div');
	popover.className = 're-tag-popover re-modal-content';
	popover.innerHTML = buildPopoverHtml(username, existingTag);
	document.body.appendChild(popover);

	document.body.style.position = 'relative';
	popoverEl = popover;
	positionPopover(popover, event.target);

	initPopoverFields(popover, existingTag, username);

	document.addEventListener('keydown', popoverKeyHandler);
}

function closeTagPopover() {
	if (popoverEl) {
		popoverEl.remove();
		popoverEl = null;
	}
	popoverUsername = null;
	currentPopoverTag = null;
	destroyColourPickers();
	document.removeEventListener('keydown', popoverKeyHandler);
	document.body.style.position = '';
}

function removeAllPopovers() {
	closeTagPopover();
}

function buildPopoverHtml(username, existingTag) {
	const title = existingTag ? i18next.t('EditTag.message') : i18next.t('CreateTag.message');
	const iconOptions = ICON_OPTIONS.map(([val, lbl]) => `<option value="${val}">${lbl}</option>`).join('');
	const labelVal = existingTag ? escapeHtml(existingTag.label) : '';
	const bgVal = existingTag ? existingTag.colourBg || '#666' : '#666';
	const fgVal = existingTag ? existingTag.colourFg || getContrastTextColour(existingTag.colourBg || '#666') : '#fff';
	const noteVal = existingTag ? escapeHtml(existingTag.note || '') : '';
	const linkVal = existingTag ? escapeHtml(existingTag.link || '') : '';
	return `<span class="re-title-username">${title} • u/${username}</span>
			<div class="re-tag-tabs">
				<button class="re-tag-tab active" data-tab="re-edit-tag">${i18next.t('Tag.message')}</button>
				<button class="re-tag-tab" data-tab="re-tag-note">${i18next.t('Note.message')}</button>
				<button class="re-tag-tab" data-tab="re-tag-details">${i18next.t('Details.message')}</button>
			</div>
			<div class="re-tab-pane active" id="re-edit-tag">
				<div class="re-edit-tag">
					<div>
						<label>${i18next.t('Label.message')}</label>
						<input type="text" id="re-popover-label" maxlength="30" value="${labelVal}" />
						<label style="margin-top:10px">${i18next.t('Icon.message')}</label>
						<select id="re-popover-icon">${iconOptions}</select>
					</div>
					<div>
						<label>${i18next.t('LabelColour.message')}</label>
						<input type="text" id="re-popover-colour-fg" value="${fgVal}" />
						<label style="margin-top:10px">${i18next.t('TagColour.message')}</label>
						<input type="text" id="re-popover-colour" value="${bgVal}" />
					</div>
				</div>
				<label>${i18next.t('Preview.message')}</label>
				<div class="re-tag-popover-preview">
					<span id="re-popover-preview" class="tag-preview" style="background:${bgVal};color:${fgVal};--tag-fg:${fgVal}">
						<span>${labelVal || i18next.t('Preview.message')}</span>
					</span>
					<button id="re-popover-add-preset" class="btn">${i18next.t('AddToPresets.message')}</button>
				</div>
				<div class="re-tag-popover-presets">
					<label>${i18next.t('PresetTags.message')}</label>
					<div id="re-popover-presets" class="re-tag-popover-presets-list"></div>
				</div>
			</div>
			<div class="re-tab-pane" id="re-tag-note">
				<label>${i18next.t('Note.message')}</label>
				<textarea id="re-popover-note" rows="6" placeholder="...">${noteVal}</textarea>
			</div>
			<div class="re-tab-pane" id="re-tag-details">
				<div class="re-tag-details">
					<div class="re-tag-detail-row">
						<span class="re-tag-detail-label">${i18next.t('Link.message')}:</span>
						<a href="${linkVal}" target="_blank" rel="noopener" class="re-tag-detail-value" id="re-popover-link">${linkVal || '—'}</a>
					</div>
					<div class="re-tag-detail-row">
						<span class="re-tag-detail-label">${i18next.t('Created.message')}:</span>
						<span class="re-tag-detail-value" id="re-popover-created">${existingTag?.createdAt ? new Date(existingTag.createdAt).toLocaleString() : '—'}</span>
					</div>
					<div class="re-tag-detail-row">
						<span class="re-tag-detail-label">${i18next.t('Updated.message')}:</span>
						<span class="re-tag-detail-value" id="re-popover-updated">${existingTag?.updatedAt ? new Date(existingTag.updatedAt).toLocaleString() : '—'}</span>
					</div>
				</div>
			</div>
			<div class="re-modal-actions">
				<button id="re-popover-open-manager" class="btn">${i18next.t('OpenInManager.message')}</button>
				<div>
					<button id="re-popover-save" class="btn green">${i18next.t('Save.message')}</button>
					<button id="re-popover-cancel" class="btn">${i18next.t('Cancel.message')}</button>
				</div>
			</div>`;
}

function positionPopover(popover, targetEl) {
	const rect = targetEl.getBoundingClientRect();
	popover.style.left = '0px';
	popover.style.top = '0px';
	popover.style.display = 'block';

	const popoverRect = popover.getBoundingClientRect();
	const viewportW = window.innerWidth;
	const viewportH = window.innerHeight;

	let left = rect.left + window.scrollX;
	let top = rect.bottom + 4 + window.scrollY;

	if (left + popoverRect.width > viewportW - 8 + window.scrollX) {
		left = Math.max(8 + window.scrollX, viewportW - popoverRect.width - 8 + window.scrollX);
	}
	if (top + popoverRect.height > viewportH - 8 + window.scrollY) {
		top = Math.max(8 + window.scrollY, rect.top - popoverRect.height - 4 + window.scrollY);
	}

	popover.style.left = left + 'px';
	popover.style.top = top + 'px';
}

function initPopoverFields(popover, existingTag, username) {
	const labelInput = popover.querySelector('#re-popover-label');
	const iconSelect = popover.querySelector('#re-popover-icon');
	const colourInput = popover.querySelector('#re-popover-colour');
	const colourFgInput = popover.querySelector('#re-popover-colour-fg');
	const preview = popover.querySelector('#re-popover-preview');

	// Set icon value
	if (iconSelect && existingTag) {
		iconSelect.value = existingTag.icon || 'none';
	}

	// Init colour pickers
	destroyColourPickers();

	const pickerBg = new ColorPicker(colourInput, {
		toggleStyle: 'button',
		enableAlpha: false,
		formats: ['hex'],
		defaultFormat: 'hex',
		submitMode: 'instant',
		showClearButton: true,
		dismissOnOutsideClick: true,
		staticPlacement: 'center center',
	});
	pickerBg.on('pick', (colour) => {
		if (!colour) return;
		const hex = colour.string('hex') ?? '';
		colourInput.value = hex;
		updatePopoverPreview();
	});
	colourPickerBg = pickerBg;

	const pickerFg = new ColorPicker(colourFgInput, {
		toggleStyle: 'button',
		enableAlpha: false,
		formats: ['hex'],
		defaultFormat: 'hex',
		submitMode: 'instant',
		showClearButton: true,
		dismissOnOutsideClick: true,
		staticPlacement: 'center center',
	});
	pickerFg.on('pick', (colour) => {
		if (!colour) return;
		const hex = colour.string('hex') ?? '';
		colourFgInput.value = hex;
		updatePopoverPreview();
	});
	colourPickerFg = pickerFg;

	// Update tag preview
	function updatePopoverPreview() {
		const label = labelInput.value.trim() || i18next.t('Preview.message');
		const bg = colourInput.value || '#666';
		const fg = colourFgInput.value || getContrastTextColour(bg);
		preview.style.background = bg;
		preview.style.color = fg;
		preview.style.setProperty('--tag-fg', fg);

		preview.replaceChildren();

		const iconVal = iconSelect.value;
		if (iconVal && iconVal !== 'none') {
			const iconEl = document.createElement('span');
			iconEl.className = 'icon icon-' + iconVal;
			preview.appendChild(iconEl);
		}

		const labelEl = document.createElement('span');
		labelEl.textContent = escapeHtml(label);
		preview.appendChild(labelEl);
	}
	updatePopoverPreview();

	labelInput.addEventListener('input', () => updatePopoverPreview());
	colourInput.addEventListener('input', () => updatePopoverPreview());
	colourFgInput.addEventListener('input', () => updatePopoverPreview());
	iconSelect.addEventListener('change', () => updatePopoverPreview());

	// Load preset tags
	function updatePopoverPresets() {
		loadPopoverPresets(popover, (preset) => {
			labelInput.value = preset.label || '';
			iconSelect.value = preset.icon || 'none';
			const bgColour = preset.colourBg || '#666';
			const fgColour = preset.colourFg || getContrastTextColour(bgColour);
			colourInput.value = bgColour;
			colourFgInput.value = fgColour;
			if (colourPickerBg) colourPickerBg.setColor(bgColour, true);
			if (colourPickerFg) colourPickerFg.setColor(fgColour, true);
			updatePopoverPreview();
		});
	}
	updatePopoverPresets();

	// Init event listeners
	popover.querySelector('#re-popover-cancel').addEventListener('click', closeTagPopover);
	popover.querySelector('#re-popover-save').addEventListener('click', async () => {
		await saveTagFromPopover(username);
	});
	const addPresetBtn = popover.querySelector('#re-popover-add-preset');
	if (addPresetBtn) {
		addPresetBtn.addEventListener('click', async () => {
			await addToPresets(popover);
			updatePopoverPresets();
		});
	}

	const openManagerBtn = popover.querySelector('#re-popover-open-manager');
	if (openManagerBtn) {
		openManagerBtn.addEventListener('click', async () => {
			closeTagPopover();
			BROWSER_API.runtime.sendMessage({ openUserTaggingManager: true, user: existingTag ? username : '' });
		});
	}

	// Tab switching
	const tabs = popover.querySelectorAll('.re-tag-tab');
	const panes = popover.querySelectorAll('.re-tab-pane');
	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const targetId = tab.dataset.tab;
			tabs.forEach((t) => t.classList.remove('active'));
			panes.forEach((p) => p.classList.remove('active'));
			tab.classList.add('active');
			const targetPane = popover.querySelector('#' + targetId);
			if (targetPane) targetPane.classList.add('active');
		});
	});
}

function popoverKeyHandler(e) {
	if (e.key === 'Escape') {
		closeTagPopover();
	}
}

function destroyColourPickers() {
	if (colourPickerBg) {
		colourPickerBg.destroy();
		colourPickerBg = null;
	}
	if (colourPickerFg) {
		colourPickerFg.destroy();
		colourPickerFg = null;
	}
}

// ─── Save Tag ───────────────────────────────────────────────────────────────

async function saveTagFromPopover(username) {
	if (!popoverEl) return;
	const label = popoverEl.querySelector('#re-popover-label').value.trim();
	const icon = popoverEl.querySelector('#re-popover-icon').value;
	const colourBg = popoverEl.querySelector('#re-popover-colour').value;
	const colourFg = popoverEl.querySelector('#re-popover-colour-fg').value;
	const noteInput = popoverEl.querySelector('#re-popover-note');
	const note = noteInput ? noteInput.value.trim() : currentPopoverTag ? currentPopoverTag.note || '' : '';
	let link = currentPopoverTag?.link || window.location.href;
	if (link === 'https://www.reddit.com/') link = '';

	if (!label) return;

	const tags = await readTags();
	tags[username] = {
		label,
		note,
		link,
		colourBg,
		colourFg,
		icon,
		createdAt: currentPopoverTag?.createdAt || Date.now(),
		updatedAt: Date.now(),
	};

	await writeTags(tags);

	closeTagPopover();
	scanPage(true, username);
}

// ─── Presets ────────────────────────────────────────────────────────────────

async function loadPopoverPresets(popover, onSelect) {
	const container = popover.querySelector('#re-popover-presets');
	if (!container) return;
	container.innerHTML = '';

	const presets = await readPresets();
	if (presets.length === 0) {
		container.innerHTML = `<span>${i18next.t('NoPresetsYet.message')}</span>`;
		return;
	}

	presets.forEach((preset) => {
		const chip = document.createElement('button');
		chip.className = 're-tag-popover-preset-chip';
		chip.style.background = preset.colourBg || '#666';
		chip.style.setProperty('--tag-fg', preset.colourFg || getContrastTextColour(preset.colourBg || '#666'));
		chip.title = preset.label;

		if (preset.icon && preset.icon !== 'none') {
			const icon = document.createElement('span');
			icon.className = `icon icon-${preset.icon}`;
			chip.append(icon);
		}

		const label = document.createElement('span');
		label.textContent = escapeHtml(preset.label);
		chip.append(label);
		chip.addEventListener('click', () => onSelect(preset));

		container.appendChild(chip);
	});
}

async function addToPresets(popover) {
	const label = popover.querySelector('#re-popover-label').value.trim();
	const icon = popover.querySelector('#re-popover-icon').value;
	const colourBg = popover.querySelector('#re-popover-colour').value;
	const colourFg = popover.querySelector('#re-popover-colour-fg').value;

	if (!label) return;

	const presets = await readPresets();
	const newColourFg = colourFg || getContrastTextColour(colourBg || '#666');
	const exists = presets.some((p) => p.label.toLowerCase() === label.toLowerCase() && (p.icon || 'none') === (icon || 'none') && (p.colourBg || '#666').toLowerCase() === (colourBg || '#666').toLowerCase() && (p.colourFg || getContrastTextColour(p.colourBg || '#666')).toLowerCase() === newColourFg.toLowerCase());
	if (exists) {
		const addBtn = popover.querySelector('#re-popover-add-preset');
		if (addBtn) {
			addBtn.textContent = 'Already exists';
			addBtn.disabled = true;
			setTimeout(() => {
				addBtn.textContent = i18next.t('AddToPresets.message');
				addBtn.disabled = false;
			}, 1500);
		}
		return;
	}

	const newPreset = {
		id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
		label,
		colourBg,
		colourFg,
		icon,
		defaultNote: '',
	};
	presets.unshift(newPreset);
	await writePresets(presets);

	const addBtn = popover.querySelector('#re-popover-add-preset');
	if (addBtn) {
		addBtn.textContent = 'Added!';
		addBtn.disabled = true;
		setTimeout(() => {
			addBtn.textContent = i18next.t('AddToPresets.message');
			addBtn.disabled = false;
		}, 1500);
	}
}

// ─── Storage ────────────────────────────────────────────────────────────────

function readTags() {
	return new Promise((resolve) => {
		BROWSER_API.storage.local.get(['redditUserTags'], (result) => {
			resolve(result['redditUserTags'] || {});
		});
	});
}

function writeTags(tags) {
	return new Promise((resolve) => {
		BROWSER_API.storage.local.set({ ['redditUserTags']: tags }, resolve);
	});
}

function readPresets() {
	return new Promise((resolve) => {
		BROWSER_API.storage.sync.get(['userTaggingPresets'], (result) => {
			resolve(result['userTaggingPresets'] || []);
		});
	});
}

function writePresets(presets) {
	return new Promise((resolve) => {
		BROWSER_API.storage.sync.set({ ['userTaggingPresets']: presets }, resolve);
	});
}
