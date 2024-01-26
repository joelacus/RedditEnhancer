// Larger Classic Post

import { largerClassicPost } from '../../../content/functions/style/larger_classic_post';

export function loadLargerClassicPost() {
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		largerClassicPost(result.largerClassicPost);
	});
}
