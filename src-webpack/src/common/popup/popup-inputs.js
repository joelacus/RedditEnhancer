/* ===== Popup / Inputs ===== */

import { addCustom } from './popup-functions'
import { addCustomBg } from './popup-functions'
import { addLoaderDeleteListeners } from './popup-functions'
import { addBackgroundDeleteListeners } from './popup-functions'
import { darkModeTimeCalc } from './popup-functions'
import { init_i18n } from './popup-internationalisation'


// Tweaks Filter - New / Old Reddit
function tabShowNewVersion() {
	document.querySelector('#search').value = ""
	//search_filter();
	var rNew = document.querySelectorAll(".r-new")
	rNew.forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add("hide");
		} else {
			item.classList.remove('hide');
		}
	});
	var rOld = document.querySelectorAll(".r-old")
	rOld.forEach(function (item) {
		item.classList.add('hide');
	});
}
export function tabShowOldVersion() {
	document.querySelector('#search').value = ""
	//search_filter();
	var rNew = document.querySelectorAll(".r-new")
	rNew.forEach(function (item) {
		item.classList.add('hide');
	});
	var rOld = document.querySelectorAll(".r-old")
	rOld.forEach(function (item) {
		if (item.classList.contains('sub-list')) {
			item.classList.add("hide");
		} else {
			item.classList.remove('hide');
		}
	});
}


// Version Select Dropdown Menu
const version_dropdown = document.querySelector('#select-version');
const version_dropdownMenu = document.querySelector('#select-version-menu');
document.querySelector("#select-version .select").addEventListener('click', function () {
	if (version_dropdown.classList.contains('active')) {
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
	} else {
		version_dropdown.classList.add('active');
		version_dropdownMenu.style.maxHeight = version_dropdownMenu.scrollHeight + 'px';	
	}
});
document.addEventListener('click', function (event) {
	if (!version_dropdown.contains(event.target)) {
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
	}
});
version_dropdownMenu.addEventListener('click', function (event) {
	if (event.target.tagName.toLowerCase() === 'li') {
		document.querySelector("#select-version .select").querySelector('span').textContent = event.target.textContent;
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
		if (event.target.id == "new-reddit") {
			tabShowNewVersion();
			BROWSER_API.storage.sync.set({redditVersion: "new"});
		} else if (event.target.id == "old-reddit") {
			tabShowOldVersion();
			BROWSER_API.storage.sync.set({redditVersion: "old"});
		}
	}
	if (event.target.tagName.toLowerCase() === 'span') {
		document.querySelector("#select-version .select").querySelector('span').textContent = event.target.textContent;
		version_dropdown.classList.remove('active');
		version_dropdownMenu.style.maxHeight = '0';
		if (event.target.parentNode.id == "new-reddit") {
			tabShowNewVersion();
			BROWSER_API.storage.sync.set({redditVersion: "new"});
		} else if (event.target.parentNode.id == "old-reddit") {
			tabShowOldVersion();
			BROWSER_API.storage.sync.set({redditVersion: "old"});
		}
	}
});


// Language Select Dropdown Menu
const lang_dropdown = document.querySelector('#select-lang');
const lang_dropdownMenu = document.querySelector('#select-lang-menu');
document.querySelector("#select-lang .select").addEventListener('click', function () {
	if (lang_dropdown.classList.contains('active')) {
		lang_dropdown.classList.remove('active');
		lang_dropdownMenu.style.maxHeight = '0';
	} else {
		lang_dropdown.classList.add('active');
		lang_dropdownMenu.style.maxHeight = lang_dropdownMenu.scrollHeight + 'px';	
	}
});
document.addEventListener('click', function (event) {
	if (!lang_dropdown.contains(event.target)) {
		lang_dropdown.classList.remove('active');
		lang_dropdownMenu.style.maxHeight = '0';
	}
});
lang_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase()
	if (btn === 'li') {
		var lang = event.target.id;
	}
	if (btn === 'span') {
		var lang = event.target.parentNode.id;
	}
	document.querySelector("#select-lang .select").querySelector('span').textContent = event.target.textContent;
	lang_dropdown.classList.remove('active');
	lang_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({language: lang});
	init_i18n(lang);
});


// Search
var i, query, filter, txtValue
var ul = document.querySelector('.menu');
var li = ul.querySelectorAll('li');
function search_filter() {
	BROWSER_API.storage.sync.get(['redditVersion'], function(result){
		if (result.redditVersion != undefined) {
			var v = "r-"+result.redditVersion
		} else {
			var v = "r-new"
		}
		document.querySelectorAll('.sub-list').forEach(function(sub){
			if ((sub.classList.contains(v))||(sub.classList.contains('r-both'))) {
				sub.classList.remove('hide');
			}
		});
		document.querySelectorAll('.sub-search-title').forEach(function(sub){
			sub.classList.remove('hide');
		});
		for (i = 0; i < li.length; i++) {
			if ((li[i].classList.contains(v))||(li[i].classList.contains('r-both'))) {
				txtValue = ""
				query = li[i].querySelectorAll("[data-search]");
				if (query != undefined) {
					query.forEach(function(span){
						txtValue = txtValue + "," + span.dataset.search + "," + span.textContent || span.innerText
					});
					filter = document.querySelector('#search').value.toLowerCase();
					if (txtValue.toLowerCase().indexOf(filter) > -1) {
						li[i].style.display = "grid"
					} else {
						li[i].style.display = "none"
					}
				} else {
					li[i].style.display = "none"
				}
				if (li[i].classList.contains('menu-item-link')) {
					li[i].style.display = "none"
				}
				if (document.querySelector('#search').value == "") {
					document.querySelectorAll('.sub-list').forEach(function(sub){
						sub.classList.add('hide');
					});
					li[i].style.display = null
					document.querySelectorAll('.sub-search-title').forEach(function(title){
						title.classList.add('hide');
					});
					document.querySelectorAll('.menu-item-link').forEach(function(btn){
						btn.classList.remove('active');
					});
				}
			}
		}
	});
}
document.querySelector('#search').addEventListener("keyup", function(e) {
	search_filter(e);
});


// Menu Button - Dark Mode
document.querySelector(".btn-dark-mode").addEventListener("click", function(e) {
	var el = document.querySelector('.menu-dark-mode') //.forEach(function(el){
	if (el.classList.contains('hide')) {
		document.querySelector(".btn-dark-mode").classList.add('active');
		el.classList.remove('hide');
		//el.style.maxHeight = el.scrollHeight + 'px';
		document.querySelector(".btn-dark-mode").scrollIntoView();
	} else {
		document.querySelector(".btn-dark-mode").classList.remove('active');
		el.classList.add('hide');
		//el.style.maxHeight = '0';
	}
	//});
});
// Menu Button - Expand View
document.querySelector(".btn-expand-view").addEventListener("click", function(e) {
	document.querySelectorAll('.menu-expand-view').forEach(function(el){
		if (el.classList.contains('hide')) {
			document.querySelector(".btn-expand-view").classList.add('active')
			el.classList.remove('hide');
			document.querySelector(".btn-expand-view").scrollIntoView();
		} else {
			document.querySelector(".btn-expand-view").classList.remove('active')
			el.classList.add('hide');
		}
	});
});
// Menu Button - Hide Elements
document.querySelector(".btn-hide-elements").addEventListener("click", function(e) {
	document.querySelectorAll('.menu-hide-elements').forEach(function(el){
		if (el.classList.contains('hide')) {
			document.querySelector(".btn-hide-elements").classList.add('active')
			el.classList.remove('hide');
			document.querySelector(".btn-hide-elements").scrollIntoView();
		} else {
			document.querySelector(".btn-hide-elements").classList.remove('active')
			el.classList.add('hide');
		}
	});
});
// Menu Button - Productivity Tweaks
document.querySelector(".btn-productivity-tweaks").addEventListener("click", function(e) {
	document.querySelectorAll('.menu-productivity-tweaks').forEach(function(el){
		if (el.classList.contains('hide')) {
			document.querySelector(".btn-productivity-tweaks").classList.add('active')
			el.classList.remove('hide');
			document.querySelector(".btn-productivity-tweaks").scrollIntoView();
		} else {
			document.querySelector(".btn-productivity-tweaks").classList.remove('active')
			el.classList.add('hide');
		}
	});
});
// Menu Button - Style Tweaks
document.querySelector(".btn-style-tweaks").addEventListener("click", function(e) {
	document.querySelectorAll('.menu-style-tweaks').forEach(function(el){
		if (el.classList.contains('hide')) {
			document.querySelector(".btn-style-tweaks").classList.add('active')
			el.classList.remove('hide');
			document.querySelector(".btn-style-tweaks").scrollIntoView();
		} else {
			document.querySelector(".btn-style-tweaks").classList.remove('active')
			el.classList.add('hide');
		}
	});
});
// Menu Button - Background
document.querySelector(".btn-bg-image").addEventListener("click", function(e) {
	document.querySelectorAll('.menu-bg-image').forEach(function(el){
		if (el.classList.contains('hide')) {
			document.querySelector(".btn-bg-image").classList.add('active')
			el.classList.remove('hide');
			document.querySelector(".btn-bg-image").scrollIntoView();
		} else {
			document.querySelector(".btn-bg-image").classList.remove('active')
			el.classList.add('hide');
		}
	});
});


// Button - Add New Background Image
document.querySelector(".btn-add-custom-background").addEventListener("click", addCustomBg);


// Tab Switcher - Auto Dark Mode
document.querySelector("#btn-dm-disabled").addEventListener("click", function(e) {
	tabDmDisabled();
});
// disabled
function tabDmDisabled() {
	BROWSER_API.runtime.sendMessage({"darkModeAutoTime":false});
	document.querySelector("#btn-dm-system").classList.remove("tab-active");
	document.querySelector("#btn-dm-time").classList.remove("tab-active");
	document.querySelector(".icon-auto").style.color = ""
	var icons = document.querySelectorAll(".icon-clock")
	icons.forEach(function (icon) {
		icon.style.color = ""
	});
	document.querySelector("#btn-dm-disabled").classList.add("tab-active");
	BROWSER_API.storage.sync.set({darkModeAuto: "false"});
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {darkModeAutoListener: false});
			};
		});
	});
}
document.querySelector("#btn-dm-system").addEventListener("click", function(e) {
	tabDmSystem();
});
// system theme
export function tabDmSystem() {
	BROWSER_API.runtime.sendMessage({"darkModeAutoTime":false});
	document.querySelector("#btn-dm-disabled").classList.remove("tab-active");
	document.querySelector("#btn-dm-time").classList.remove("tab-active");
	document.querySelector(".icon-auto").style.color = "var(--accent)"
	var icons = document.querySelectorAll(".icon-clock")
	icons.forEach(function (icon) {
		icon.style.color = ""
	});
	document.querySelector("#btn-dm-system").classList.add("tab-active");
	BROWSER_API.storage.sync.set({darkModeAuto: "system"});
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.querySelector("#checkbox-dark-mode").checked = true
		BROWSER_API.storage.sync.set({darkMode: true});
		document.querySelector("body").classList.remove("light-mode");
		var icons = document.querySelectorAll(".icon-dark-mode")
		icons.forEach(function (icon) {
			icon.style.color = "var(--accent)"
		});
		var value = true
	} else {
		document.querySelector("#checkbox-dark-mode").checked = false
		BROWSER_API.storage.sync.set({darkMode: false});
		document.querySelector("body").classList.add("light-mode");
		var icons = document.querySelectorAll(".icon-dark-mode")
		icons.forEach(function (icon) {
			icon.style.color = ""
		});
		var value = false
	}
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {darkMode: value});
				BROWSER_API.tabs.sendMessage(tab.id, {darkModeAutoListener: true});
			};
		});
	});
}
// time range
document.querySelector("#btn-dm-time").addEventListener("click", function(e) {
	tabDmTime();
});
export function tabDmTime() {
	BROWSER_API.runtime.sendMessage({"darkModeAutoTime":true});
	document.querySelector("#btn-dm-disabled").classList.remove("tab-active");
	document.querySelector("#btn-dm-system").classList.remove("tab-active");
	document.querySelector(".icon-auto").style.color = "var(--accent)"
	var icons = document.querySelectorAll(".icon-clock")
	icons.forEach(function (icon) {
		icon.style.color = "var(--accent)"
	});
	document.querySelector("#btn-dm-time").classList.add("tab-active");
	darkModeTimeCalc(1);
	BROWSER_API.storage.sync.set({darkModeAuto: "time"});
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {darkModeAutoListener: false});
			};
		});
	});
}


// Dark Mode Time Inputs
document.querySelector("#dm-time-start").addEventListener("input", function(e) {
	var time = document.querySelector("#dm-time-start").value
	BROWSER_API.storage.sync.set({darkModeTimeStart: time});
});
document.querySelector("#dm-time-end").addEventListener("input", function(e) {
	var time = document.querySelector("#dm-time-end").value
	BROWSER_API.storage.sync.set({darkModeTimeEnd: time});
});


// Toggle - Dark Mode
document.querySelector("#checkbox-dark-mode").addEventListener("change", function(e) {
	var state = document.querySelector("#checkbox-dark-mode").checked
	if (state == true) {
		BROWSER_API.storage.sync.set({darkMode: true});
		var icons = document.querySelectorAll(".icon-dark-mode")
		icons.forEach(function (icon) {
			icon.style.color = "var(--accent)"
		});
		document.querySelector("body").classList.remove("light-mode");
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {darkMode: true});
				};
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({darkMode: false});
		var icons = document.querySelectorAll(".icon-dark-mode")
		icons.forEach(function (icon) {
			icon.style.color = ""
		});
		document.querySelector("body").classList.add("light-mode");
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {darkMode: false});
				};
			});
		});
	}
});


// Toggle - Expand Layout
document.querySelector("#checkbox-expand-layout").addEventListener("change", function(e) {
	var expandLayout = document.querySelector("#checkbox-expand-layout").checked
	if (expandLayout == true) {
		BROWSER_API.storage.sync.set({expandLayout: true});
		var icons = document.querySelectorAll(".icon-layout")
		icons.forEach(function (icon) {
			icon.style.color = "var(--accent)"
		});
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {expandLayout: true});
				};
			});
		});
	} else if (expandLayout == false) {
		BROWSER_API.storage.sync.set({expandLayout: false});
		var icons = document.querySelectorAll(".icon-layout")
		icons.forEach(function (icon) {
			icon.style.color = ""
		});
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {expandLayout: false});
				};
			});
		});
	}
});


// Slider - Expand Layout Width
document.querySelector("#input-expand-view-width").addEventListener("input", function(e) {
	BROWSER_API.storage.sync.set({expandLayoutWidth: e.target.value});
	const widthDisplay = document.querySelector("#expand-view-width");
	widthDisplay.innerText = e.target.value+"%"
	// if expand card view is true
	BROWSER_API.storage.sync.get(['expandLayout'], function(result) {
		if (result.expandLayout == true) {
			BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
				tabs.forEach(function(tab){
					if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
						BROWSER_API.tabs.sendMessage(tab.id, {expandLayoutWidth: e.target.value});
					};
				});
			});
		}
	});
});


// Toggle - Centre Layout
document.querySelector("#checkbox-layout-centre").addEventListener("change", function(e) {
	var state = document.querySelector("#checkbox-layout-centre").checked
	if (state == true) {
		BROWSER_API.storage.sync.set({layoutCentre: true});
		document.querySelector(".icon-centre").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {layoutCentre: true});
				};
			});
		});
	} else {
		BROWSER_API.storage.sync.set({layoutCentre: false});
		document.querySelector(".icon-centre").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {layoutCentre: false});
				};
			});
		});
	}
});


// Toggle - Scale Tall Images To Fit Post
document.querySelector("#checkbox-fit-image").addEventListener("change", function(e) {
	var state = document.querySelector("#checkbox-fit-image").checked
	if (state == true) {
		document.querySelector("#checkbox-image-scroll").checked = false
		BROWSER_API.storage.sync.set({imageScroll: false});
		document.querySelector(".icon-scroll").style.color = ""
		BROWSER_API.storage.sync.set({fitImage: true});
		document.querySelector(".icon-scale").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {fitImage: true});
				};
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({fitImage: false});
		document.querySelector(".icon-scale").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {fitImage: false});
				};
			});
		});
	}
});


// Toggle - Add Scrollbar To Tall Images
document.querySelector("#checkbox-image-scroll").addEventListener("change", function(e) {
	var state = document.querySelector("#checkbox-image-scroll").checked
	if (state == true) {
		document.querySelector("#checkbox-fit-image").checked = false
		BROWSER_API.storage.sync.set({fitImage: false});
		document.querySelector(".icon-scale").style.color = ""
		BROWSER_API.storage.sync.set({imageScroll: true});
		document.querySelector(".icon-scroll").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {imageScroll: true});
				};
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({imageScroll: false});
		document.querySelector(".icon-scroll").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {imageScroll: false});
				};
			});
		});
	}
});


// Toggle - Dropshadows
document.querySelector("#checkbox-shadow").addEventListener("change", function(e) {
	var state = document.querySelector("#checkbox-shadow").checked
	if (state == true) {
		BROWSER_API.storage.sync.set({shadows: true});
		document.querySelector(".icon-light-off").style.color = "var(--accent)"
		document.querySelector(".icon-light-off").classList.add("icon-light-on");
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {shadows: true});
				};
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({shadows: false});
		document.querySelector(".icon-light-off").style.color = ""
		document.querySelector(".icon-light-off").classList.remove("icon-light-on");
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {shadows: false});
				};
			});
		});
	}
});


// Toggle - Use Custom Background
document.querySelector("#checkbox-background").addEventListener("change", function(e) {
	var state = document.querySelector("#checkbox-background").checked
	if (state == true) {
		BROWSER_API.storage.sync.set({useCustomBackground: true});
		var icons = document.querySelectorAll(".icon-background")
		icons.forEach(function (icon) {
			icon.style.color = "var(--accent)"
		});
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {useCustomBackground: true});
				};
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({useCustomBackground: false});
		var icons = document.querySelectorAll(".icon-background")
		icons.forEach(function (icon) {
			icon.style.color = ""
		});
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {useCustomBackground: false});
				};
			});
		});
	}
});


// Button - Edit Backgrounds
document.querySelector('.btn-edit-backgrounds').addEventListener("click", function(e) {
	var btnEdit = document.querySelector('.btn-edit-backgrounds');
	btnEdit.style.display = "none"
	var btnSave = document.querySelector('.btn-edit-backgrounds-save');
	btnSave.style.display = "block"
	const background = document.querySelectorAll(".background");
	for (let i = 0; i < background.length; i++) {
		if (background[i].firstChild.id == "") {
			var btn = document.createElement("div");
			btn.setAttribute("class", "btn-delete-background")
			background[i].appendChild(btn);
			background[i].classList.add("background-edit");
		}
	};
	addBackgroundDeleteListeners();
});


// Button - Save Backgrounds
document.querySelector('.btn-edit-backgrounds-save').addEventListener("click", function(e) {
	var btnEdit = document.querySelector('.btn-edit-backgrounds');
	btnEdit.style.display = "block"
	var btnSave = document.querySelector('.btn-edit-backgrounds-save');
	btnSave.style.display = "none"
	const background = document.querySelectorAll(".background");
	for (let i = 0; i < background.length; i++) {
		if (background[i].firstChild.id == "") {
			var del = background[i].querySelector(".btn-delete-background");
			background[i].removeChild(del);
			background[i].classList.remove("background-edit");
		}
	};
});


// Slider - Background Blur
document.querySelector('#input-bg-blur').addEventListener("input", function(e) {
	// set ui
	var value = e.target.value
	if (value != 0) {
		document.querySelector('.icon-blur').style.color = "var(--accent)"
	} else {
		document.querySelector('.icon-blur').style.color = ""
	}
	document.querySelector("#bg-blur-value").innerText = e.target.value+"px"
	// save
	BROWSER_API.storage.sync.set({bgBlur: value});
	// apply
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {bgBlur: value});
			};
		});
	});
});


// Toggle - Hide Reddit Premium
document.querySelector("#checkbox-hide-reddit-premium").addEventListener("change", function(e) {
	var hideRedditPremium = document.querySelector("#checkbox-hide-reddit-premium").checked
	if (hideRedditPremium == true) {
		BROWSER_API.storage.sync.set({hideRedditPremium: true});
		document.querySelector(".hide-reddit-premium").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideRedditPremium: true});
				};
			});
		});
	} else if (hideRedditPremium == false) {
		BROWSER_API.storage.sync.set({hideRedditPremium: false});
		document.querySelector(".hide-reddit-premium").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideRedditPremium: false});
				};
			});
		});
	}
});


// Toggle - Hide Create Post
document.querySelector("#checkbox-hide-create-post").addEventListener("change", function(e) {
	var hideCreatePost = document.querySelector("#checkbox-hide-create-post").checked
	if (hideCreatePost == true) {
		BROWSER_API.storage.sync.set({hideCreatePost: true});
		document.querySelector(".icon-hide-create-post .icon").style.display = "none"
		document.querySelector(".icon-hide-create-post .icon-slash").style.display = ""
		document.querySelector(".icon-hide-create-post").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideCreatePost: true});
				};
			});
		});
	} else if (hideCreatePost == false) {
		BROWSER_API.storage.sync.set({hideCreatePost: false});
		document.querySelector(".icon-hide-create-post .icon").style.display = ""
		document.querySelector(".icon-hide-create-post .icon-slash").style.display = "none"
		document.querySelector(".icon-hide-create-post").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideCreatePost: false});
				};
			});
		});
	}
});


// Toggle - Hide Home Sidebar
document.querySelector("#checkbox-hide-home-sidebar").addEventListener("change", function(e) {
	var hideHomeSidebar = document.querySelector("#checkbox-hide-home-sidebar").checked
	if (hideHomeSidebar == true) {
		BROWSER_API.storage.sync.set({hideHomeSidebar: true});
		document.querySelector(".icon-hide-home-sidebar").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideHomeSidebar: true});
					//BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true});
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function(result) {
						BROWSER_API.tabs.sendMessage(tab.id, {layoutCentre: result.layoutCentre});
					});
				};
			});
		});
	} else if (hideHomeSidebar == false) {
		BROWSER_API.storage.sync.set({hideHomeSidebar: false});
		document.querySelector(".icon-hide-home-sidebar").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideHomeSidebar: false});
					//BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true});
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function(result) {
						BROWSER_API.tabs.sendMessage(tab.id, {layoutCentre: result.layoutCentre});
					});
				};
			});
		});
	}
});


// Toggle - Hide Sub Sidebar
document.querySelector("#checkbox-hide-sub-sidebar").addEventListener("change", function(e) {
	var hideSubSidebar = document.querySelector("#checkbox-hide-sub-sidebar").checked
	if (hideSubSidebar == true) {
		BROWSER_API.storage.sync.set({hideSubSidebar: true});
		document.querySelector(".icon-hide-sub-sidebar").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSubSidebar: true});
					BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true});
				};
			});
		});
	} else if (hideSubSidebar == false) {
		BROWSER_API.storage.sync.set({hideSubSidebar: false});
		document.querySelector(".icon-hide-sub-sidebar").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSubSidebar: false});
					BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true});
				};
			});
		});
	}
});


// Toggle - Hide Sidebar Policy
document.querySelector("#checkbox-hide-sidebar-policy").addEventListener("change", function(e) {
	var hideSidebarPolicy = document.querySelector("#checkbox-hide-sidebar-policy").checked
	if (hideSidebarPolicy == true) {
		BROWSER_API.storage.sync.set({hideSidebarPolicy: true});
		document.querySelector(".hide-sidebar-policy").style.color = "var(--accent)"
		document.querySelector("#checkbox-layout-center").checked = false
		document.querySelector(".icon-center").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSidebarPolicy: true});
				};
			});
		});
	} else if (hideSidebarPolicy == false) {
		BROWSER_API.storage.sync.set({hideSidebarPolicy: false});
		document.querySelector(".hide-sidebar-policy").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSidebarPolicy: false});
				};
			});
		});
	}
});


// Toggle - Hide Coin
document.querySelector("#checkbox-hide-coin-button").addEventListener("change", function(e) {
	var hideCoinButton = document.querySelector("#checkbox-hide-coin-button").checked
	if (hideCoinButton == true) {
		BROWSER_API.storage.sync.set({hideCoinButton: true});
		document.querySelector(".hide-coin-button").style.fill = "var(--accent)"
		document.querySelector(".hide-coin-button .icon").style.display = "none"
		document.querySelector(".hide-coin-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideCoinButton: true});
				};
			});
		});
	} else if (hideCoinButton == false) {
		BROWSER_API.storage.sync.set({hideCoinButton: false});
		document.querySelector(".hide-coin-button").style.fill = ""
		document.querySelector(".hide-coin-button .icon").style.display = ""
		document.querySelector(".hide-coin-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideCoinButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Advertise Button
document.querySelector("#checkbox-hide-advertise-button").addEventListener("change", function(e) {
	var hideAdvertiseButton = document.querySelector("#checkbox-hide-advertise-button").checked
	if (hideAdvertiseButton == true) {
		BROWSER_API.storage.sync.set({hideAdvertiseButton: true});
		document.querySelector(".hide-advertise-button").style.fill = "var(--accent)"
		document.querySelector(".hide-advertise-button .icon").style.display = "none"
		document.querySelector(".hide-advertise-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideAdvertiseButton: true});
				};
			});
		});
	} else if (hideAdvertiseButton == false) {
		BROWSER_API.storage.sync.set({hideAdvertiseButton: false});
		document.querySelector(".hide-advertise-button").style.fill = ""
		document.querySelector(".hide-advertise-button .icon").style.display = ""
		document.querySelector(".hide-advertise-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideAdvertiseButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Moderation Button
document.querySelector("#checkbox-hide-moderation-button").addEventListener("change", function(e) {
	var hideModerationButton = document.querySelector("#checkbox-hide-moderation-button").checked
	if (hideModerationButton == true) {
		BROWSER_API.storage.sync.set({hideModerationButton: true});
		document.querySelector(".hide-moderation-button").style.fill = "var(--accent)"
		document.querySelector(".hide-moderation-button .icon").style.display = "none"
		document.querySelector(".hide-moderation-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideModerationButton: true});
				};
			});
		});
	} else if (hideModerationButton == false) {
		BROWSER_API.storage.sync.set({hideModerationButton: false});
		document.querySelector(".hide-moderation-button").style.fill = ""
		document.querySelector(".hide-moderation-button .icon").style.display = ""
		document.querySelector(".hide-moderation-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideModerationButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Popular Button
document.querySelector("#checkbox-hide-popular-button").addEventListener("change", function(e) {
	var hidePopularButton = document.querySelector("#checkbox-hide-popular-button").checked
	if (hidePopularButton == true) {
		BROWSER_API.storage.sync.set({hidePopularButton: true});
		document.querySelector(".hide-popular-button").style.fill = "var(--accent)"
		document.querySelector(".hide-popular-button .icon").style.display = "none"
		document.querySelector(".hide-popular-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hidePopularButton: true});
				};
			});
		});
	} else if (hidePopularButton == false) {
		BROWSER_API.storage.sync.set({hidePopularButton: false});
		document.querySelector(".hide-popular-button").style.fill = ""
		document.querySelector(".hide-popular-button .icon").style.display = ""
		document.querySelector(".hide-popular-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hidePopularButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Happening Now Button
document.querySelector("#checkbox-hide-happening-now-button").addEventListener("change", function(e) {
	var hideHappeningNowButton = document.querySelector("#checkbox-hide-happening-now-button").checked
	if (hideHappeningNowButton == true) {
		BROWSER_API.storage.sync.set({hideHappeningNowButton: true});
		document.querySelector(".hide-happening-now-button").style.fill = "var(--accent)"
		document.querySelector(".hide-happening-now-button .icon").style.display = "none"
		document.querySelector(".hide-happening-now-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideHappeningNowButton: true});
				};
			});
		});
	} else if (hideHappeningNowButton == false) {
		BROWSER_API.storage.sync.set({hideHappeningNowButton: false});
		document.querySelector(".hide-happening-now-button").style.fill = ""
		document.querySelector(".hide-happening-now-button .icon").style.display = ""
		document.querySelector(".hide-happening-now-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideHappeningNowButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Chat Button
document.querySelector("#checkbox-hide-chat-button").addEventListener("change", function(e) {
	var hideChatButton = document.querySelector("#checkbox-hide-chat-button").checked
	if (hideChatButton == true) {
		BROWSER_API.storage.sync.set({hideChatButton: true});
		document.querySelector(".hide-chat-button").style.fill = "var(--accent)"
		document.querySelector(".hide-chat-button .icon").style.display = "none"
		document.querySelector(".hide-chat-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideChatButton: true});
				};
			});
		});
	} else if (hideChatButton == false) {
		BROWSER_API.storage.sync.set({hideChatButton: false});
		document.querySelector(".hide-chat-button").style.fill = ""
		document.querySelector(".hide-chat-button .icon").style.display = ""
		document.querySelector(".hide-chat-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideChatButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Notification Button
document.querySelector("#checkbox-hide-notification-button").addEventListener("change", function(e) {
	var hideNotificationButton = document.querySelector("#checkbox-hide-notification-button").checked
	if (hideNotificationButton == true) {
		BROWSER_API.storage.sync.set({hideNotificationButton: true});
		document.querySelector(".hide-notification-button").style.fill = "var(--accent)"
		document.querySelector(".hide-notification-button .icon").style.display = "none"
		document.querySelector(".hide-notification-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideNotificationButton: true});
				};
			});
		});
	} else if (hideNotificationButton == false) {
		BROWSER_API.storage.sync.set({hideNotificationButton: false});
		document.querySelector(".hide-notification-button").style.fill = ""
		document.querySelector(".hide-notification-button .icon").style.display = ""
		document.querySelector(".hide-notification-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideNotificationButton: false});
				};
			});
		});
	}
});


// Toggle - Hide Create Post Button
document.querySelector("#checkbox-hide-create-post-button").addEventListener("change", function(e) {
	var hideCreatePostButton = document.querySelector("#checkbox-hide-create-post-button").checked
	if (hideCreatePostButton == true) {
		BROWSER_API.storage.sync.set({hideCreatePostButton: true});
		document.querySelector(".hide-create-post-button").style.fill = "var(--accent)"
		document.querySelector(".hide-create-post-button .icon").style.display = "none"
		document.querySelector(".hide-create-post-button .icon-slash").style.display = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideCreatePostButton: true});
				};
			});
		});
	} else if (hideCreatePostButton == false) {
		BROWSER_API.storage.sync.set({hideCreatePostButton: false});
		document.querySelector(".hide-create-post-button").style.fill = ""
		document.querySelector(".hide-create-post-button .icon").style.display = ""
		document.querySelector(".hide-create-post-button .icon-slash").style.display = "none"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideCreatePostButton: false});
				};
			});
		});
	}
});


// Slider - Header Height
/*document.querySelector('#input-header-height').addEventListener("input", function(e) {
	// set ui
	var value = e.target.value
	if (value == 4) {
		document.querySelector('.header-height').style.color = "var(--accent)"
		var height = "228px"
	} else if (value == 3) {
		document.querySelector('.header-height').style.color = "var(--accent)"
		var height = "128px"
	} else if (value == 2) {
		document.querySelector('.header-height').style.color = "var(--accent)"
		var height = "64px"
	} else if (value == 1) {
		document.querySelector('.header-height').style.color = "var(--accent)"
		var height = "0px"
	} else if (value == 0) {
		document.querySelector('.header-height').style.color = ""
		var height = "default"
	}
	document.querySelector("#header-height-value").innerText = height
	// save
	BROWSER_API.storage.sync.set({headerHeight: value});
	// apply
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {headerHeight: value});
			};
		});
	});
});*/



// Toggle - Mind The Gap
document.querySelector("#checkbox-hide-gap").addEventListener("change", function(e) {
	var hideGap = document.querySelector("#checkbox-hide-gap").checked
	if (hideGap == true) {
		BROWSER_API.storage.sync.set({hideGap: true});
		document.querySelector(".hide-gap").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideGap: true});
				};
			});
		});
	} else if (hideGap == false) {
		BROWSER_API.storage.sync.set({hideGap: false});
		document.querySelector(".hide-gap").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideGap: false});
				};
			});
		});
	}
});


// Toggle - Sticky Sort
document.querySelector("#checkbox-sticky-sort").addEventListener("change", function(e) {
	var stickySort = document.querySelector("#checkbox-sticky-sort").checked
	if (stickySort == true) {
		BROWSER_API.storage.sync.set({stickySort: true});
		document.querySelector(".sticky-sort").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {stickySort: true});
				};
			});
		});
	} else if (stickySort == false) {
		BROWSER_API.storage.sync.set({stickySort: false});
		document.querySelector(".sticky-sort").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {stickySort: false});
				};
			});
		});
	}
});


// Toggle - Hide Username
document.querySelector("#checkbox-hide-username").addEventListener("change", function(e) {
	var hideUsername = document.querySelector("#checkbox-hide-username").checked
	if (hideUsername == true) {
		BROWSER_API.storage.sync.set({hideUsername: true});
		document.querySelector(".hide-username").classList.remove("icon-user");
		document.querySelector(".hide-username").classList.add("icon-user-slash");
		document.querySelector(".hide-username").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideUsername: true});
				};
			});
		});
	} else if (hideUsername == false) {
		BROWSER_API.storage.sync.set({hideUsername: false});
		document.querySelector(".hide-username").classList.add("icon-user");
		document.querySelector(".hide-username").classList.remove("icon-user-slash");
		document.querySelector(".hide-username").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideUsername: false});
				};
			});
		});
	}
});


// Toggle - Hide Karma
document.querySelector("#checkbox-hide-karma").addEventListener("change", function(e) {
	var hideKarma = document.querySelector("#checkbox-hide-karma").checked
	if (hideKarma == true) {
		BROWSER_API.storage.sync.set({hideKarma: true});
		document.querySelector(".icon-hide-karma .icon").style.display = "none"
		document.querySelector(".icon-hide-karma .icon-slash").style.display = ""
		document.querySelector(".icon-hide-karma").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideKarma: true});
				};
			});
		});
	} else if (hideKarma == false) {
		BROWSER_API.storage.sync.set({hideKarma: false});
		document.querySelector(".icon-hide-karma .icon").style.display = ""
		document.querySelector(".icon-hide-karma .icon-slash").style.display = "none"
		document.querySelector(".icon-hide-karma").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideKarma: false});
				};
			});
		});
	}
});


// Toggle - New Video Player
document.querySelector("#checkbox-new-player").addEventListener("change", function(e) {
	var newPlayer = document.querySelector("#checkbox-new-player").checked
	if (newPlayer == true) {
		BROWSER_API.storage.sync.set({newPlayer: true});
		document.querySelector(".icon-new-player").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {newPlayer: true});
				};
			});
		});
	} else if (newPlayer == false) {
		BROWSER_API.storage.sync.set({newPlayer: false});
		document.querySelector(".icon-new-player").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {newPlayer: false});
				};
			});
		});
	}
});


// Toggle - Show To Top Button
document.querySelector("#checkbox-show-to-top-button").addEventListener("change", function(e) {
	var showToTopButton = document.querySelector("#checkbox-show-to-top-button").checked
	if (showToTopButton == true) {
		BROWSER_API.storage.sync.set({showToTopButton: true});
		document.querySelector(".icon-scroll-to-top").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {showToTopButton: true});
				};
			});
		});
	} else if (showToTopButton == false) {
		BROWSER_API.storage.sync.set({showToTopButton: false});
		document.querySelector(".icon-scroll-to-top").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {showToTopButton: false});
				};
			});
		});
	}
});


// Toggle - Always Show Rising Sort Button
document.querySelector("#checkbox-always-show-rising-button").addEventListener("change", function(e) {
	var alwaysShowRisingButton = document.querySelector("#checkbox-always-show-rising-button").checked
	if (alwaysShowRisingButton == true) {
		BROWSER_API.storage.sync.set({alwaysShowRisingButton: true});
		document.querySelector(".always-show-rising-button").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {alwaysShowRisingButton: true});
				};
			});
		});
	} else if (alwaysShowRisingButton == false) {
		BROWSER_API.storage.sync.set({alwaysShowRisingButton: false});
		document.querySelector(".always-show-rising-button").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {alwaysShowRisingButton: false});
				};
			});
		});
	}
});


// Toggle - Get New Reddit
document.querySelector("#checkbox-hide-get-new-reddit").addEventListener("change", function(e) {
	var hideGetNewReddit = document.querySelector("#checkbox-hide-get-new-reddit").checked
	if (hideGetNewReddit == true) {
		BROWSER_API.storage.sync.set({hideGetNewReddit: true});
		document.querySelector(".hide-get-new-reddit").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideGetNewReddit: true});
				};
			});
		});
	} else if (hideGetNewReddit == false) {
		BROWSER_API.storage.sync.set({hideGetNewReddit: false});
		document.querySelector(".hide-get-new-reddit").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideGetNewReddit: false});
				};
			});
		});
	}
});


// Toggle - Open Sub Links In New Tab
document.querySelector("#checkbox-open-sub-new-tab").addEventListener("change", function(e) {
	var openSubInNewTab = document.querySelector("#checkbox-open-sub-new-tab").checked
	if (openSubInNewTab == true) {
		BROWSER_API.storage.sync.set({openSubInNewTab: true});
		document.querySelector(".open-sub-new-tab").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {openSubInNewTab: true});
				};
			});
		});
	} else if (openSubInNewTab == false) {
		BROWSER_API.storage.sync.set({openSubInNewTab: false});
		document.querySelector(".open-sub-new-tab").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {openSubInNewTab: false});
				};
			});
		});
	}
});


// Toggle - Hide Promoted Links
document.querySelector("#checkbox-hide-promoted").addEventListener("change", function(e) {
	var hidePromoted = document.querySelector("#checkbox-hide-promoted").checked
	if (hidePromoted == true) {
		BROWSER_API.storage.sync.set({hidePromoted: true});
		document.querySelector(".icon-hide-promoted .icon").style.display = "none"
		document.querySelector(".icon-hide-promoted .icon-slash").style.display = ""
		document.querySelector(".icon-hide-promoted").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hidePromoted: true});
				};
			});
		});
	} else if (hidePromoted == false) {
		BROWSER_API.storage.sync.set({hidePromoted: false});
		document.querySelector(".icon-hide-promoted .icon").style.display = ""
		document.querySelector(".icon-hide-promoted .icon-slash").style.display = "none"
		document.querySelector(".icon-hide-promoted").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hidePromoted: false});
				};
			});
		});
	}
});


// Toggle - Show r/All Button
document.querySelector("#checkbox-show-r-all-button").addEventListener("change", function(e) {
	var showAllButton = document.querySelector("#checkbox-show-r-all-button").checked
	if (showAllButton == true) {
		BROWSER_API.storage.sync.set({showAllButton: true});
		document.querySelector(".icon-show-r-all").style.fill = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {showAllButton: true});
				};
			});
		});
	} else if (showAllButton == false) {
		BROWSER_API.storage.sync.set({showAllButton: false});
		document.querySelector(".icon-show-r-all").style.fill = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {showAllButton: false});
				};
			});
		});
	}
});


// Toggle - Move Feed Section In Side Menu To The Top
document.querySelector("#checkbox-sidemenu-feed-top").addEventListener("change", function(e) {
	var sidemenuFeedTop = document.querySelector("#checkbox-sidemenu-feed-top").checked
	if (sidemenuFeedTop == true) {
		BROWSER_API.storage.sync.set({sidemenuFeedTop: true});
		document.querySelector(".icon-sidemenu-feed-top").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {sidemenuFeedTop: true});
				};
			});
		});
	} else if (sidemenuFeedTop == false) {
		BROWSER_API.storage.sync.set({sidemenuFeedTop: false});
		document.querySelector(".icon-sidemenu-feed-top").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {sidemenuFeedTop: false});
				};
			});
		});
	}
});

/*
// Toggle - Expand Post Options
document.querySelector("#checkbox-expand-post-options").addEventListener("change", function(e) {
	var expandPostOptions = document.querySelector("#checkbox-expand-post-options").checked
	if (expandPostOptions == true) {
		BROWSER_API.storage.sync.set({expandPostOptions: true});
		document.querySelector(".icon-expand-post-options").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {expandPostOptions: true});
				};
			});
		});
	} else if (expandPostOptions == false) {
		BROWSER_API.storage.sync.set({expandPostOptions: false});
		document.querySelector(".icon-expand-post-options").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {expandPostOptions: false});
				};
			});
		});
	}
});
*/

// Toggle - Add Scroll To Text Post
document.querySelector("#checkbox-text-scroll-post").addEventListener("change", function(e) {
	var textPostScroll = document.querySelector("#checkbox-text-scroll-post").checked
	if (textPostScroll == true) {
		BROWSER_API.storage.sync.set({textPostScroll: true});
		document.querySelector(".icon-text-scroll-post").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {textPostScroll: true});
				};
			});
		});
	} else if (textPostScroll == false) {
		BROWSER_API.storage.sync.set({textPostScroll: false});
		document.querySelector(".icon-text-scroll-post").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {textPostScroll: false});
				};
			});
		});
	}
});


// Toggle - Hide See Full Image
document.querySelector("#checkbox-hide-see-full-image").addEventListener("change", function(e) {
	var hideSeeFullImage = document.querySelector("#checkbox-hide-see-full-image").checked
	if (hideSeeFullImage == true) {
		BROWSER_API.storage.sync.set({hideSeeFullImage: true});
		document.querySelector(".icon-hide-see-full-image").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSeeFullImage: true});
				};
			});
		});
	} else if (hideSeeFullImage == false) {
		BROWSER_API.storage.sync.set({hideSeeFullImage: false});
		document.querySelector(".icon-hide-see-full-image").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSeeFullImage: false});
				};
			});
		});
	}
});


// Toggle - Modernise Old Reddit
document.querySelector("#checkbox-modern-old-reddit").addEventListener("change", function(e) {
	var moderniseOldReddit = document.querySelector("#checkbox-modern-old-reddit").checked
	if (moderniseOldReddit == true) {
		BROWSER_API.storage.sync.set({moderniseOldReddit: true});
		document.querySelector(".icon-modern-old-reddit").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {moderniseOldReddit: true});
				};
			});
		});
	} else if (moderniseOldReddit == false) {
		BROWSER_API.storage.sync.set({moderniseOldReddit: false});
		document.querySelector(".icon-modern-old-reddit").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {moderniseOldReddit: false});
				};
			});
		});
	}
});


// Toggle - Hide Header Sub Bar
document.querySelector("#checkbox-hide-header-sub-bar").addEventListener("change", function(e) {
	var hideHeaderSubBar = document.querySelector("#checkbox-hide-header-sub-bar").checked
	if (hideHeaderSubBar == true) {
		BROWSER_API.storage.sync.set({hideHeaderSubBar: true});
		document.querySelector(".icon-hide-header-sub-bar").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideHeaderSubBar: true});
				};
			});
		});
	} else if (hideHeaderSubBar == false) {
		BROWSER_API.storage.sync.set({hideHeaderSubBar: false});
		document.querySelector(".icon-hide-header-sub-bar").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideHeaderSubBar: false});
				};
			});
		});
	}
});


// Toggle - Hide Side Menu Old
document.querySelector("#checkbox-hide-side-menu-old").addEventListener("change", function(e) {
	var hideSideMenuOld = document.querySelector("#checkbox-hide-side-menu-old").checked
	if (hideSideMenuOld == true) {
		BROWSER_API.storage.sync.set({hideSideMenuOld: true});
		document.querySelector(".icon-hide-side-menu-old").style.color = "var(--accent)"
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSideMenuOld: true});
				};
			});
		});
	} else if (hideSideMenuOld == false) {
		BROWSER_API.storage.sync.set({hideSideMenuOld: false});
		document.querySelector(".icon-hide-side-menu-old").style.color = ""
		BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
			tabs.forEach(function(tab){
				if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
					BROWSER_API.tabs.sendMessage(tab.id, {hideSideMenuOld: false});
				};
			});
		});
	}
});


// Slider - Comments Limit
document.querySelector('#input-post-comments-limit').addEventListener("input", function(e) {
	// set ui
	var value = e.target.value
	if (value == 0) {
		document.querySelector('.icon-post-comments-limit').style.color = "var(--accent)"
		document.querySelector("#post-comments-limit-value").innerText = "1"
		var value = 1
	} else if (value != -10) {
		document.querySelector('.icon-post-comments-limit').style.color = "var(--accent)"
		document.querySelector("#post-comments-limit-value").innerText = e.target.value
	} else {
		document.querySelector('.icon-post-comments-limit').style.color = ""
		document.querySelector("#post-comments-limit-value").innerText = "∞"
	}
	// save
	BROWSER_API.storage.sync.set({commentsLimit: value});

	// update background.js listener
	BROWSER_API.runtime.sendMessage({message: "update_listener"}, () => {
		//console.log("Listener updated");
	});

	// apply
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {commentsLimit: value});
			};
		});
	});
});


// Input - Auto Expand Feed/Post To 100% At Value
document.querySelector('#auto-expand-value').addEventListener('keyup', function(e) {
	const value = e.target.value

	// save
	BROWSER_API.storage.sync.set({autoExpandValue: value});

	// apply
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.includes("reddit.com"))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {autoExpandValue: value});
			};
		});
	});
});
