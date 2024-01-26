// Inputs - Style Tweaks

// Toggle - Mind The Gap
document.querySelector('#checkbox-hide-gap').addEventListener('change', function (e) {
	var hideGap = document.querySelector('#checkbox-hide-gap').checked;
	if (hideGap == true) {
		BROWSER_API.storage.sync.set({ hideGap: true });
		document.querySelector('.hide-gap').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideGap: true });
				}
			});
		});
	} else if (hideGap == false) {
		BROWSER_API.storage.sync.set({ hideGap: false });
		document.querySelector('.hide-gap').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideGap: false });
				}
			});
		});
	}
});

// Toggle - Dropshadows
document.querySelector('#checkbox-shadow').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-shadow').checked;
	if (state == true) {
		BROWSER_API.storage.sync.set({ shadows: true });
		document.querySelector('.icon-shadow').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-shadow').classList.add('icon-light-on');
		document.querySelector('.icon-shadow').classList.remove('icon-light-off');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { shadows: true });
				}
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({ shadows: false });
		document.querySelector('.icon-shadow').style.backgroundColor = '';
		document.querySelector('.icon-shadow').classList.remove('icon-light-on');
		document.querySelector('.icon-shadow').classList.add('icon-light-off');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { shadows: false });
				}
			});
		});
	}
});

// Toggle - Drop Shadow CSS Override
document.querySelector('#checkbox-shadow-override').addEventListener('change', function (e) {
	var overrideDropShadow = document.querySelector('#checkbox-shadow-override').checked;
	if (overrideDropShadow == true) {
		BROWSER_API.storage.sync.set({ overrideDropShadow: true });
		document.querySelector('.icon-drop-shadow-override').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { overrideDropShadow: true });
				}
			});
		});
	} else if (overrideDropShadow == false) {
		BROWSER_API.storage.sync.set({ overrideDropShadow: false });
		document.querySelector('.icon-drop-shadow-override').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { overrideDropShadow: false });
				}
			});
		});
	}
});

// Input - Drop Shadow Override CSS
document.querySelector('#input-shadow-override-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-shadow-override-css').value;
	BROWSER_API.storage.sync.set({ overrideDropShadowCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { overrideDropShadowCSS: css });
			}
		});
	});
});

// Toggle - Modernise Old Reddit
document.querySelector('#checkbox-modern-old-reddit').addEventListener('change', function (e) {
	var moderniseOldReddit = document.querySelector('#checkbox-modern-old-reddit').checked;
	if (moderniseOldReddit == true) {
		BROWSER_API.storage.sync.set({ moderniseOldReddit: true });
		BROWSER_API.storage.sync.set({ hideHeaderSubBar: true });
		BROWSER_API.storage.sync.set({ hideSideMenuOld: true });
		BROWSER_API.storage.sync.set({ largerClassicPost: true });
		document.querySelector('.icon-modern-old-reddit').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { moderniseOldReddit: true });
					BROWSER_API.tabs.sendMessage(tab.id, { hideHeaderSubBar: true });
					BROWSER_API.tabs.sendMessage(tab.id, { hideSideMenuOld: true });
					BROWSER_API.tabs.sendMessage(tab.id, { largerClassicPost: true });
				}
			});
		});
		document.querySelector('#checkbox-hide-header-sub-bar').checked = true;
		document.querySelector('#checkbox-hide-side-menu-old').checked = true;
		document.querySelector('#checkbox-larger-classic-post').checked = true;
	} else if (moderniseOldReddit == false) {
		BROWSER_API.storage.sync.set({ moderniseOldReddit: false });
		BROWSER_API.storage.sync.set({ hideHeaderSubBar: false });
		BROWSER_API.storage.sync.set({ hideSideMenuOld: false });
		BROWSER_API.storage.sync.set({ largerClassicPost: false });
		document.querySelector('.icon-modern-old-reddit').style.backgroundColor = '';
		document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = '';
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { moderniseOldReddit: false });
					BROWSER_API.tabs.sendMessage(tab.id, { hideHeaderSubBar: false });
					BROWSER_API.tabs.sendMessage(tab.id, { hideSideMenuOld: false });
					BROWSER_API.tabs.sendMessage(tab.id, { largerClassicPost: false });
				}
			});
		});
		document.querySelector('#checkbox-hide-header-sub-bar').checked = false;
		document.querySelector('#checkbox-hide-side-menu-old').checked = false;
		document.querySelector('#checkbox-larger-classic-post').checked = false;
	}
});

// Toggle - Header Background Colour
document.querySelector('#checkbox-header-bg-colour').addEventListener('change', function (e) {
	var themeHeaderBackgroundColour = document.querySelector('#checkbox-header-bg-colour').checked;
	if (themeHeaderBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themeHeaderBackgroundColour: true });
		document.querySelector('.icon-header-bg-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeHeaderBackgroundColour: true });
				}
			});
		});
	} else if (themeHeaderBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themeHeaderBackgroundColour: false });
		document.querySelector('.icon-header-bg-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeHeaderBackgroundColour: false });
				}
			});
		});
	}
});

// Input - Header Background Colour CSS
document.querySelector('#input-header-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-header-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeHeaderBackgroundColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeHeaderBackgroundColourCSS: css });
			}
		});
	});
});

// Toggle - Header Text Colour
document.querySelector('#checkbox-header-text-colour').addEventListener('change', function (e) {
	var themeHeaderTextColour = document.querySelector('#checkbox-header-text-colour').checked;
	if (themeHeaderTextColour == true) {
		BROWSER_API.storage.sync.set({ themeHeaderTextColour: true });
		document.querySelector('.icon-header-text-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeHeaderTextColour: true });
				}
			});
		});
	} else if (themeHeaderTextColour == false) {
		BROWSER_API.storage.sync.set({ themeHeaderTextColour: false });
		document.querySelector('.icon-header-text-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeHeaderTextColour: false });
				}
			});
		});
	}
});

// Input - Header Text Colour CSS
document.querySelector('#input-header-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-header-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themeHeaderTextColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeHeaderTextColourCSS: css });
			}
		});
	});
});

// Toggle - Sort Background Colour
document.querySelector('#checkbox-sort-bg-colour').addEventListener('change', function (e) {
	var themeSortBackgroundColour = document.querySelector('#checkbox-sort-bg-colour').checked;
	if (themeSortBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themeSortBackgroundColour: true });
		document.querySelector('.icon-sort-bg-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortBackgroundColour: true });
				}
			});
		});
	} else if (themeSortBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themeSortBackgroundColour: false });
		document.querySelector('.icon-sort-bg-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortBackgroundColour: false });
				}
			});
		});
	}
});

// Input - Sort Background Colour CSS
document.querySelector('#input-sort-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSortBackgroundColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeSortBackgroundColourCSS: css });
			}
		});
	});
});

// Toggle - Sort Text Colour
document.querySelector('#checkbox-sort-text-colour').addEventListener('change', function (e) {
	var themeSortTextColour = document.querySelector('#checkbox-sort-text-colour').checked;
	if (themeSortTextColour == true) {
		BROWSER_API.storage.sync.set({ themeSortTextColour: true });
		document.querySelector('.icon-sort-text-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortTextColour: true });
				}
			});
		});
	} else if (themeSortTextColour == false) {
		BROWSER_API.storage.sync.set({ themeSortTextColour: false });
		document.querySelector('.icon-sort-text-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortTextColour: false });
				}
			});
		});
	}
});

// Input - Sort Text Colour CSS
document.querySelector('#input-sort-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSortTextColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeSortTextColourCSS: css });
			}
		});
	});
});

// Toggle - Sort Text Colour 2
document.querySelector('#checkbox-sort-text-colour-2').addEventListener('change', function (e) {
	var themeSortTextColour2 = document.querySelector('#checkbox-sort-text-colour-2').checked;
	if (themeSortTextColour2 == true) {
		BROWSER_API.storage.sync.set({ themeSortTextColour2: true });
		document.querySelector('.icon-sort-text-colour-2').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortTextColour2: true });
				}
			});
		});
	} else if (themeSortTextColour2 == false) {
		BROWSER_API.storage.sync.set({ themeSortTextColour2: false });
		document.querySelector('.icon-sort-text-colour-2').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortTextColour2: false });
				}
			});
		});
	}
});

// Input - Sort Text Colour 2 CSS
document.querySelector('#input-sort-text-colour-2-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-text-colour-2-css').value;
	BROWSER_API.storage.sync.set({ themeSortTextColour2CSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeSortTextColour2CSS: css });
			}
		});
	});
});

// Toggle - Sort Border Colour
document.querySelector('#checkbox-sort-border-colour').addEventListener('change', function (e) {
	var themeSortBorderColour = document.querySelector('#checkbox-sort-border-colour').checked;
	if (themeSortBorderColour == true) {
		BROWSER_API.storage.sync.set({ themeSortBorderColour: true });
		document.querySelector('.icon-sort-border-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortBorderColour: true });
				}
			});
		});
	} else if (themeSortBorderColour == false) {
		BROWSER_API.storage.sync.set({ themeSortBorderColour: false });
		document.querySelector('.icon-sort-border-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeSortBorderColour: false });
				}
			});
		});
	}
});

// Input - Sort Border Colour CSS
document.querySelector('#input-sort-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSortBorderColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeSortBorderColourCSS: css });
			}
		});
	});
});

// Toggle - Post Background Colour
document.querySelector('#checkbox-post-bg-colour').addEventListener('change', function (e) {
	var themePostBackgroundColour = document.querySelector('#checkbox-post-bg-colour').checked;
	if (themePostBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themePostBackgroundColour: true });
		document.querySelector('.icon-post-bg-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostBackgroundColour: true });
				}
			});
		});
	} else if (themePostBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themePostBackgroundColour: false });
		document.querySelector('.icon-post-bg-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostBackgroundColour: false });
				}
			});
		});
	}
});

// Input - Post Background Colour CSS
document.querySelector('#input-post-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostBackgroundColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themePostBackgroundColourCSS: css });
			}
		});
	});
});

// Toggle - Post Text Colour
document.querySelector('#checkbox-post-text-colour').addEventListener('change', function (e) {
	var themePostTextColour1 = document.querySelector('#checkbox-post-text-colour').checked;
	if (themePostTextColour1 == true) {
		BROWSER_API.storage.sync.set({ themePostTextColour1: true });
		document.querySelector('.icon-post-text-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostTextColour1: true });
				}
			});
		});
	} else if (themePostTextColour1 == false) {
		BROWSER_API.storage.sync.set({ themePostTextColour1: false });
		document.querySelector('.icon-post-text-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostTextColour1: false });
				}
			});
		});
	}
});

// Input - Post Text Colour CSS
document.querySelector('#input-post-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostTextColour1CSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themePostTextColour1CSS: css });
			}
		});
	});
});

// Toggle - Post Visited Title Colour
document.querySelector('#checkbox-post-visited-title-colour').addEventListener('change', function (e) {
	var themePostVisitedTitleColour = document.querySelector('#checkbox-post-visited-title-colour').checked;
	if (themePostVisitedTitleColour == true) {
		BROWSER_API.storage.sync.set({ themePostVisitedTitleColour: true });
		document.querySelector('.icon-post-visited-title-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostVisitedTitleColour: true });
				}
			});
		});
	} else if (themePostVisitedTitleColour == false) {
		BROWSER_API.storage.sync.set({ themePostVisitedTitleColour: false });
		document.querySelector('.icon-post-visited-title-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostVisitedTitleColour: false });
				}
			});
		});
	}
});

// Input - Post Visited Title Colour CSS
document.querySelector('#input-post-visited-title-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-visited-title-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostVisitedTitleColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themePostVisitedTitleColourCSS: css });
			}
		});
	});
});

// Toggle - Post Text Colour 2
document.querySelector('#checkbox-post-text-colour-2').addEventListener('change', function (e) {
	var themePostTextColour2 = document.querySelector('#checkbox-post-text-colour-2').checked;
	if (themePostTextColour2 == true) {
		BROWSER_API.storage.sync.set({ themePostTextColour2: true });
		document.querySelector('.icon-post-text-colour-2').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostTextColour2: true });
				}
			});
		});
	} else if (themePostTextColour2 == false) {
		BROWSER_API.storage.sync.set({ themePostTextColour2: false });
		document.querySelector('.icon-post-text-colour-2').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostTextColour2: false });
				}
			});
		});
	}
});

// Input - Post Text Colour 2 CSS
document.querySelector('#input-post-text-colour-2-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-text-colour-2-css').value;
	BROWSER_API.storage.sync.set({ themePostTextColour2CSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themePostTextColour2CSS: css });
			}
		});
	});
});

// Toggle - Post Border Colour
document.querySelector('#checkbox-post-border-colour').addEventListener('change', function (e) {
	var themePostBorderColour = document.querySelector('#checkbox-post-border-colour').checked;
	if (themePostBorderColour == true) {
		BROWSER_API.storage.sync.set({ themePostBorderColour: true });
		document.querySelector('.icon-post-border-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostBorderColour: true });
				}
			});
		});
	} else if (themePostBorderColour == false) {
		BROWSER_API.storage.sync.set({ themePostBorderColour: false });
		document.querySelector('.icon-post-border-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themePostBorderColour: false });
				}
			});
		});
	}
});

// Input - Post Border Colour CSS
document.querySelector('#input-post-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostBorderColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themePostBorderColourCSS: css });
			}
		});
	});
});

// Slider - Theme Blur
document.querySelector('#input-theme-blur').addEventListener('input', function (e) {
	// set ui
	var value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-theme-blur').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-theme-blur').style.backgroundColor = '';
	}
	document.querySelector('#theme-blur-value').innerText = e.target.value + 'px';
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeBlur: value });
			}
		});
	});
});
document.querySelector('#input-theme-blur').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ themeBlur: e.target.value });
});

// Toggle - Theme Exceptions
document.querySelector('#checkbox-theme-exceptions-enable').addEventListener('change', function (e) {
	var themeExceptionsEnable = document.querySelector('#checkbox-theme-exceptions-enable').checked;
	if (themeExceptionsEnable == true) {
		BROWSER_API.storage.sync.set({ themeExceptionsEnable: true });
		document.querySelector('.icon-theme-exceptions').style.backgroundColor = 'var(--accent)';
	} else if (themeExceptionsEnable == false) {
		BROWSER_API.storage.sync.set({ themeExceptionsEnable: false });
		document.querySelector('.icon-theme-exceptions').style.backgroundColor = '';
	}
});

// Button - Theme Whitelist
document.querySelector('#btn-theme-whitelist').addEventListener('click', function (e) {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-theme-whitelist').nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'whitelist' });
});

// Button - Theme Blacklist
document.querySelector('#btn-theme-blacklist').addEventListener('click', function (e) {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-theme-blacklist').previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'blacklist' });
});

// Textarea - Theme Exceptions
document.querySelector('#input-theme-exceptions').addEventListener('keyup', function (e) {
	const value = e.target.value;
	BROWSER_API.storage.sync.set({ themeExceptionSubList: value });
});

// Toggle - Create Post Background Colour
document.querySelector('#checkbox-create-post-bg-colour').addEventListener('change', function (e) {
	var themeCreatePostBackgroundColour = document.querySelector('#checkbox-create-post-bg-colour').checked;
	if (themeCreatePostBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themeCreatePostBackgroundColour: true });
		document.querySelector('.icon-create-post-bg-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeCreatePostBackgroundColour: true });
				}
			});
		});
	} else if (themeCreatePostBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themeCreatePostBackgroundColour: false });
		document.querySelector('.icon-create-post-bg-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeCreatePostBackgroundColour: false });
				}
			});
		});
	}
});

// Input - Create Post Background Colour CSS
document.querySelector('#input-create-post-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-create-post-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeCreatePostBackgroundColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeCreatePostBackgroundColourCSS: css });
			}
		});
	});
});

// Toggle - Create Post Border Colour
document.querySelector('#checkbox-create-post-border-colour').addEventListener('change', function (e) {
	var themeCreatePostBorderColour = document.querySelector('#checkbox-create-post-border-colour').checked;
	if (themeCreatePostBorderColour == true) {
		BROWSER_API.storage.sync.set({ themeCreatePostBorderColour: true });
		document.querySelector('.icon-create-post-border-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeCreatePostBorderColour: true });
				}
			});
		});
	} else if (themeCreatePostBorderColour == false) {
		BROWSER_API.storage.sync.set({ themeCreatePostBorderColour: false });
		document.querySelector('.icon-create-post-border-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { themeCreatePostBorderColour: false });
				}
			});
		});
	}
});

// Input - Create Post Border Colour CSS
document.querySelector('#input-create-post-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-create-post-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themeCreatePostBorderColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { themeCreatePostBorderColourCSS: css });
			}
		});
	});
});

// Toggle - Larger Classic Post
document.querySelector('#checkbox-larger-classic-post').addEventListener('change', function (e) {
	var largerClassicPost = document.querySelector('#checkbox-larger-classic-post').checked;
	if (largerClassicPost == true) {
		BROWSER_API.storage.sync.set({ largerClassicPost: true });
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { largerClassicPost: true });
				}
			});
		});
	} else if (largerClassicPost == false) {
		BROWSER_API.storage.sync.set({ largerClassicPost: false });
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { largerClassicPost: false });
				}
			});
		});
	}
});
