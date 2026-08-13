// ────────────────────────────────────────────────────────────────────────────
// User Tagging Manager
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import ColorPicker from './popup/libs/colorpicker.js';
import './user_tagging_manager.css';
import { escapeHtml } from './utilities/escape_html.js';
import { sendMessage } from './utilities/send_message.js';
import { getContrastTextColour } from './utilities/colour_functions.js';
import { parseHtmlString } from './utilities/parse_html_string.js';

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

const importConflictsModal = document.querySelector('#import-conflicts-modal');
const importConflictsSummary = document.querySelector('#import-conflicts-summary');
const importConflictsList = document.querySelector('#import-conflicts-list');
const btnImportCommit = document.querySelector('#btn-import-commit');
const btnImportCancel = document.querySelector('#btn-import-cancel');

let pendingImportTags = null;
let pendingImportConflicts = [];
let pendingSkippedExact = 0;

let allTags = {};
let batchTagMode = false;
let colourPickerBg = null;
let colourPickerFg = null;
let deleteTargetUsername = null;
let editingLinkUsername = null;
let editingUsername = null;
let pendingBatchTag = null;
let selectedUsernames = new Set();
let sortState = { column: 'updated', direction: 'desc' };

const selectAllCheckbox = document.querySelector('#select-all-checkbox');
const btnDeleteSelected = document.querySelector('#btn-delete-selected-tags');
const btnSetTagSelected = document.querySelector('#btn-set-tag-selected');

const url = window.location.href;
const searchParams = new URLSearchParams(url);

// ─── Theme ──────────────────────────────────────────────────────────────────

let theme = searchParams.get('theme');
const autoTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

if (theme === 'auto') {
	theme = autoTheme;
}

if (theme === 'light') {
	document.querySelector('body').classList.add('theme-light');
} else if (theme === 'classic-light') {
	document.querySelector('body').classList.add('theme-classic-light');
} else if (theme === 'grey') {
	document.querySelector('body').classList.add('theme-grey');
} else {
	document.querySelector('body').classList.add('theme-dark');
}

// ─── i18n ───────────────────────────────────────────────────────────────────

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
	return username.trim().replace(/^u\//i, '').replace(/\/+$/, '');
}

function getLowercaseUsername(username) {
	return normaliseUsername(username).toLowerCase();
}

function getTagByCaseInsensitiveUsername(tags, username) {
	if (!username) return null;
	const lowerUsername = getLowercaseUsername(username);
	for (const key of Object.keys(tags)) {
		if (getLowercaseUsername(key) === lowerUsername) {
			return { storedUsername: key, tag: tags[key] };
		}
	}
	return null;
}

function tagsAreEqual(a, b) {
	if (!a || !b) return false;
	const fields = ['label', 'note', 'link', 'colourBg', 'colourFg', 'icon', 'createdAt', 'updatedAt'];
	return fields.every((field) => (a[field] ?? '') === (b[field] ?? ''));
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
	tbody.textContent = '';
	const usernameFilter = searchUsername.value.toLowerCase();
	const tagFilter = searchTag.value.toLowerCase();

	let entries = Object.entries(allTags).filter(([username, tag]) => {
		const matchesUsername = !usernameFilter || getLowercaseUsername(username).includes(usernameFilter);
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

	const duplicateUsernames = new Set();
	const lowerToOriginal = {};
	entries.forEach(([username]) => {
		const lower = getLowercaseUsername(username);
		if (lowerToOriginal[lower]) {
			duplicateUsernames.add(username);
			duplicateUsernames.add(lowerToOriginal[lower]);
		} else {
			lowerToOriginal[lower] = username;
		}
	});

	if (entries.length === 0) {
		const tr = document.createElement('tr');
		const emptyRowHtml = `<td colspan="8" class="empty-row">${i18next.t('NoTaggedUsers.message')}</td>`;
		tr.appendChild(parseHtmlString(emptyRowHtml));
		tbody.appendChild(tr);
	}

	entries.forEach(([username, tag]) => {
		const tr = document.createElement('tr');
		tr.dataset.username = username;
		if (duplicateUsernames.has(username)) {
			tr.classList.add('duplicate-row');
		}
		if (updatedUsername && username === updatedUsername) {
			tr.classList.add('flash-update');
		}
		if (selectedUsernames.has(username)) {
			tr.classList.add('row-selected');
		}

		const userLink = 'https://www.reddit.com/user/' + username + '/';
		const tagLink = tag.link || '';
		const isChecked = selectedUsernames.has(username) ? 'checked' : '';

		const rowHtml = `<td class="select-col">
							<input type="checkbox" class="row-select-checkbox" data-username="${username}" ${isChecked} />
						</td>
						<td>
							<a href="${userLink}" target="_blank" rel="noopener">u/${escapeHtml(username)}</a>
						</td>
						<td>
							<span class="tag-badge" title="${escapeHtml(tag.label)}" style="background: ${tag.colourBg || '#666'};--tag-fg: ${tag.colourFg || getContrastTextColour(tag.colourBg || '#666')}" data-username="${username}">
								${tag.icon && tag.icon !== 'none' ? `<span class="${getIconClass(tag.icon)}"></span>` : ''}
								<span>${escapeHtml(tag.label)}</span>
							</span>
						</td>
						<td class="note-cell" data-username="${username}" title="${i18next.t('ClickToEdit.message')}">${escapeHtml((tag.note || '').trim())}</td>
						<td class="link-cell" data-username="${username}">
							<div>
								${tagLink ? `<a href="${tagLink}" target="_blank" rel="noopener">${i18next.t('Link.message')}</a>` : '—'}
								<button class="btn-sm btn-icon-link" data-username="${username}" title="${i18next.t('EditLink.message')}">
									<i class="btn-icon icon-pen"></i>
								</button>
							</div>
						</td>
						<td>${formatDateCell(tag.createdAt)}</td>
						<td>${formatDateCell(tag.updatedAt)}</td>
						<td class="action-cell">
							<button class="btn-sm row-delete" data-username="${username}" title="${i18next.t('Delete.message')}">
								<div class="btn-icon icon-x"></div>
							</button>
						</td>`;
		tr.appendChild(parseHtmlString(rowHtml));

		tr.querySelector('.row-select-checkbox').addEventListener('change', (e) => {
			if (e.target.checked) {
				selectedUsernames.add(username);
				tr.classList.add('row-selected');
			} else {
				selectedUsernames.delete(username);
				tr.classList.remove('row-selected');
			}
			updateSelectionUI();
		});

		tr.querySelector('.tag-badge').addEventListener('click', () => {
			batchTagMode = false;
			openEditModal(username, tag);
		});

		tr.querySelector('.note-cell').addEventListener('click', () => startInlineEdit(tr, username));

		tr.querySelector('.btn-icon-link').addEventListener('click', () => openLinkModal(username, tag));

		tr.querySelector('.row-delete').addEventListener('click', () => showDeleteConfirm(username));

		tbody.appendChild(tr);
	});

	updateSelectionUI();
	updateUserCount();
}

function updateUserCount() {
	const countEl = document.querySelector('#user-count');
	if (countEl) {
		countEl.textContent = '(' + Object.keys(allTags).length + ')';
	}
}

function updateSelectionUI() {
	const visibleRows = tbody.querySelectorAll('tr[data-username]');
	const totalVisible = visibleRows.length;
	const selectedVisible = Array.from(visibleRows).filter((tr) => selectedUsernames.has(tr.dataset.username)).length;

	if (selectAllCheckbox) {
		selectAllCheckbox.checked = totalVisible > 0 && selectedVisible === totalVisible;
		selectAllCheckbox.indeterminate = selectedVisible > 0 && selectedVisible < totalVisible;
	}

	if (btnDeleteSelected) {
		if (selectedUsernames.size > 0) {
			btnDeleteSelected.classList.remove('hidden');
		} else {
			btnDeleteSelected.classList.add('hidden');
		}
	}

	if (btnSetTagSelected) {
		if (selectedUsernames.size >= 1) {
			btnSetTagSelected.classList.remove('hidden');
		} else {
			btnSetTagSelected.classList.add('hidden');
		}
	}
}

function deleteSelected() {
	if (selectedUsernames.size === 0) return;
	for (const username of selectedUsernames) {
		delete allTags[username];
	}
	selectedUsernames.clear();
	writeTags(allTags).then(() => {
		renderTable();
		updateSelectionUI();
	});
}

if (selectAllCheckbox) {
	selectAllCheckbox.addEventListener('change', () => {
		const visibleRows = tbody.querySelectorAll('tr[data-username]');
		if (selectAllCheckbox.checked) {
			visibleRows.forEach((tr) => {
				selectedUsernames.add(tr.dataset.username);
				tr.classList.add('row-selected');
				const checkbox = tr.querySelector('.row-select-checkbox');
				if (checkbox) checkbox.checked = true;
			});
		} else {
			visibleRows.forEach((tr) => {
				selectedUsernames.delete(tr.dataset.username);
				tr.classList.remove('row-selected');
				const checkbox = tr.querySelector('.row-select-checkbox');
				if (checkbox) checkbox.checked = false;
			});
		}
		updateSelectionUI();
	});
}

if (btnDeleteSelected) {
	btnDeleteSelected.addEventListener('click', () => {
		deleteTargetUsername = '__selected__';
		deleteConfirmText.textContent = i18next.t('DeleteSelectedTagsConfirm.message').replace('{count}', selectedUsernames.size);
		deleteConfirmModal.classList.remove('hidden');
	});
}

if (btnSetTagSelected) {
	btnSetTagSelected.addEventListener('click', () => {
		if (selectedUsernames.size < 2) return;
		const firstUsername = Array.from(selectedUsernames)[0];
		const firstTag = allTags[firstUsername];
		batchTagMode = true;
		openEditModal(
			firstUsername,
			firstTag || {
				label: '',
				note: '',
				colourBg: '#666',
				colourFg: '#fff',
				icon: 'none',
				createdAt: Date.now(),
				updatedAt: Date.now(),
			},
		);
	});
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
						imported[username] = {
							label: value.text || username,
							note: '',
							link: value.link || '',
							colourBg: bgColour,
							colourFg: getContrastTextColour(bgColour),
							icon: 'none',
						};
					}
				}
			}

			const nonConflicting = [];
			const conflicts = [];
			let skippedExact = 0;

			const lowercaseGroups = {};

			for (const [username, tag] of Object.entries(allTags)) {
				const lower = getLowercaseUsername(username);
				if (!lowercaseGroups[lower]) lowercaseGroups[lower] = [];
				lowercaseGroups[lower].push({ username, tag, source: 'existing' });
			}

			for (const [importUsername, importTag] of Object.entries(imported)) {
				const lower = getLowercaseUsername(importUsername);
				if (!lowercaseGroups[lower]) lowercaseGroups[lower] = [];
				lowercaseGroups[lower].push({ username: importUsername, tag: importTag, source: 'imported' });
			}

			for (const group of Object.values(lowercaseGroups)) {
				const existingItems = group.filter((item) => item.source === 'existing');
				const importedItems = group.filter((item) => item.source === 'imported');

				if (existingItems.length === 0) {
					if (importedItems.length === 1) {
						nonConflicting.push({ username: importedItems[0].username, tag: importedItems[0].tag });
					} else if (importedItems.length > 1) {
						conflicts.push({
							username: group[0].username,
							variants: group,
						});
					}
					continue;
				}

				if (importedItems.length === 0) continue;

				const conflictingImported = [];
				let skippedIdentical = 0;

				for (const imported of importedItems) {
					const isIdentical = existingItems.some((existing) => tagsAreEqual(imported.tag, existing.tag));
					if (isIdentical) {
						skippedIdentical++;
					} else {
						conflictingImported.push(imported);
					}
				}

				if (conflictingImported.length === 0) {
					skippedExact += skippedIdentical;
					continue;
				}

				const variants = [...existingItems, ...conflictingImported];
				conflicts.push({
					username: group[0].username,
					variants: variants,
				});
			}

			if (Object.keys(imported).length === 0) {
				showInfoModal(i18next.t('Error.message'), i18next.t('ImportInvalidFormat.message'));
				return;
			}

			if (conflicts.length > 0) {
				showImportConflictsModal(nonConflicting, conflicts, skippedExact);
			} else {
				const mergedTags = { ...allTags };
				for (const item of nonConflicting) {
					mergedTags[item.username] = item.tag;
				}
				allTags = mergedTags;
				await writeTags(allTags);
				renderTable();
				const totalImported = nonConflicting.length;
				let message = i18next.t('ImportSuccess.message').replace('{count}', totalImported);
				if (skippedExact > 0) {
					message += `\n${i18next.t('ImportSkippedExact.message').replace('{count}', skippedExact)}`;
				}
				showInfoModal(i18next.t('Complete.message'), message);
			}
		} catch (err) {
			showInfoModal(i18next.t('Error.message'), i18next.t('ImportInvalidFormat.message'));
		}
		fileImport.value = '';
	};
	reader.onerror = () => {
		showInfoModal(i18next.t('Error.message'), 'Failed to read file.');
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
			} else if (e.key === 'Escape') {
				cell.textContent = currentNote; // revert
				cell.blur();
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

btnConfirmDelete.addEventListener('click', async () => {
	if (deleteTargetUsername === '__selected__') {
		for (const username of selectedUsernames) {
			delete allTags[username];
		}
		selectedUsernames.clear();
		await writeTags(allTags);
		renderTable();
		updateSelectionUI();
	} else if (deleteTargetUsername) {
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
	document.querySelector('#btn-confirm-delete').textContent = i18next.t('Delete.message');
	deleteTargetUsername = null;
});

function showDeleteConfirm(username) {
	deleteTargetUsername = username;
	deleteConfirmText.textContent = i18next.t('DeleteTagForUser.message').replace('{username}', username);
	document.querySelector('#btn-confirm-delete').textContent = i18next.t('Delete.message');
	deleteConfirmModal.classList.remove('hidden');
}

deleteConfirmModal.addEventListener('click', (e) => {
	if (e.target === deleteConfirmModal) {
		deleteConfirmModal.classList.add('hidden');
		document.querySelector('#btn-confirm-delete').textContent = i18next.t('Delete.message');
		deleteTargetUsername = null;
	}
});

// ─── Batch Edit ─────────────────────────────────────────────────────────────

const batchTagConfirmModal = document.querySelector('#batch-tag-confirm-modal');
const batchTagConfirmText = document.querySelector('#batch-tag-confirm-text');
const btnConfirmBatchTag = document.querySelector('#btn-confirm-batch-tag');
const btnCancelBatchTag = document.querySelector('#btn-cancel-batch-tag');

btnConfirmBatchTag.addEventListener('click', async () => {
	if (!pendingBatchTag) return;
	const timestamp = Date.now();
	for (const username of selectedUsernames) {
		allTags[username] = {
			...allTags[username],
			...pendingBatchTag,
			updatedAt: timestamp,
		};
	}
	await writeTags(allTags);
	renderTable();
	updateSelectionUI();
	pendingBatchTag = null;
	batchTagConfirmModal.classList.add('hidden');
});

btnCancelBatchTag.addEventListener('click', () => {
	batchTagConfirmModal.classList.add('hidden');
	pendingBatchTag = null;
});

batchTagConfirmModal.addEventListener('click', (e) => {
	if (e.target === batchTagConfirmModal) {
		batchTagConfirmModal.classList.add('hidden');
		pendingBatchTag = null;
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

// ─── Import Modal ───────────────────────────────────────────────────────────

btnImportCommit.addEventListener('click', async () => {
	const mergedTags = { ...allTags };
	let importedCount = 0;
	for (let i = 0; i < pendingImportConflicts.length; i++) {
		const conflict = pendingImportConflicts[i];
		const radio = importConflictsList.querySelector(`input[name="conflict-${i}"]:checked`);
		if (!radio) continue;
		const chosenVariant = conflict.variants[parseInt(radio.value)];
		const lowerUsername = getLowercaseUsername(chosenVariant.username);
		const keysToRemove = Object.keys(mergedTags).filter((k) => getLowercaseUsername(k) === lowerUsername);
		keysToRemove.forEach((k) => delete mergedTags[k]);
		mergedTags[chosenVariant.username] = chosenVariant.tag;
		if (chosenVariant.source === 'imported') {
			importedCount++;
		}
	}
	for (const item of pendingImportTags.nonConflicting) {
		mergedTags[item.username] = item.tag;
		importedCount++;
	}
	allTags = mergedTags;
	await writeTags(allTags);
	renderTable();
	importConflictsModal.classList.add('hidden');
	pendingImportTags = null;
	pendingImportConflicts = [];
	pendingSkippedExact = 0;
	let message = i18next.t('ImportSuccess.message').replace('{count}', importedCount);
	showInfoModal(i18next.t('Complete.message'), message);
});

btnImportCancel.addEventListener('click', () => {
	importConflictsModal.classList.add('hidden');
	pendingImportTags = null;
	pendingImportConflicts = [];
	pendingSkippedExact = 0;
});

importConflictsModal.addEventListener('click', (e) => {
	if (e.target === importConflictsModal) {
		importConflictsModal.classList.add('hidden');
		pendingImportTags = null;
		pendingImportConflicts = [];
		pendingSkippedExact = 0;
	}
});

function showImportConflictsModal(nonConflicting, conflicts, skippedExact) {
	pendingImportTags = { nonConflicting };
	pendingImportConflicts = conflicts;
	pendingSkippedExact = skippedExact || 0;
	const totalNew = nonConflicting.length;
	importConflictsSummary.textContent = i18next.t('ImportConflictsSummary.message').replace('{totalNew}', totalNew).replace('{skippedExact}', skippedExact).replace('{conflictsCount}', conflicts.length);

	console.log('[RedditEnhancer] Importing tags...');
	const conflictsHtml = conflicts
		.map((conflict, index) => {
			const variantsHtml = conflict.variants
				.map((variant, variantIndex) => {
					console.log(variant);
					const tagPreviewHtml = variant.tag.icon && variant.tag.icon !== 'none' ? `<span class="icon icon-${variant.tag.icon}"></span>` : '';
					const noteHtml = variant.tag.note ? escapeHtml(variant.tag.note) : `<span class="import-conflict-empty">${i18next.t('NoNote.message')}</span>`;
					const linkHtml = variant.tag.link ? `<a href="${variant.tag.link}" target="_blank" rel="noopener" class="import-conflict-link">${escapeHtml(variant.tag.link)}</a>` : '<span class="import-conflict-empty">No link</span>';
					return `<label class="import-conflict-option">
								<input type="radio" name="conflict-${index}" value="${variantIndex}" ${variantIndex === 0 ? 'checked' : ''} />
								<div class="import-conflict-details">
									<div class="import-conflict-field-label">
										<span>${i18next.t('Username.message')}</span>
										<div class="import-conflict-note">${variant.username}</div>
									</div>
									<div class="import-conflict-field-label">
										<span>${i18next.t('Tag.message')}</span>
										<div class="import-conflict-tag-preview" style="background:${variant.tag.colourBg || '#666'};--tag-fg:${variant.tag.colourFg || getContrastTextColour(variant.tag.colourBg || '#666')}">
											${tagPreviewHtml}
											<span>${escapeHtml(variant.tag.label)}</span>
										</div>
									</div>
									<div class="import-conflict-field-label">
										<span>${i18next.t('Note.message')}</span>
										<div class="import-conflict-note">${noteHtml}</div>
									</div>
									<div class="import-conflict-field-label">
										<span>${i18next.t('Link.message')}</span>
										<div>${linkHtml}</div>
									</div>
								</div>
								<span class="import-conflict-badge ${variant.source === 'existing' ? 'existing' : 'imported'}">${variant.source === 'existing' ? i18next.t('Existing.message') : i18next.t('Imported.message')}</span>
							</label>`;
				})
				.join('');

			return `<div class="import-conflict">
						<div class="import-conflict-header">u/${normaliseUsername(conflict.username)}</div>
						<div class="import-conflict-options">${variantsHtml}</div>
					</div>`;
		})
		.join('');
	importConflictsList.textContent = '';
	importConflictsList.appendChild(parseHtmlString(conflictsHtml));

	importConflictsList.querySelectorAll('.import-conflict-option').forEach((option) => {
		const radio = option.querySelector('input[type="radio"]');
		if (!radio) return;
		option.addEventListener('click', function () {
			if (this.tagName === 'A') return;
			const name = radio.name;
			importConflictsList.querySelectorAll(`input[name="${name}"]`).forEach((r) => (r.checked = false));
			radio.checked = true;
			this.closest('.import-conflict-options')
				.querySelectorAll('input')
				.forEach((radio) => {
					radio.removeAttribute('checked');
				});
			radio.setAttribute('checked', '');
		});
	});

	importConflictsModal.classList.remove('hidden');
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
	const addRowHtml = `<td class="select-col"></td>
						<td><input type="text" data-field="username" placeholder="${i18next.t('Username.message')}" /></td>
						<td><input type="text" data-field="label" placeholder="${i18next.t('Label.message')}" /></td>
						<td><input type="text" data-field="note" placeholder="${i18next.t('NoteOptional.message')}" /></td>
						<td style="display: none"></td>
						<td style="display: none"></td>
						<td style="display: none"></td>
						<td class="actions" style="margin-top: 1px;">
							<button class="btn-sm green btn-row-save" title="${i18next.t('Save.message')}">
								<i class="btn-icon icon-tick"></i>
							</button>
							<button class="btn-sm btn-row-cancel" title="${i18next.t('Cancel.message')}">
								<i class="btn-icon icon-x"></i>
							</button>
						</td>`;
	tr.appendChild(parseHtmlString(addRowHtml));

	tbody.appendChild(tr);
	tr.querySelector('input').focus();

	const saveNewTag = async () => {
		const rawUsername = tr.querySelector('input[data-field="username"]').value.trim();
		const label = tr.querySelector('input[data-field="label"]').value.trim();
		const note = tr.querySelector('input[data-field="note"]').value.trim();

		if (!rawUsername || !label) {
			tr.remove();
			return;
		}

		const username = normaliseUsername(rawUsername);

		const existingMatch = getTagByCaseInsensitiveUsername(allTags, rawUsername);
		if (existingMatch) {
			const warning = document.querySelector('#user-already-added-warning');
			warning.classList.remove('hidden');
			setTimeout(() => {
				warning.classList.add('hidden');
			}, 5000);

			const existingRow = tbody.querySelector(`tr[data-username="${CSS.escape(existingMatch.storedUsername)}"]`);
			if (existingRow) {
				existingRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
				existingRow.classList.remove('flash-warning');
				void existingRow.offsetWidth;
				existingRow.classList.add('flash-warning');
			}

			tr.remove();
			return;
		}

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
	batchTagMode = false;
	destroyColourPickers();
});

document.querySelector('#btn-save-tag').addEventListener('click', async () => {
	if (batchTagMode) {
		const label = editLabel.value.trim();
		if (!label) {
			modal.classList.add('hidden');
			editingUsername = null;
			batchTagMode = false;
			destroyColourPickers();
			return;
		}
		pendingBatchTag = {
			label: label,
			colourBg: editColour.value,
			colourFg: editColourFg.value,
			icon: editIcon.value,
		};
		modal.classList.add('hidden');
		editingUsername = null;
		destroyColourPickers();
		batchTagMode = false;
		batchTagConfirmText.textContent = i18next.t('SetTagForUsersConfirm.message').replace('{count}', selectedUsernames.size);
		batchTagConfirmModal.classList.remove('hidden');
		return;
	}

	const tag = allTags[editingUsername];
	const label = editLabel.value.trim();
	if (!editingUsername || !tag || !label) {
		modal.classList.add('hidden');
		editingUsername = null;
		return;
	}

	tag.label = label;
	tag.colourBg = editColour.value;
	tag.colourFg = editColourFg.value;
	tag.icon = editIcon.value;
	tag.updatedAt = Date.now();

	const existingMatch = getTagByCaseInsensitiveUsername(allTags, editingUsername);
	if (existingMatch && existingMatch.storedUsername !== editingUsername) {
		delete allTags[existingMatch.storedUsername];
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
		batchTagMode = false;
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
	const newColourBg = editColour.value || '#666';
	const newColourFg = editColourFg.value || getContrastTextColour(newColourBg);

	const exists = presets.some((p) => p.label.toLowerCase() === label.toLowerCase() && (p.icon || 'none') === (editIcon.value || 'none') && (p.colourBg || '#666').toLowerCase() === newColourBg.toLowerCase() && (p.colourFg || getContrastTextColour(p.colourBg || '#666')).toLowerCase() === newColourFg.toLowerCase());
	if (exists) {
		btnAddToPresets.textContent = i18next.t('PresetAlreadyExists.message');
		btnAddToPresets.disabled = true;
		setTimeout(() => {
			btnAddToPresets.textContent = i18next.t('AddToPresets.message');
			btnAddToPresets.disabled = false;
		}, 1500);
		return;
	}

	const newPreset = {
		id: 'preset_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11),
		label: label,
		defaultNote: tag.note || '',
		colourBg: newColourBg,
		colourFg: newColourFg,
		icon: editIcon.value || 'none',
	};

	presets.unshift(newPreset);
	await new Promise((resolve) => {
		BROWSER_API.storage.sync.set({ ['userTaggingPresets']: presets }, resolve);
	});

	loadPresetsList();
});

// ─── Presets List ───────────────────────────────────────────────────────────

async function loadPresetsList() {
	const presets = await readPresets();
	presetsList.textContent = '';

	if (presets.length === 0) {
		const noPresetsHtml = `<span class="no-presets">${i18next.t('NoPresetsYet.message')}</span>`;
		presetsList.appendChild(parseHtmlString(noPresetsHtml));
		return;
	}

	presets.forEach((preset) => {
		const tag = document.createElement('span');
		tag.className = 'preset-tag';
		tag.style.background = preset.colourBg || '#666';
		tag.style.setProperty('--tag-fg', preset.colourFg || getContrastTextColour(preset.colourBg || '#666'));
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

			const bgColour = preset.colourBg || '#666';
			const fgColour = preset.colourFg || getContrastTextColour(bgColour);

			editColour.value = bgColour;
			editColourFg.value = fgColour;

			if (colourPickerBg) {
				colourPickerBg.setColor(bgColour, true);
			}
			if (colourPickerFg) {
				colourPickerFg.setColor(fgColour, true);
			}
			updateTagPreview();
		});

		presetsList.appendChild(tag);
	});
}
