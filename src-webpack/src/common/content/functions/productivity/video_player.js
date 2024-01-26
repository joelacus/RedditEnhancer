// New Player

import { videoObserver } from '../../video_observer';

export function newPlayer(value) {
	if (redditVersion === 'new') {
		if (value == true) {
			videoObserver(true);
		} else if (value == false) {
			videoObserver(false);
		}
	}
}
