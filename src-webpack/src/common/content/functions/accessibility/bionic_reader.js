// Bionic Reader

// Posts
let bionicReaderPosts = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		if (value == true) {
			bionicReader('posts', true);
		} else if (value == false) {
			bionicReader('', false);
		}
	}
};
export { bionicReaderPosts };

// Comments
let bionicReaderComments = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		if (link.match('https://.*.reddit.com/.*/comments/.*')) {
			if (value == true) {
				bionicReader('comments', true);
			} else if (value == false) {
				bionicReader('', false);
			}
		}
	}
};
export { bionicReaderComments };

// Bionic Reader
let bionicReader = function (type, value) {
	// Select the paragraphs to be modified
	if (type === 'posts') {
		const titles = document.querySelectorAll('.Post [data-adclicklocation="title"]');
		const p = document.querySelectorAll('.Post [data-adclicklocation="media"] p');
		var paragraphs = [];
		paragraphs.push.apply(paragraphs, titles);
		paragraphs.push.apply(paragraphs, p);
	} else if (type === 'comments') {
		var paragraphs = document.querySelectorAll('[data-testid="comment"] p');
		console.log(paragraphs);
	}

	// Bionic Reader Enable
	if (value === true) {
		// Select the paragraphs to be modified
		//var paragraphs = document.querySelectorAll('.test');

		// set vars
		const wordLength = 3;
		//const fixation = ""

		// Iterate over each paragraph
		//Array.prototype.forEach.call(paragraphs, function(paragraph) {
		//paragraphs.forEach((paragraph) => {
		NodeList.prototype.forEach.call(paragraphs, function (paragraph) {
			console.log(paragraph);
			// Create a new empty element to store the modified HTML
			const modifiedParagraph = document.createElement('p');

			// Iterate over each child node of the original paragraph
			for (let i = 0; i < paragraph.childNodes.length; i++) {
				const node = paragraph.childNodes[i];
				console.log(node);

				// Check if the child node is a text node
				if (node.nodeType === Node.TEXT_NODE) {
					console.log('text node');
					// Split the text node into an array of words
					const words = node.textContent.split(/\s+/);
					console.log(words);

					// Iterate over each word in the array
					words.forEach((word) => {
						// Check if the word is not a number
						const isWord = /^[a-zA-Z]+$/.test(word);
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
				} /* else if (node.nodeName === 'B') {
					console.log("<b> node")
					console.log(node.cloneNode(true))
					modifiedParagraph.appendChild(node.cloneNode(true));
				} else if (node.nodeName === 'I') {
					console.log("<i> node")
					console.log(node.cloneNode(true))
					modifiedParagraph.appendChild(node.cloneNode(true));
				}*/ /*else if (node.nodeName === 'A') {
					// Clone original link node as new variable
					const modifiedLink = node.cloneNode(true);

					// Clear the modified word original text content
					modifiedLink.textContent = '';

					// If the child node is an <a> tag, iterate over its child nodes
					for (let j = 0; j < node.childNodes.length; j++) {
						const childNode = node.childNodes[j];
						console.log(childNode);

						// Check if the child node is a text node
						if (childNode.nodeType === Node.TEXT_NODE) {
							// Split the text node into an array of words
							const words = childNode.textContent.split(/\s+/);
							console.log(words);

							// Iterate over each word in the array
							words.forEach((word) => {
								// Check if the word is longer than 2 letters
								if (word.length >= wordLength) {
									// Create a new element to store the modified word
									const modifiedWord = document.createElement('span');
									modifiedWord.classList.add('re-bold');
									const remainingLettersAry = [];

									// Iterate over each letter in the word
									for (let k = 0; k < word.length; k++) {
										// Check if the letter is the first or second letter in the word
										if (k === 0 || k === 1) {
											// Create a new text node with the bolded letter and append it to the modified word
											const boldedLetter = document.createTextNode(word.charAt(k));
											modifiedWord.appendChild(boldedLetter);
										} else {
											// Create a new text node with the regular letter and append it to the modified word
											const regularLetter = word.charAt(k);
											//modifiedWord.appendChild(regularLetter);
											remainingLettersAry.push(regularLetter);
										}
									}

									// Join remaining letters array into a string
									const remainingLetters = document.createTextNode(remainingLettersAry.join(''));

									// Append the modified word to the modified link
									modifiedLink.appendChild(modifiedWord);
									// Append the remaining letters
									modifiedLink.appendChild(remainingLetters);

									// Add space at the end of each word
									const space = document.createTextNode(' ');
									modifiedLink.appendChild(space);
								} else {
									// Create a new text node with the regular word and append it to the modified paragraph
									const regularWord = document.createTextNode(word);
									modifiedLink.appendChild(regularWord);
									modifiedParagraph.appendChild(modifiedLink);
									// Add space at the end of each word
									const space = document.createTextNode(' ');
									modifiedParagraph.appendChild(space);
								}
							});
							// Remove the extra space at the end of the paragraph
							modifiedLink.lastChild.remove();

							// Append modified link to  the modified paragraph
							modifiedParagraph.appendChild(modifiedLink);

							// Add space at the end of each word
							const space = document.createTextNode(' ');
							modifiedParagraph.appendChild(space);
						}
					}
				}*/ else {
					console.log('unknown node');
					// If the child node is not a text node or an <a> tag, append it to the modified paragraph
					modifiedParagraph.append(node.cloneNode(true));
				}
				// Remove the extra space at the end of the paragraph
				modifiedParagraph.lastChild.remove();

				// Add identifiable class to modified paragraph
				modifiedParagraph.classList.add('re-bionic-modified');

				// Add identifiable class and hide the original paragraph
				paragraph.classList.add('re-bionic-original');
				paragraph.classList.add('re-hide');

				// Replace the original paragraph with the modified paragraph
				paragraph.parentNode.insertBefore(modifiedParagraph, paragraph.nextSibling);
			}
		})();
	} else if (value === false) {
		// Bionic Reader Disable
		console.log('disable bionic reader');
		var m = document.querySelectorAll('.re-bionic-modified');
		m.forEach(function (paragraph) {
			paragraph.remove();
		});
		var o = document.querySelectorAll('.re-bionic-original');
		o.forEach(function (paragraph) {
			paragraph.classList.remove('re-hide');
		});
	}
};
export { bionicReader };
