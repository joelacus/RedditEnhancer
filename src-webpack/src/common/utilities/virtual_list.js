// ────────────────────────────────────────────────────────────────────────────
// Utility / Virtual List
// ────────────────────────────────────────────────────────────────────────────
// List virtualisation ("windowing") for tables with thousands of rows: only
// the visible window of rows exists in the DOM, flanked by spacer rows that
// preserve the full scroll height. Requires uniform row heights — keep
// windowed table cells single-line (ellipsis) so measurement stays valid.
// ────────────────────────────────────────────────────────────────────────────

// Creates a windowed renderer for one <tbody>.
// - tbody: the <tbody> to manage.
// - scroller: the scrollable ancestor (rows are positioned from its scrollTop).
// - colSpan: column count, for the spacer rows.
// - renderRow(item, tr): fills a fresh <tr> for one item (no DOM queries outside tr).
// - keyOf(item): stable string key, used for flash targeting.
// - emptyRow(): returns a <tr> to show when there are no items.
// - estimateHeight: fallback row height in px before measurement.
export function createWindowedTable({ tbody, scroller, colSpan, renderRow, keyOf, emptyRow, estimateHeight = 44, overscan = 10 }) {
	let items = [];
	let rowHeight = 0;
	let activeFlashKey = null;
	let activeFlashWarning = false;
	let raf = 0;

	function measure() {
		if (items.length === 0) return false;
		// Prefer a row that is already in the DOM: emptying the tbody collapses
		// the scroller's content, and the offsetHeight read below forces a
		// synchronous layout at which the browser clamps scrollTop — the scroll
		// position would be lost (the resize path lands here with the list
		// scrolled down). Real rows carry data-vkey (set when keyOf is
		// provided); spacer and empty-state rows do not.
		const existing = tbody.querySelector('tr[data-vkey]');
		if (existing) {
			const height = existing.offsetHeight;
			if (height > 0) {
				rowHeight = height;
				return true;
			}
			return false;
		}
		// No reusable row yet (first render, list still at the top): the
		// destructive probe is safe there.
		tbody.replaceChildren();
		const tr = document.createElement('tr');
		renderRow(items[0], tr);
		tbody.appendChild(tr);
		const height = tr.offsetHeight;
		tbody.replaceChildren();
		if (height > 0) {
			rowHeight = height;
			return true;
		}
		return false;
	}

	function spacer(px) {
		const tr = document.createElement('tr');
		tr.className = 'vl-spacer';
		tr.setAttribute('aria-hidden', 'true');
		const td = document.createElement('td');
		td.colSpan = colSpan;
		td.style.cssText = 'height:' + Math.max(0, Math.round(px)) + 'px;padding:0 !important;border:0 !important;';
		tr.appendChild(td);
		return tr;
	}

	function render() {
		// Skip hidden tables (inactive tabs share one scroller).
		const table = tbody.closest('table');
		if (table && getComputedStyle(table).display === 'none') return;
		// Capture scroll geometry BEFORE touching the DOM: reading clientHeight
		// forces a synchronous layout, which would clamp scrollTop while the
		// tbody is momentarily empty and snap the list back to the top.
		const viewHeight = scroller.clientHeight || 600;
		const top = Math.max(0, scroller.scrollTop);
		if (items.length === 0) {
			tbody.replaceChildren();
			tbody.appendChild(emptyRow());
			return;
		}
		// Measure BEFORE emptying the tbody: measure() reads offsetHeight,
		// which forces a synchronous layout, and on collapsed content the
		// browser clamps scrollTop to 0, losing the scroll position.
		if (!rowHeight && !measure()) rowHeight = estimateHeight;
		tbody.replaceChildren();
		const start = Math.max(0, Math.floor(top / rowHeight) - overscan);
		const end = Math.min(items.length, Math.ceil((top + viewHeight) / rowHeight) + overscan);
		if (start > 0) tbody.appendChild(spacer(start * rowHeight));
		for (let i = start; i < end; i++) {
			const tr = document.createElement('tr');
			if (keyOf) tr.dataset.vkey = keyOf(items[i]);
			renderRow(items[i], tr);
			if (activeFlashKey !== null && keyOf && keyOf(items[i]) === activeFlashKey) tr.classList.add(activeFlashWarning ? 'flash-warning' : 'flash-update');
			tbody.appendChild(tr);
		}
		if (end < items.length) tbody.appendChild(spacer((items.length - end) * rowHeight));
	}

	function onScroll() {
		if (raf) return;
		raf = requestAnimationFrame(() => {
			raf = 0;
			render();
		});
	}

	scroller.addEventListener('scroll', onScroll, { passive: true });

	// Row heights are stable (single-line rows), but zoom or font changes alter
	// them: drop the cached measurement and re-render on viewport resize.
	let resizeRaf = 0;
	window.addEventListener('resize', () => {
		if (resizeRaf) return;
		resizeRaf = requestAnimationFrame(() => {
			resizeRaf = 0;
			rowHeight = 0;
			render();
		});
	});

	return {
		// Replace the item list. Pass { resetScroll: true } when the data set
		// itself changed (search/sort/tab), { flash: key } to reveal one row
		// (with flashWarning: true for the orange already-exists flash).
		// The measured row height is cached: re-measuring forces layout on
		// collapsed content, which would clamp the scroll position.
		setItems(next, { resetScroll = false, flash = null, flashWarning = false } = {}) {
			items = next;
			activeFlashKey = flash;
			activeFlashWarning = flashWarning;
			if (resetScroll) scroller.scrollTop = 0;
			if (flash !== null) {
				if (!rowHeight) measure();
				if (rowHeight) {
					const index = items.findIndex((item) => keyOf && keyOf(item) === flash);
					if (index !== -1) scroller.scrollTop = Math.max(0, index * rowHeight - scroller.clientHeight / 2);
				}
			}
			render();
			activeFlashKey = null;
		},
		refresh() {
			render();
		},
		getItems() {
			return items;
		},
	};
}
