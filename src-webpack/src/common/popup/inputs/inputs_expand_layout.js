// Inputs - Expand Layout Tweaks

// Toggle - Expand Layout
document.querySelector('#checkbox-expand-layout').addEventListener('change', function (e) {
	const expandLayout = document.querySelector('#checkbox-expand-layout').checked;
	if (expandLayout === true) {
		BROWSER_API.storage.sync.set({ expandLayout: true });
		const icons = document.querySelectorAll('.icon-expand-layout, .icon-resize-width, .icon-resize-offset');
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
	} else if (expandLayout === false) {
		BROWSER_API.storage.sync.set({ expandLayout: false });
		const icons = document.querySelectorAll('.icon-expand-layout, .icon-resize-width, .icon-resize-offset');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		BROWSER_API.storage.sync.set({ layoutCentre: false });
		document.querySelector('.icon-centre').style.backgroundColor = '';
		document.querySelector('#checkbox-layout-centre').checked = false;
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { expandLayout: false });
					BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: false });
				}
			});
		});
	}
});

// Slider - Expand Layout Width
document.querySelector('#input-expand-view-width').addEventListener('input', function (e) {
	const widthDisplay = document.querySelector('#expand-view-width');
	widthDisplay.innerText = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
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
document.querySelector('#input-expand-view-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandLayoutWidth: e.target.value });
});

// Slider - Expand Post Overlay Width
document.querySelector('#input-expand-post-overlay-width').addEventListener('input', function (e) {
	document.querySelector('#expand-post-overlay-width').textContent = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
				tabs.forEach(function (tab) {
					if (tab.url.includes('reddit.com') && tab.discarded == false) {
						BROWSER_API.tabs.sendMessage(tab.id, { expandPostOverlayWidth: e.target.value });
					}
				});
			});
		}
	});
});
document.querySelector('#input-expand-post-overlay-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandPostOverlayWidth: e.target.value });
});

// Slider - Expand Post Width
document.querySelector('#input-expand-post-width').addEventListener('input', function (e) {
	document.querySelector('#expand-post-width').textContent = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
				tabs.forEach(function (tab) {
					if (tab.url.includes('reddit.com') && tab.discarded == false) {
						BROWSER_API.tabs.sendMessage(tab.id, { expandPostWidth: e.target.value });
					}
				});
			});
		}
	});
});
document.querySelector('#input-expand-post-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandPostWidth: e.target.value });
});

// Slider - Expand Sub Reddit Width
document.querySelector('#input-expand-sub-width').addEventListener('input', function (e) {
	document.querySelector('#expand-sub-width').textContent = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
				tabs.forEach(function (tab) {
					if (tab.url.includes('reddit.com') && tab.discarded == false) {
						BROWSER_API.tabs.sendMessage(tab.id, { expandSubWidth: e.target.value });
					}
				});
			});
		}
	});
});
document.querySelector('#input-expand-sub-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandSubWidth: e.target.value });
});

// Slider - Expand User Profile Width
document.querySelector('#input-expand-user-profile-width').addEventListener('input', function (e) {
	document.querySelector('#expand-user-profile-width').textContent = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
				tabs.forEach(function (tab) {
					if (tab.url.includes('reddit.com') && tab.discarded == false) {
						BROWSER_API.tabs.sendMessage(tab.id, { expandUserProfileWidth: e.target.value });
					}
				});
			});
		}
	});
});
document.querySelector('#input-expand-user-profile-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandUserProfileWidth: e.target.value });
});

// Slider - Expand Topic Feed Width
document.querySelector('#input-expand-topic-feed-width').addEventListener('input', function (e) {
	document.querySelector('#expand-topic-feed-width').textContent = e.target.value + '%';
	// if expand layout is true
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (result.expandLayout === true) {
			BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
				tabs.forEach(function (tab) {
					if (tab.url.includes('reddit.com') && tab.discarded == false) {
						BROWSER_API.tabs.sendMessage(tab.id, { expandTopicFeedWidth: e.target.value });
					}
				});
			});
		}
	});
});
document.querySelector('#input-expand-topic-feed-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ expandTopicFeedWidth: e.target.value });
});

// Toggle - Centre Layout
document.querySelector('#checkbox-layout-centre').addEventListener('change', function (e) {
	const expandLayout = document.querySelector('#checkbox-expand-layout').checked;
	if (expandLayout) {
		const state = document.querySelector('#checkbox-layout-centre').checked;
		if (state === true) {
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
	} else {
		document.querySelector('#checkbox-layout-centre').checked = false;
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

// Toggle - Remove Page Side Margin
/*document.querySelector('#checkbox-remove-page-side-margin').addEventListener('change', function (e) {
	const removePageSideMargin = document.querySelector('#checkbox-remove-page-side-margin').checked;
	if (removePageSideMargin === true) {
		BROWSER_API.storage.sync.set({ removePageSideMargin: true });
		document.querySelector('.icon-remove-page-side-margin').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { removePageSideMargin: true });
				}
			});
		});
	} else if (removePageSideMargin === false) {
		BROWSER_API.storage.sync.set({ removePageSideMargin: false });
		document.querySelector('.icon-remove-page-side-margin').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { removePageSideMargin: false });
				}
			});
		});
	}
});*/

// Slider - Layout Offset
document.querySelector('#input-layout-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-offset-value').textContent = e.target.value + '%';
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { layoutOffset: e.target.value });
			}
		});
	});
});
document.querySelector('#input-layout-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutOffset: e.target.value });
});

// Slider - Layout Sub Offset
document.querySelector('#input-layout-sub-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-sub-offset-value').textContent = e.target.value + '%';
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { layoutSubOffset: e.target.value });
			}
		});
	});
});
document.querySelector('#input-layout-sub-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutSubOffset: e.target.value });
});

// Slider - Layout Post Offset
document.querySelector('#input-layout-post-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-post-offset-value').textContent = e.target.value + '%';
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { layoutPostOffset: e.target.value });
			}
		});
	});
});
document.querySelector('#input-layout-post-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutPostOffset: e.target.value });
});

// Slider - Layout User Profile Offset
document.querySelector('#input-layout-user-profile-offset').addEventListener('input', function (e) {
	document.querySelector('#layout-user-profile-offset-value').textContent = e.target.value + '%';
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { layoutUserProfileOffset: e.target.value });
			}
		});
	});
});
document.querySelector('#input-layout-user-profile-offset').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ layoutUserProfileOffset: e.target.value });
});
