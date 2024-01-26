// Bionic Reader

import { bionicReaderBgColour, bionicReaderFontColour } from '../../../content/functions/accessibility/bionic_reader';

export function loadBionicReaderColours() {
	BROWSER_API.storage.sync.get(['bionicReaderFontColour', 'bionicReaderBgColour'], function (result) {
		bionicReaderFontColour(result.bionicReaderFontColour);
		bionicReaderBgColour(result.bionicReaderBgColour);
	});
}
