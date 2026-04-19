/**
 * ===== Centralised Mutation Observer Manager =====
 *
 * This module provides a centralised system for managing MutationObservers across
 * multiple tweaks. Instead of each tweak creating its own observer on the same
 * element (causing performance degradation), this manager ensures only one observer
 * per target element exists, dispatching mutations to all registered callbacks.
 *
 * Benefits:
 * - Reduced CPU and memory usage (fewer observers)
 * - Better performance on pages with many dynamic updates
 * - Simplified lifecycle management (automatic cleanup)
 * - Consistent debouncing across tweaks
 * - Easy to track which tweaks use which observers
 *
 * Usage Example:
 * ```javascript
 * import { registerMutationCallback, unregisterMutationCallback } from './observer_manager';
 *
 * function enableMyTweak() {
 *   const callback = (mutations) => {
 *     // Handle mutations
 *   };
 *   registerMutationCallback(document.body, callback, { childList: true, subtree: true }, 'myTweak');
 *   return callback; // Store for cleanup
 * }
 *
 * function disableMyTweak(callback) {
 *   unregisterMutationCallback(callback, document.body);
 * }
 * ```
 */

/**
 * ObserverManager - Centralised mutation observer management
 *
 * @class ObserverManager
 */
class ObserverManager {
	constructor() {
		/**
		 * Map to store observer data by target element
		 * Structure: targetElement -> { observer: MutationObserver, callbacks: Set<CallbackInfo> }
		 * @type {Map<Element, {observer: MutationObserver, callbacks: Set<Object>}>}
		 */
		this.observersByTarget = new Map();

		/**
		 * Map to track which callbacks belong to which tweak (for bulk cleanup)
		 * Structure: tweakName -> Set<{target: Element, callbackInfo: Object}>
		 * @type {Map<string, Set<Object>>}
		 */
		this.callbacksByTweak = new Map();

		// Bind the global callback method to preserve 'this' context
		this._globalCallback = this._globalCallback.bind(this);
	}

	/**
	 * Global callback that dispatches mutations to all registered callbacks for a target
	 * @param {Element} target - The observed target element
	 * @param {Array<MutationRecord>} mutations - Array of mutation records
	 * @private
	 */
	_globalCallback(target, mutations) {
		const observerData = this.observersByTarget.get(target);
		if (!observerData) return;

		// Snapshot the Set to avoid issues if a callback unregisters itself during iteration
		const callbacksSnapshot = [...observerData.callbacks];

		// Execute all registered callbacks for this target
		callbacksSnapshot.forEach((callbackInfo) => {
			try {
				if (callbackInfo.isDebounced) {
					// For debounced callbacks, call the debounced wrapper
					callbackInfo.debouncedFn(mutations, target);
				} else {
					// For regular callbacks, call directly
					callbackInfo.callback(mutations, target);
				}
			} catch (error) {
				console.error(`[RedditEnhancer] ObserverManager: Error in callback for target ${target}:`, error);
			}
		});
	}
	9;
	/**
	 * Synchronises the observer for a target with the current set of callbacks
	 * Creates observer if none exists, or restarts with merged options if callbacks changed
	 * @param {Element} target - The DOM element to observe
	 * @private
	 */
	_syncObserver(target) {
		const observerData = this.observersByTarget.get(target);
		if (!observerData) return;

		// Disconnect existing observer if any
		observerData.observer?.disconnect();

		// Create new observer with global callback
		const observer = new MutationObserver((mutations) => {
			this._globalCallback(target, mutations);
		});

		// Store the new observer
		observerData.observer = observer;

		// Merge options from all callbacks and start observing
		const options = this._mergeOptions(observerData.callbacks);
		observer.observe(target, options);

		// Collect unique tweak names for logging
		const tweakNames = [...new Set([...observerData.callbacks].map((cb) => cb.tweakName).filter((name) => name !== null))];

		const tweakLog = tweakNames.length > 0 ? ` (tweaks: ${tweakNames.join(', ')})` : '';
		console.debug(`[RedditEnhancer] ObserverManager: Synced observer for target:`, target, `with ${observerData.callbacks.size} callback(s)${tweakLog}`);
	}

	/**
	 * Merges options from all callbacks for a target
	 * @param {Set<Object>} callbacks - Set of callback info objects
	 * @returns {Object} Merged MutationObserver options
	 * @private
	 */
	_mergeOptions(callbacks) {
		const merged = {
			childList: false,
			subtree: false,
			attributes: false,
			characterData: false,
			attributeOldValue: false,
			characterDataOldValue: false,
		};

		callbacks.forEach((callbackInfo) => {
			const opts = callbackInfo.options;
			if (opts.childList) merged.childList = true;
			if (opts.subtree) merged.subtree = true;
			if (opts.attributes) merged.attributes = true;
			if (opts.characterData) merged.characterData = true;
			if (opts.attributeFilter) {
				if (!merged.attributeFilter) {
					merged.attributeFilter = [];
				}
				merged.attributeFilter.push(...opts.attributeFilter);
			}
			if (opts.attributeOldValue) merged.attributeOldValue = true;
			if (opts.characterDataOldValue) merged.characterDataOldValue = true;
		});

		// Deduplicate attributeFilter if present
		if (merged.attributeFilter) {
			merged.attributeFilter = [...new Set(merged.attributeFilter)];
		}

		// Safety fallback: if no observation options are enabled, enable childList by default
		if (!merged.childList && !merged.attributes && !merged.characterData) {
			merged.childList = true;
		}

		// Remove attributeFilter if it's null or empty (MutationObserver expects array or undefined)
		if (merged.attributeFilter && merged.attributeFilter.length === 0) {
			delete merged.attributeFilter;
		}

		return merged;
	}

	/**
	 * Stops and removes observer for a target if no callbacks remain
	 * @param {Element} target - The target element
	 * @private
	 */
	_cleanupObserverIfEmpty(target) {
		const observerData = this.observersByTarget.get(target);
		if (observerData && observerData.callbacks.size === 0) {
			// Disconnect the observer
			observerData.observer.disconnect();
			// Remove from map
			this.observersByTarget.delete(target);
			console.debug(`[RedditEnhancer] ObserverManager: Disconnected observer for target:`, target);
		}
	}

	/**
	 * Creates a debounced version of a callback
	 * @param {Function} callback - The original callback function
	 * @param {number} wait - Debounce wait time in milliseconds
	 * @returns {Function} Debounced function
	 * @private
	 */
	_createDebounced(callback, wait) {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				callback(...args);
			}, wait);
		};
	}

	/**
	 * Registers a mutation callback for a specific target element
	 *
	 * @param {Element} target - The DOM element to observe (must be an Element, not string)
	 * @param {Function} callback - Function to call when mutations occur. Receives (mutations, target)
	 * @param {Object} [options] - MutationObserver options (childList, subtree, attributes, etc.)
	 * @param {boolean} [options.childList=true] - Watch for added/removed children
	 * @param {boolean} [options.subtree=true] - Watch entire subtree
	 * @param {boolean} [options.attributes=false] - Watch attribute changes
	 * @param {boolean} [options.characterData=false] - Watch character data changes
	 * @param {boolean|string[]} [options.attributeFilter] - Filter specific attributes
	 * @param {string} [tweakName] - Name/identifier of the tweak (for tracking and cleanup)
	 * @param {number} [debounce] - Debounce time in ms (0 = no debounce)
	 * @returns {Function} Cleanup function to unregister this callback
	 *
	 * @example
	 * const cleanup = registerMutationCallback(
	 *   document.body,
	 *   (mutations) => { /* handle mutations *\/ },
	 *   { childList: true, subtree: true },
	 *   'myTweak',
	 *   100 // debounce
	 * );
	 *
	 * // Later, to cleanup:
	 * cleanup();
	 */
	registerMutationCallback(target, callback, options = {}, tweakName = null, debounce = 0) {
		if (!target || !(target instanceof Element)) {
			throw new Error('[ObserverManager] Target must be a valid DOM Element');
		}

		if (typeof callback !== 'function') {
			throw new Error('[ObserverManager] Callback must be a function');
		}

		// Normalise options with defaults
		const normalisedOptions = {
			childList: true,
			subtree: true,
			...options,
		};

		// Create debounced wrapper if needed
		let debouncedFn = null;
		const isDebounced = debounce > 0;
		if (isDebounced) {
			debouncedFn = this._createDebounced(callback, debounce);
		}

		// Create callback info object
		const callbackInfo = {
			callback,
			debouncedFn,
			isDebounced,
			options: normalisedOptions,
			tweakName,
			registeredAt: Date.now(),
		};

		// Get or create callback set for this target
		let observerData = this.observersByTarget.get(target);
		if (!observerData) {
			observerData = { callbacks: new Set() };
			this.observersByTarget.set(target, observerData);
		}

		// Add callback to set
		observerData.callbacks.add(callbackInfo);

		// Track by tweak name if provided
		if (tweakName) {
			let tweakCallbacks = this.callbacksByTweak.get(tweakName);
			if (!tweakCallbacks) {
				tweakCallbacks = new Set();
				this.callbacksByTweak.set(tweakName, tweakCallbacks);
			}
			tweakCallbacks.add({ target, callbackInfo });
		}

		// Sync the observer (create if new, or restart with merged options if existing)
		this._syncObserver(target);

		// Return cleanup function
		return () => {
			this.unregisterMutationCallback(callback, target);
		};
	}

	/**
	 * Unregisters a specific callback for a target
	 *
	 * @param {Function} callback - The callback function to unregister
	 * @param {Element} [target] - Optional target element. If not provided, unregisters from all targets
	 */
	unregisterMutationCallback(callback, target = null) {
		// If target is specified, unregister from that target only
		if (target) {
			const observerData = this.observersByTarget.get(target);
			if (observerData) {
				// Find and remove callback(s) matching this function
				let removedCallbackInfos = [];

				observerData.callbacks.forEach((callbackInfo) => {
					if (callbackInfo.callback === callback) {
						removedCallbackInfos.push(callbackInfo);
						observerData.callbacks.delete(callbackInfo);
					}
				});

				// Remove from tweak tracking - delete by reference
				removedCallbackInfos.forEach((callbackInfo) => {
					const tweakName = callbackInfo.tweakName;
					if (tweakName) {
						const tweakCallbacks = this.callbacksByTweak.get(tweakName);
						if (tweakCallbacks) {
							// Find and delete the exact stored reference
							for (const entry of tweakCallbacks) {
								if (entry.target === target && entry.callbackInfo === callbackInfo) {
									tweakCallbacks.delete(entry);
									break;
								}
							}
							if (tweakCallbacks.size === 0) {
								this.callbacksByTweak.delete(tweakName);
							}
						}
					}
				});

				// Cleanup observer if no callbacks remain
				this._cleanupObserverIfEmpty(target);
			}
		} else {
			// If no target specified, find and unregister from all targets
			// Snapshot the Map entries to avoid mutation during iteration
			const targetsSnapshot = [...this.observersByTarget.entries()];
			for (const [currentTarget, observerData] of targetsSnapshot) {
				// Snapshot the callbacks Set to avoid mutation during iteration
				const callbacksSnapshot = [...observerData.callbacks];
				callbacksSnapshot.forEach((callbackInfo) => {
					if (callbackInfo.callback === callback) {
						observerData.callbacks.delete(callbackInfo);
						if (callbackInfo.tweakName) {
							const tweakCallbacks = this.callbacksByTweak.get(callbackInfo.tweakName);
							if (tweakCallbacks) {
								// Find and delete the exact stored reference
								for (const entry of tweakCallbacks) {
									if (entry.target === currentTarget && entry.callbackInfo === callbackInfo) {
										tweakCallbacks.delete(entry);
										break;
									}
								}
								if (tweakCallbacks.size === 0) {
									this.callbacksByTweak.delete(callbackInfo.tweakName);
								}
							}
						}
					}
				});
				this._cleanupObserverIfEmpty(currentTarget);
			}
		}
	}

	/**
	 * Unregisters all callbacks for a specific tweak
	 * Useful when a tweak is disabled
	 *
	 * @param {string} tweakName - The name/identifier of the tweak to cleanup
	 */
	unregisterAllForTweak(tweakName) {
		const tweakCallbacks = this.callbacksByTweak.get(tweakName);
		if (!tweakCallbacks) return;

		// Collect all entries to process
		const entries = [...tweakCallbacks];

		entries.forEach(({ target, callbackInfo }) => {
			const observerData = this.observersByTarget.get(target);
			if (observerData) {
				// Remove this specific callbackInfo from the target's callbacks
				observerData.callbacks.delete(callbackInfo);
				this._cleanupObserverIfEmpty(target);
			}
		});

		// Remove tweak from tracking
		this.callbacksByTweak.delete(tweakName);
		console.debug(`[RedditEnhancer] ObserverManager: Cleaned up all callbacks for tweak:`, tweakName);
	}

	/**
	 * Disconnects all observers and clears all registrations
	 * Use with caution - this will stop all observation globally
	 */
	disconnectAll() {
		// Disconnect all observers
		this.observersByTarget.forEach((observerData) => {
			observerData.observer.disconnect();
		});
		this.observersByTarget.clear();
		this.callbacksByTweak.clear();
		console.debug('[RedditEnhancer] ObserverManager: All observers disconnected and registrations cleared');
	}

	/**
	 * Gets statistics about current observer usage (for debugging)
	 * @returns {Object} Statistics object
	 */
	getStats() {
		return {
			totalTargets: this.observersByTarget.size,
			totalCallbacks: Array.from(this.observersByTarget.values()).reduce((sum, data) => sum + data.callbacks.size, 0),
			tweaks: Array.from(this.callbacksByTweak.entries()).map(([name, callbacks]) => ({
				name,
				callbackCount: callbacks.size,
			})),
			targets: Array.from(this.observersByTarget.keys()).map((target) => ({
				element: target.tagName,
				id: target.id,
				class: target.className,
				callbackCount: this.observersByTarget.get(target).callbacks.size,
			})),
		};
	}
}

// ===== Singleton Instance =====
// Export a singleton instance for global use
const observerManager = new ObserverManager();

// ===== Public API =====
export const registerMutationCallback = observerManager.registerMutationCallback.bind(observerManager);
export const unregisterMutationCallback = observerManager.unregisterMutationCallback.bind(observerManager);
export const unregisterAllForTweak = observerManager.unregisterAllForTweak.bind(observerManager);
export const disconnectAllObservers = observerManager.disconnectAll.bind(observerManager);
export const getObserverStats = observerManager.getStats.bind(observerManager);

// Export the class for advanced usage
export { ObserverManager };

// Default export for convenience
export default observerManager;
