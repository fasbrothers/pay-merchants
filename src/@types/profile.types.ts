export interface ProfileResponse {
	id: string;
	name: string;
	email: string;
	reg_date: string;
	lang: string;
	balance: string;
}

export interface ModelFormProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	profile: ProfileResponse | undefined;
}

export interface HeaderProps {
	setShowNavbar: (showNavbar: boolean) => void;
	showNavbar: boolean;
	title?: string;
}