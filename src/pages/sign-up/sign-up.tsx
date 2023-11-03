import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import {
	AuthResponse,
	InputValues,
	SendCodeResponse,
} from '../../@types/auth.types';
import { httpClient } from '../../api';
import { AuthImageTitle, SignUpForm } from '../../components/auth';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/error.types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [showOTP, setShowOTP] = useState(false);
	const [timeLeft, setTimeLeft] = useState<number>(0);

	const handleSubmit = async (values: InputValues) => {
		if (values.otp === undefined) {
			const { data } = await httpClient.post<SendCodeResponse>(
				'/merchant/sendcode',
				{
					email: values.email,
					resend: values.resend ? true : undefined,
				}
			);
			setTimeLeft(data.timeLeft);
		} else {
			const { name, email, password, otp } = values;
			const { data } = await httpClient.post<AuthResponse>(
				'/merchant/register',
				{
					name,
					email,
					password,
					otp,
				}
			);

			dispatch(accessToken(data.token));
		}
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onSuccess: () => {
			setShowOTP(true);
		},
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.data.type === 'EMAIL_TAKEN') {
				navigate('/auth/login');
			}
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center'>
			<div className='w-11/12 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title='Sign Up' />
				<SignUpForm
					mutate={mutate}
					isLoading={isLoading}
					showOTP={showOTP}
					timeLeft={timeLeft}
				/>
				<div className='flex'>
					<p className='mr-2'>Already registered?</p>
					<Link
						to='/auth/login'
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}
