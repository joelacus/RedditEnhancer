/*function containsAnyStringInChildren(element, searchStrings, tags) {
	// Convert the search strings to lower case for case-insensitive comparison
	const lowerCaseSearchStrings = searchStrings.map((str) => str.toLowerCase());

	// Check the text content of the element itself
	const textContent = element.textContent.toLowerCase();
	if (lowerCaseSearchStrings.some((searchString) => textContent.includes(searchString))) {
		return true;
	}

	// Check the specified child tags
	for (const tag of tags) {
		const childElements = element.getElementsByTagName(tag);
		for (const child of childElements) {
			if (lowerCaseSearchStrings.some((searchString) => child.textContent.toLowerCase().includes(searchString))) {
				return true;
			}
		}
	}

	return false;
}

// Example usage:
const element = document.getElementById('yourElementId'); // Replace with your element's ID
const searchStrings = ['word1', 'word2', 'word3']; // Replace with the strings you want to search for
const tagsToCheck = ['p', 'a', 'span']; // Specify the tags you want to check

if (containsAnyStringInChildren(element, searchStrings, tagsToCheck)) {
	console.log('The element or its specified children contain at least one of the strings.');
} else {
	console.log('None of the strings were found in the specified children.');
}*/
