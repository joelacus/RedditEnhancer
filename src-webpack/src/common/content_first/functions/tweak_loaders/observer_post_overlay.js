/* ===== Old New Post Overlay ===== */

import { waitForAddedNode } from './main_observer';
import { loadTweaks } from '../../../content/tweak_loader';
import { scrollToNextRootComment } from '../../../content/tweaks/productivity/scroll_to_next_root_comment';

// Post Sidebar
export function observerPostOverlay() {
	waitForAddedNode({
		query: '#overlayScrollContainer > div:nth-child(2) > div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			scrollToNextRootComment();
			loadTweaks();
		},
	});
}
