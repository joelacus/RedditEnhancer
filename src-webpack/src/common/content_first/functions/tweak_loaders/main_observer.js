/* ===== Main Observer ===== */

export function waitForAddedNode(params, timeout) {
	// If element already exists
	let targetNode = null;

	// Check if the element exists
	targetNode = params.id ? document.getElementById(params.query) : document.querySelector(params.query);

	if (targetNode) {
		// If shadowRoot is requested, check if it exists
		if (params.shadowRoot && targetNode.shadowRoot) {
			params.done(targetNode.shadowRoot);
			return;
		} else if (!params.shadowRoot) {
			params.done(targetNode);
			return;
		}
	}

	// If not, wait for it to load
	let timer;

	const observer = new MutationObserver(function (mutations) {
		// Check for the target element
		let el = params.id ? document.getElementById(params.query) : document.querySelector(params.query);

		if (el) {
			// If shadowRoot is requested, check if it exists
			if (params.shadowRoot && el.shadowRoot) {
				if (timeout !== false) {
					clearTimeout(timer); // cancel the timeout if the shadowRoot is found
					observer.disconnect();
				}
				params.done(el.shadowRoot);
			} else if (!params.shadowRoot) {
				if (timeout !== false) {
					clearTimeout(timer); // cancel the timeout if the element is found
					observer.disconnect();
				}
				params.done(el);
			}
		}
	});

	observer.observe(params.parent || document, {
		subtree: !!params.recursive || !params.parent,
		childList: true,
	});

	// Timeout
	if (timeout !== false) {
		timer = setTimeout(() => {
			observer.disconnect();
		}, 10000);
	}
}
