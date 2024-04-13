/* ===== Old New Post Overlay ===== */

import { waitForAddedNode } from './main_observer';
import { load_saves } from '../../../content/content_load_saves';
import { observersNew } from './observers_new';
import { scrollToNextRootComment } from '../../../content/functions/productivity/scroll_to_next_root_comment';

// Post Sidebar
export function observerPostOverlay() {
	waitForAddedNode({
		query: '#overlayScrollContainer > div:nth-child(2) > div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			if (useLegacy) {
				el.classList.add('re-sidebar-post');
			}
			scrollToNextRootComment();
			observersNew();
			load_saves();
		},
	});
}
