// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / User Tagging
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';
import ColorPicker from '../libs/colorpicker.js';
import Sortable from 'sortablejs';
import { highlightMenuIcon } from '../popup_restore';
import { escapeHtml } from '../../utilities/escape_html.js';
import { getContrastTextColour, getRandomColour } from '../../utilities/colour_functions.js';

// Restore UI settings for "User Tagging".

// ─── Restore ────────────────────────────────────────────────────────────────

export function restorePopupUserTaggingOptions() {
	restoreUserTaggingToggle();
	restoreUserTaggingPresets();
}

function restoreUserTaggingToggle() {
	BROWSER_API.storage.sync.get(['userTaggingEnabled'], function (result) {
		const checked = result.userTaggingEnabled === true;
		const checkbox = document.querySelector('#checkbox-user-tagging-enable');
		if (!checkbox) return;
		checkbox.checked = checked;
		document.querySelector('.icon-user-tagging').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('user-tagging');
	});
}

function restoreUserTaggingPresets() {
	BROWSER_API.storage.sync.get(['userTaggingPresets'], function (result) {
		const templates = result.userTaggingPresets || [];
		renderPresetList(templates);
	});
}

// ─── Render ─────────────────────────────────────────────────────────────────

function renderPresetList(templates) {
	const container = document.querySelector('#user-tagging-presets-container');
	if (!container) return;
	container.innerHTML = '';

	if (templates.length === 0) {
		container.innerHTML = `<p class="info" style="padding:8px;" data-lang="NoPresetsYet"></p>`;
		return;
	}

	templates.forEach((tmpl) => {
		container.appendChild(createPresetElement(tmpl));
	});

	initPresetsSortable();
}

function createPresetElement(tmpl) {
	const li = document.createElement('li');
	li.className = 'preset-tag-item';
	li.dataset.templateId = tmpl.id;

	const iconOptions = [
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
	]
		.map(([val, lbl]) => `<option value='${val}' ${val === tmpl.icon ? 'selected' : ''}>${lbl}</option>`)
		.join('');

	li.innerHTML = `
		<div class='preset-tag-handle'><div class='menu-item-icon icon-handle'></div></div>
		<input type='text' class='preset-tag-label' placeholder='Label' value='${escapeHtml(tmpl.label || '')}'  maxlength="50"/>
		<!--<input type='text' class='preset-tag-note' placeholder='Note' value='${escapeHtml(tmpl.defaultNote || '')}'  maxlength="100"/>-->
		<input type='text' class='colour-picker preset-tag-colour' data-style-id='preset-colour-${tmpl.id}' value='${tmpl.colourBg || '#666'}' />
		<input type='text' class='colour-picker preset-tag-colour-fg' data-style-id='preset-colour-fg-${tmpl.id}' value='${tmpl.colourFg || getContrastTextColour(tmpl.colourBg || '#2e7d32')}' />
		<select class='preset-tag-icon'>${iconOptions}</select>
		<button class='btn preset-tag-delete' title='Delete'>
			<div class="btn-icon icon-x"></div>
		</button>
	`;

	li.querySelector('.preset-tag-label').addEventListener('input', function () {
		updatePresetTag(tmpl.id, { label: this.value });
	});

	/*li.querySelector('.preset-tag-note').addEventListener('input', function () {
		updatePresetTag(tmpl.id, { defaultNote: this.value });
	});*/

	li.querySelector('.preset-tag-colour').addEventListener('input', function () {
		updatePresetTag(tmpl.id, { colour: this.value });
	});

	li.querySelector('.preset-tag-colour-fg').addEventListener('input', function () {
		updatePresetTag(tmpl.id, { colourFg: this.value });
	});

	li.querySelector('.preset-tag-icon').addEventListener('change', function () {
		updatePresetTag(tmpl.id, { icon: this.value });
	});

	li.querySelector('.preset-tag-delete').addEventListener('click', function () {
		deletePresetTag(tmpl.id);
	});

	initColourPicker(li.querySelector('.preset-tag-colour'), tmpl.id);
	initColourPicker(li.querySelector('.preset-tag-colour-fg'), tmpl.id);

	return li;
}

// ─── Storage Helpers ────────────────────────────────────────────────────────

function getCurrentTemplates(callback) {
	BROWSER_API.storage.sync.get(['userTaggingPresets'], function (result) {
		callback(result.userTaggingPresets || []);
	});
}

const SYNC_MAX_BYTES = 8192;
let saveTimer = null;
let pendingTemplates = null;

function saveTemplates(templates) {
	const value = JSON.stringify(templates);
	const bytes = new TextEncoder().encode(value).length;
	if (bytes > SYNC_MAX_BYTES) {
		console.warn('[UserTagging] Preset data exceeds sync limit (' + bytes + '/' + SYNC_MAX_BYTES + ' bytes). Skipping save.');
		return;
	}
	pendingTemplates = templates;
	if (saveTimer) clearTimeout(saveTimer);
	saveTimer = setTimeout(() => {
		saveTimer = null;
		BROWSER_API.storage.sync.set({ userTaggingPresets: pendingTemplates || templates });
	}, 300);
}

// ─── Manage Preset Tags ─────────────────────────────────────────────────────

export function addPresetTag() {
	getCurrentTemplates(function (templates) {
		const randomColour = getRandomColour();
		const newTemplate = {
			id: 'preset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
			label: '',
			defaultNote: '',
			colourBg: randomColour,
			colourFg: getContrastTextColour(randomColour),
			icon: 'none',
		};
		templates.unshift(newTemplate);
		saveTemplates(templates);
		renderPresetList(templates);
	});
}

export function deletePresetTag(id) {
	getCurrentTemplates(function (templates) {
		const filtered = templates.filter((t) => t.id !== id);
		saveTemplates(filtered);
		renderPresetList(filtered);
	});
}

export function updatePresetTag(id, updates) {
	getCurrentTemplates(function (templates) {
		const template = templates.find((t) => t.id === id);
		if (template) {
			Object.assign(template, updates);
			saveTemplates(templates);
		}
	});
}

// ─── Colour Picker ──────────────────────────────────────────────────────────

const colourPickers = [];

function initColourPicker(input, id) {
	const isFg = input.classList.contains('preset-tag-colour-fg');
	const field = isFg ? 'colourFg' : 'colour';
	const picker = new ColorPicker(input, {
		toggleStyle: 'button',
		enableAlpha: false,
		formats: ['hex'],
		defaultFormat: 'hex',
		submitMode: 'instant',
		showClearButton: true,
		dismissOnOutsideClick: true,
		staticPlacement: 'center center',
	});

	picker.on('pick', (colour) => {
		if (!colour) return;
		const hex = colour.string('hex') ?? '';
		updatePresetTag(id, { [field]: hex });
	});

	colourPickers.push({ id, picker });
}

// ─── SortableJS ─────────────────────────────────────────────────────────────

let presetsSortableInitialised = false;

function initPresetsSortable() {
	const container = document.querySelector('#user-tagging-presets-container');
	if (!container || presetsSortableInitialised) return;

	new Sortable(container, {
		handle: '.preset-tag-handle',
		animation: 150,
		onEnd: function () {
			syncPresetOrderFromDom();
		},
	});

	presetsSortableInitialised = true;
}

function syncPresetOrderFromDom() {
	const container = document.querySelector('#user-tagging-presets-container');
	const items = container.querySelectorAll('.preset-tag-item');
	const newOrder = [];
	const ids = Array.from(items).map((item) => item.dataset.templateId);

	getCurrentTemplates(function (templates) {
		ids.forEach((id) => {
			const tmpl = templates.find((t) => t.id === id);
			if (tmpl) newOrder.push(tmpl);
		});
		saveTemplates(newOrder);
	});
}
