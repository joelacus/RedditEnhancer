/**
 * Tweaks: Productivity - Show Floating Scroll To Top Button
 *
 * @name showToTopButtonFloat
 * @description Add a 'Scroll To Top' button that can be dragged anywhere on the webpage.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowToTopButtonFloat() {
	BROWSER_API.storage.sync.get(['showToTopButtonFloat', 'scrollToTopFloatPosition'], function (result) {
		if (result.showToTopButtonFloat) showToTopButtonFloat(true, result.scrollToTopFloatPosition);
	});
}

/* === Enable/Disable The Feature === */
export function showToTopButtonFloat(value, pos) {
	if (value) {
		enableShowToTopButtonFloatAll(pos);
	} else {
		if (document.querySelector('.re-scroll-to-top-float-container')) document.querySelector('.re-scroll-to-top-float-container').remove();
	}
}

// Enable Show Floating Scroll To Top Button - All
function enableShowToTopButtonFloatAll(pos = { x: 90, y: 90 }) {
	if (document.querySelector('.re-scroll-to-top-float-container')) return;
	// Create button container
	const container = document.createElement('div');
	container.classList.add('re-scroll-to-top-float-container');
	container.style.top = `${pos.y}%`;
	container.style.left = `${pos.x}%`;

	// Create to top button
	const toTop = document.createElement('div');
	toTop.setAttribute('id', 're-scroll-to-top-float');
	toTop.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
	container.append(toTop);

	// Create move handle
	const handle = document.createElement('div');
	handle.classList.add('re-scroll-to-top-handle');
	container.append(handle);
	makeDraggable(container, '.re-scroll-to-top-handle');

	// Append container to body
	document.querySelector('body').appendChild(container);
}

// Make the container draggable
function makeDraggable(element, handleSelector) {
	const handle = element.querySelector(handleSelector);
	let isDragging = false;
	let offsetX, offsetY, leftPercent, topPercent;

	handle.addEventListener('mousedown', (e) => {
		isDragging = true;
		const rect = element.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;
		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (!isDragging) return;

		const winWidth = window.innerWidth;
		const winHeight = window.innerHeight;
		const elemWidth = element.offsetWidth;
		const elemHeight = element.offsetHeight;

		let left = e.clientX - offsetX;
		let top = e.clientY - offsetY;

		left = Math.max(0, Math.min(left, winWidth - elemWidth));
		top = Math.max(0, Math.min(top, winHeight - elemHeight));

		leftPercent = (left / winWidth) * 100;
		topPercent = (top / winHeight) * 100;

		element.style.left = `${leftPercent}%`;
		element.style.top = `${topPercent}%`;
	});

	document.addEventListener('mouseup', () => {
		if (isDragging) {
			isDragging = false;
			BROWSER_API.runtime.sendMessage({ SaveScrollToTopFloatPosition: { x: leftPercent, y: topPercent } });
		}
	});
}
