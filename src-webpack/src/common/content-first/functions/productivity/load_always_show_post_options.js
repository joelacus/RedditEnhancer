// Always Show Post Options

import { alwaysShowPostOptions } from '../../../content/functions/productivity/always_show_post_options';

export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions'], function (result) {
		alwaysShowPostOptions(result.alwaysShowPostOptions);
	});
}
