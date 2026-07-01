// ────────────────────────────────────────────────────────────────────────────
// Main Observer
// ────────────────────────────────────────────────────────────────────────────

/**
 * Waits for a node to be added to the DOM, optionally observing shadow DOM.
 *
 * @param {Object} params - Configuration object.
 * @param {string} params.query - CSS selector (or ID if `params.id` is true).
 * @param {boolean} [params.id=false] - Whether `query` is an element ID to look up via `getElementById`.
 * @param {string} [params.parent] - CSS selector for the parent element to observe. Defaults to `document`.
 * @param {boolean} [params.recursive] - Whether to observe the parent recursively.
 * @param {boolean} [params.shadowRoot] - Whether to wait for the element's shadowRoot to initialise.
 * @param {string} [params.shadowChild] - CSS selector for a child inside the shadowRoot to wait for.
 * @param {function} params.done - Callback invoked with the found result (element, shadowRoot, or shadow child).
 * @param {number|false} [timeout=10000] - Maximum time to wait in milliseconds. Pass `false` to disable.
 */

export function waitForAddedNode(params, timeout) {
	// Resolves the host element immediately or waits for it to be added to the DOM.
	let targetNode = params.id ? document.getElementById(params.query) : document.querySelector(params.query);
	let timer; // Fallback timeout handle (10s).
	let outerObserver; // Watches the parent for the host element being added.
	let innerObserver; // Watches a shadowRoot for the shadowChild being added.
	let shadowCheckInterval; // Polls the host for its shadowRoot to initialise.

	// ─── Helpers ──────────────────────────────────────────────────────────────

	// Tears down all active observers/intervals/timeouts.
	function cleanup() {
		if (timeout !== false) {
			clearTimeout(timer);
		}
		if (outerObserver) outerObserver.disconnect();
		if (innerObserver) innerObserver.disconnect();
		if (shadowCheckInterval) clearInterval(shadowCheckInterval);
	}

	// Calls done callback with result and cleans up all watchers.
	function doneWithResult(result) {
		cleanup();
		params.done(result);
	}

	// Waits for a child node matching shadowChild to appear inside the given shadowRoot.
	function observeShadowChild(shadowRoot) {
		const child = shadowRoot.querySelector(params.shadowChild);
		if (child) {
			doneWithResult(child);
			return;
		}

		innerObserver = new MutationObserver(() => {
			const foundChild = shadowRoot.querySelector(params.shadowChild);
			if (foundChild) {
				doneWithResult(foundChild);
			}
		});
		innerObserver.observe(shadowRoot, { subtree: true, childList: true });
	}

	// Dispatches the found element to done, awaiting the shadowRoot or shadowChild as needed.
	function processElement(el) {
		if (params.shadowRoot) {
			if (el.shadowRoot) {
				if (params.shadowChild) {
					observeShadowChild(el.shadowRoot);
				} else {
					doneWithResult(el.shadowRoot);
				}
			} else {
				shadowCheckInterval = setInterval(() => {
					if (el.shadowRoot) {
						clearInterval(shadowCheckInterval);
						shadowCheckInterval = null;
						processElement(el);
					}
				}, 50);
			}
		} else {
			doneWithResult(el);
		}
	}

	// ─── Initial check ────────────────────────────────────────────────────────

	// If the host element already exists, bypass the observer entirely.
	if (targetNode) {
		processElement(targetNode);
		return;
	}

	// ─── Wait for element to load ─────────────────────────────────────────────

	// Observes the parent for the host node to be appended, then processes it.
	outerObserver = new MutationObserver(function () {
		const el = params.id ? document.getElementById(params.query) : document.querySelector(params.query);
		if (el) {
			outerObserver.disconnect();
			processElement(el);
		}
	});

	outerObserver.observe(params.parent || document, {
		subtree: !!params.recursive || !params.parent,
		childList: true,
	});

	if (timeout !== false) {
		// Abort and clean up if the element/shadowRoot is not found within 10 seconds.
		timer = setTimeout(() => {
			cleanup();
		}, 10000);
	}
}
