/* = Logging = */

/* 
   Send log messages to "Inspect - Developer Tools" console instead of web page console for content scripts.
   Types: log, warn, error
*/

export function logToDevConsole(type, message) {
	BROWSER_API.runtime.sendMessage({ log: type, message: message });
}
