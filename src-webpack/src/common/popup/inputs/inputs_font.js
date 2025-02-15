/* ===== Inputs / Font Tweaks ===== */

import { sendMessage } from '../send_message';

/* === Font Size === */

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
	sendMessage({ postTitleFontSize: value });
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
	sendMessage({ postContentFontSize: value });
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

// Slider - Feed Post Title Font Size
document.querySelector('#input-feed-post-title-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-feed-post-title-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#feed-post-title-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-feed-post-title-font-size').style.backgroundColor = '';
		document.querySelector('#feed-post-title-font-size-value').innerText = '';
	}
	// apply
	sendMessage({ feedPostTitleFontSize: value });
});
document.querySelector('#input-feed-post-title-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ feedPostTitleFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ feedPostTitleFontSize: false });
	}
});

// Slider - Feed Post Content Font Size
document.querySelector('#input-feed-post-content-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-feed-post-content-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#feed-post-content-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-feed-post-content-font-size').style.backgroundColor = '';
		document.querySelector('#feed-post-content-font-size-value').innerText = '';
	}
	// apply
	sendMessage({ feedPostContentFontSize: value });
});
document.querySelector('#input-feed-post-content-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ feedPostContentFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ feedPostContentFontSize: false });
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
	sendMessage({ postCommentsFontSize: value });
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

// Slider - "Create Post: Title" Font Size
document.querySelector('#input-create-post-title-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-create-post-title-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#create-post-title-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-create-post-title-font-size').style.backgroundColor = '';
		document.querySelector('#create-post-title-font-size-value').innerText = '';
	}
	// apply
	sendMessage({ createPostTitleFontSize: value });
});
document.querySelector('#input-create-post-title-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ createPostTitleFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ createPostTitleFontSize: false });
	}
});

// Slider - "Create Post: Body" Font Size
document.querySelector('#input-create-post-body-font-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 9) {
		document.querySelector('.icon-create-post-body-font-size').style.backgroundColor = 'var(--accent)';
		document.querySelector('#create-post-body-font-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-create-post-body-font-size').style.backgroundColor = '';
		document.querySelector('#create-post-body-font-size-value').innerText = '';
	}
	// apply
	sendMessage({ createPostBodyFontSize: value });
});
document.querySelector('#input-create-post-body-font-size').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ createPostBodyFontSize: value });
	} else {
		BROWSER_API.storage.sync.set({ createPostBodyFontSize: false });
	}
});

/* === Font Weight === */

// Slider - Post Title Font Weight
document.querySelector('#input-post-title-font-weight').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-post-title-font-weight').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-title-font-weight-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-post-title-font-weight').style.backgroundColor = '';
		document.querySelector('#post-title-font-weight-value').innerText = '';
	}
	// apply
	sendMessage({ postTitleFontWeight: value });
});
document.querySelector('#input-post-title-font-weight').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ postTitleFontWeight: value });
	} else {
		BROWSER_API.storage.sync.set({ postTitleFontWeight: false });
	}
});

// Slider - Post Content Font Weight
document.querySelector('#input-post-content-font-weight').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-post-content-font-weight').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-content-font-weight-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-post-content-font-weight').style.backgroundColor = '';
		document.querySelector('#post-content-font-weight-value').innerText = '';
	}
	// apply
	sendMessage({ postContentFontWeight: value });
});
document.querySelector('#input-post-content-font-weight').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ postContentFontWeight: value });
	} else {
		BROWSER_API.storage.sync.set({ postContentFontWeight: false });
	}
});

// Slider - Feed Post Title Font Weight
document.querySelector('#input-feed-post-title-font-weight').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-feed-post-title-font-weight').style.backgroundColor = 'var(--accent)';
		document.querySelector('#feed-post-title-font-weight-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-feed-post-title-font-weight').style.backgroundColor = '';
		document.querySelector('#feed-post-title-font-weight-value').innerText = '';
	}
	// apply
	sendMessage({ feedPostTitleFontWeight: value });
});
document.querySelector('#input-feed-post-title-font-weight').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ feedPostTitleFontWeight: value });
	} else {
		BROWSER_API.storage.sync.set({ feedPostTitleFontWeight: false });
	}
});

// Slider - Feed Post Content Font Weight
document.querySelector('#input-feed-post-content-font-weight').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-feed-post-content-font-weight').style.backgroundColor = 'var(--accent)';
		document.querySelector('#feed-post-content-font-weight-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-feed-post-content-font-weight').style.backgroundColor = '';
		document.querySelector('#feed-post-content-font-weight-value').innerText = '';
	}
	// apply
	sendMessage({ feedPostContentFontWeight: value });
});
document.querySelector('#input-feed-post-content-font-weight').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ feedPostContentFontWeight: value });
	} else {
		BROWSER_API.storage.sync.set({ feedPostContentFontWeight: false });
	}
});

// Slider - Post Comments Font Weight
document.querySelector('#input-post-comments-font-weight').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-post-comments-font-weight').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-comments-font-weight-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-post-comments-font-weight').style.backgroundColor = '';
		document.querySelector('#post-comments-font-weight-value').innerText = '';
	}
	// apply
	sendMessage({ postCommentsFontWeight: value });
});
document.querySelector('#input-post-comments-font-weight').addEventListener('mouseup', function (e) {
	// save
	const value = e.target.value;
	if (value != 9) {
		BROWSER_API.storage.sync.set({ postCommentsFontWeight: value });
	} else {
		BROWSER_API.storage.sync.set({ postCommentsFontWeight: false });
	}
});

// Toggle - Custom Fonts
document.querySelector('#checkbox-custom-fonts').addEventListener('change', function (e) {
	// set ui
	if (e.target.checked) {
		document.querySelector('.icon-custom-fonts').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-custom-fonts').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ customFonts: e.target.checked });
	sendMessage({ customFonts: e.target.checked });
});