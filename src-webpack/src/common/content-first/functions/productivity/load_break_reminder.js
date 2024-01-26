// Break Reminder

import { breakReminder } from '../../../content/functions/productivity/break_reminder';

export function loadBreakReminder() {
	BROWSER_API.storage.sync.get(['breakReminder'], function (result) {
		breakReminder(result.breakReminder);
	});
}
