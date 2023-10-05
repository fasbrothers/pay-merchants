import Cookies from 'js-cookie';

export function getFromCookie(item: string) {
	return Cookies.get(item);
}

export function removeFromCookie(item: string) {
	return Cookies.remove(item);
}

export function setToken(token: string) {
	Cookies.set('token', token, { expires: 1 / 24 });
}
