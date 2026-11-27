/**
 * Tweaks: Block - Blocked Usernames
 *
 * @name hideBlockedUsernames
 * @description Replace the username of blocked users with "hidden" wherever it appears.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce.js';
import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { readBlocks, getBlockedUserPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { registerMutationCallback } from '../../observer_manager';

const MASK_CLASS = 're-hide-blocked-username';
const MASK_TEXT = 'hidden';

let blockedUsers = [];
let listenerActive = false;
let observerCleanup = null;
let scrollCleanup = null;
let observedBody = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedUsernames() {
	if (!listenerActive) {
		BROWSER_API.storage.onChanged.addListener((changes, area) => {
			if (area !== 'local' || !changes[BLOCK_STORE_KEY]) return;
			readBlocks().then(applyStore);
		});
		listenerActive = true;
	}
	readBlocks().then(applyStore);
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

function applyStore(store) {
	blockedUsers = getBlockedUserPatterns(store, 'hide_username');
	scanPage();
	if (blockedUsers.length > 0) setupObservers();
	else teardownObservers();
}

function setupObservers() {
	if (observerCleanup && observedBody === document.body) return;
	teardownObservers();
	observedBody = document.body;
	observerCleanup = registerMutationCallback(document.body, () => scanPage(), { childList: true, subtree: true }, 'hideBlockedUsernames', 250);
	const debouncedScrollHandler = debounce(() => scanPage(), 200);
	window.addEventListener('scroll', debouncedScrollHandler);
	scrollCleanup = () => window.removeEventListener('scroll', debouncedScrollHandler);
}

function teardownObservers() {
	if (observerCleanup) {
		observerCleanup();
		observerCleanup = null;
	}
	if (scrollCleanup) {
		scrollCleanup();
		scrollCleanup = null;
	}
	observedBody = null;
}

// ─── Scanning ───────────────────────────────────────────────────────────────

// Username displays that are not plain user links: post/comment authors and
// profile headings.
const USERNAME_SELECTORS_V3 = ['shreddit-post [noun="user_profile"] a[href*="/user/"]', 'shreddit-post .re-post-author > a[href*="/user/"]', 'shreddit-comment [noun="comment_author"] a[href*="/user/"]', '[data-testid="profile-display-name"]', '[data-testid="profile-prefixed-name"]'];

function getUsernameElements() {
	const elements = new Set();
	if (redditVersion === 'old') {
		document.querySelectorAll('a.author').forEach((el) => elements.add(el));
		// The subreddit sidebar uses the same .titlebox h1 markup, so only
		// treat it as a username on a user profile page.
		if (/^\/(?:user|u)\//i.test(location.pathname)) {
			document.querySelectorAll('.titlebox h1').forEach((el) => elements.add(el));
		}
	} else {
		document.querySelectorAll(USERNAME_SELECTORS_V3.join(',')).forEach((el) => elements.add(el));
	}

	// Catch the remaining places a username is linked: mentions in post and
	// comment bodies and the header's own profile link. Only a link whose text
	// is the username itself is masked, so navigation links such as a profile's
	// "Overview" tab are left alone.
	document.querySelectorAll('a[href*="/user/"]').forEach((el) => {
		if (isInsideHoverCardBody(el)) return;
		const username = usernameFromHref(el);
		// Masked links no longer display the username, but they must stay in the
		// scan so the cleanup pass does not unmask and re-mask them in a loop.
		if (username && (isUsernameText(el.textContent, username) || el.classList.contains(MASK_CLASS) || el.querySelector(`.${MASK_CLASS}`))) elements.add(el);
	});
	return elements;
}

function scanPage() {
	const seen = new Set();
	for (const el of getUsernameElements()) {
		if (isInsideHoverCardBody(el)) continue;
		const username = usernameFromElement(el);
		if (!username) continue;
		const target = getMaskTarget(el, username);
		if (!target) continue;
		seen.add(target);
		if (blockedUsers.some((pattern) => matchesPattern(username, pattern))) maskUsername(target);
		else unmaskUsername(target);
	}
	// Restore masks whose element is gone from the current page or whose
	// username no longer matches (e.g. the scope was switched off).
	document.querySelectorAll('.' + MASK_CLASS).forEach((target) => {
		if (!seen.has(target)) unmaskUsername(target);
	});
}

// ─── Username Helpers ───────────────────────────────────────────────────────

function usernameFromElement(el) {
	const hrefName = usernameFromHref(el);
	if (hrefName) return hrefName;
	if (el.matches('[data-testid="profile-display-name"], [data-testid="profile-prefixed-name"], .titlebox h1')) {
		return usernameFromProfilePath() || normaliseUsername(el.dataset.reOriginalUsername || el.textContent);
	}
	return normaliseUsername(el.dataset.reOriginalUsername || el.textContent);
}

function usernameFromHref(el) {
	const href = el.getAttribute('href');
	if (!href) return null;
	const match = href.match(/\/user\/([^/?#]+)/i);
	return match ? decodeURIComponent(match[1]) : null;
}

function usernameFromProfilePath() {
	const match = location.pathname.match(/^\/(?:user|u)\/([^/?#]+)/i);
	return match ? decodeURIComponent(match[1]) : null;
}

function normaliseUsername(text) {
	return String(text || '')
		.trim()
		.replace(/^u\//i, '')
		.replace(/\/+$/, '');
}

function isUsernameText(text, username) {
	return normaliseUsername(text).toLowerCase() === username.toLowerCase();
}

// The user hover card renders a server partial into the trigger's
// [slot="content"] child. Masking that partial makes Reddit re-render it, so
// the name flickers between "hidden" and the real name. Leave the card body
// alone; the author link that opens it is still masked.
function isInsideHoverCardBody(el) {
	return !!el.closest('faceplate-hovercard [slot="content"], rpl-hovercard [slot="content"], .hover-card.user-hover-card, faceplate-tracker[source="moderator_list"]');
}

// The visible text element inside a username display. On v3 the name sits in
// a nameplate span next to the avatar, so the avatar stays visible.
function getMaskTarget(el, username) {
	if (el.matches('[data-testid="profile-display-name"]')) {
		return el.querySelector('[data-testid="nameplate"] > span') ?? el;
	}
	if (el.matches('[data-testid="profile-prefixed-name"]')) {
		return el.querySelector('span') ?? el;
	}
	const nameplate = el.querySelector?.('[data-testid="nameplate"]');
	if (nameplate) return nameplate.querySelector(':scope > span') ?? nameplate;
	// A link that wraps an avatar and a separate text span: replace only the
	// text so the avatar and any icon stay in place.
	return findUsernameTextElement(el, username) ?? el;
}

function findUsernameTextElement(el, username) {
	if (!el.children.length) return el;
	for (const child of el.querySelectorAll('span, p, div, a')) {
		if (child.children.length) continue;
		// A masked child shows the mask text instead of the username, so match
		// the name it was masked from as well.
		if (isUsernameText(child.textContent, username) || isUsernameText(child.dataset.reOriginalUsername, username)) return child;
	}
	return null;
}

// ─── Masking ────────────────────────────────────────────────────────────────

function maskUsername(target) {
	if (!target.classList.contains(MASK_CLASS)) {
		target.dataset.reOriginalUsername = target.textContent;
		target.classList.add(MASK_CLASS);
	} else if (target.textContent !== MASK_TEXT) {
		// Reddit reused the element for another user; keep the new original so
		// turning the scope off restores the name that is actually displayed.
		target.dataset.reOriginalUsername = target.textContent;
	}
	if (target.textContent !== MASK_TEXT) target.textContent = MASK_TEXT;
}

function unmaskUsername(target) {
	if (!target.classList.contains(MASK_CLASS)) return;
	const original = target.dataset.reOriginalUsername;
	if (original !== undefined) target.textContent = original;
	delete target.dataset.reOriginalUsername;
	target.classList.remove(MASK_CLASS);
}
