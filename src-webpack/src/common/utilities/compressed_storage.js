// ────────────────────────────────────────────────────────────────────────────
// Utility / Compressed Storage
// ────────────────────────────────────────────────────────────────────────────
// Shared pako (deflate) + base64 codec for large storage.local objects
// (user tags, block lists). Payloads are JSON -> deflate -> base64 text, so
// they stay JSON-serialisable for the storage API. Write helpers never throw:
// they return { ok } and leave existing data untouched on failure, letting
// callers show UI feedback (this module has no DOM access).
// ────────────────────────────────────────────────────────────────────────────

import { deflate, inflate } from 'pako';

// Refuse to write payloads larger than this (characters of base64 text).
export const MAX_COMPRESSED_CHARS = 8000000;

function bytesToBase64(bytes) {
	let binary = '';
	const chunk = 8192;
	for (let i = 0; i < bytes.length; i += chunk) {
		binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
	}
	return btoa(binary);
}

function base64ToBytes(base64) {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

export function encodeObject(obj) {
	try {
		return bytesToBase64(deflate(JSON.stringify(obj)));
	} catch (e) {
		console.error('[RedditEnhancer] compressed storage: encode failed', e);
		return null;
	}
}

export function decodeObject(payload, validate) {
	if (typeof payload !== 'string' || payload === '') return null;
	try {
		const obj = JSON.parse(new TextDecoder().decode(inflate(base64ToBytes(payload))));
		if (!validate(obj)) {
			lastReadFailed = true;
			console.error('[RedditEnhancer] compressed storage: stored data failed validation, refusing to overwrite it until it is read successfully or cleared');
			return null;
		}
		return obj;
	} catch (e) {
		lastReadFailed = true;
		console.error('[RedditEnhancer] compressed storage: decode failed', e);
		return null;
	}
}

// Set when a storage read fails or the stored data is unreadable, and left
// set until the next clean read. Writers refuse to overwrite data they could
// not see: a failed/corrupt read must never be treated as "the user has no
// data", because the next write would then wipe the real data.
let lastReadFailed = false;

function readRaw(key) {
	return new Promise((resolve) => {
		BROWSER_API.storage.local.get([key], (result) => {
			if (BROWSER_API.runtime.lastError) {
				lastReadFailed = true;
				console.error(`[RedditEnhancer] compressed storage: read failed for "${key}"`, BROWSER_API.runtime.lastError.message);
				resolve(null);
				return;
			}
			lastReadFailed = false;
			resolve(result ? result[key] : null);
		});
	});
}

// Reads a compressed object. Transparently handles values saved in the old
// raw-object format by returning them as-is (callers rewrite compressed on
// the next write). Returns null when nothing usable is stored.
export async function readCompressedObject(key, validate) {
	const value = await readRaw(key);
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		if (validate(value)) return value;
		lastReadFailed = true;
		console.error(`[RedditEnhancer] compressed storage: stored data for "${key}" failed validation, refusing to overwrite it until it is read successfully or cleared`);
		return null;
	}
	if (typeof value === 'string') return decodeObject(value, validate);
	if (value !== null && value !== undefined) {
		lastReadFailed = true;
		console.error(`[RedditEnhancer] compressed storage: stored data for "${key}" is corrupt, using empty store (existing data is left untouched)`);
	}
	return null;
}

export async function writeCompressedObject(key, obj, maxChars = MAX_COMPRESSED_CHARS) {
	if (lastReadFailed) {
		console.error(`[RedditEnhancer] compressed storage: refusing to write "${key}" because the last read failed or the stored data is unreadable (avoiding data loss)`);
		return { ok: false, reason: 'read' };
	}
	const payload = encodeObject(obj);
	if (payload === null) {
		return { ok: false, reason: 'encode' };
	}
	if (payload.length > maxChars) {
		console.error(`[RedditEnhancer] compressed storage: payload for "${key}" too large (' + payload.length + ' chars), write refused`);
		return { ok: false, reason: 'quota' };
	}
	try {
		await new Promise((resolve, reject) => {
			BROWSER_API.storage.local.set({ [key]: payload }, () => {
				if (BROWSER_API.runtime.lastError) reject(new Error(BROWSER_API.runtime.lastError.message));
				else resolve();
			});
		});
	} catch (e) {
		console.error(`[RedditEnhancer] compressed storage: write failed for "${key}"`, e);
		return { ok: false, reason: 'quota' };
	}
	return { ok: true };
}
