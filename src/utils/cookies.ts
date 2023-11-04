import Cookies from 'js-cookie';

export function getFromCookie(item: string) {
	return Cookies.get(item);
}

export function removeFromCookie(item: string) {
	return Cookies.remove(item);
}

export function setToken(token: string) {
	Cookies.set('token', token);
}
export function setUID(value: string) {
	return Cookies.set('uid', value);
}

export function setLanguage(
	title: string,
	value: string = navigator.language || 'en'
) {
	return Cookies.set(title, value);
}
