/**
 * Tweaks: Productivity - Community Filter
 *
 * @name showCommunitiesFilter
 * @description Adds a filter input at the top of the communities list in the side menu to quickly filter subreddits.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import i18next from 'i18next';

let filterInput = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadShowCommunitiesFilter() {
	BROWSER_API.storage.sync.get(['showCommunitiesFilter'], function (result) {
		if (result.showCommunitiesFilter === true) showCommunitiesFilter(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function showCommunitiesFilter(value) {
	if (value) {
		if (document.querySelector('#communities_section')) ensureFilterInput();
	} else {
		document.querySelector('.re-communities-filter-input')?.remove();
	}
}

// ─── Create and insert the filter input ──────────────────────────────────────

function ensureFilterInput() {
	const section = document.querySelector('#communities_section');
	if (section.querySelector('.re-communities-filter-input')) return;

	const filterWrapper = document.createElement('div');
	filterWrapper.className = 're-communities-filter-wrapper';
	filterWrapper.style.cssText = 'position: sticky; top: 0; background: var(--shreddit-content-background);padding: 8px 0; z-index: 10;';

	const input = document.createElement('input');
	input.type = 'text';
	input.className = 're-communities-filter-input';
	input.placeholder = i18next.t('FilterCommunities.message');
	input.style.cssText = `
		width: calc(100% - 2rem);
		padding: 6px 10px;
		border: 1px solid var(--color-border, #ccc);
		border-radius: 4px;
		font-size: 14px;
		box-sizing: border-box;
        margin: 0 1rem;
	`;

	filterWrapper.appendChild(input);
	const container = section.querySelector('left-nav-communities-controller');
	section.insertBefore(filterWrapper, container);

	input.addEventListener('input', handleFilterInput);
}

// ─── Filter Logic ────────────────────────────────────────────────────────────

function handleFilterInput() {
	applyFilterToItems();
}

function applyFilterToItems() {
	const filterInput = document.querySelector('.re-communities-filter-input');
	if (!filterInput) return;
	const filterText = filterInput.value.toLowerCase().trim();
	const shadowRoot = document.querySelector('left-nav-communities-controller')?.shadowRoot;
	if (!shadowRoot) return;

	const items = shadowRoot.querySelectorAll('left-nav-community-item');
	items.forEach((item) => {
		const prefixedName = item.getAttribute('prefixedname') || '';
		const communityName = prefixedName.startsWith('r/') ? prefixedName.slice(2) : prefixedName;
		const matches = filterText === '' || communityName.toLowerCase().includes(filterText);
		item.style.display = matches ? '' : 'none';
	});
}
