/* ===== Popup / Functions / Changelog ===== */

// Show/Hide Elements + Init Changelog
export function showChangelog() {
	if (document.querySelector('body#popup')) {
		document.querySelector('#settings').style.display = 'none';
		const changelogPage = document.querySelector('#changelog');
		if (changelogPage.style.display === 'none') {
			changelogPage.style.display = 'flex';
		} else {
			changelogPage.style.display = 'none';
		}
	} else {
		document.querySelector('#settings').classList.add('hidden');
		document.querySelector('#changelog').classList.remove('hidden');
		document.querySelectorAll('.options-page-menu-container .active').forEach((item) => {
			item.classList.remove('active');
		});
		document.querySelectorAll('.btn-changelog').forEach((btn) => {
			btn.classList.add('active');
		});
		document.querySelectorAll('#main-menu .sub-list').forEach((sub) => {
			sub.classList.add('hidden');
		});
	}

	// Init changelog if not already initialised
	if (!document.querySelector('#changelog .log > div')) {
		initChangelog();
	}
}

// Init Changelog
function initChangelog() {
	// Get changelog file contents if no new changelog is available
	if (document.querySelector('#new-update-message').classList.contains('hidden')) {
		// Get changelog.txt
		const changelogFile = BROWSER_API.runtime.getURL('changelog.txt');
		// Fetch the file contents
		fetch(changelogFile, {
			headers: {
				'Content-Type': 'text/plain',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text();
			})
			.then((textContent) => {
				// Convert string to HTML
				const html = generateChangelogHTML(textContent);
				// Append changelog HTML to the extension popup/options page.
				document.querySelector('#changelog .log').append(html);
			})
			.catch((error) => {
				console.error('Error fetching the file:', error);
			});
	}
}

// Generate Changelog HTML
export function generateChangelogHTML(changelog) {
	const changelogDiv = document.createElement('div');
	const lines = changelog.split('\n');

	let currentUl = null;
	let listStack = [];

	lines.forEach((line) => {
		// Calculate indent level (2 spaces = 1 level)
		const spaces = line.match(/^ */)[0].length;
		const indentLevel = Math.floor(spaces / 2);
		const trimmedLine = line.trim();

		if (trimmedLine.startsWith('version')) {
			// Reset the list stack when encountering a new version
			listStack = [];

			const h2 = document.createElement('h2');
			h2.textContent = trimmedLine;
			changelogDiv.appendChild(h2);

			currentUl = document.createElement('ul');
			changelogDiv.appendChild(currentUl);
			listStack.push({ level: 0, element: currentUl });
		} else if (trimmedLine.startsWith('v ')) {
			// Reset the list stack when encountering a subheader
			listStack = [];

			const h3 = document.createElement('h3');
			h3.textContent = trimmedLine.substring(2);
			changelogDiv.appendChild(h3);

			currentUl = document.createElement('ul');
			changelogDiv.appendChild(currentUl);
			listStack.push({ level: 0, element: currentUl });
		} else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('!')) {
			const li = document.createElement('li');
			li.textContent = trimmedLine.substring(2);

			if (trimmedLine.startsWith('!')) {
				li.style.color = 'red';
			}

			// Remove lists from stack that are deeper than current indent level
			while (listStack.length > 0 && listStack[listStack.length - 1].level >= indentLevel) {
				listStack.pop();
			}

			// Get the parent list where this item should be added
			const parentList = listStack.length > 0 ? listStack[listStack.length - 1].element : currentUl;

			parentList.appendChild(li);

			// If this item might have children (next line might be more indented),
			// create a new ul and add it to the stack
			const ul = document.createElement('ul');
			li.appendChild(ul);
			listStack.push({ level: indentLevel, element: ul });
		} else if (trimmedLine.startsWith('*')) {
			const span = document.createElement('span');
			span.textContent = trimmedLine.substring(2);
			changelogDiv.appendChild(span);
		}
	});

	return changelogDiv;
}
