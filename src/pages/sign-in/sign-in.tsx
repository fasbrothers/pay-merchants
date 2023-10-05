import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
	ErrorResponse,
	IResponse,
	InputValues,
} from '../../@types/inputs-type';
import logo from '../../assets/logo.svg';
import { AuthImageTitle } from '../../components/auth-image-title';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import '../sign-up/sign-up.scss';
import SignInForm from './components/sign-in-form';
import { AxiosError } from 'axios';
import toastMessage from '../../utils/toast-message';
import { httpClient } from '../../api';

export default function SignIn() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (values: InputValues) => {
		const { password, otp, phone, trust } = values;

		const { data } = await httpClient.post<IResponse>('/customer/login', {
			phone: '998' + phone,
			password,
			otp,
			trust,
		});

		navigate('/cabinet');
		dispatch(accessToken(data.token));
		return data;
	};

	const { mutate, isLoading } = useMutation<
		any,
		AxiosError<ErrorResponse>,
		any
	>({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center md:h-screen'>
			<div className='w-11/12 xl:w-7/12 mx-auto mt-5 md:mt-0'>
				<AuthImageTitle logo={logo} title='Sign In' />
				<SignInForm mutate={mutate} isLoading={isLoading} />
				<div className='flex flex-col lg:flex-row'>
					<p className='mr-2'>You don't have an account?</p>
					<Link
						to='/auth/register'
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
}
