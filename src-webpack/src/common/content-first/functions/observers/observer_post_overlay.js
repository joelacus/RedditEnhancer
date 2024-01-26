/* ===== Post Overlay ===== */

import { waitForAddedNode } from './main_observer';
import { scrollToNextRootComment } from '../../../content/functions/productivity/scroll_to_next_root_comment';
import { load_saves } from '../../../content/content_load_saves';

// Post Sidebar
export function observerPostOverlay() {
	waitForAddedNode({
		query: '#overlayScrollContainer > div:nth-child(2) > div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			console.log(el);
			if (useLegacy) {
				el.classList.add('re-sidebar-post');
			}
			scrollToNextRootComment();
			load_saves();
		},
	});
}
