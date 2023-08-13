/* ===== Backup Settings ===== */

// Export backup file
export function export_backup() {
	// Get save data from sync storage
	BROWSER_API.storage.sync.get(null, function (data) {
		// Sort items alphabetically
		const keys = Object.keys(data);
		keys.sort();
		const data1 = {};
		keys.forEach((key) => {
			data1[key] = data[key];
		});

		// Create timestamp value
		var now = new Date();
		var hours24 = now.getHours();
		var minutes = now.getMinutes();
		var minutes = minutes < 10 ? '0' + minutes : minutes;
		var seconds = now.getSeconds();
		var seconds = seconds < 10 ? '0' + seconds : seconds;
		var date = now.getDate();
		var date = date < 10 ? '0' + date : date;
		var month = now.getMonth();
		var year = now.getFullYear();
		var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var timestamp = year + '_' + monthNamesShort[month] + '_' + date + '_' + hours24 + minutes + seconds;

		const data2 = {
			// Add File Name Item
			file: 'RedditEnhancer_backup',
			// Create Timestamp Item
			backup_time: timestamp,
			...data1,
		};

		// Convert to JSON string
		var json = JSON.stringify(data2, null, 4);

		// Create download file
		const anchor = document.createElement('a');
		anchor.download = 'RedditEnhancer_backup_' + timestamp + '.json';
		anchor.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
		document.body.appendChild(anchor);
		anchor.addEventListener('click', function () {
			document.body.removeChild(anchor);
		});
		anchor.click();
	});
}
