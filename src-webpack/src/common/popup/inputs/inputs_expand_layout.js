// Inputs - Expand Layout Tweaks

// Toggle - Expand Layout
document.querySelector('#checkbox-expand-layout').addEventListener('change', function (e) {
	var expandLayout = document.querySelector('#checkbox-expand-layout').checked;
	if (expandLayout == true) {
		BROWSER_API.storage.sync.set({ expandLayout: true });
		var icons = document.querySelectorAll('.icon-layout');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = 'var(--accent)';
		});
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { expandLayout: true });
				}
			});
		});
	} else if (expandLayout == false) {
		BROWSER_API.storage.sync.set({ expandLayout: false });
		var icons = document.querySelectorAll('.icon-layout');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { expandLayout: false });
				}
			});
		});
	}
});

// Slider - Expand Layout Width
document.querySelector('#input-expand-view-width').addEventListener('input', function (e) {
	BROWSER_API.storage.sync.set({ expandLayoutWidth: e.target.value });
	const widthDisplay = document.querySelector('#expand-view-width');
	widthDisplay.innerText = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout == true) {
			BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
				tabs.forEach(function (tab) {
					if (tab.url.includes('reddit.com') && tab.discarded == false) {
						BROWSER_API.tabs.sendMessage(tab.id, { expandLayoutWidth: e.target.value });
					}
				});
			});
		}
	});
});

// Toggle - Centre Layout
document.querySelector('#checkbox-layout-centre').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-layout-centre').checked;
	if (state == true) {
		BROWSER_API.storage.sync.set({ layoutCentre: true });
		document.querySelector('.icon-centre').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: true });
				}
			});
		});
	} else {
		BROWSER_API.storage.sync.set({ layoutCentre: false });
		document.querySelector('.icon-centre').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: false });
				}
			});
		});
	}
});

// Input - Auto Expand Feed/Post To 100% At Value
document.querySelector('#auto-expand-value').addEventListener('keyup', function (e) {
	const value = e.target.value;
	BROWSER_API.storage.sync.set({ autoExpandValue: value });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { autoExpandValue: value });
			}
		});
	});
});
