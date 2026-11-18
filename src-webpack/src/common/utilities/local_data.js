// ────────────────────────────────────────────────────────────────────────────
// Utility / Local Backup Data
// ────────────────────────────────────────────────────────────────────────────
// The plain storage.local keys that travel inside "everything" and "settings-only"
// backups: the uploaded custom header logo (customHeaderLogoUrl — the
// extension keeps it here when it exceeds sync's per-item quota, with '' in
// sync, and the other way around when it fits) and the uploaded background
// images (uploadedBackgrounds, an array of base64 data URLs, up to ~10MiB).
// The values ride in the backup envelope as plain JSON, nested under `localData`
// so they cannot collide with same-named sync keys in the top level of the file
// (customHeaderLogoUrl exists in both areas).
// ────────────────────────────────────────────────────────────────────────────

const LOCAL_DATA_KEYS = ['customHeaderLogoUrl', 'uploadedBackgrounds'];

// Reads the local keys for the backup envelope, normalised: both keys are
// always present and typed (a string logo, an array of base64 strings), so a
// restored backup reproduces the backed-up state exactly (replace semantics).
export async function readLocalBackupData() {
	const data = await new Promise((resolve) => BROWSER_API.storage.local.get(LOCAL_DATA_KEYS, resolve));
	return {
		customHeaderLogoUrl: typeof data.customHeaderLogoUrl === 'string' ? data.customHeaderLogoUrl : '',
		uploadedBackgrounds: Array.isArray(data.uploadedBackgrounds) ? data.uploadedBackgrounds.filter((s) => typeof s === 'string') : [],
	};
}

// Restores the local keys from a backup's localData. Replace semantics like
// the stores: a valid key overwrites the stored one, and a payload that is
// absent (older backups) or malformed writes nothing, so a restore can never
// blank the keys by accident. Never throws: returns { ok, reason } like the
// store restores do, callers log as they see fit.
export async function restoreLocalBackupData(localData) {
	if (!localData || typeof localData !== 'object' || Array.isArray(localData)) {
		if (localData !== undefined) console.error('[RedditEnhancer] backup restore: invalid localData in backup, skipping it');
		return { ok: false, reason: 'invalid' };
	}
	const writes = {};
	if (typeof localData.customHeaderLogoUrl === 'string') writes.customHeaderLogoUrl = localData.customHeaderLogoUrl;
	if (Array.isArray(localData.uploadedBackgrounds) && localData.uploadedBackgrounds.every((s) => typeof s === 'string')) writes.uploadedBackgrounds = localData.uploadedBackgrounds;
	if (!Object.keys(writes).length) return { ok: false, reason: 'absent' };
	return new Promise((resolve) => {
		BROWSER_API.storage.local.set(writes, () => {
			if (BROWSER_API.runtime.lastError) {
				console.error('[RedditEnhancer] backup restore: writing the local backup data failed:', BROWSER_API.runtime.lastError.message);
				resolve({ ok: false, reason: BROWSER_API.runtime.lastError.message });
			} else {
				resolve({ ok: true });
			}
		});
	});
}
