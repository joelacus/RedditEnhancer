// Inputs - Account Switcher

/*import Sortable from 'sortablejs';

// Init Sortablejs
const accounts = document.querySelector('#accounts-container');
new Sortable(accounts, {
	handle: '.account-handle',
	animation: 150,
	onEnd: function (evt) {
		saveAccountsList();
	},
});

// Button - Add New Account
document.querySelector('#btn-add-account').addEventListener('click', function (e) {
	const username = document.querySelector('#input-add-account-username');
	const password = document.querySelector('#input-add-account-password');

	console.log(username.value, password.value);
	addNewAccountItem(username.value, password.value);

	username.value = '';
	password.value = '';
});

// Function - Append New Account To List
function addNewAccountItem(username, password) {
	const item = document.createElement('div');
	item.classList.add('list-group-item');

	const span = document.createElement('span');
	span.setAttribute('data-username', username);
	span.setAttribute('data-password', password);
	span.textContent = username;
	item.append(span);

	const handle = document.createElement('div');
	handle.classList.add('account-handle');
	const handle_icon = document.createElement('span');
	handle_icon.classList.add('icon', 'btn-icon', 'icon-handle');
	handle.append(handle_icon);
	item.append(handle);

	const btn_delete = document.createElement('div');
	btn_delete.classList.add('account-delete');
	btn_delete.addEventListener('click', function (e) {
		e.target.closest('.list-group-item').remove();
		// delete this username and password from save
	});
	const btn_delete_icon = document.createElement('span');
	btn_delete_icon.classList.add('icon', 'btn-icon', 'icon-delete');
	btn_delete.append(btn_delete_icon);
	item.append(btn_delete);

	document.querySelector('#accounts-container').appendChild(item);

	saveAccountsList();
}

// Function - Save Accounts List
function saveAccountsList() {
	let accounts = [];
	const items = document.querySelectorAll('#accounts-container > div');
	for (let i = 0; i < items.length; i++) {
		const username = items[i].querySelector('span').getAttribute('data-username');
		const password = items[i].querySelector('span').getAttribute('data-password');
		var account = {
			user: username,
			pass: password,
		};
		console.log(account);
		accounts.push(account);
	}
	console.log(accounts);
	const accounts_str = JSON.stringify(accounts); //.replace(/"/g, "'");
	console.log(accounts_str);
	BROWSER_API.storage.local.set({ accounts: accounts_str });
}

// Button - Delete All
document.querySelector('#btn-delete-all-saved-accounts').addEventListener('click', function () {
	document.querySelectorAll('#accounts-container > div').forEach((el) => {
		el.remove();
	});
	BROWSER_API.storage.local.set({ accounts: '' });
});
*/
