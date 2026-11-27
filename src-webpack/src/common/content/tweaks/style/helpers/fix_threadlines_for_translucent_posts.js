/**
 * Tweaks: Style - Fix Threadlines For Translucent Posts
 *
 * @description Shorten comment threadlines when the post background is
 * translucent, so they stop at each comment's last visible direct child.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../../observer_manager';
import { isPresetThemeApplied, normalisePresetId, normalisePresetOpacity } from '../preset_themes';

// A custom post background needs the threadline fix only while it is actually
// enabled and translucent enough to show the rails behind the comments.
function isTranslucentColour(value) {
	return typeof value === 'string' && (value.includes('rgba') || value.includes('transparent'));
}

// State for the translucent-post threadline fix
let commentObserverCleanup = null;
let threadlineResizeObserver = null;
let threadlineObservedTree = null;
let threadlineUpdateFrame = null;

// Run After Page Has Loaded Comments. Popup messages pass the value they
// already applied as an override, because their storage writes may be
// debounced and can still be older than the page's live state.
export function loadFixThreadlinesForTranslucentPosts(overrides = {}) {
	BROWSER_API.storage.sync.get(['themePostBackgroundColour', 'themePostBackgroundColourCSS', 'themeBase', 'themeBaseOpacity'], function (result) {
		const preset = normalisePresetId(overrides.preset !== undefined ? overrides.preset : result.themeBase);
		const opacity = overrides.opacity !== undefined ? overrides.opacity : result.themeBaseOpacity;
		const presetTranslucent = preset && isPresetThemeApplied() && normalisePresetOpacity(opacity) < 100;
		const customEnabled = overrides.customEnabled !== undefined ? overrides.customEnabled : result.themePostBackgroundColour === true;
		const customColour = overrides.postBg !== undefined ? overrides.postBg : result.themePostBackgroundColourCSS;
		const customTranslucent = customEnabled && isTranslucentColour(customColour);
		if (presetTranslucent || customTranslucent) {
			fixThreadlinesForTranslucentPosts();
		} else {
			undoFixThreadlinesForTranslucentPosts();
		}
	});
}

// Coalesce layout changes into one update per frame
function scheduleThreadlineUpdate() {
	if (threadlineUpdateFrame) return;
	threadlineUpdateFrame = requestAnimationFrame(() => {
		threadlineUpdateFrame = null;
		updateThreadlineHeights();
	});
}

function stopThreadlineObservers() {
	if (commentObserverCleanup) {
		commentObserverCleanup();
		commentObserverCleanup = null;
	}
	threadlineObservedTree = null;
	if (threadlineResizeObserver) {
		threadlineResizeObserver.disconnect();
		threadlineResizeObserver = null;
	}
	if (threadlineUpdateFrame) {
		cancelAnimationFrame(threadlineUpdateFrame);
		threadlineUpdateFrame = null;
	}
}

// Shorten each comment's threadline so it ends where its last direct child
// (a comment or a "more replies" partial) starts. The child's own ::after
// pseudo-element draws the elbow from that point.
function updateThreadlineHeights() {
	if (!document.head.querySelector('style[id="re-theme-fix-comment-threadline"]')) return;
	const updates = [];
	document.querySelectorAll('shreddit-comment').forEach((comment) => {
		if (threadlineResizeObserver) threadlineResizeObserver.observe(comment);
		const grid = comment.querySelector(':scope > details > .comment-main-grid');
		const line = grid?.querySelector(':scope > .ssr-thread-line');
		if (!line) return;
		const children = grid.querySelector(':scope > #comment-children');
		if (!children) {
			updates.push({ line, height: '' });
			return;
		}
		const visibleChildren = children.getClientRects().length ? [...children.children].filter((child) => child.getClientRects().length) : [];
		const lastChild = visibleChildren[visibleChildren.length - 1];
		updates.push({ line, height: lastChild ? `${lastChild.offsetTop + 1}px` : '' });
	});
	updates.forEach(({ line, height }) => {
		if (height === '') {
			line.style.removeProperty('height');
			line.style.removeProperty('bottom');
		} else {
			if (line.style.height !== height) line.style.height = height;
			if (line.style.bottom !== 'auto') line.style.bottom = 'auto';
		}
	});
}

// Fix Comment Threadlines For Translucent Post Background Colours
function fixThreadlinesForTranslucentPosts() {
	if (!document.head.querySelector('style[id="re-theme-fix-comment-threadline"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-fix-comment-threadline';
		styleElement.textContent = `shreddit-comment {
										--color-neutral-background: transparent !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	const tree = document.querySelector('shreddit-comment-tree');
	if (commentObserverCleanup && threadlineObservedTree !== tree) {
		commentObserverCleanup();
		commentObserverCleanup = null;
	}
	if (tree && !commentObserverCleanup) {
		threadlineObservedTree = tree;
		commentObserverCleanup = registerMutationCallback(tree, scheduleThreadlineUpdate, { childList: true, subtree: true }, 'fixThreadlinesForTranslucentPosts', 100);
	}

	if (typeof ResizeObserver !== 'undefined' && !threadlineResizeObserver) {
		threadlineResizeObserver = new ResizeObserver(scheduleThreadlineUpdate);
	}

	updateThreadlineHeights();
	scheduleThreadlineUpdate();
}

// Undo Fix Comment Threadlines For Translucent Post Background Colours
function undoFixThreadlinesForTranslucentPosts() {
	stopThreadlineObservers();
	const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-fix-comment-threadline"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
	document.querySelectorAll('shreddit-comment .comment-main-grid > .ssr-thread-line').forEach((line) => {
		line.style.removeProperty('height');
		line.style.removeProperty('bottom');
	});
}
