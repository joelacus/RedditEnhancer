// Inputs - Accessibility Tweaks

// Slider - Post Title Font Size
document.querySelector('#input-post-title-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-post-title-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-title-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-post-title-font-size').style.backgroundColor = '';
		document.querySelector('#post-title-font-size-value').innerText = '';
	}
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { postTitleFontSize: value });
			}
		});
	});
});
document.querySelector('#input-post-title-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ postTitleFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ postTitleFontSize: false });
	}
});

// Slider - Post Content Font Size
document.querySelector('#input-post-content-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-post-content-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-content-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-post-content-font-size').style.backgroundColor = '';
		document.querySelector('#post-content-font-size-value').innerText = '';
	}
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { postContentFontSize: value });
			}
		});
	});
});
document.querySelector('#input-post-content-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ postContentFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ postContentFontSize: false });
	}
});

// Slider - Post Comments Font Size
document.querySelector('#input-post-comments-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-post-comments-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-comments-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-post-comments-font-size').style.backgroundColor = '';
		document.querySelector('#post-comments-font-size-value').innerText = '';
	}
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { postCommentsFontSize: value });
			}
		});
	});
});
document.querySelector('#input-post-comments-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ postCommentsFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ postCommentsFontSize: false });
	}
});

// Toggle - Bionic Reader - Posts
document.querySelector('#checkbox-bionic-reader-posts').addEventListener('change', function (e) {
	var bionicReaderPosts = document.querySelector('#checkbox-bionic-reader-posts').checked;
	if (bionicReaderPosts == true) {
		BROWSER_API.storage.sync.set({ bionicReaderPosts: true });
		document.querySelector('.icon-bionic-reader-posts').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-bionic-reader-posts').classList.remove('icon-book');
		document.querySelector('.icon-bionic-reader-posts').classList.add('icon-book-open');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderPosts: true });
				}
			});
		});
	} else if (bionicReaderPosts == false) {
		BROWSER_API.storage.sync.set({ bionicReaderPosts: false });
		document.querySelector('.icon-bionic-reader-posts').style.backgroundColor = '';
		document.querySelector('.icon-bionic-reader-posts').classList.remove('icon-book-open');
		document.querySelector('.icon-bionic-reader-posts').classList.add('icon-book');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderPosts: false });
				}
			});
		});
	}
});

// Toggle - Bionic Reader - Comments
document.querySelector('#checkbox-bionic-reader-comments').addEventListener('change', function (e) {
	var bionicReaderPosts = document.querySelector('#checkbox-bionic-reader-comments').checked;
	if (bionicReaderPosts == true) {
		BROWSER_API.storage.sync.set({ bionicReaderComments: true });
		document.querySelector('.icon-bionic-reader-comments').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-bionic-reader-comments').classList.remove('icon-book');
		document.querySelector('.icon-bionic-reader-comments').classList.add('icon-book-open');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderComments: true });
				}
			});
		});
	} else if (bionicReaderPosts == false) {
		BROWSER_API.storage.sync.set({ bionicReaderComments: false });
		document.querySelector('.icon-bionic-reader-comments').style.backgroundColor = '';
		document.querySelector('.icon-bionic-reader-comments').classList.remove('icon-book-open');
		document.querySelector('.icon-bionic-reader-comments').classList.add('icon-book');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderComments: false });
				}
			});
		});
	}
});

// Toggle - Bionic Font Colour
document.querySelector('#checkbox-bionic-font-colour').addEventListener('change', function (e) {
	var bionicReaderFontColour = document.querySelector('#checkbox-bionic-font-colour').checked;
	if (bionicReaderFontColour == true) {
		BROWSER_API.storage.sync.set({ bionicReaderFontColour: true });
		document.querySelector('.icon-bionic-font-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderFontColour: true });
				}
			});
		});
	} else if (bionicReaderFontColour == false) {
		BROWSER_API.storage.sync.set({ bionicReaderFontColour: false });
		document.querySelector('.icon-bionic-font-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderFontColour: false });
				}
			});
		});
	}
});

// Input - Bionic Font Colour CSS
document.querySelector('#input-bionic-font-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-bionic-font-colour-css').value;
	BROWSER_API.storage.sync.set({ bionicReaderFontColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderFontColourCSS: css });
			}
		});
	});
});

// Toggle - Bionic Background Colour
document.querySelector('#checkbox-bionic-bg-colour').addEventListener('change', function (e) {
	var bionicReaderBgColour = document.querySelector('#checkbox-bionic-bg-colour').checked;
	if (bionicReaderBgColour == true) {
		BROWSER_API.storage.sync.set({ bionicReaderBgColour: true });
		document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderBgColour: true });
				}
			});
		});
	} else if (bionicReaderBgColour == false) {
		BROWSER_API.storage.sync.set({ bionicReaderBgColour: false });
		document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderBgColour: false });
				}
			});
		});
	}
});

// Input - Bionic Background Colour CSS
document.querySelector('#input-bionic-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-bionic-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ bionicReaderBgColourCSS: css });
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { bionicReaderBgColourCSS: css });
			}
		});
	});
});

// Toggle - Underline Links
document.querySelector('#checkbox-underline-links').addEventListener('change', function (e) {
	var underlineLinks = document.querySelector('#checkbox-underline-links').checked;
	if (underlineLinks == true) {
		BROWSER_API.storage.sync.set({ underlineLinks: true });
		document.querySelector('.icon-underline-links').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { underlineLinks: true });
				}
			});
		});
	} else if (underlineLinks == false) {
		BROWSER_API.storage.sync.set({ underlineLinks: false });
		document.querySelector('.icon-underline-links').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { underlineLinks: false });
				}
			});
		});
	}
});
