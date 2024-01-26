// Custom Background

import { useCustomBackground } from '../../../content/functions/background/custom_background';

export function loadCustomBackground() {
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		useCustomBackground(result.useCustomBackground);
	});
}
