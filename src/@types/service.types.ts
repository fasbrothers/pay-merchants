export interface ServiceResponse {
	success: boolean;
	service: Service;
}

export interface Service {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	image_url: string;
	is_active: boolean;
	public_key: string;
	category_code: string;
	category_name: string;
	fields: Field[];
}

export interface Field {
	id: string;
	name: string;
	type: string;
	required: boolean;
	order: number;
}

export interface ResponseServices {
	count: number;
	services: Service[];
}

export interface ServiceInputValues {
	name: string;
	categoryId: number;
	isActive: boolean;
	image: any;
	deleteImage: boolean;
	deletedFields?: string[];
	fields: { name: string; type: string; id?: string }[];
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
