// Feed Post Max Height

import { postHeight, postHeightSize } from '../../../content/functions/productivity/post_max_height';

export function loadPostHeight() {
	BROWSER_API.storage.sync.get(['postHeight'], function (result) {
		postHeight(result.postHeight);
	});
	BROWSER_API.storage.sync.get(['postHeightSize'], function (result) {
		postHeightSize(result.postHeightSize);
	});
}
