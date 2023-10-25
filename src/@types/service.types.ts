export interface ServiceResponse {
	success: boolean;
	service: Service;
}

export interface Service {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	price: string;
	image_url?: string;
	is_active: boolean;
	category_code: string;
	category_name: string;
	public_key: string;
}
export interface ResponseServices {
	count: number;
	services: Service[];
}

export interface ServiceInputValues {
	name: string;
	price: string;
	categoryId: number;
	isActive: boolean;
	image: any;
	deleteImage: boolean;
}

export interface ServiceFormProps {
	loading: boolean;
	mutate: (values: ServiceInputValues) => void;
	title: string;
	buttonText: string;
	service?: Service;
	loadService?: boolean;
	deleteImage?: boolean;
}

export interface DeleteServiceProps {
	id: string;
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	handleCancel: () => void;
	url: string;
	navigateUrl: string;
	modalTitle: string;
	modalMessage: string;
}

export interface Status {
	id: number;
	title: string;
	code: string;
}
