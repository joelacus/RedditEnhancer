/**
 * Tweaks: Style - Post Overflow Menu Shadow Styles
 *
 * @description Keep feature stylesheets inside shreddit-post-overflow-menu's
 * nested shadow roots, including menus rendered for dynamically loaded posts.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// The theme loader runs in both content phases, so keep one shared observer
// and style registry instead of adding a second set from the later bundle.
const STATE_KEY = '__rePostOverflowMenuShadowState';

function getState() {
	if (!globalThis[STATE_KEY]) {
		globalThis[STATE_KEY] = {
			definitions: new Map(),
			observer: null,
			timer: null,
		};
	}
	return globalThis[STATE_KEY];
}

function setStyle(shadowRoot, id, css) {
	if (!shadowRoot || !css) return;
	let styleElement = shadowRoot.querySelector(`style[id="${id}"]`);
	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.id = id;
		shadowRoot.append(styleElement);
	}
	if (styleElement.textContent !== css) {
		styleElement.textContent = css;
	}
}

function applyToHost(host) {
	const hostShadowRoot = host.shadowRoot;
	if (!hostShadowRoot) return;
	const dropdownShadowRoot = hostShadowRoot.querySelector('rpl-dropdown')?.shadowRoot || null;
	const state = getState();
	state.definitions.forEach((definition, id) => {
		setStyle(hostShadowRoot, id, definition.host);
		setStyle(dropdownShadowRoot, id, definition.dropdown);
	});
}

function sync() {
	document.querySelectorAll('shreddit-post-overflow-menu').forEach(applyToHost);
}

function scheduleSync() {
	const state = getState();
	if (state.timer !== null) return;
	state.timer = setTimeout(() => {
		state.timer = null;
		sync();
	}, 100);
}

function startObserver() {
	const state = getState();
	if (state.observer) return;
	state.observer = new MutationObserver(scheduleSync);
	state.observer.observe(document.documentElement, { childList: true, subtree: true });
}

function stopObserver() {
	const state = getState();
	if (state.timer !== null) {
		clearTimeout(state.timer);
		state.timer = null;
	}
	state.observer?.disconnect();
	state.observer = null;
}

// Add or replace a shadow stylesheet. `host` targets elements in the host's
// shadow root (faceplate-menu); `dropdown` targets rpl-dropdown's shadow root
// (.hovercard-body).
export function setPostOverflowMenuShadowStyle(id, host, dropdown) {
	const state = getState();
	state.definitions.set(id, { host, dropdown });
	startObserver();
	sync();
}

export function removePostOverflowMenuShadowStyle(id) {
	const state = getState();
	state.definitions.delete(id);
	const hostStyleSelector = `style[id="${id}"]`;
	document.querySelectorAll('shreddit-post-overflow-menu').forEach((host) => {
		const hostShadowRoot = host.shadowRoot;
		hostShadowRoot?.querySelector(hostStyleSelector)?.remove();
		hostShadowRoot?.querySelector('rpl-dropdown')?.shadowRoot?.querySelector(hostStyleSelector)?.remove();
	});
	if (state.definitions.size === 0) stopObserver();
}
