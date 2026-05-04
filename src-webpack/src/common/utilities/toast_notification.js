/**
 * Toast Notification System
 *
 * Common function for showing toast notifications across all tweaks.
 *
 * @param {string} type - 'success', 'error', 'warn', or 'info'
 * @param {string} message - The notification text to display
 */

const TYPE_COLORS = {
	success: '#2ecc71',
	error: '#e74c3c',
	warn: '#f39c12',
	info: '#0079d3',
};

export function showToast(type, message) {
	const color = TYPE_COLORS[type] || TYPE_COLORS.info;

	// Create toast container on first use
	let container = document.getElementById('re-toast-container');
	if (!container) {
		container = document.createElement('div');
		container.id = 're-toast-container';
		container.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;
			z-index: 999999;
			pointer-events: none;
		`;
		document.body.appendChild(container);

		// Add animation keyframes
		const style = document.createElement('style');
		style.id = 're-toast-animations';
		style.textContent = `
			@keyframes re-toast-slide-in {
				from { opacity: 0; transform: translateX(100%); }
				to { opacity: 1; transform: translateX(0); }
			}
			@keyframes re-toast-fade-out {
				from { opacity: 1; transform: translateX(0); }
				to { opacity: 0; transform: translateX(100%); }
			}
		`;
		document.head.appendChild(style);
	}

	// Create toast element
	const toast = document.createElement('div');
	toast.textContent = message;
	toast.style.cssText = `
		background: ${color};
		color: white;
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 600;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		animation: re-toast-slide-in 0.3s ease-out;
		opacity: 1;
        min-width: 150px;
	`;

	container.appendChild(toast);

	// Remove after delay
	setTimeout(() => {
		// Get all toasts that come after this one
		const toasts = Array.from(container.children);
		const toastIndex = toasts.indexOf(toast);
		const subsequentToasts = toasts.slice(toastIndex + 1);

		// Animate subsequent toasts upward to fill the gap
		subsequentToasts.forEach((t) => {
			t.style.transition = 'transform 0.3s ease-out';
			const currentTransform = t.style.transform || '';
			const exitingHeight = toast.offsetHeight + 10; // toast height + gap
			const currentYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
			const currentY = currentYMatch ? parseFloat(currentYMatch[1]) : 0;
			t.style.transform = `translateY(${currentY - exitingHeight}px)`;
		});

		// Fade out the exiting toast
		toast.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
		toast.style.opacity = '0';
		toast.style.transform = 'translateX(100%)';

		setTimeout(() => {
			if (toast.parentNode) {
				toast.parentNode.removeChild(toast);
			}
			// Reset transforms of remaining toasts to natural positions
			const remainingToasts = Array.from(container.children);
			remainingToasts.forEach((t) => {
				t.style.transition = 'transform 0.3s ease-out';
				t.style.transform = '';
			});
		}, 300);
	}, 4000);
}
