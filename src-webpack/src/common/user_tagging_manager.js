// ────────────────────────────────────────────────────────────────────────────
// User Tagging Manager
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import ColorPicker from './popup/libs/colorpicker.js';
import './user_tagging_manager.css';
import { escapeHtml } from './utilities/escape_html.js';
import { sendMessage } from './utilities/send_message.js';

// ─── Variables ──────────────────────────────────────────────────────────────

const tbody = document.querySelector('#user-tags-tbody');
const searchUsername = document.querySelector('#search-username');
const searchTag = document.querySelector('#search-tag');
const modal = document.querySelector('#edit-tag-modal');
const editLabel = document.querySelector('#edit-tag-label');
const editColour = document.querySelector('#edit-tag-colour');
const editColourFg = document.querySelector('#edit-tag-colour-fg');
const editIcon = document.querySelector('#edit-tag-icon');
const btnAddToPresets = document.querySelector('#btn-add-to-presets');
const tagPreview = document.querySelector('#tag-preview');
const presetsList = document.querySelector('#presets-list');
const btnExport = document.querySelector('#btn-export-tags');
const btnImport = document.querySelector('#btn-import-tags');
const fileImport = document.querySelector('#file-import-tags');
const btnDeleteAll = document.querySelector('#btn-delete-all-tags');

let allTags = {};
let editingUsername = null;
let editingLinkUsername = null;
let colourPickerBg = null;
let colourPickerFg = null;
let sortState = { column: 'updated', direction: 'desc' };

// ─── i18n ───────────────────────────────────────────────────────────────────

const url = window.location.href;
const searchParams = new URLSearchParams(url);
const lang = searchParams.get('lang');
init_i18n(lang);

function init_i18n(lng) {
	i18next
		.use(HttpBackend)
		.init({
			lng: lng || 'en',
			fallbackLng: 'en',
			backend: {
				loadPath: '/_locales/{{lng}}/messages.json',
			},
			showSupportNotice: false,
		})
		.then(() => {
			translate();
			load();
		});
}

function translate() {
	document.querySelectorAll('[data-lang]').forEach(function (item) {
		const text = item.getAttribute('data-lang');
		if (text) {
			item.textContent = i18next.t(text + '.message');
		}
	});

	document.querySelectorAll('[data-lang-placeholder]').forEach(function (item) {
		const data_lang = item.getAttribute('data-lang-placeholder');
		item.placeholder = i18next.t(data_lang + '.message');
	});
}

// ─── Storage ────────────────────────────────────────────────────────────────

function normaliseUsername(username) {
	return username.toLowerCase().replace(/^u\//, '').replace(/\/+$/, '');
}

function readTags() {
	return new Promise((resolve) => {
		BROWSER_API.storage.local.get(['redditUserTags'], (result) => {
			resolve(result['redditUserTags'] || {});
		});
	});
}

function writeTags(tags) {
	return new Promise((resolve) => {
		BROWSER_API.storage.local.set({ ['redditUserTags']: tags }, () => {
			sendMessage({ userTagging: 'refresh' });
			resolve();
		});
	});
}

function readPresets() {
	return new Promise((resolve) => {
		BROWSER_API.storage.sync.get(['userTaggingPresets'], (result) => {
			resolve(result['userTaggingPresets'] || []);
		});
	});
}

// ─── Table Rendering ────────────────────────────────────────────────────────

async function load() {
	allTags = await readTags();
	renderTable();
	updateSortButtons();

	const prefillUser = searchParams.get('user');
	if (prefillUser) {
		searchUsername.value = prefillUser;
		renderTable();
	}
}

function renderTable(updatedUsername) {
	tbody.innerHTML = '';
	const usernameFilter = searchUsername.value.toLowerCase();
	const tagFilter = searchTag.value.toLowerCase();

	let entries = Object.entries(allTags).filter(([username, tag]) => {
		const matchesUsername = !usernameFilter || username.toLowerCase().includes(usernameFilter);
		const matchesTag = !tagFilter || (tag.label && tag.label.toLowerCase().includes(tagFilter));
		return matchesUsername && matchesTag;
	});

	if (sortState.column === 'username') {
		entries.sort(([a], [b]) => (sortState.direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));
	} else if (sortState.column === 'tag') {
		entries.sort(([, a], [, b]) => {
			const aLabel = (a.label || '').toLowerCase();
			const bLabel = (b.label || '').toLowerCase();
			return sortState.direction === 'asc' ? aLabel.localeCompare(bLabel) : bLabel.localeCompare(aLabel);
		});
	} else if (sortState.column === 'created') {
		entries.sort(([, a], [, b]) => (sortState.direction === 'asc' ? 1 : -1) * ((a.createdAt || 0) - (b.createdAt || 0)));
	} else if (sortState.column === 'updated') {
		entries.sort(([, a], [, b]) => (sortState.direction === 'asc' ? 1 : -1) * ((a.updatedAt || 0) - (b.updatedAt || 0)));
	}

	if (entries.length === 0) {
		const tr = document.createElement('tr');
		tr.innerHTML = `<td colspan="7" class="empty-row">${i18next.t('NoTaggedUsers.message')}</td>`;
		tbody.appendChild(tr);
	}

	entries.forEach(([username, tag]) => {
		const tr = document.createElement('tr');
		tr.dataset.username = username;
		if (updatedUsername && username === updatedUsername) {
			tr.classList.add('flash-update');
		}

		const userLink = 'https://www.reddit.com/user/' + username + '/';
		const tagLink = tag.link || '';

		tr.innerHTML = `<td>
							<a href="${userLink}" target="_blank" rel="noopener">u/${escapeHtml(username)}</a>
						</td>
						<td>
							<span class="tag-badge" title="${escapeHtml(tag.label)}"style="background: ${tag.colourBg || '#666'};--tag-fg: ${tag.colourFg || getContrastTextColour(tag.colourBg || '#666')}" data-username="${username}">
								${tag.icon && tag.icon !== 'none' ? `<span class="${getIconClass(tag.icon)}"></span>` : ''}
								<span>${escapeHtml(tag.label)}</span>
							</span>
						</td>
						<td class="note-cell" data-username="${username}" title="${i18next.t('ClickToEdit.message')}">${escapeHtml((tag.note || '').trim())}</td>
						<td class="link-cell" data-username="${username}">
							<div>
								${tagLink ? `<a href="${tagLink}" target="_blank" rel="noopener">${i18next.t('Link.message')}</a>` : '—'}
								<button class="btn btn-icon-link" data-username="${username}" title="${i18next.t('EditLink.message')}">
									<i class="btn-icon icon-pen"></i>
								</button>
							</div>
						</td>
						<td>${formatDateCell(tag.createdAt)}</td>
						<td>${formatDateCell(tag.updatedAt)}</td>
						<td>
							<button class="btn row-delete" data-username="${username}" title="${i18next.t('Delete.message')}">
								<div class="btn-icon icon-x"></div>
							</button>
						</td>`;

		tr.querySelector('.tag-badge').addEventListener('click', () => openEditModal(username, tag));

		tr.querySelector('.note-cell').addEventListener('click', () => startInlineEdit(tr, username));

		tr.querySelector('.btn-icon-link').addEventListener('click', () => openLinkModal(username, tag));

		tr.querySelector('.row-delete').addEventListener('click', () => showDeleteConfirm(username));

		tbody.appendChild(tr);
	});

	updateUserCount();
}

function updateUserCount() {
	const countEl = document.querySelector('#user-count');
	if (countEl) {
		countEl.textContent = '(' + Object.keys(allTags).length + ')';
	}
}

function formatDateCell(timestamp) {
	if (!timestamp) return '<span class="date-cell">—</span>';
	const date = new Date(timestamp);
	const dateStr = date.toLocaleDateString();
	const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	return `<span class="date-cell" title="${dateStr} ${timeStr}">${dateStr}</span>`;
}

// ─── Import / Export / Delete All ───────────────────────────────────────────

btnImport.addEventListener('click', () => {
	fileImport.click();
});

fileImport.addEventListener('change', async (e) => {
	const file = e.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = async (event) => {
		try {
			const parsed = JSON.parse(event.target.result);
			let imported = {};

			if (parsed.redditUserTags) {
				imported = parsed.redditUserTags;
			} else if (parsed.data) {
				for (const [key, value] of Object.entries(parsed.data)) {
					if (key.startsWith('tag.')) {
						const username = key.slice(4).toLowerCase();
						const bgColour = value.color || '#666';
						const link = value.link || '';
						imported[username] = {
							label: value.text || username,
							note: '',
							link: link,
							colourBg: bgColour,
							colourFg: getContrastTextColour(bgColour),
							icon: 'none',
						};
					}
				}
			}

			const count = Object.keys(imported).length;
			if (count === 0) {
				showInfoModal(i18next.t('Error.message'), i18next.t('ImportInvalidFormat.message'));
				return;
			}

			allTags = { ...allTags, ...imported };
			await writeTags(allTags);
			renderTable();
			showInfoModal(i18next.t('Complete.message'), i18next.t('ImportSuccess.message').replace('{count}', count));
		} catch (err) {
			showInfoModal(i18next.t('Error.message'), i18next.t('ImportInvalidFormat.message'));
		}
		fileImport.value = '';
	};
	reader.readAsText(file);
});

btnExport.addEventListener('click', () => {
	const exportData = { redditUserTags: allTags };
	const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'RE_user_tags_' + new Date().toISOString().slice(0, 10) + '.json';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
});

btnDeleteAll.addEventListener('click', async () => {
	showDeleteAllConfirm();
});

// ─── Search / Sort ──────────────────────────────────────────────────────────

searchUsername.addEventListener('input', renderTable);
searchTag.addEventListener('input', renderTable);

document.querySelector('#btn-clear-search').addEventListener('click', function () {
	searchUsername.value = '';
	searchTag.value = '';
	renderTable();
});

document.querySelectorAll('.sort-btn').forEach((btn) => {
	btn.addEventListener('click', () => {
		const column = btn.dataset.sort;
		if (sortState.column === column) {
			if (sortState.direction === null) {
				sortState.direction = 'asc';
			} else if (sortState.direction === 'asc') {
				sortState.direction = 'desc';
			} else {
				sortState.column = null;
				sortState.direction = null;
			}
		} else {
			sortState.column = column;
			sortState.direction = 'asc';
		}
		updateSortButtons();
		renderTable();
	});
});

function updateSortButtons() {
	document.querySelectorAll('.sort-btn').forEach((btn) => {
		const column = btn.dataset.sort;
		const icon = btn.querySelector('.btn-icon');
		btn.classList.remove('active');
		icon.className = 'btn-icon icon-sort';

		if (sortState.column === column && sortState.direction) {
			btn.classList.add('active');
			if (column === 'created' || column === 'updated') {
				icon.className = 'btn-icon icon-sort-' + (sortState.direction === 'asc' ? 'up' : 'down');
			} else {
				icon.className = 'btn-icon icon-sort-' + (sortState.direction === 'asc' ? 'a-z' : 'z-a');
			}
		}
	});
}

// ─── Inline Note Editing ────────────────────────────────────────────────────

function startInlineEdit(tr, username) {
	const cell = tr.querySelector('.note-cell');
	if (cell.dataset.editing === 'true') return;

	const currentNote = allTags[username]?.note || '';
	cell.dataset.editing = 'true';
	cell.contentEditable = 'true';
	cell.textContent = currentNote;
	cell.focus();

	const finish = async () => {
		cell.contentEditable = 'false';
		cell.dataset.editing = 'false';
		cell.title = i18next.t('ClickToEdit.message');
		const newNote = (cell.innerText || '').trim();
		if (allTags[username] && newNote !== (allTags[username].note || '')) {
			allTags[username].note = newNote;
			allTags[username].updatedAt = Date.now();
			await writeTags(allTags);
			renderTable(username);
		}
	};

	cell.addEventListener('blur', finish, { once: true });
	cell.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			if (e.shiftKey) {
				e.preventDefault();
				document.execCommand('insertLineBreak');
			} else {
				e.preventDefault();
				cell.blur();
			}
		}
	});
}

// ─── Delete User ────────────────────────────────────────────────────────────

const deleteConfirmModal = document.querySelector('#delete-confirm-modal');
const deleteConfirmText = document.querySelector('#delete-confirm-text');
const btnConfirmDelete = document.querySelector('#btn-confirm-delete');
const btnCancelDelete = document.querySelector('#btn-cancel-delete');

let deleteTargetUsername = null;

btnConfirmDelete.addEventListener('click', async () => {
	if (deleteTargetUsername) {
		delete allTags[deleteTargetUsername];
		await writeTags(allTags);
		renderTable();
	} else {
		allTags = {};
		await writeTags(allTags);
		renderTable();
	}
	deleteConfirmModal.classList.add('hidden');
	deleteTargetUsername = null;
});

btnCancelDelete.addEventListener('click', () => {
	deleteConfirmModal.classList.add('hidden');
	deleteTargetUsername = null;
});

function showDeleteConfirm(username) {
	deleteTargetUsername = username;
	deleteConfirmText.textContent = `Delete tag for u/${username}?`;
	deleteConfirmModal.classList.remove('hidden');
}

function showDeleteAllConfirm() {
	deleteTargetUsername = null;
	deleteConfirmText.textContent = i18next.t('ConfirmDeleteAll.message');
	deleteConfirmModal.classList.remove('hidden');
}

deleteConfirmModal.addEventListener('click', (e) => {
	if (e.target === deleteConfirmModal) {
		deleteConfirmModal.classList.add('hidden');
		deleteTargetUsername = null;
	}
});

// ─── Info Modal ─────────────────────────────────────────────────────────────

const infoModal = document.querySelector('#info-modal');
const infoModalTitle = document.querySelector('#info-modal h2');
const infoModalText = document.querySelector('#info-modal-text');
const btnCloseInfo = document.querySelector('#btn-close-info');

btnCloseInfo.addEventListener('click', () => {
	infoModal.classList.add('hidden');
});

infoModal.addEventListener('click', (e) => {
	if (e.target === infoModal) {
		infoModal.classList.add('hidden');
	}
});

function showInfoModal(title, message) {
	infoModalTitle.textContent = title;
	infoModalText.textContent = message;
	infoModal.classList.remove('hidden');
}

// ─── Edit Link Modal ─────────────────────────────────────────────────────────

const linkModal = document.querySelector('#edit-link-modal');
const editLinkInput = document.querySelector('#edit-link-input');
const btnClearLink = document.querySelector('#btn-clear-link');
const btnSaveLink = document.querySelector('#btn-save-link');
const btnCancelLink = document.querySelector('#btn-cancel-link');

function openLinkModal(username, tag) {
	editingLinkUsername = username;
	editLinkInput.value = tag.link || '';
	linkModal.classList.remove('hidden');
	editLinkInput.focus();
}

btnSaveLink.addEventListener('click', async () => {
	if (!editingLinkUsername) return;
	const tag = allTags[editingLinkUsername];
	if (tag) {
		tag.link = editLinkInput.value.trim();
		tag.updatedAt = Date.now();
		await writeTags(allTags);
		renderTable(editingLinkUsername);
	}
	linkModal.classList.add('hidden');
	editingLinkUsername = null;
});

btnCancelLink.addEventListener('click', () => {
	linkModal.classList.add('hidden');
	editingLinkUsername = null;
});

btnClearLink.addEventListener('click', () => {
	editLinkInput.value = '';
	editLinkInput.focus();
});

linkModal.addEventListener('click', (e) => {
	if (e.target === linkModal) {
		linkModal.classList.add('hidden');
		editingLinkUsername = null;
	}
});

// ─── Add User Tag ───────────────────────────────────────────────────────────

document.querySelector('#btn-add-user-tag').addEventListener('click', () => {
	const existing = tbody.querySelector('.add-user-row');
	if (existing) {
		existing.querySelector('input').focus();
		return;
	}

	const tr = document.createElement('tr');
	tr.className = 'add-user-row';
	tr.innerHTML = `<td><input type="text" placeholder="username" /></td>
					<td><input type="text" placeholder="label" /></td>
					<td><input type="text" placeholder="note (optional)" /></td>
					<td></td>
					<td style="display: none"></td>
					<td style="display: none"></td>
					<td class="actions">
						<button class="btn btn-row-save" title="Save">
							<i class="btn-icon icon-tick"></i>
						</button>
						<button class="btn btn-row-cancel" title="Cancel">
							<i class="btn-icon icon-x"></i>
						</button>
					</td>`;

	tbody.appendChild(tr);
	tr.querySelector('input').focus();

	const saveNewTag = async () => {
		const inputs = tr.querySelectorAll('input');
		const rawUsername = inputs[0].value.trim();
		const label = inputs[1].value.trim();
		const note = inputs[2].value.trim();

		if (!rawUsername || !label) {
			tr.remove();
			return;
		}

		const username = normaliseUsername(rawUsername);
		const timestamp = Date.now();
		allTags[username] = {
			label: label,
			note: note,
			colourBg: '#666',
			colourFg: '#fff',
			icon: 'none',
			createdAt: timestamp,
			updatedAt: timestamp,
		};
		await writeTags(allTags);
		renderTable(username);
		const tableScroll = document.querySelector('.table-scroll');
		if (tableScroll) tableScroll.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const cancelNewTag = () => tr.remove();

	tr.querySelector('.btn-row-save').addEventListener('click', saveNewTag);
	tr.querySelector('.btn-row-cancel').addEventListener('click', cancelNewTag);
});

// ─── Edit Modal ─────────────────────────────────────────────────────────────

function openEditModal(username, tag) {
	editingUsername = username;
	editLabel.value = tag.label || '';
	editColour.value = tag.colourBg || '#666';
	editColourFg.value = tag.colourFg || getContrastTextColour(tag.colourBg || '#666');
	editIcon.value = tag.icon || 'none';
	modal.classList.remove('hidden');
	editLabel.focus();

	destroyColourPickers();

	const picker = new ColorPicker(editColour, {
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
		editColour.value = hex;
		updateTagPreview();
	});

	colourPickerBg = picker;

	const pickerFg = new ColorPicker(editColourFg, {
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
		editColourFg.value = hex;
		updateTagPreview();
	});

	colourPickerFg = pickerFg;
	updateTagPreview();
	loadPresetsList();
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

document.querySelector('#btn-cancel-tag').addEventListener('click', () => {
	modal.classList.add('hidden');
	editingUsername = null;
	destroyColourPickers();
});

document.querySelector('#btn-save-tag').addEventListener('click', async () => {
	if (!editingUsername) return;
	const tag = allTags[editingUsername];
	if (!tag) return;

	tag.label = editLabel.value.trim();
	tag.colourBg = editColour.value;
	tag.colourFg = editColourFg.value;
	tag.icon = editIcon.value;
	tag.updatedAt = Date.now();

	if (!tag.label) {
		modal.classList.add('hidden');
		editingUsername = null;
		return;
	}

	await writeTags(allTags);
	modal.classList.add('hidden');
	const updatedUsername = editingUsername;
	editingUsername = null;
	renderTable(updatedUsername);
});

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.classList.add('hidden');
		editingUsername = null;
		destroyColourPickers();
	}
});

// ─── Tag Preview ────────────────────────────────────────────────────────────

function getIconClass(iconValue) {
	if (iconValue && iconValue !== 'none') {
		return 'icon icon-' + iconValue;
	}
	return 'icon';
}

function updateTagPreview() {
	const label = editLabel.value.trim() || 'Preview';
	const colour = editColour.value || '#666';
	const colourFg = editColourFg.value || getContrastTextColour(colour);
	const icon = editIcon.value || 'none';
	tagPreview.style.background = colour;
	tagPreview.style.color = colourFg;
	tagPreview.style.setProperty('--tag-fg', colourFg);
	tagPreview.title = label;

	tagPreview.replaceChildren();

	if (icon && icon !== 'none') {
		const iconEl = document.createElement('span');
		iconEl.className = getIconClass(icon);
		tagPreview.appendChild(iconEl);
	}

	const labelEl = document.createElement('span');
	labelEl.textContent = label;
	tagPreview.appendChild(labelEl);
}

editLabel.addEventListener('input', updateTagPreview);
editColour.addEventListener('input', updateTagPreview);
editColourFg.addEventListener('input', updateTagPreview);
editIcon.addEventListener('change', updateTagPreview);

// ─── Add to Presets ─────────────────────────────────────────────────────────

btnAddToPresets.addEventListener('click', async () => {
	if (!editingUsername) return;
	const tag = allTags[editingUsername];
	if (!tag) return;

	const label = editLabel.value.trim();
	if (!label) return;

	const presets = await readPresets();
	const newColour = editColour.value || '#666';
	const newColourFg = editColourFg.value || getContrastTextColour(newColour);
	const exists = presets.some((p) => p.label.toLowerCase() === label.toLowerCase() && (p.icon || 'none') === (editIcon.value || 'none') && (p.colour || '#666').toLowerCase() === newColour.toLowerCase() && (p.colourFg || getContrastTextColour(p.colour || '#666')).toLowerCase() === newColourFg.toLowerCase());
	if (exists) {
		btnAddToPresets.textContent = 'Already exists';
		btnAddToPresets.disabled = true;
		setTimeout(() => {
			btnAddToPresets.textContent = i18next.t('AddToPresets.message');
			btnAddToPresets.disabled = false;
		}, 1500);
		return;
	}

	const newPreset = {
		id: 'preset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
		label: label,
		defaultNote: tag.note || '',
		colour: editColour.value || '#666',
		colourFg: editColourFg.value || getContrastTextColour(editColour.value || '#666'),
		icon: editIcon.value || 'none',
	};

	presets.push(newPreset);
	await new Promise((resolve) => {
		BROWSER_API.storage.sync.set({ ['userTaggingPresets']: presets }, resolve);
	});

	loadPresetsList();
});

// ─── Presets List ───────────────────────────────────────────────────────────

async function loadPresetsList() {
	const presets = await readPresets();
	presetsList.innerHTML = '';

	if (presets.length === 0) {
		presetsList.innerHTML = `<span class="no-presets">${i18next.t('NoPresetsYet.message')}</span>`;
		return;
	}

	presets.forEach((preset) => {
		const tag = document.createElement('span');
		tag.className = 'preset-tag';
		tag.style.background = preset.colour || '#666';
		tag.style.setProperty('--tag-fg', preset.colourFg || getContrastTextColour(preset.colour || '#666'));
		tag.title = escapeHtml(preset.label);

		if (preset.icon && preset.icon !== 'none') {
			const iconEl = document.createElement('span');
			iconEl.className = getIconClass(preset.icon);
			tag.appendChild(iconEl);
		}

		const labelEl = document.createElement('span');
		labelEl.textContent = preset.label;
		tag.appendChild(labelEl);

		tag.addEventListener('click', () => {
			editLabel.value = preset.label || '';
			editIcon.value = preset.icon || 'none';

			const bgColour = preset.colour || '#666';
			const fgColour = preset.colourFg || getContrastTextColour(bgColour);

			editColour.value = bgColour;
			editColourFg.value = fgColour;

			if (colourPickerBg) {
				colourPickerBg.setColor(bgColour, true);
			}
			if (colourPickerFg) {
				colourPickerFg.setColor(fgColour, true);
			}
		});

		presetsList.appendChild(tag);
	});
}
