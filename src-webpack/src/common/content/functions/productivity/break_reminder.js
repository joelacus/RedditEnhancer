// Break Reminder

export function breakReminder(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			BROWSER_API.storage.sync.get(['breakReminderFrequency', 'language'], function (result) {
				if (typeof result.breakReminderFrequency == 'undefined') {
					var freq = 50;
				} else {
					var freq = result.breakReminderFrequency;
				}
				document.querySelectorAll('.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post) > div').forEach((div) => {
					if (div.querySelector('.Post:not(.promotedlink)')) {
						const breaks = document.querySelectorAll('.re-break-reminder');
						const lastBreak = breaks.length - 1;
						var position = getPositionRelativeToTarget(div, breaks[lastBreak]);
						if (position === parseInt(freq)) {
							const viewedPostsNumber = (breaks.length + 1) * result.breakReminderFrequency;
							const breakReminderElement = document.createElement('div');
							breakReminderElement.classList.add('re-break-reminder');
							const [text1, text2] = getText(result.language);
							breakReminderElement.textContent = text1 + viewedPostsNumber + text2;
							document.querySelector('.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post)').insertBefore(breakReminderElement, div.nextSibling);
						}
					}
				});
				// start observer
				postObserver(true);
			});
		} else if (value === false) {
			// stop observer
			postObserver(false);
			document.querySelectorAll('.re-break-reminder').forEach(function (el) {
				el.remove();
			});
		}
	}
}

// Observe for posts added to post container
const observer = new MutationObserver(function (mutations_list) {
	BROWSER_API.storage.sync.get(['breakReminderFrequency', 'language'], function (result) {
		if (typeof result.breakReminderFrequency == 'undefined') {
			var freq = 50;
		} else {
			var freq = result.breakReminderFrequency;
		}
		// detect post
		mutations_list.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (node) {
				if (node.tagName === 'DIV') {
					const breaks = document.querySelectorAll('.re-break-reminder');
					const lastBreak = breaks.length - 1;
					const position = getPositionRelativeToTarget(node, breaks[lastBreak]);
					if (node.querySelector('.Post:not(.promotedlink)')) {
						if (position === parseInt(freq)) {
							const viewedPostsNumber = (breaks.length + 1) * freq;
							const breakReminderElement = document.createElement('div');
							breakReminderElement.classList.add('re-break-reminder');
							const [text1, text2] = getText(result.language);
							breakReminderElement.textContent = text1 + viewedPostsNumber + text2;
							document.querySelector('.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post)').insertBefore(breakReminderElement, node.nextSibling);
						}
					}
				}
			});
		});
	});
});

// Toggle Observer
function postObserver(i) {
	if (i === true) {
		// start observer
		observer.observe(document.querySelector('.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post)'), { childList: true, subtree: true });
	} else if (i === false) {
		// stop observer
		observer.disconnect();
	}
}

// Function to determine the position of an element relative to the target element.
function getPositionRelativeToTarget(element, target) {
	const parent = element.parentElement;
	const elements = Array.from(parent.children);
	const filteredElements = elements.filter((div) => !div.querySelector('.promotedlink'));
	const targetIndex = filteredElements.indexOf(target);
	const elementIndex = filteredElements.indexOf(element);
	return elementIndex - targetIndex;
}

// Get Text
function getText(language) {
	if (typeof language == 'undefined') {
		var lang = 'en';
	} else {
		var lang = language;
	}
	if (lang === 'en' || lang === 'en-GB' || lang === 'en-US') {
		var text1 = "You've scrolled passed ";
		var text2 = ' posts';
	} else if (lang === 'de') {
		var text1 = 'Sie haben über ';
		var text2 = ' Beiträge gescrollt';
	} else if (lang === 'es') {
		var text1 = 'Has pasado de ';
		var text2 = ' publicaciones';
	} else if (lang === 'fr') {
		var text1 = 'Vous avez parcouru ';
		var text2 = ' publications';
	} else if (lang === 'it') {
		var text1 = 'Hai superato ';
		var text2 = ' post';
	} else if (lang === 'nl') {
		var text1 = 'Je bent voorbij ';
		var text2 = ' berichten gescrolld';
	} else if (lang === 'pl') {
		var text1 = 'Przewinąłeś ';
		var text2 = ' postów';
	} else if (lang === 'pt') {
		var text1 = 'Você rolou e passou por ';
		var text2 = ' postagens';
	} else if (lang === 'uk') {
		var text1 = 'Ви прокрутили ';
		var text2 = ' публікацій';
	} else {
		var text1 = "You've scrolled passed ";
		var text2 = ' posts';
	}
	return [text1, text2];
}
