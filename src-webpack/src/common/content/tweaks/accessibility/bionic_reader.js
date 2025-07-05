/**
 * Tweaks: Accessibility - Bionic Reader
 * @name bionicReader
 * @description Makes the first two letters of a word bold to increase reading efficiency.
 *              Additionally, can change the font colour and text background colour to increase the contrast for easier reading.
 *
 * Applies to: RV1 (Old New UI) (2018-2024), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */

// Load Bionic Reader
export function loadBionicReader() {
	BROWSER_API.storage.sync.get(['bionicReaderPosts', 'bionicReaderComments'], function (result) {
		bionicReaderPosts(result.bionicReaderPosts);
		bionicReaderComments(result.bionicReaderComments);
	});
}

// Load Bionic Reader Colours
export function loadBionicReaderColours() {
	BROWSER_API.storage.sync.get(['bionicReaderFontColour', 'bionicReaderBgColour'], function (result) {
		bionicReaderFontColour(result.bionicReaderFontColour);
		bionicReaderBgColour(result.bionicReaderBgColour);
	});
}

/* === Enable/Disable The Feature === */

// Bionic Reader For Posts
export function bionicReaderPosts(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			const nodes = document.querySelectorAll('shreddit-post [data-post-click-location="text-body"] p');
			bionicReader(true, 'posts', nodes);
			observerPostsNewNew.observe(document.body, { childList: true, subtree: true });
		} else {
			observerPostsNewNew.disconnect();
			bionicReader(false, 'posts');
		}
	}
}

// Observe for new posts - RV3
const observerPostsNewNew = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				const nodes = document.querySelectorAll('shreddit-post [data-post-click-location="text-body"] p');
				if (nodes) {
					bionicReader(true, 'posts', nodes);
				}
			}
		});
	});
});

// Bionic Reader For Comments
export function bionicReaderComments(value) {
	const link = window.location.href;
	if (redditVersion === 'newnew') {
		if (link.match('https://.*.reddit.com/.*/comments/.*')) {
			if (value) {
				const nodes = document.querySelectorAll('shreddit-comment [slot="comment"] p');
				bionicReader(true, 'comments', nodes);
				observerCommentsNewNew.observe(document.body, { childList: true, subtree: true });
			} else {
				observerCommentsNewNew.disconnect();
				bionicReader(false, 'comments');
			}
		}
	}
}

// Observe for new comments - RV3
const observerCommentsNewNew = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				const nodes = addedNode.querySelectorAll('[slot="comment"] p');
				if (nodes) {
					bionicReader(true, 'comments', nodes);
				}
			}
		});
	});
});

// Main Bionic Reader Logic
function bionicReader(value, type, paragraphs) {
	// Bionic Reader Enable
	if (value) {
		// set vars
		const wordLength = 3;

		// Iterate over each paragraph
		NodeList.prototype.forEach.call(paragraphs, function (paragraph) {
			//console.log(paragraph);
			if (!Array.from(paragraph.classList).some((className) => className.includes('re-bionic'))) {
				// Create a new empty element to store the modified HTML
				const modifiedParagraph = document.createElement('p');

				// Iterate over each child node of the original paragraph
				for (let i = 0; i < paragraph.childNodes.length; i++) {
					const node = paragraph.childNodes[i];
					//console.log(node);

					// Check if the child node is a text node
					if (node.nodeType === Node.TEXT_NODE) {
						//console.log('text node');
						// Split the text node into an array of words
						const words = node.textContent.split(/\s+/);
						//console.log(words);

						// Iterate over each word in the array
						words.forEach((word) => {
							// Check if the word is not a number
							const isWord = /^[a-zA-Z,.'-/?!"’]+$/.test(word);
							if (isWord) {
								// Check if the word is longer than 2 letters
								if (word.length >= wordLength) {
									// Create a new element to store the modified word
									const modifiedWord = document.createElement('span');
									modifiedWord.classList.add('re-bold');
									const remainingLettersAry = [];

									// Iterate over each letter in the word
									for (let j = 0; j < word.length; j++) {
										// Check if the letter is the first or second letter in the word
										if (j === 0 || j === 1) {
											// Create a new text node with the bolded letter and append it to the modified word
											const boldedLetter = document.createTextNode(word.charAt(j));
											modifiedWord.appendChild(boldedLetter);
										} else {
											// Create a new text node with the regular letter and append it to the modified word
											const regularLetter = word.charAt(j);
											remainingLettersAry.push(regularLetter);
										}
									}

									// Join remaining letters array into a string
									const remainingLetters = document.createTextNode(remainingLettersAry.join(''));

									// Append the modified word to the modified paragraph
									modifiedParagraph.appendChild(modifiedWord);
									// Append the remaining letters
									modifiedParagraph.appendChild(remainingLetters);
									// Add space at the end of each word
									const space = document.createTextNode(' ');
									modifiedParagraph.appendChild(space);
								} else {
									// Create a new text node with the regular word and append it to the modified paragraph
									const regularWord = document.createTextNode(word);
									modifiedParagraph.appendChild(regularWord);
									// Add space at the end of each word
									const space = document.createTextNode(' ');
									modifiedParagraph.appendChild(space);
								}
							} else {
								// Create a new text node with the regular word and append it to the modified paragraph
								const regularWord = document.createTextNode(word);
								modifiedParagraph.appendChild(regularWord);
								// Add space at the end of each word
								const space = document.createTextNode(' ');
								modifiedParagraph.appendChild(space);
							}
						});
					} else {
						//console.log('unknown node');
						// If the child node is not a text node or an <a> tag, append it to the modified paragraph
						modifiedParagraph.append(node.cloneNode(true));
					}
				}

				// Add identifiable class to modified paragraph
				modifiedParagraph.classList.add('re-bionic-modified-' + type);

				// Add identifiable class and hide the original paragraph
				paragraph.classList.add('re-bionic-original-' + type);
				if (redditVersion === 'new') {
					paragraph.classList.add('re-hide');
				} else if (redditVersion === 'newnew') {
					paragraph.setAttribute('style', 'display: none !important;');
				}

				// Replace the original paragraph with the modified paragraph
				paragraph.parentNode.insertBefore(modifiedParagraph, paragraph.nextSibling);
			}
		});
	} else {
		// Bionic Reader Disable
		const m = document.querySelectorAll('.re-bionic-modified-' + type);
		m.forEach(function (el) {
			el.remove();
		});
		const o = document.querySelectorAll('.re-bionic-original-' + type);
		o.forEach(function (el) {
			el.classList.remove('re-hide', 're-bionic-original-posts', 're-bionic-original-comments');
			if (redditVersion === 'newnew') {
				el.removeAttribute('style', 'display: none !important;');
			}
		});
	}
}

// Enable/Disable Bionic Font Colour
export function bionicReaderFontColour(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['bionicReaderFontColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-bionic-font-colour', result.bionicReaderFontColourCSS);
				const styleElement = document.createElement('style');
				styleElement.id = 're-bionic-reader-font-colour';
				styleElement.textContent = `.re-bionic-modified-posts,
											.re-bionic-modified-comments {
												--re-theme-post-text: var(--re-bionic-font-colour) !important;
												color: var(--re-bionic-font-colour) !important;
											}
											shreddit-comment ol:has(>li>.re-bionic-modified-comments) {
												color: var(--re-bionic-font-colour) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			});
		} else {
			document.documentElement.style.removeProperty('--re-bionic-font-colour');
			const dynamicStyleElements = document.querySelectorAll('#re-bionic-reader-font-colour');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Change Bionic Font Colour CSS
export function bionicReaderFontColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-bionic-font-colour', value);
	}
}

// Enable/Disable Bionic Background Colour
export function bionicReaderBgColour(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['bionicReaderBgColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-bionic-bg-colour', result.bionicReaderBgColourCSS);
				const styleElement = document.createElement('style');
				styleElement.id = 're-bionic-reader-bg-colour';
				styleElement.textContent = `.re-bionic-modified-posts,
											div:has(>.re-bionic-modified-comments),
											div:has(>ol>li>.re-bionic-modified-comments) {
												background-color: var(--re-bionic-bg-colour) !important;
												padding: 8px;
												border-radius: 2px;
											}
											.Comment [data-testid="comment"] > div {
												width: fit-content;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			});
		} else {
			document.documentElement.style.removeProperty('--re-bionic-bg-colour');
			const dynamicStyleElements = document.querySelectorAll('#re-bionic-reader-bg-colour');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Change Bionic Background Colour CSS
export function bionicReaderBgColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-bionic-bg-colour', value);
	}
}
