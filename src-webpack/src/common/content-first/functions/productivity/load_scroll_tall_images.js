// Add Scrollbar To Tall Images

import { imageScroll, imageScrollMaxImageWidth } from '../../../content/functions/productivity/scroll_tall_images';

export function loadImageScroll() {
	BROWSER_API.storage.sync.get(['imageScroll', 'imageScrollMaxImageWidth'], function (result) {
		imageScroll(result.imageScroll);
		imageScrollMaxImageWidth(result.imageScrollMaxImageWidth);
	});
}
