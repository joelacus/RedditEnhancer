// Auto Expand Comments

import { autoExpandComments } from '../../../content/functions/productivity/auto_expand_comments';

export function loadAutoExpandComments() {
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		autoExpandComments(result.autoExpandComments);
	});
}
