// ────────────────────────────────────────────────────────────────────────────
// Utility / Storage Usage
// ────────────────────────────────────────────────────────────────────────────

export async function getStorageUsage(type) {
	const storageApi = type === 'local' ? BROWSER_API.storage.local : BROWSER_API.storage.sync;
	const total = type === 'local' ? 10 * 1024 * 1024 : 102400;
	const unit = type === 'local' ? 'MiB' : 'KiB';
	const divisor = type === 'local' ? 1048576 : 1024;

	try {
		const usage = await storageApi.getBytesInUse(null);
		const usedValue = (usage / divisor).toFixed(2);
		const totalValue = (total / divisor).toFixed(2);
		const pct = total > 0 ? Math.min((usage / total) * 100, 100) : 0;

		return {
			used: usage,
			total: total,
			usedValue: usedValue,
			totalValue: totalValue,
			unit: unit,
			pct: pct,
		};
	} catch (e) {
		return {
			used: 0,
			total: total,
			usedValue: '0.00',
			totalValue: (total / divisor).toFixed(2),
			unit: unit,
			pct: 0,
		};
	}
}
