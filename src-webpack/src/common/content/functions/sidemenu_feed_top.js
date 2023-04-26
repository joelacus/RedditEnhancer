// Move Feed Section In Side Menu To The Top
let sidemenuFeedTop = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		//var container = document.querySelector('#re-header-buttons');
		if (value == true) {
			if (document.querySelector('.re-sidemenu-feed-top')) {
				document.querySelector('.re-sidemenu-feed-top').style.display = ""
			} else {
				//console.log("start observer")
				observer.observe(document.body, {childList: true, subtree: true, recursive: true});
				addFeedButtons();				
			}
		} else if (value == false) {
			observer.disconnect();
			if (document.querySelector('.re-sidemenu-feed-top')) {
				document.querySelector('.re-sidemenu-feed-top').style.display = "none"
			}
		}
	}
}
export { sidemenuFeedTop };


const observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(addedNode) {
			if (addedNode.nodeName != "#text") {
				//if (addedNode.querySelector('#header-subreddit-filter')) {
					for (let i = 0; i < 5; i++) {
						function func() {
							const l = document.querySelector('#header-subreddit-filter');
							const feed_top = document.querySelector('.re-sidemenu-feed-top');
							if (l) {
								if (!feed_top) {
									addFeedButtons();
								}
							}
						}
						setTimeout(func, i * 2000)
					}
				//}
			}
		});
	});
});


function addFeedButtons() {
	var container = document.querySelector('#header-subreddit-filter');
	if (container) {
		var container = container.parentNode;	
		const feed_top = document.querySelector('.re-sidemenu-feed-top');
		if (!feed_top) {
			const headings = container.querySelectorAll('[role="heading"]');
			headings.forEach(function(heading){
				const text = heading.textContent.toLowerCase();
				if ((text === 'feeds')||(text === 'feed')||(text === 'flux')) {
					const div = document.createElement('div');
					div.classList.add('re-sidemenu-feed-top');
					const clone_heading = heading.cloneNode(true);
					div.appendChild(clone_heading);
					if (document.querySelector('#focus-Home')) {
						const clone_home = document.querySelector('#focus-Home').cloneNode(true);
						div.appendChild(clone_home);	
					}
					if (document.querySelector('#focus-Popular')) {
						const clone_popular = document.querySelector('#focus-Popular').cloneNode(true);
						div.appendChild(clone_popular);	
					}
					if (document.querySelector('#focus-All')) {
						const clone_all = document.querySelector('#focus-All').cloneNode(true);
						div.appendChild(clone_all);	
					}
					if (document.querySelector('#focus-HappeningNow')) {
						const clone_now = document.querySelector('#focus-HappeningNow').cloneNode(true);
						div.appendChild(clone_now);
					}
					container.insertBefore(div, document.querySelector('#header-subreddit-filter').nextSibling);
				}
			});
		}
	}
}
