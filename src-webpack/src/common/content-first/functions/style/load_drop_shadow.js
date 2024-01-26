// Dropshadows

import { addDropShadow } from '../../../content/functions/style/drop_shadow';

export function loadDropShadow() {
	BROWSER_API.storage.sync.get(['shadows'], function (result) {
		addDropShadow(result.shadows);
	});
}
