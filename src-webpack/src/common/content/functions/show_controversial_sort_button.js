/* ===== Show Controversial Sort Button ===== */
let showControversialSortButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value === true) {
			if (document.querySelector('.re-sort')) {
				if (!document.querySelector('.re-sort [href*="controversial"]')) {
					const parent = document.querySelector('.re-sort [role="button"]').parentElement;
					const sortButtons = document.querySelectorAll('.re-sort [role="button"]');
					const lang = document.querySelector('html').lang
					if (lang.includes("en-US")) {
						var text = "Controversial"
					} else if (lang.includes("de")) {
						var text = "Kontrovers"
					} else if (lang.includes("es-ES")) {
						var text = "Más polémicos"
					} else if (lang.includes("es-MX")) {
						var text = "Más polémicos"
					} else if (lang.includes("fr")) {
						var text = "Controversés"
					} else if (lang.includes("it")) {
						var text = "Controversi"
					} else if (lang.includes("pt-BR")){
						var text = "Polêmicos"
					} else if (lang.includes("pt-PT")){
						var text = "Controverso"
					} else {
						var text = "Controversial"
					}
					for(var i = 0; i < sortButtons.length; i++) {
						if (sortButtons[i].classList.length <= 4) {
							var clone = sortButtons[i].cloneNode(true);
							clone.classList.add('re-controversial-sort')
							if (link.indexOf('/user/') >= 0) { // user
								clone.href = link+"?sort=controversial"
							} else if (link.indexOf('/comments/') <= 0) { // not post
								if (link.endsWith('/')) {
									var link = link.slice(0, -1);
								}
								if (link.endsWith('hot')) {
									clone.href = link.replace('hot','controversial/');
								} else if (link.endsWith('new')) {
									clone.href = link.replace('new','controversial/');
								} else if (link.endsWith('top')) {
									clone.href = link.replace('top','controversial/');
								} else if (link.endsWith('controversial')) {
									//clone.href = link.replace('controversial','controversial/');
								} else if (link.endsWith('rising')) {
									clone.href = link.replace('rising','controversial/');
								} else {
									clone.href = link+"/controversial"
								}
							}
							clone.querySelector('span').textContent = text
							const classes = clone.querySelector('i').classList;
							classes.forEach(function(className) {
								if (className.startsWith('icon-')) {
									clone.querySelector('i').classList.remove(className);
								};
							});
							clone.querySelector('i').classList.add('icon-controversial');
							parent.appendChild(clone);
							break;
						}
					}
				}
			}
		} else if (value === false) {
			if (document.querySelector('.re-controversial-sort')) {
				document.querySelector('.re-controversial-sort').remove();
			}
		}
	}
	setTimeout(function() {
		showControversialSortButton(value);
	},3000);
}
export { showControversialSortButton };
