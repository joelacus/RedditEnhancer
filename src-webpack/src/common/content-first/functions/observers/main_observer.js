/* ===== Main Observer ===== */

export function waitForAddedNode(params, timeout) {
	// If element already exists
	let targetNode = [];
	if (params.id) {
		targetNode = document.getElementById(params.query);
	} else {
		targetNode = document.querySelector(params.query);
	}

	if (targetNode) {
		params.done(targetNode);
		return;
	}

	// If not, wait for it to load
	let timer;

	const observer = new MutationObserver(function (mutations) {
		let el = [];
		if (params.id) {
			el = document.getElementById(params.query);
		} else {
			el = document.querySelector(params.query);
		}
		if (el) {
			if (timeout != false) {
				clearTimeout(timer); // cancel the timeout if the element is found
				this.disconnect();
			}
			params.done(el);
		}
	});

	observer.observe(params.parent || document, {
		subtree: !!params.recursive || !params.parent,
		childList: true,
	});

	// Timeout
	if (timeout != false) {
		timer = setTimeout(() => {
			observer.disconnect();
		}, 5000);
	}
}
