export interface ErrorResponse {
	message: string;
	status: number;
	types: string;
}

export interface IResponse {
	token: string;
	merchant: {
		id: string;
		name: string;
		email: string;
		reg_date: string;
	};
}

export interface InputValues {
	phone?: string;
	password?: string;
	trust?: boolean;
	name?: string;
	image_url?: string;
	email?: string;
	deletePhoto?: boolean;
}

export interface AuthProps {
	mutate: (values: InputValues) => void;
	isLoading: boolean;
}

export interface Categories {
	count: number;
	categories: Category[];
}

export interface Category {
	id: number;
	code: string;
	name: string;
}

export interface ServiceResponse {
	success: boolean;
	service: Service;
}

export interface Service {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	price: number;
	image_url: string;
	is_active: boolean;
	category_code: string;
	category_name: string;
}

export interface ResponseServices {
	count: number;
	services: ResponseService[];
}

export interface ResponseService {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	price: number;
	image_url?: string;
	is_active: boolean;
	category_code: string;
	category_name: string;
}

export interface ServiceInputValues {
	name: string;
	price: string;
	categoryId: number;
	isActive: boolean;
	image: any;
}

export interface IProfileResponse {
	id: string;
	name: string;
	email: string;
	reg_date: string;
	lang: string;
}