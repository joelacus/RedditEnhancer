// Drag Image To Resize

import { dragImageToResize, dragImageToResizeInitialSize } from '../../../content/functions/productivity/scale_image_on_drag';

export function loadDragImageToResize() {
	BROWSER_API.storage.sync.get(['dragImageToResize'], function (result) {
		dragImageToResize(result.dragImageToResize);
	});
	BROWSER_API.storage.sync.get(['dragImageToResizeInitialSize'], function (result) {
		dragImageToResizeInitialSize(result.dragImageToResizeInitialSize);
	});
}
