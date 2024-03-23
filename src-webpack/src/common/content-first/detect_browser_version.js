// Detect Firefox Version For Legacy Support
export function detectFirefoxVersion() {
	const userAgent = navigator.userAgent;
	const match = userAgent.match(/Firefox\/(\d+)/);
	if (match && match[1]) {
		const firefoxVersion = parseInt(match[1], 10);
		if (firefoxVersion !== null && firefoxVersion < 121) {
			var isPre121 = true;
		} else {
			var isPre121 = false;
		}
		return isPre121;
	}
	return null;
}

// Detect Edge On Windows 10 For Legacy Support
export function detectEdgeVersion() {
	const userAgent = navigator.userAgent;
	return /Edg\/\d+/.test(userAgent) && /Windows NT 10/.test(userAgent);
}
