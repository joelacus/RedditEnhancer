// Inputs - Accessibility Tweaks

// Toggle - Bionic Reader - Posts
/*document.querySelector('#checkbox-bionic-reader-posts').addEventListener('change', function (e) {
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
});*/
