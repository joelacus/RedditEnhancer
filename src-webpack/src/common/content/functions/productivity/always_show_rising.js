// Always Show Rising Button

export function alwaysShowRisingButton(value) {
	const link = window.location.href;
	if (redditVersion === 'new') {
		if (value == true) {
			if (link.indexOf('/comments/') <= 0 && link.indexOf('/user/') <= 0 && link.indexOf('/settings/') <= 0) {
				// not post, not user, not settings
				// hides overflow button
				/*if (document.querySelector("#ListingSort--Overflow")) {
					document.querySelector("#ListingSort--Overflow").parentNode.parentNode.style.display = "none"	
				}*/

				// set language
				const lang = document.querySelector('html').lang;
				if (lang.includes('en-US')) {
					var rising = 'Rising';
				} else if (lang.includes('de')) {
					var rising = 'Aufsteigend';
				} else if (lang.includes('es-ES')) {
					var rising = 'En Alza';
				} else if (lang.includes('es-MX')) {
					var rising = 'Subiendo';
				} else if (lang.includes('fr')) {
					var rising = 'En hausse';
				} else if (lang.includes('it')) {
					var rising = 'In crescita';
				} else if (lang.includes('pt')) {
					var rising = 'Em ascensão';
				} else {
					var rising = 'Rising';
				}

				// get sibling classes
				var sort_btn = document.querySelector('[role="button"][href*="/hot/"]');
				if (sort_btn) {
					var btn_classes = sort_btn.classList;
					var sub = sort_btn.href.split('/hot/')[0];
					var i_classes = sort_btn.querySelector('i').classList.toString();
					var i_classes = i_classes.replace('icon-hot', 'icon-rising');
					if (btn_classes.length === 5) {
						var sort_btn = document.querySelector('[role="button"][href*="/new/"]');
						var btn_classes = sort_btn.classList;
						var sub = sort_btn.href.split('/new/')[0];
						var i_classes = sort_btn.querySelector('i').classList.toString();
						var i_classes = i_classes.replace('icon-new', 'icon-rising');
					}
				}

				// create rising button
				const btn = document.createElement('a');
				btn.setAttribute('class', btn_classes);
				btn.setAttribute('role', 'button');
				btn.setAttribute('tabindex', '0');
				if (sub != '') {
					btn.setAttribute('href', sub + '/rising/');
				} else {
					btn.setAttribute('href', '/rising/');
				}
				const i = document.createElement('i');
				i.setAttribute('class', i_classes);
				btn.append(i);
				const s = document.createElement('span');
				s.appendChild(document.createTextNode(rising));
				btn.append(s);

				// append new rising button if not already added
				var el = document.querySelector('[role="button"][href*="/rising/"]');
				if (!el) {
					const sort = document.querySelector('.re-sort');
					if (!sort) {
						setTimeout(() => {
							const sort = document.querySelector('.re-sort');
							if (sort) {
								document.querySelector('.re-sort').firstChild.nextElementSibling.append(btn);
							}
						}, 1000);
					} else {
						document.querySelector('.re-sort').firstChild.nextElementSibling.append(btn);
					}
				}
			}
		} else if (typeof value == 'undefined' || value == false) {
			// show overflow button
			if (document.querySelector('#ListingSort--Overflow')) {
				document.querySelector('#ListingSort--Overflow').parentNode.parentNode.style.display = '';
			}
			// remove rising button
			if (document.querySelector('[role="button"][href*="/rising/"]')) {
				document.querySelector('[role="button"][href*="/rising/"]').remove();
			}
		}
	}
}
