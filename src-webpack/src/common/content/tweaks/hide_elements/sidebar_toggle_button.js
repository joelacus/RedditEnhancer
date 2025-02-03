/**
 * Tweaks: Hide Elements - Sidebar Toggle Button
 * @name sidebarToggleButton
 * @description Add a button to toggle the visibility of the sidebar.
 *
 * Originally created by nicholasdtc under UNLICENSE - https://github.com/nicholasdtc/redditSidebarToggle
 *
 * Applies to: Old UI (2005–)
 */

// Get the feature state from browser sync storage
export function loadSidebarToggleButton() {
    BROWSER_API.storage.sync.get(['sidebarToggleButton']).then((result) => {
        if (result.sidebarToggleButton) sidebarToggleButton(true);
    });
}

// Initialise variables
const CLASS_SHOW = '_rst_show';
const CLASS_HIDE = '_rst_hide';

const sidebar = document.querySelector('div.side');
const tabmenu = document.querySelector('.tabmenu');
const initialWidth = sidebar.offsetWidth;

// Activate the feature based on Reddit version
export function sidebarToggleButton(value) {
    if (redditVersion === 'old') {
        if (value) {
            if (document.getElementById('_rst_button')) return;
            console.log('RedditSidebarToggle: init');

            // Appends the toggle button as a tab
            const mainButton = document.createElement('a');
            mainButton.href = 'javascript:void(0);';
            mainButton.id = '_rst_button';
            const listItem = document.createElement('li');
            listItem.appendChild(mainButton);
            tabmenu.appendChild(listItem);
            console.log('RedditSidebarToggle: button appended');

            // Check if it is already hidden, sets initial tab state
            if (localStorage.getItem('_rst_sidebarvisibility') === 'hidden') {
                sidebar.style.display = 'none';
                setButtonToShow(mainButton);
            } else {
                setButtonToHide(mainButton);
            }

            // Tab Click event
            sidebar.style.transition = 'width 0.2s';
            mainButton.addEventListener('click', () => {
                console.log('RedditSidebarToggle: button clicked');
                if (mainButton.classList.contains(CLASS_SHOW)) show(mainButton);
                else hide(mainButton);
            });
        } else {
            localStorage.removeItem('_rst_sidebarvisibility');
            sidebar.style.removeProperty('display');
            sidebar.style.removeProperty('width');
            sidebar.style.removeProperty('transition');
            const button = document.getElementById('_rst_button');
            if (button) {
                tabmenu.removeChild(button);
            }
        }
    }
}

function hide(mainButton) {
    console.log('RedditSidebarToggle: hiding sidebar');
    localStorage.setItem('_rst_sidebarvisibility', 'hidden');
    sidebar.style.width = '0';
    setTimeout(() => {
        sidebar.style.display = 'none';
        setButtonToShow(mainButton);
    }, 200);
}

function show(mainButton) {
    console.log('RedditSidebarToggle: showing sidebar');
    localStorage.setItem('_rst_sidebarvisibility', 'visible');
    sidebar.style.display = 'block';
    setTimeout(() => {
        sidebar.style.width = initialWidth + 'px';
        setButtonToHide(mainButton);
    }, 200);
}

function setButtonToShow(mainButton) {
    mainButton.innerHTML = '<<';
    mainButton.classList.remove(CLASS_HIDE);
    mainButton.classList.add(CLASS_SHOW);
}

function setButtonToHide(mainButton) {
    mainButton.innerHTML = '>>';
    mainButton.classList.remove(CLASS_SHOW);
    mainButton.classList.add(CLASS_HIDE);
}