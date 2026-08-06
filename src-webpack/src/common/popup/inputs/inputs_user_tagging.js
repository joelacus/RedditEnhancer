// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / User Tagging
// ────────────────────────────────────────────────────────────────────────────

import { sendMessage } from '../../utilities/send_message';
import { addPresetTag } from '../restore/restore_user_tagging';

// ─── Toggle ─────────────────────────────────────────────────────────────────

document.querySelector('#checkbox-user-tagging-enable').addEventListener('change', function () {
	document.querySelector('.icon-user-tagging').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ userTaggingEnabled: this.checked });
	sendMessage({ userTaggingEnabled: this.checked });
});

// ─── Manage Button ──────────────────────────────────────────────────────────

document.querySelector('#btn-manage-tagged-users').addEventListener('click', function () {
	BROWSER_API.runtime.sendMessage({ openUserTaggingManager: true });
});

// ─── Add Preset ─────────────────────────────────────────────────────────────

document.querySelector('#btn-add-preset-tag').addEventListener('click', function () {
	addPresetTag();
});
