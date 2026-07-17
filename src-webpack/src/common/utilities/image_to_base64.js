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
	console.log(`Original: ${originalSize} MiB`);

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

	const canvas = document.createElement('canvas');
	canvas.width = targetWidth;
	canvas.height = targetHeight;
	canvas.getContext('2d').drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

	const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
	const base64 = dataUrl.split(',')[1];
	const base64SizeBytes = Math.ceil(base64.length * 0.75);

	const base64Size = (base64SizeBytes / 1048576).toFixed(2);
	console.log(`Base64: ${base64Size} MiB`);
	const base64Result = canvas.toDataURL('image/jpeg', 0.9);

	const result = new Object();
	result.base64 = base64Result;
	result.originalRes = originalRes;
	result.originalSize = originalSize;
	result.base64Size = base64Size;

	return result;
}
