// ────────────────────────────────────────────────────────────────────────────
// Backup Config
// ────────────────────────────────────────────────────────────────────────────

import { backupFilename, backupEnvelope } from '../utilities/backup_format.js';
import { readBlocks } from '../utilities/block_store.js';
import { readTags } from '../utilities/tag_store.js';
import { readLocalBackupData } from '../utilities/local_data.js';

// Assembles the backup payload for the selected kind: 'everything' (every
// storage.sync setting plus the storage.local stores as plain JSON), a
// single-store backup of just the block lists ('blocks') or user tags
// ('user_tags'), or 'settings' (the sync settings plus the local image data,
// with no store keys at all — restoring it replaces the settings and image
// data and leaves the local stores untouched, and the standard
// RedditEnhancer_backup marker keeps it restorable by older extension
// versions). Both 'everything' and 'settings' also carry the local image
// data (uploaded header logo and uploaded backgrounds) under `localData`
// — plain JSON so it survives the file round-trip, nested so it cannot
// collide with the same-named sync key. The single-store envelopes use the same
// file markers and shapes as the Block Manager / Tag Manager page exports,
// and the restore page accepts all three. For 'everything', the
// storage.local stores are included as plain JSON so the restore path can
// validate and re-write them — the raw compressed payloads would be
// unreadable in the file and version-locked. The local stores are read
// first: that runs the one-shot legacy migration when a store does not
// exist yet, so the sync dump below no longer contains the legacy keys.
// Sync data is sorted alphabetically for a stable diff-friendly file.
export async function collectBackupData(kind = 'everything') {
	if (kind === 'blocks') return backupEnvelope('blocks', { blockStore: await readBlocks() });
	if (kind === 'user_tags') return backupEnvelope('user_tags', { redditUserTags: await readTags() });

	const [blockStore, redditUserTags, localData] = await Promise.all([readBlocks(), readTags(), readLocalBackupData()]);

	const syncData = await new Promise((resolve) => BROWSER_API.storage.sync.get(null, resolve));
	const data1 = {};
	Object.keys(syncData || {})
		.sort()
		.forEach((key) => {
			data1[key] = syncData[key];
		});

	if (kind === 'settings') return backupEnvelope('backup', { ...data1, localData });
	return backupEnvelope('backup', { ...data1, blockStore, redditUserTags, localData });
}

// The backup-type dropdown next to the Backup button (popup and options
// page). Session-only: defaults back to "Everything" on the next open.
// Exported for popup_inputs.js to wire up at startup.
export function setupBackupTypeDropdown() {
	const dropdown = document.querySelector('#select-backup-type');
	if (!dropdown) return;
	const chosen = dropdown.querySelector('#chosen-backup-type');
	const menu = dropdown.querySelector('#select-backup-type-menu');

	dropdown.querySelector('.select').addEventListener('click', function () {
		if (dropdown.classList.contains('active')) {
			dropdown.classList.remove('active');
			menu.style.maxHeight = '0';
		} else {
			dropdown.classList.add('active');
			menu.style.maxHeight = menu.scrollHeight + 'px';
		}
	});

	menu.querySelectorAll('li').forEach(function (item) {
		item.addEventListener('click', function () {
			chosen.textContent = item.querySelector('span').textContent;
			dropdown.dataset.kind = item.dataset.kind;
			dropdown.classList.remove('active');
			menu.style.maxHeight = '0';
		});
	});
}

// Reads the selected backup kind for export_backup(): the dropdown's current
// selection, defaulting to 'everything' (also when no dropdown is rendered).
function getSelectedBackupKind() {
	const dropdown = document.querySelector('#select-backup-type');
	return (dropdown && dropdown.dataset.kind) || 'everything';
}

// Export backup file
export async function export_backup() {
	const kind = getSelectedBackupKind();
	const backup = await collectBackupData(kind);

	// Convert to JSON string
	var json = JSON.stringify(backup, null, 4);

	// Create download file. A Blob URL rather than a data URL: uploaded
	// background images can push the backup well past the ~2MB limit where
	// data URLs fail to download (same pattern as the tag manager export).
	// Unknown kinds fall back to the standard backup name in backupFilename,
	// covering 'everything' and 'settings'.
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.download = backupFilename(kind, backup.backup_time);
	anchor.href = url;
	document.body.appendChild(anchor);
	anchor.addEventListener('click', function () {
		document.body.removeChild(anchor);
	});
	anchor.click();
	URL.revokeObjectURL(url);
}
