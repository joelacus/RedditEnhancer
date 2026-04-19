// ────────────────────────────────────────────────────────────────────────────
// Validation utilities for popup restore functions
// Ensures storage data is safe and within expected ranges before use
// ────────────────────────────────────────────────────────────────────────────

/**
 * Validates that a value is an integer within the specified range.
 * @param {*} value - The value to validate
 * @param {number} min - Minimum acceptable value (inclusive)
 * @param {number} max - Maximum acceptable value (inclusive)
 * @param {number} defaultValue - Value to return if validation fails
 * @returns {number} Validated integer or defaultValue
 */
export function validateInt(value, min, max, defaultValue) {
	const isValid = Number.isInteger(parseInt(value)) && value >= min && value <= max;
	return isValid ? value : defaultValue;
}

/**
 * Validates that a value is a safe colour string for use with color pickers.
 * Accepts any CSS colour format (hex, named colours, rgb(), rgba(), hsl(), etc.)
 * but rejects obviously malicious or corrupted values.
 * @param {*} value - The value to validate
 * @param {string} defaultValue - Value to return if validation fails
 * @returns {string} Validated colour string or defaultValue
 */
export function validateColour(value, defaultValue = '') {
	if (typeof value !== 'string') return defaultValue;
	if (value.length > 100) return defaultValue; // Prevent excessively long strings
	if (/[<>]/.test(value)) return defaultValue; // Basic XSS protection - reject HTML tags
	// Empty string is acceptable (means no colour set)
	return value;
}

/**
 * Validates that a value is one of the allowed enum values.
 * @param {*} value - The value to validate
 * @param {Array} allowedValues - Array of acceptable values
 * @param {*} defaultValue - Value to return if validation fails
 * @returns {*} Validated enum value or defaultValue
 */
export function validateEnum(value, allowedValues, defaultValue) {
	return Array.isArray(allowedValues) && allowedValues.includes(value) ? value : defaultValue;
}

/**
 * Validates that a value is an array.
 * @param {*} value - The value to validate
 * @param {Array} defaultValue - Value to return if validation fails
 * @returns {Array} Validated array or defaultValue
 */
export function validateArray(value, defaultValue = []) {
	return Array.isArray(value) ? value : defaultValue;
}

/**
 * Validates that a value is a percentage integer (0-100).
 * @param {*} value - The value to validate
 * @param {number} defaultValue - Value to return if validation fails
 * @returns {number} Validated percentage or defaultValue
 */
export function validatePercentage(value, defaultValue = 0) {
	return validateInt(value, 0, 100, defaultValue);
}

/**
 * Validates that a value is one of the allowed strings.
 * @param {*} value - The value to validate
 * @param {Array} allowedStrings - Array of acceptable strings
 * @param {string} defaultValue - Value to return if validation fails
 * @returns {string} Validated string or defaultValue
 */
export function validateString(value, allowedStrings, defaultValue) {
	return typeof value === 'string' && Array.isArray(allowedStrings) && allowedStrings.includes(value) ? value : defaultValue;
}
