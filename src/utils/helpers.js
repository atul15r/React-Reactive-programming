export const unwrapAPIError = error => {
	let errorValue = JSON.parse(error?.response)?.error?.message;
	return typeof errorValue === 'string' ? errorValue : 'An error occurred.';
};

export const isMobile = (() => {
	if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
		return false;
	}
	return /Mobile/.test(navigator.userAgent);
})();
