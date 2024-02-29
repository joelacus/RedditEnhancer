// Resize Text

import { postTitleFontSize, postCommentsFontSize, postContentFontSize } from '../../../content/functions/accessibility/resize_font';

export function loadResizeFont() {
	BROWSER_API.storage.sync.get(['postTitleFontSize'], function (result) {
		postTitleFontSize(result.postTitleFontSize);
	});
	BROWSER_API.storage.sync.get(['postContentFontSize'], function (result) {
		postContentFontSize(result.postContentFontSize);
	});
	BROWSER_API.storage.sync.get(['postCommentsFontSize'], function (result) {
		postCommentsFontSize(result.postCommentsFontSize);
	});
}
