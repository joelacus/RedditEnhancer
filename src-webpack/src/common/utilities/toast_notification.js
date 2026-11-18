/**
 * Toast Notification System
 *
 * Common function for showing toast notifications across all tweaks.
 *
 * @param {string} type - 'success', 'error', 'warn', or 'info'
 * @param {string} message - The notification text to display
 * @param {{ buttonText?: string, onButtonClick?: () => void, noTimeout?: boolean, spinner?: boolean }} [options] - Optional toast configuration
 */

const TYPE_COLOURS = {
	success: '#2ecc71',
	error: '#e74c3c',
	warn: '#de780d',
	info: '#0079d3',
};

export function showToast(type, message, options) {
	const colour = TYPE_COLOURS[type] || TYPE_COLOURS.info;

	let container = document.getElementById('re-toast-container');

	if (container) {
		const existing = Array.from(container.children).find((toast) => toast.textContent.trim() === message || toast.dataset.toastType === type);
		if (existing) return existing;
	}

	if (!container) {
		container = document.createElement('div');
		container.id = 're-toast-container';
		container.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			display: flex;
			flex-direction: column;
			width: 500px;
			gap: 10px;
			z-index: 999999;
			pointer-events: none;
		`;
		document.body.appendChild(container);

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

		const spinnerStyle = document.createElement('style');
		spinnerStyle.id = 're-toast-spinner-style';
		spinnerStyle.textContent = `
			.re-toast-spinner {
				width: 16px;
				height: 16px;
				border: 2px solid rgba(255,255,255,0.3);
				border-top-color: white;
				border-radius: 50%;
				animation: re-toast-spin 0.8s linear infinite;
			}
			@keyframes re-toast-spin {
				to { transform: rotate(360deg); }
			}
		`;
		document.head.appendChild(spinnerStyle);
	}

	const toast = document.createElement('div');
	toast.textContent = message;
	toast.dataset.toastType = type;
	toast.style.cssText = `
		background: ${colour};
		color: white;
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 600;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		animation: re-toast-slide-in 0.3s ease-out;
		opacity: 1;
		min-width: 150px;
		display: flex;
		align-items: center;
		gap: 12px;
	`;

	if (options?.buttonText && typeof options?.onButtonClick === 'function') {
		const button = document.createElement('button');
		button.textContent = options.buttonText;
		button.style.cssText = `
			display: flex;
			align-items: center;
			min-width: fit-content;
			background: white;
			color: ${colour};
			font-size: 16px;
			border: none;
			padding: 4px 12px;
			border-radius: 4px;
			cursor: pointer;
			pointer-events: auto;
		`;
		button.addEventListener('click', options.onButtonClick);
		toast.appendChild(button);
	}

	if (options?.spinner) {
		const spinner = document.createElement('span');
		spinner.className = 're-toast-spinner';
		toast.insertBefore(spinner, toast.firstChild);
	}

	container.appendChild(toast);

	if (options?.buttonText && typeof options?.onButtonClick === 'function') {
		return toast;
	}

	if (options?.noTimeout) {
		return toast;
	}

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

	return toast;
}

export function removeToast(toast) {
	if (!toast || !toast.parentNode) return;
	toast.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
	toast.style.opacity = '0';
	toast.style.transform = 'translateX(100%)';

	setTimeout(() => {
		if (toast.parentNode) {
			toast.parentNode.removeChild(toast);
		}
		const container = document.getElementById('re-toast-container');
		if (!container) return;
		const remainingToasts = Array.from(container.children);
		const toastIndex = remainingToasts.indexOf(toast);
		const subsequentToasts = remainingToasts.slice(toastIndex + 1);
		subsequentToasts.forEach((t) => {
			t.style.transition = 'transform 0.3s ease-out';
			const currentTransform = t.style.transform || '';
			const exitingHeight = toast.offsetHeight + 10;
			const currentYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
			const currentY = currentYMatch ? parseFloat(currentYMatch[1]) : 0;
			t.style.transform = `translateY(${currentY - exitingHeight}px)`;
		});
	}, 300);
}

// Full-screen loading overlay with a spinner and message, for operations that
// would otherwise leave the page looking frozen (e.g. importing large backups).
export function showLoadingOverlay(message) {
	let overlay = document.getElementById('re-loading-overlay');
	if (!overlay) {
		const style = document.createElement('style');
		style.id = 're-loading-overlay-style';
		style.textContent = `
			#re-loading-overlay {
				position: fixed;
				inset: 0;
				background: rgba(0, 0, 0, 0.6);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 16px;
				z-index: 999997;
			}
			#re-loading-overlay .re-loading-spinner {
				width: 48px;
				height: 48px;
				border: 5px solid rgba(255, 255, 255, 0.3);
				border-top-color: white;
				border-radius: 50%;
				animation: re-loading-spin 0.8s linear infinite;
			}
			@keyframes re-loading-spin {
				to { transform: rotate(360deg); }
			}
			#re-loading-overlay .re-loading-text {
				color: white;
				font-size: 16px;
				font-weight: 600;
				font-family: Verdana, sans-serif;
			}
		`;
		document.head.appendChild(style);

		overlay = document.createElement('div');
		overlay.id = 're-loading-overlay';
		overlay.style.display = 'none';
		const spinner = document.createElement('div');
		spinner.className = 're-loading-spinner';
		const text = document.createElement('div');
		text.className = 're-loading-text';
		overlay.appendChild(spinner);
		overlay.appendChild(text);
		document.body.appendChild(overlay);
	}
	overlay.querySelector('.re-loading-text').textContent = message || '';
	overlay.style.display = 'flex';
	return overlay;
}

export function hideLoadingOverlay() {
	document.getElementById('re-loading-overlay')?.style.setProperty('display', 'none');
}
