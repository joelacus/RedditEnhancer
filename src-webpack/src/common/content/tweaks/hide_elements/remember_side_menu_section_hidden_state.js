/**
 * Tweaks: Hide Elements - Remember Side Menu Section Hidden State
 *
 * @name rememberSideMenuSectionHiddenState
 * @description Remember the open/hidden states of the sections in the side menu (left).
 *
 * Notes: Doesn't seem to work well with side menu auto hide.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadRememberSideMenuSectionHiddenState() {
	BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenState'], function (result) {
		if (result.rememberSideMenuSectionHiddenState) rememberSideMenuSectionHiddenState(true);
	});
}

/* === Enable/Disable The Feature === */
export function rememberSideMenuSectionHiddenState(value) {
	if (redditVersion === 'newnew' && value) {
		enableRememberSideMenuSectionHiddenStateRV3();
	}
}

// Enable Remember Side Menu Section Hidden State - RV3
function enableRememberSideMenuSectionHiddenStateRV3() {
	setTimeout(() => {
		addEventListenersToSideMenuSections();
		BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenStateValues'], function (result) {
			if (result.rememberSideMenuSectionHiddenStateValues) {
				const openStates = result.rememberSideMenuSectionHiddenStateValues;
				setRememberSideMenuSectionHiddenStates(openStates);
			} else {
				// init remember hidden states
				let openStates = {
					modertion: false,
					customFeeds: false,
					recent: false,
					communities: false,
					resources: false,
					topics: false,
				};
				BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenStateValues: openStates }, function (result) {
					setRememberSideMenuSectionHiddenStates(openStates);
				});
			}
		});
	}, 1000);
}

// Add Event Listeners To Side Menu Sections
let addModerationSectionListener = true;
let addCustomFeedsSectionListener = true;
let addRecentSectionListener = true;
let addCommunitiesSectionListener = true;
let addResourcesSectionListener = true;
function addEventListenersToSideMenuSections() {
	// Moderation Section Event Listener
	const moderationSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="moderation_section"])');
	if (moderationSection && addModerationSectionListener) {
		moderationSection.addEventListener('click', function (e) {
			const sectionState = e.currentTarget.getAttribute('open');
			let isHidden = false;
			if (sectionState !== '') {
				isHidden = true;
			}
			BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenStateValues'], function (result) {
				const openStates = result.rememberSideMenuSectionHiddenStateValues;
				openStates.moderation = isHidden;
				BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenStateValues: openStates });
			});
		});
		addModerationSectionListener = false;
	}

	// Custom Feeds Section Event Listener
	const customFeedsSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="multireddits_section"])');
	if (customFeedsSection && addCustomFeedsSectionListener) {
		customFeedsSection.addEventListener('click', function (e) {
			const sectionState = e.currentTarget.getAttribute('open');
			let isHidden = false;
			if (sectionState !== '') {
				isHidden = true;
			}
			BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenStateValues'], function (result) {
				const openStates = result.rememberSideMenuSectionHiddenStateValues;
				openStates.customFeeds = isHidden;
				BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenStateValues: openStates });
			});
		});
		addCustomFeedsSectionListener = false;
	}

	// Recent Section Event Listener
	setTimeout(() => {
		const recentSection = document.querySelector('reddit-recent-pages')?.shadowRoot?.querySelector('faceplate-expandable-section-helper');
		if (recentSection && addRecentSectionListener) {
			recentSection.addEventListener('click', function (e) {
				const sectionState = e.currentTarget.getAttribute('open');
				let isHidden = false;
				if (sectionState !== '') {
					isHidden = true;
				}
				BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenStateValues'], function (result) {
					const openStates = result.rememberSideMenuSectionHiddenStateValues;
					openStates.recent = isHidden;
					BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenStateValues: openStates });
				});
			});
			addRecentSectionListener = false;
		}
	}, 2000);

	// Communities Section Event Listener
	const communitiesSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="communities_section"])');
	if (communitiesSection && addCommunitiesSectionListener) {
		communitiesSection.addEventListener('click', function (e) {
			const sectionState = e.currentTarget.getAttribute('open');
			let isHidden = false;
			if (sectionState !== '') {
				isHidden = true;
			}
			BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenStateValues'], function (result) {
				const openStates = result.rememberSideMenuSectionHiddenStateValues;
				openStates.communities = isHidden;
				BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenStateValues: openStates });
			});
		});
		addCommunitiesSectionListener = false;
	}

	// Resources Section Event Listener
	const resourcesSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="RESOURCES"])');
	if (resourcesSection && addResourcesSectionListener) {
		resourcesSection.addEventListener('click', function (e) {
			const sectionState = e.currentTarget.getAttribute('open');
			let isHidden = false;
			if (sectionState !== '') {
				isHidden = true;
			}
			BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenStateValues'], function (result) {
				const openStates = result.rememberSideMenuSectionHiddenStateValues;
				openStates.resources = isHidden;
				BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenStateValues: openStates });
			});
		});
		addResourcesSectionListener = false;
	}
}

// Set Side Menu Section Hidden States
function setRememberSideMenuSectionHiddenStates(openStates) {
	// Moderation Section
	const moderation = openStates.moderation;
	const moderationSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="moderation_section"])');
	if (moderation === true && moderationSection) {
		moderationSection.removeAttribute('open');
		moderationSection.querySelector('details')?.removeAttribute('open');
	}

	// Custom Feeds Section
	const customFeeds = openStates.customFeeds;
	const customFeedsSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="multireddits_section"])');
	if (customFeeds === true && customFeedsSection) {
		customFeedsSection.removeAttribute('open');
		customFeedsSection.querySelector('details')?.removeAttribute('open');
	}

	// Recent Section
	setTimeout(() => {
		const recent = openStates.recent;
		const recentSection = document.querySelector('reddit-recent-pages')?.shadowRoot?.querySelector('faceplate-expandable-section-helper');
		if (recent === true && recentSection) {
			recentSection.removeAttribute('open');
			recentSection.querySelector('details')?.removeAttribute('open');
		}
	}, 2000);

	// Communities Section
	const communities = openStates.communities;
	const communitiesSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="communities_section"])');
	if (communities === true && communitiesSection) {
		communitiesSection.removeAttribute('open');
		communitiesSection.querySelector('details')?.removeAttribute('open');
	}

	// Resources Section
	const resources = openStates.resources;
	const resourcesSection = document.querySelector('faceplate-expandable-section-helper:has([aria-controls="RESOURCES"])');
	if (resources === true && resourcesSection) {
		resourcesSection.removeAttribute('open');
		resourcesSection.querySelector('details')?.removeAttribute('open');
	}
}
