// Expand Post Options

export function expandPostOptions(value) {
	const link = window.location.href;
	if (redditVersion === 'new') {
		if (value == true) {
			if (link.indexOf('/comments/') >= 0) {
				// post page
				// is overflow menu button loaded
				const overflow_menu = document.querySelector('[id*="-overflow-menu"]');
				const overflow_menu_btn = document.querySelector('[id*="-overflow-menu"]').parentNode.parentNode;
				const checkIfTargetIsLoaded = setInterval(function () {
					if (document.body.contains(overflow_menu)) {
						clearInterval(checkIfTargetIsLoaded);
						// get options container
						var container = document.querySelector('[id*="-overflow-menu"]').parentNode.parentNode.parentNode;
						// get container button classes
						var div_classes = container.firstChild.nextSibling.classList;
						var button_classes = container.firstChild.nextSibling.querySelector('button').classList;
						// get menu items
						document.querySelector('[id*="-overflow-menu"]').click();
						const menu = document.querySelector('[role="menu"][tabindex="-1"]');
						const checkIfTargetIsLoaded2 = setInterval(function () {
							if (document.body.contains(menu)) {
								clearInterval(checkIfTargetIsLoaded2);
								const items = menu.querySelectorAll('button');
								items.forEach(function (item) {
									if (item.classList.length < 5) {
										item.setAttribute('class', button_classes);
										item.classList.add('re-expand-post-options');
										container.insertBefore(item, overflow_menu_btn);
									}
								});
							}
						}, 500);
						// hides overflow button and menu
						document.querySelector('[role="menu"][tabindex="-1"]').style.display = 'none';
						document.querySelector('[id*="-overflow-menu"]').parentNode.parentNode.style.display = 'none';
					}
				}, 500);
			} else {
				//startObserver();
				const links = document.querySelectorAll('[id*="-overflow-menu"]');
				console.log(links);
				links.forEach(function (link) {
					// get options container
					var container = link.parentNode.parentNode.parentNode;
					// get container button classes
					var div_classes = container.firstChild.nextSibling.classList;
					var button_classes = container.firstChild.nextSibling.querySelector('button').classList;
					// get menu items
					link.click();
					const menu = document.querySelector('[role="menu"][tabindex="-1"]');
					const checkIfTargetIsLoaded2 = setInterval(function () {
						if (document.body.contains(menu)) {
							clearInterval(checkIfTargetIsLoaded2);
							const items = menu.querySelectorAll('button');
							items.forEach(function (item) {
								if (item.classList.length < 5) {
									item.setAttribute('class', button_classes);
									item.classList.add('re-expand-post-options');
									container.insertBefore(item, overflow_menu_btn);
								}
							});
							menu.remove();
						}
					}, 100);
				});
				//observer.observe(document.body, {childList: true, subtree: true});
			}
		} else if (typeof value == 'undefined' || value == false) {
			const btns = document.querySelectorAll('[id*="-overflow-menu"]');
			btns.forEach(function (btn) {
				btn.parentNode.parentNode.style.display = '';
			});
			const new_btns = document.querySelectorAll('.re-expand-post-options');
			new_btns.forEach(function (btn) {
				btn.remove();
			});
			//stopObserver();
			observer.disconnect();
		}
	}
}

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				const id = addedNode.id.indexOf('-overflow-menu');
				console.log(id);
				if (id === 10) {
					const links = document.querySelectorAll('[id*="-overflow-menu"]');
					links.forEach(function (link) {
						// get options container
						var container = link.parentNode.parentNode.parentNode;
						// get container button classes
						var div_classes = container.firstChild.nextSibling.classList;
						var button_classes = container.firstChild.nextSibling.querySelector('button').classList;
						// get menu items
						link.click();
						const menu = document.querySelector('[role="menu"][tabindex="-1"]');
						const checkIfTargetIsLoaded2 = setInterval(function () {
							if (document.body.contains(menu)) {
								clearInterval(checkIfTargetIsLoaded2);
								const items = menu.querySelectorAll('button');
								items.forEach(function (item) {
									if (item.classList.length < 5) {
										item.setAttribute('class', button_classes);
										item.classList.add('re-expand-post-options');
										container.insertBefore(item, overflow_menu_btn);
									}
								});
								menu.remove();
							}
						}, 100);
					});
				}
			}
		});
	});
});

/*
let isObserverRunning = false;

// Create a new observer instance
const observer = new MutationObserver(function(mutationsList) {
  // Loop through the mutations
  for (let mutation of mutationsList) {
    // Check if a new element was added to the DOM
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
    	console.log(mutation)
      // Loop through the added nodes
      for (let node of mutation.addedNodes) {
        // Check if the node has the specified ID
        if (node.id && node.id.indexOf('-overflow-menu') !== -1) {
          // Run your code here
          console.log('Element with ID ' + node.id + ' was created!');
        }
      }
    }
  }
});

function startObserver() {
	if (isObserverRunning === true) {
		console.log('Observer is already running');
		return;
	} else if (isObserverRunning === false) {
		// Get the element with the specified ID
		const targetNode = document.body;
		// Configure and start the observer
		const config = { childList: true, subtree: true };
		observer.observe(targetNode, config);
		isObserverRunning = true;
		console.log('Observer started');
	}
}

function stopObserver() {
	observer.disconnect();
	isObserverRunning = false;
	console.log('Observer stopped');
}*/
