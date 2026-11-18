// ────────────────────────────────────────────────────────────────────────────
// Block Manager
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import './block_manager.css';
import { escapeHtml } from './utilities/escape_html.js';
import { parseHtmlString } from './utilities/parse_html_string.js';
import { validateRegexList, getInvalidRegexPatterns } from './utilities/safe_regex.js';
import { applyPageTheme } from './utilities/theme_list.js';
import { readBlocks, writeBlocks, findKey, addUserBlock, removeUserBlock, addSubredditBlock, removeSubredditBlock, addKeywordBlock, removeKeywordBlock } from './utilities/block_store.js';
import { isSafeMapKey } from './utilities/safe_map_key.js';
import { backupTimestamp, backupFilename, backupEnvelope } from './utilities/backup_format.js';
import { createWindowedTable } from './utilities/virtual_list.js';
import { showToast, showLoadingOverlay, hideLoadingOverlay } from './utilities/toast_notification.js';

const searchParams = new URLSearchParams(window.location.search);

// Show a loading overlay until the first render completes.
showLoadingOverlay('Loading...');

// ─── Theme ──────────────────────────────────────────────────────────────────

applyPageTheme(searchParams.get('theme'));

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
			showLoadingOverlay(i18next.t('Loading.message'));
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

// ─── State ──────────────────────────────────────────────────────────────────

let activeTab = searchParams.get('tab') || 'users';
if (!['users', 'subreddits', 'keywords'].includes(activeTab)) activeTab = 'users';
let deleteTarget = null;
let selectedBlocks = new Set();
let flashTarget = null;
// Per-tab sort state: { column, direction }. A null column/direction renders
// the store order (the order entries were added), like the Tag Manager's
// unsorted state. Session-only: resets when the page reloads.
const sortState = {
	users: { column: null, direction: null },
	subreddits: { column: null, direction: null },
	keywords: { column: null, direction: null },
};
let sortDirty = false;

// ─── Tabs ───────────────────────────────────────────────────────────────────

document.querySelectorAll('#block-tabs .re-tag-tab').forEach((tab) => {
	tab.addEventListener('click', () => {
		activeTab = tab.dataset.tab;
		document.querySelectorAll('#block-tabs .re-tag-tab').forEach((t) => t.classList.toggle('active', t === tab));
		document.querySelectorAll('[data-tab-pane]').forEach((pane) => pane.classList.toggle('hidden', pane.dataset.tabPane !== activeTab));
		const url = new URL(window.location.href);
		url.searchParams.set('tab', activeTab);
		history.pushState({}, '', url.toString());
		render();
	});
});

function syncTabUI() {
	document.querySelectorAll('#block-tabs .re-tag-tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === activeTab));
	document.querySelectorAll('[data-tab-pane]').forEach((pane) => pane.classList.toggle('hidden', pane.dataset.tabPane !== activeTab));
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function normaliseName(value) {
	return value
		.trim()
		.replace(/^[ur]\//i, '')
		.replace(/\/+$/, '');
}

async function saveStore(store, successMessage) {
	const result = await writeBlocks(store);
	if (!result.ok) {
		showToast('error', result.reason === 'read' ? 'Could not save the block list (the stored data could not be read — try "Delete Local Data" in the popup, then reopen).' : 'Could not save the block list (storage is full).');
		return false;
	}
	if (successMessage) showToast('success', successMessage);
	render();
	return true;
}

// Finds a store key case-insensitively (preserving its stored capitalisation).
function findStoreKey(obj, name) {
	return findKey(obj, name);
}

// ─── Render ─────────────────────────────────────────────────────────────────

async function load() {
	syncTabUI();
	updateSortButtons();
	await render();
	hideLoadingOverlay();
}

let lastFilter = null;

async function render() {
	const store = await readBlocks();
	const filter = document.querySelector('#search-blocks').value.trim().toLowerCase();
	const resetScroll = filter !== lastFilter || sortDirty;
	lastFilter = filter;
	sortDirty = false;
	// flashTarget is { tab, key, warning }: warning switches the flash from
	// the green "just added" to the orange "already existed, merged".
	const flashFor = (tab) => (flashTarget && flashTarget.tab === tab ? flashTarget : null);
	renderUsers(store, filter, resetScroll, flashFor('users'));
	renderSubreddits(store, filter, resetScroll, flashFor('subreddits'));
	renderKeywords(store, filter, resetScroll, flashFor('keywords'));
	const total = Object.keys(store.users || {}).length + Object.keys(store.subreddits || {}).length + (store.keywords || []).length;
	document.querySelector('#block-count-warning').classList.toggle('hidden', total <= 5000);
	flashTarget = null;
}

function emptyRowNode(colspan) {
	const tr = document.createElement('tr');
	tr.appendChild(parseHtmlString(`<td colspan="${colspan}" class="empty-row">${i18next.t('BlockNoEntries.message')}</td>`));
	return tr;
}

// Tables render only their visible window (see utilities/virtual_list.js).
// lastKeys holds the current filtered selection keys per tab for the header checkboxes.
const lastKeys = { users: [], subreddits: [], keywords: [] };
const tableScroller = document.querySelector('.table-scroll');

function renderUserRow([key, entry], tr) {
	tr.appendChild(makeSelectCell('user', key));
	tr.classList.toggle('row-selected', selectedBlocks.has(selectionKey('user', key)));
	const nameCell = document.createElement('td');
	nameCell.className = 'editable-cell block-name-cell';
	nameCell.textContent = 'u/' + key;
	nameCell.title = key;
	nameCell.addEventListener('click', () => startInlineEdit(nameCell, 'user', key));
	tr.appendChild(nameCell);
	for (const scope of ['posts', 'comments']) {
		const cell = document.createElement('td');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = !!entry[scope];
		checkbox.addEventListener('change', () => toggleUserScope(key, scope, checkbox.checked));
		cell.appendChild(checkbox);
		tr.appendChild(cell);
	}
	const actionCell = document.createElement('td');
	actionCell.className = 'action-cell';
	actionCell.appendChild(
		parseHtmlString(`<button class="btn-sm row-delete" title="${escapeHtml(i18next.t('Delete.message'))}">
							<div class="btn-icon icon-x"></div>
						</button>`),
	);
	actionCell.querySelector('.row-delete').addEventListener('click', () => askDelete('user', key));
	tr.appendChild(actionCell);
}

function renderSubredditRow([key], tr) {
	tr.appendChild(makeSelectCell('subreddit', key));
	tr.classList.toggle('row-selected', selectedBlocks.has(selectionKey('subreddit', key)));
	const nameCell = document.createElement('td');
	nameCell.className = 'editable-cell block-name-cell';
	nameCell.textContent = 'r/' + key;
	nameCell.title = key;
	nameCell.addEventListener('click', () => startInlineEdit(nameCell, 'subreddit', key));
	tr.appendChild(nameCell);
	const actionCell = document.createElement('td');
	actionCell.className = 'action-cell';
	actionCell.appendChild(
		parseHtmlString(`<button class="btn-sm row-delete" title="${escapeHtml(i18next.t('Delete.message'))}">
							<div class="btn-icon icon-x"></div>
						</button>`),
	);
	actionCell.querySelector('.row-delete').addEventListener('click', () => askDelete('subreddit', key));
	tr.appendChild(actionCell);
}

function renderKeywordRow(entry, tr) {
	tr.appendChild(makeSelectCell('keyword', entry.pattern));
	tr.classList.toggle('row-selected', selectedBlocks.has(selectionKey('keyword', entry.pattern)));
	const patternCell = document.createElement('td');
	patternCell.className = 'editable-cell block-name-cell';
	patternCell.textContent = entry.pattern;
	patternCell.title = entry.pattern;
	patternCell.addEventListener('click', () => startInlineEdit(patternCell, 'keyword', entry.pattern));
	tr.appendChild(patternCell);
	for (const scope of ['title', 'url', 'comments']) {
		const cell = document.createElement('td');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = !!entry[scope];
		checkbox.addEventListener('change', () => toggleKeywordScope(entry.pattern, scope, checkbox.checked));
		cell.appendChild(checkbox);
		tr.appendChild(cell);
	}
	const actionCell = document.createElement('td');
	actionCell.className = 'action-cell';
	actionCell.appendChild(
		parseHtmlString(`<button class="btn-sm row-delete" title="${escapeHtml(i18next.t('Delete.message'))}">
							<div class="btn-icon icon-x"></div>
						</button>`),
	);
	actionCell.querySelector('.row-delete').addEventListener('click', () => askDelete('keyword', entry.pattern));
	tr.appendChild(actionCell);
}

const usersTable = createWindowedTable({
	tbody: document.querySelector('#block-users-tbody'),
	scroller: tableScroller,
	colSpan: 5,
	renderRow: renderUserRow,
	keyOf: ([key]) => key,
	emptyRow: () => emptyRowNode(5),
});

const subredditsTable = createWindowedTable({
	tbody: document.querySelector('#block-subreddits-tbody'),
	scroller: tableScroller,
	colSpan: 3,
	renderRow: renderSubredditRow,
	keyOf: ([key]) => key,
	emptyRow: () => emptyRowNode(3),
});

const keywordsTable = createWindowedTable({
	tbody: document.querySelector('#block-keywords-tbody'),
	scroller: tableScroller,
	colSpan: 6,
	renderRow: renderKeywordRow,
	keyOf: (entry) => entry.pattern,
	emptyRow: () => emptyRowNode(6),
});

function renderUsers(store, filter, resetScroll, flash) {
	const entries = Object.entries(store.users || {}).filter(([name]) => !filter || name.toLowerCase().includes(filter));
	applySort(
		entries,
		sortState.users,
		'username',
		(e) => e[0],
		(e, c) => e[1][c],
	);
	document.querySelector('#user-count').textContent = `(${entries.length.toLocaleString()})`;
	lastKeys.users = entries.map(([key]) => selectionKey('user', key));
	usersTable.setItems(entries, { resetScroll, flash: flash ? flash.key : null, flashWarning: !!(flash && flash.warning) });
	updateSelectionUI();
}

function renderSubreddits(store, filter, resetScroll, flash) {
	const entries = Object.entries(store.subreddits || {}).filter(([name]) => !filter || name.toLowerCase().includes(filter));
	applySort(entries, sortState.subreddits, 'subreddit', (e) => e[0], null);
	document.querySelector('#subreddit-count').textContent = `(${entries.length.toLocaleString()})`;
	lastKeys.subreddits = entries.map(([key]) => selectionKey('subreddit', key));
	subredditsTable.setItems(entries, { resetScroll, flash: flash ? flash.key : null, flashWarning: !!(flash && flash.warning) });
	updateSelectionUI();
}

function renderKeywords(store, filter, resetScroll, flash) {
	const entries = (store.keywords || []).filter((e) => !filter || e.pattern.toLowerCase().includes(filter));
	applySort(
		entries,
		sortState.keywords,
		'pattern',
		(e) => e.pattern,
		(e, c) => e[c],
	);
	document.querySelector('#keyword-count').textContent = `(${entries.length.toLocaleString()})`;
	lastKeys.keywords = entries.map((entry) => selectionKey('keyword', entry.pattern));
	keywordsTable.setItems(entries, { resetScroll, flash: flash ? flash.key : null, flashWarning: !!(flash && flash.warning) });
	updateSelectionUI();
}

async function toggleUserScope(name, scope, enabled) {
	const store = await readBlocks();
	const key = findStoreKey(store.users, name);
	const entry = key ? store.users[key] : null;
	if (!entry) return;
	entry[scope] = enabled;
	await saveStore(store);
}

async function toggleKeywordScope(pattern, scope, enabled) {
	const store = await readBlocks();
	const entry = (store.keywords || []).find((e) => e.pattern === pattern);
	if (!entry) return;
	entry[scope] = enabled;
	await saveStore(store);
}

// ─── Bulk selection ─────────────────────────────────────────────────────────

function selectionKey(kind, key) {
	return kind + ':' + key;
}

function makeSelectCell(kind, key) {
	const cell = document.createElement('td');
	cell.className = 'select-col';
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'row-select-checkbox';
	checkbox.checked = selectedBlocks.has(selectionKey(kind, key));
	checkbox.addEventListener('change', () => {
		if (checkbox.checked) selectedBlocks.add(selectionKey(kind, key));
		else selectedBlocks.delete(selectionKey(kind, key));
		// Highlight the row, mirroring the Tag Manager's selection style.
		checkbox.closest('tr').classList.toggle('row-selected', checkbox.checked);
		updateSelectionUI();
	});
	cell.appendChild(checkbox);
	return cell;
}

function updateSelectionUI() {
	const btn = document.querySelector('#btn-delete-selected-blocks');
	btn.classList.toggle('hidden', selectedBlocks.size === 0);
	for (const tab of ['users', 'subreddits', 'keywords']) {
		const header = document.querySelector(`#select-all-${tab}`);
		if (!header) continue;
		const keys = lastKeys[tab];
		const selected = keys.filter((key) => selectedBlocks.has(key)).length;
		header.checked = keys.length > 0 && selected === keys.length;
		header.indeterminate = selected > 0 && selected < keys.length;
	}
}

for (const tab of ['users', 'subreddits', 'keywords']) {
	document.querySelector(`#select-all-${tab}`).addEventListener('change', function () {
		for (const key of lastKeys[tab]) {
			if (this.checked) selectedBlocks.add(key);
			else selectedBlocks.delete(key);
		}
		render();
	});
}

document.querySelector('#btn-delete-selected-blocks').addEventListener('click', () => {
	if (selectedBlocks.size === 0) return;
	deleteTarget = { kind: 'selected' };
	document.querySelector('#delete-confirm-text').textContent = `${i18next.t('Delete.message')}: ${selectedBlocks.size}`;
	document.querySelector('#delete-confirm-modal').classList.remove('hidden');
});

async function deleteSelected() {
	const store = await readBlocks();
	for (const item of selectedBlocks) {
		const separator = item.indexOf(':');
		const kind = item.slice(0, separator);
		const key = item.slice(separator + 1);
		if (kind === 'user') removeUserBlock(store, key, 'both');
		else if (kind === 'subreddit') removeSubredditBlock(store, key);
		else removeKeywordBlock(store, key);
	}
	selectedBlocks.clear();
	await saveStore(store);
}

// ─── Inline editing ─────────────────────────────────────────────────────────

function startInlineEdit(cell, kind, oldKey) {
	if (cell.querySelector('input')) return;
	cell.replaceChildren();
	const input = document.createElement('input');
	input.type = 'text';
	input.value = oldKey;
	cell.appendChild(input);
	input.focus();
	input.select();

	const commit = async () => {
		if (commit.done) return;
		commit.done = true;
		const value = input.value.trim();
		if (value === '' || value === '*') {
			render();
			return;
		}
		const store = await readBlocks();
		if (kind === 'user') {
			const name = normaliseName(value);
			if (!isSafeMapKey(name)) {
				render();
				return;
			}
			const oldEntry = findStoreKey(store.users, oldKey);
			if (!oldEntry) {
				render();
				return;
			}
			if (name.toLowerCase() !== oldKey.toLowerCase()) {
				const existing = findStoreKey(store.users, name);
				if (existing && existing !== oldEntry) {
					store.users[existing].posts = store.users[existing].posts || store.users[oldEntry].posts;
					store.users[existing].comments = store.users[existing].comments || store.users[oldEntry].comments;
				} else if (!existing) {
					store.users[name] = { posts: store.users[oldEntry].posts, comments: store.users[oldEntry].comments };
				}
				delete store.users[oldEntry];
			}
			await saveStore(store);
		} else if (kind === 'subreddit') {
			const name = normaliseName(value);
			if (!isSafeMapKey(name)) {
				render();
				return;
			}
			const oldEntry = findStoreKey(store.subreddits, oldKey);
			if (!oldEntry) {
				render();
				return;
			}
			if (name.toLowerCase() !== oldKey.toLowerCase()) {
				delete store.subreddits[oldEntry];
				if (!findStoreKey(store.subreddits, name)) store.subreddits[name] = { posts: true };
			}
			await saveStore(store);
		} else {
			if (!validateRegexList(value)) {
				showToast('error', 'Invalid regex: ' + getInvalidRegexPatterns(value).join(', '));
				render();
				return;
			}
			const entry = store.keywords.find((e) => e.pattern === oldKey);
			if (!entry) {
				render();
				return;
			}
			if (value !== oldKey) {
				const duplicate = store.keywords.find((e) => e.pattern === value);
				if (duplicate && duplicate !== entry) {
					duplicate.title = duplicate.title || entry.title;
					duplicate.url = duplicate.url || entry.url;
					duplicate.comments = duplicate.comments || entry.comments;
					store.keywords = store.keywords.filter((e) => e !== entry);
				} else {
					entry.pattern = value;
				}
			}
			await saveStore(store);
		}
	};

	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') commit();
		else if (e.key === 'Escape') {
			// Cancel: detach the blur handler before render() removes the
			// focused input, otherwise the blur event commits the rename.
			input.removeEventListener('blur', commit);
			render();
		}
	});
	input.addEventListener('blur', commit);
}

// ─── Add ────────────────────────────────────────────────────────────────────

let alreadyAddedTimeout = 0;
function showAlreadyAddedWarning() {
	const warning = document.querySelector('#block-already-added-warning');
	warning.classList.remove('hidden');
	clearTimeout(alreadyAddedTimeout);
	alreadyAddedTimeout = setTimeout(() => warning.classList.add('hidden'), 5000);
}

let missingInputTimeout = 0;
function showMissingInputWarning() {
	const warning = document.querySelector('#block-input-missing-warning');
	warning.classList.remove('hidden');
	clearTimeout(missingInputTimeout);
	missingInputTimeout = setTimeout(() => warning.classList.add('hidden'), 5000);
}

// Outlines a missing required input instead of silently closing the row.
function markMissingInput(input) {
	input.classList.add('missing-input');
	input.focus();
	showMissingInputWarning();
}

document.querySelector('#btn-add-block').addEventListener('click', () => {
	const table = document.querySelector(`[data-tab-pane="${activeTab}"]`);
	if (table.querySelector('.add-block-row')) {
		table.querySelector('.add-block-row input').focus();
		return;
	}
	const tr = document.createElement('tr');
	tr.className = 'add-block-row';
	if (activeTab === 'users') {
		tr.appendChild(
			parseHtmlString(`<td></td>
							<td><input type="text" data-field="name" placeholder="${escapeHtml(i18next.t('Username.message'))}" /></td>
							<td><input type="checkbox" data-field="posts" checked /></td>
							<td><input type="checkbox" data-field="comments" checked /></td>
							<td class="actions">
								<button class="btn-sm green btn-row-save" title="${escapeHtml(i18next.t('Save.message'))}">
									<i class="btn-icon icon-tick"></i>
								</button>
								<button class="btn-sm btn-row-cancel" title="${escapeHtml(i18next.t('Cancel.message'))}">
									<i class="btn-icon icon-x"></i>
								</button>
							</td>`),
		);
	} else if (activeTab === 'subreddits') {
		tr.appendChild(
			parseHtmlString(`<td></td>
							<td><input type="text" data-field="name" placeholder="${escapeHtml(i18next.t('Subreddit.message'))}" /></td>
							<td class="actions">
								<button class="btn-sm green btn-row-save" title="${escapeHtml(i18next.t('Save.message'))}">
									<i class="btn-icon icon-tick"></i>
								</button>
								<button class="btn-sm btn-row-cancel" title="${escapeHtml(i18next.t('Cancel.message'))}">
									<i class="btn-icon icon-x"></i>
								</button>
							</td>`),
		);
	} else {
		tr.appendChild(
			parseHtmlString(`<td></td>
							<td><input type="text" data-field="pattern" placeholder="${escapeHtml(i18next.t('BlockPattern.message'))}" />
								<span class="info invalid-regex"></span></td>
							<td><input type="checkbox" data-field="title" checked /></td>
							<td><input type="checkbox" data-field="url" /></td>
							<td><input type="checkbox" data-field="comments" /></td>
							<td class="actions">
								<button class="btn-sm green btn-row-save" title="${escapeHtml(i18next.t('Save.message'))}">
									<i class="btn-icon icon-tick"></i>
								</button>
								<button class="btn-sm btn-row-cancel" title="${escapeHtml(i18next.t('Cancel.message'))}">
									<i class="btn-icon icon-x"></i>
								</button>
							</td>`),
		);
	}
	// The add row lives in the <thead>, outside the virtualised <tbody>:
	// virtual_list.js rebuilds the tbody on every scroll/render, which would
	// otherwise destroy the row (and focus() would trigger that via scroll).
	table.querySelector('thead').appendChild(tr);
	tr.querySelector('input').focus();

	const invalidEl = tr.querySelector('.info.invalid-regex');
	const patternInput = tr.querySelector('input[data-field="pattern"]');
	if (patternInput && invalidEl) {
		patternInput.addEventListener('input', () => {
			if (validateRegexList(patternInput.value)) {
				patternInput.classList.remove('invalid-regex');
				invalidEl.textContent = '';
			} else {
				patternInput.classList.add('invalid-regex');
				invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(patternInput.value).join(', ');
			}
		});
	}

	tr.querySelector('.btn-row-cancel').addEventListener('click', () => tr.remove());
	tr.querySelectorAll('input[type="text"]').forEach((input) => {
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				tr.querySelector('.btn-row-save').click();
			}
		});
	});
	tr.querySelectorAll('input').forEach((input) => {
		// Escape cancels the add row, matching the inline edit rows.
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') tr.remove();
		});
		// Typing anywhere clears the missing-input outline.
		input.addEventListener('input', () => input.classList.remove('missing-input'));
		input.addEventListener('change', () => input.classList.remove('missing-input'));
	});
	tr.querySelector('.btn-row-save').addEventListener('click', async () => {
		if (activeTab === 'users') {
			const raw = tr.querySelector('input[data-field="name"]').value;
			const name = normaliseName(raw);
			if (!name) {
				markMissingInput(tr.querySelector('input[data-field="name"]'));
				return;
			}
			const posts = tr.querySelector('input[data-field="posts"]').checked;
			const comments = tr.querySelector('input[data-field="comments"]').checked;
			if (!posts && !comments) {
				markMissingInput(tr.querySelector('input[data-field="posts"]'));
				markMissingInput(tr.querySelector('input[data-field="comments"]'));
				return;
			}
			const store = await readBlocks();
			const existingKey = findKey(store.users, name);
			addUserBlock(store, name, posts && comments ? 'both' : posts ? 'posts' : 'comments');
			// Warn and merge: an existing block (case-insensitive) flashes
			// orange instead of green, and the new scopes merge into it.
			flashTarget = { tab: 'users', key: existingKey ?? name, warning: !!existingKey };
			if (existingKey) showAlreadyAddedWarning();
			await saveStore(store);
		} else if (activeTab === 'subreddits') {
			const raw = tr.querySelector('input[data-field="name"]').value;
			const name = normaliseName(raw);
			if (!name) {
				markMissingInput(tr.querySelector('input[data-field="name"]'));
				return;
			}
			const store = await readBlocks();
			const existingKey = findKey(store.subreddits, name);
			addSubredditBlock(store, name);
			flashTarget = { tab: 'subreddits', key: existingKey ?? name, warning: !!existingKey };
			if (existingKey) showAlreadyAddedWarning();
			await saveStore(store);
		} else {
			const pattern = tr.querySelector('input[data-field="pattern"]').value.trim();
			if (!pattern || pattern === '*') {
				markMissingInput(tr.querySelector('input[data-field="pattern"]'));
				return;
			}
			if (!validateRegexList(pattern)) {
				const message = 'Invalid regex: ' + getInvalidRegexPatterns(pattern).join(', ');
				const rowInvalidEl = tr.querySelector('.info.invalid-regex');
				if (rowInvalidEl) rowInvalidEl.textContent = message;
				showToast('error', message);
				return;
			}
			const scopes = {
				title: tr.querySelector('input[data-field="title"]').checked,
				url: tr.querySelector('input[data-field="url"]').checked,
				comments: tr.querySelector('input[data-field="comments"]').checked,
			};
			if (!scopes.title && !scopes.url && !scopes.comments) {
				tr.remove();
				return;
			}
			const store = await readBlocks();
			const existing = store.keywords.find((e) => e.pattern === pattern);
			addKeywordBlock(store, pattern, scopes);
			flashTarget = { tab: 'keywords', key: pattern, warning: !!existing };
			if (existing) showAlreadyAddedWarning();
			await saveStore(store);
		}
		// The add row now lives outside the virtualised tbody, so the post-save
		// render no longer removes it — close it explicitly on success.
		clearTimeout(missingInputTimeout);
		document.querySelector('#block-input-missing-warning').classList.add('hidden');
		tr.remove();
	});
	clearTimeout(alreadyAddedTimeout);
	clearTimeout(missingInputTimeout);
	document.querySelector('#block-already-added-warning').classList.add('hidden');
	document.querySelector('#block-input-missing-warning').classList.add('hidden');
});

// ─── Delete ─────────────────────────────────────────────────────────────────

function askDelete(kind, key) {
	deleteTarget = { kind, key };
	const modal = document.querySelector('#delete-confirm-modal');
	document.querySelector('#delete-confirm-text').textContent = `${i18next.t('Delete.message')}: ${key}`;
	modal.classList.remove('hidden');
}

document.querySelector('#btn-cancel-delete').addEventListener('click', () => {
	document.querySelector('#delete-confirm-modal').classList.add('hidden');
	deleteTarget = null;
});

document.querySelector('#btn-confirm-delete').addEventListener('click', async () => {
	if (!deleteTarget) return;
	if (deleteTarget.kind === 'selected') {
		document.querySelector('#delete-confirm-modal').classList.add('hidden');
		deleteTarget = null;
		await deleteSelected();
		return;
	}
	const store = await readBlocks();
	if (deleteTarget.kind === 'user') removeUserBlock(store, deleteTarget.key, 'both');
	else if (deleteTarget.kind === 'subreddit') removeSubredditBlock(store, deleteTarget.key);
	else removeKeywordBlock(store, deleteTarget.key);
	document.querySelector('#delete-confirm-modal').classList.add('hidden');
	deleteTarget = null;
	await saveStore(store);
});

// ─── Search ─────────────────────────────────────────────────────────────────

document.querySelector('#search-blocks').addEventListener('input', () => render());
document.querySelector('#btn-clear-search').addEventListener('click', () => {
	document.querySelector('#search-blocks').value = '';
	render();
});

// ─── Sorting ────────────────────────────────────────────────────────────────

// Sorts a rendered entry list in place per the tab's sort state. A null
// column/direction keeps the store order (the order entries were added).
// The text column compares case-insensitively; boolean scope columns sort
// false-first for asc and true-first for desc. Ties keep the input order.
function applySort(entries, state, textColumn, getName, getBool) {
	const { column, direction } = state;
	if (!column || !direction) return entries;
	const dir = direction === 'asc' ? 1 : -1;
	if (column === textColumn) entries.sort((a, b) => dir * getName(a).toLowerCase().localeCompare(getName(b).toLowerCase()));
	else entries.sort((a, b) => dir * ((getBool(a, column) === true) - (getBool(b, column) === true)));
	return entries;
}

document.querySelectorAll('.sort-btn').forEach((btn) => {
	btn.addEventListener('click', () => {
		const state = sortState[btn.closest('[data-tab-pane]').dataset.tabPane];
		if (state.column === btn.dataset.sort) {
			if (state.direction === null) state.direction = 'asc';
			else if (state.direction === 'asc') state.direction = 'desc';
			else {
				state.column = null;
				state.direction = null;
			}
		} else {
			state.column = btn.dataset.sort;
			state.direction = 'asc';
		}
		sortDirty = true;
		updateSortButtons();
		render();
	});
});

function updateSortButtons() {
	document.querySelectorAll('.sort-btn').forEach((btn) => {
		const state = sortState[btn.closest('[data-tab-pane]').dataset.tabPane];
		const icon = btn.querySelector('.btn-icon');
		btn.classList.remove('active');
		icon.className = 'btn-icon icon-sort';
		if (state.column === btn.dataset.sort && state.direction) {
			btn.classList.add('active');
			const isText = state.column === 'username' || state.column === 'subreddit' || state.column === 'pattern';
			icon.className = 'btn-icon icon-sort-' + (isText ? (state.direction === 'asc' ? 'a-z' : 'z-a') : state.direction === 'asc' ? 'up' : 'down');
		}
	});
}

// ─── Export / Import ────────────────────────────────────────────────────────

document.querySelector('#btn-export-blocks').addEventListener('click', async () => {
	const store = await readBlocks();
	const json = JSON.stringify(backupEnvelope('blocks', { blockStore: store }), null, 4);
	const timestamp = backupTimestamp();
	const anchor = document.createElement('a');
	anchor.download = backupFilename('blocks', timestamp);
	anchor.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
});

document.querySelector('#file-import-blocks').addEventListener('change', async (e) => {
	const file = e.target.files[0];
	e.target.value = '';
	if (!file) return;
	showLoadingOverlay(i18next.t('Importing.message'));
	// Let the overlay paint before the synchronous merge work below.
	await new Promise((resolve) => setTimeout(resolve, 30));
	try {
		const fileData = JSON.parse(await file.text());
		// Accept the standard envelope (blockStore key) as well as raw store objects.
		const imported = fileData && typeof fileData === 'object' && fileData.blockStore ? fileData.blockStore : fileData;
		// users/subreddits must be plain objects: a string or array would pass a
		// truthy check and Object.entries would turn its characters/indexes into
		// garbage zero-scope rows. keywords must be an array: iterating anything
		// else throws mid-merge and aborts the whole import.
		const isStoreMap = (value) => !!value && typeof value === 'object' && !Array.isArray(value);
		if (!isStoreMap(imported) || !isStoreMap(imported.users) || !isStoreMap(imported.subreddits) || !Array.isArray(imported.keywords)) {
			showToast('error', 'Invalid block backup file.');
			return;
		}
		const store = await readBlocks();
		// added counts entries (a new one, or an existing one whose scopes
		// grew), not individual scope flips: importing one existing user with
		// two new scopes reports "Imported 1 block(s)", not 2.
		let added = 0;
		for (const [key, entry] of Object.entries(imported.users)) {
			// Names are normalised the same way the add row does, so keys like
			// "u/Bob" land as "Bob" — the raw key is one the runtime matcher
			// (which reads plain usernames from the page) can never match.
			const name = normaliseName(entry && typeof entry.name === 'string' ? entry.name : key);
			if (name === '') continue;
			const existing = findStoreKey(store.users, name);
			if (!existing) {
				store.users[name] = { posts: !!entry?.posts, comments: !!entry?.comments };
				added++;
			} else {
				let merged = false;
				if (entry?.posts && !store.users[existing].posts) {
					store.users[existing].posts = true;
					merged = true;
				}
				if (entry?.comments && !store.users[existing].comments) {
					store.users[existing].comments = true;
					merged = true;
				}
				if (merged) added++;
			}
		}
		for (const [key, entry] of Object.entries(imported.subreddits)) {
			const name = normaliseName(entry && typeof entry.name === 'string' ? entry.name : key);
			if (name === '') continue;
			if (!findStoreKey(store.subreddits, name)) {
				store.subreddits[name] = { posts: true };
				added++;
			}
		}
		// Regex patterns that fail validation are skipped instead of silently
		// entering the store, where they would match nothing.
		const skippedRegexes = [];
		for (const entry of imported.keywords) {
			if (!entry || typeof entry.pattern !== 'string' || entry.pattern === '') continue;
			if (entry.pattern.startsWith('/') && !validateRegexList(entry.pattern)) {
				skippedRegexes.push(entry.pattern);
				continue;
			}
			const existing = store.keywords.find((x) => x.pattern === entry.pattern);
			if (!existing) {
				store.keywords.push({ pattern: entry.pattern, title: !!entry.title, url: !!entry.url, comments: !!entry.comments });
				added++;
			} else {
				let merged = false;
				for (const scope of ['title', 'url', 'comments']) {
					if (entry[scope] && !existing[scope]) {
						existing[scope] = true;
						merged = true;
					}
				}
				if (merged) added++;
			}
		}
		const ok = await saveStore(store);
		if (ok) {
			const modal = document.querySelector('#info-modal');
			modal.querySelector('h2').textContent = i18next.t('Complete.message');
			let importMessage = i18next.t('BlockImportSuccess.message').replace('{count}', added.toLocaleString());
			if (skippedRegexes.length) {
				importMessage += ` Skipped ${skippedRegexes.length} invalid regex pattern(s): ${skippedRegexes.slice(0, 3).join(', ')}${skippedRegexes.length > 3 ? ', …' : ''}`;
			}
			document.querySelector('#info-modal-text').textContent = importMessage;
			modal.classList.remove('hidden');
		}
	} catch (err) {
		console.error('[RedditEnhancer] Block import failed', err);
		showToast('error', 'Invalid block backup file.');
	} finally {
		hideLoadingOverlay();
	}
});

document.querySelector('#btn-import-blocks').addEventListener('click', () => {
	document.querySelector('#file-import-blocks').click();
});

// ─── Info modal ─────────────────────────────────────────────────────────────

document.querySelector('#btn-close-info').addEventListener('click', () => {
	document.querySelector('#info-modal').classList.add('hidden');
});
