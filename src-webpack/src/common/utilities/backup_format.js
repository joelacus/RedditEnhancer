// ────────────────────────────────────────────────────────────────────────────
// Utility / Backup Format
// ────────────────────────────────────────────────────────────────────────────
// Shared envelope for all exported JSON files (full config backups, block
// lists, user tags): consistent filenames, a file-type marker, the export
// timestamp (mirrored in the filename in case it gets renamed), and the
// extension version that wrote it.
// ────────────────────────────────────────────────────────────────────────────

// Timestamp in local time: 2026-10-01-054155 (year-month-day-hoursminutesseconds).
export function backupTimestamp(date = new Date()) {
	const pad = (n) => (n < 10 ? '0' + n : '' + n);
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

// File-type marker and filename segment per export kind.
const FILE_TYPES = {
	backup: 'RedditEnhancer_backup',
	blocks: 'RedditEnhancer_blocks',
	user_tags: 'RedditEnhancer_user_tags',
};

export function backupFilename(kind, timestamp) {
	const type = FILE_TYPES[kind] || FILE_TYPES.backup;
	return `${type}_${timestamp || backupTimestamp()}.json`;
}

// Wraps export data in the standard envelope.
export function backupEnvelope(kind, data) {
	return {
		file: FILE_TYPES[kind] || FILE_TYPES.backup,
		backup_time: backupTimestamp(),
		version: BROWSER_API.runtime.getManifest().version,
		...data,
	};
}
