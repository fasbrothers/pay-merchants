import Cookies from 'js-cookie';

export function getFromCookie(item: string) {
	return Cookies.get(item);
}

export function removeFromCookie(item: string) {
	return Cookies.remove(item);
}

export function setToken(token: string) {
	Cookies.set('token', token, { expires: 1 / 2 });
}

export function setLanguage(title: string, value: string = 'en') {
	return Cookies.set(title, value, { expires: 365 });
}
