import { layoutCentre, layoutOffset, layoutPostOffset, layoutSubOffset, layoutUserProfileOffset } from '../../../content/functions/expand_feed_post/layout_centre_and_offset';

// Layout Centre
export function loadLayoutCentre() {
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		layoutCentre(result.layoutCentre);
	});
}

// Layout Offset
export function loadLayoutOffset() {
	BROWSER_API.storage.sync.get(['layoutOffset'], function (result) {
		layoutOffset(result.layoutOffset);
	});
	BROWSER_API.storage.sync.get(['layoutSubOffset'], function (result) {
		layoutSubOffset(result.layoutSubOffset);
	});
	BROWSER_API.storage.sync.get(['layoutPostOffset'], function (result) {
		layoutPostOffset(result.layoutPostOffset);
	});
	BROWSER_API.storage.sync.get(['layoutUserProfileOffset'], function (result) {
		layoutUserProfileOffset(result.layoutUserProfileOffset);
	});
}
