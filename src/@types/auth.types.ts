export interface InputValues {
	password: string;
	name?: string;
	image_url?: string;
	email: string;
	deletePhoto?: boolean;
	otp: string | undefined;
	resend: boolean;
}

export interface AuthProps {
	mutate: (values: InputValues) => void;
	// mutateResend: (values: InputValues) => void;
	isLoading: boolean;
}

export interface AuthResponse {
	token: string;
	merchant: {
		id: string;
		name: string;
		email: string;
		reg_date: string;
	};
}

export interface AuthState {
	token: string | undefined;
}
