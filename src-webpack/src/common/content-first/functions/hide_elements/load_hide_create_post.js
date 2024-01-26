// Hide Create Post

import { hideCreatePost } from '../../../content/functions/hide_elements/hide_create_post';

export function loadHideCreatePost() {
	BROWSER_API.storage.sync.get(['hideCreatePost'], function (result) {
		hideCreatePost(result.hideCreatePost);
	});
}
