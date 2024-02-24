// Scale Post To Fit Image

import { scalePostToFitImage, scalePostToFitImageMaxImageWidth } from '../../../content/functions/productivity/scale_post_to_fit_image';

export function loadScalePostToFitImage() {
	BROWSER_API.storage.sync.get(['scalePostToFitImage', 'scalePostToFitImageMaxImageWidth'], function (result) {
		scalePostToFitImage(result.scalePostToFitImage);
		scalePostToFitImageMaxImageWidth(result.scalePostToFitImageMaxImageWidth);
	});
}
