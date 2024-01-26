// Resize Text

import { postCommentsFontSize, postContentFontSize } from '../../../content/functions/style/resize_font';

export function loadResizeFont() {
	BROWSER_API.storage.sync.get(['postContentFontSize'], function (result) {
		postContentFontSize(result.postContentFontSize);
	});
	BROWSER_API.storage.sync.get(['postCommentsFontSize'], function (result) {
		postCommentsFontSize(result.postCommentsFontSize);
	});
}
