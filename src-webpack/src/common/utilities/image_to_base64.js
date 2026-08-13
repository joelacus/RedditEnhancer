// ────────────────────────────────────────────────────────────────────────────
// Utility / Image to base64
// ────────────────────────────────────────────────────────────────────────────

const resolutionMap = {
	original: null,
	'1080p': { height: 1080 },
	'1440p': { height: 1440 },
	'4K': { height: 2160 },
};

let blob;

export async function base64ImageOptimiser(imageInput, width, height) {
	if (!(imageInput instanceof File || imageInput instanceof Blob)) {
		throw new Error('base64ImageOptimiser only accepts File or Blob inputs');
	}
	blob = imageInput;

	const originalSize = (blob.size / 1048576).toFixed(2);
	console.log(`Original file size: ${originalSize} MiB`);

	const imageBitmap = await createImageBitmap(blob);

	const originalRes = `${imageBitmap.width}x${imageBitmap.height}`;
	console.log(`Original resolution: ${originalRes}`);

	let targetWidth = width;
	let targetHeight = height;

	if (targetHeight === undefined) {
		try {
			const result = await new Promise((resolve) => {
				BROWSER_API.storage.sync.get('backgroundUploadResolution', function (storageResult) {
					resolve(storageResult);
				});
			});
			const resolution = result.backgroundUploadResolution || '1080p';
			const res = resolutionMap[resolution];
			if (res) {
				targetHeight = res.height;
			} else {
				targetWidth = imageBitmap.width;
				targetHeight = imageBitmap.height;
			}
		} catch (e) {
			targetWidth = imageBitmap.width;
			targetHeight = imageBitmap.height;
		}
	}

	if (imageBitmap.height < targetHeight) {
		console.log('Image is shorter than requested height. Using original height.');
		targetWidth = imageBitmap.width;
		targetHeight = imageBitmap.height;
	} else {
		const aspectRatio = imageBitmap.width / imageBitmap.height;
		targetWidth = Math.round(targetHeight * aspectRatio);
	}

	// Progressive downscaling to preserve detail better than a single large resize
	let currentBitmap = imageBitmap;
	let currentWidth = imageBitmap.width;
	let currentHeight = imageBitmap.height;

	while (currentWidth > targetWidth * 2 || currentHeight > targetHeight * 2) {
		const stepWidth = Math.max(Math.floor(currentWidth / 2), targetWidth);
		const stepHeight = Math.max(Math.floor(currentHeight / 2), targetHeight);

		const stepCanvas = document.createElement('canvas');
		stepCanvas.width = stepWidth;
		stepCanvas.height = stepHeight;
		const stepCtx = stepCanvas.getContext('2d');
		stepCtx.imageSmoothingEnabled = true;
		stepCtx.imageSmoothingQuality = 'high';
		stepCtx.drawImage(currentBitmap, 0, 0, stepWidth, stepHeight);

		currentBitmap = await createImageBitmap(stepCanvas);
		currentWidth = stepWidth;
		currentHeight = stepHeight;
	}

	const canvas = document.createElement('canvas');
	canvas.width = targetWidth;
	canvas.height = targetHeight;
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';
	ctx.drawImage(currentBitmap, 0, 0, targetWidth, targetHeight);

	let imageType = 'image/jpeg';
	const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
	const pixels = imageData.data;
	for (let i = 3; i < pixels.length; i += 4) {
		if (pixels[i] < 255) {
			imageType = 'image/png';
			break;
		}
	}

	if (width || height) console.log(`Base64 target resolution: ${width}px x ${height}px`);

	const dataUrl = canvas.toDataURL(imageType, 0.9);
	const base64 = dataUrl.split(',')[1];
	const base64SizeBytes = base64.length;

	if (base64SizeBytes < 102400) {
		console.log(`Base64 size: ${(base64SizeBytes / 1024).toFixed(2)} KiB`);
	} else {
		console.log(`Base64 size: ${(base64SizeBytes / 1024 / 1024).toFixed(2)} MiB`);
	}

	const base64Result = dataUrl;

	const result = new Object();
	result.base64 = base64Result;
	result.originalRes = originalRes;
	result.originalSize = originalSize;
	result.base64SizeBytes = base64SizeBytes;

	return result;
}
