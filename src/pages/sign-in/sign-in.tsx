import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthResponse, InputValues } from '../../@types/auth.types';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import logo from '../../assets/logo.svg';
import { httpClient } from '../../api';
import { AuthImageTitle, SignInForm } from '../../components/auth';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/error.types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
	const dispatch = useAppDispatch();
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const { t } = useTranslation();

	const handleSubmit = async (values: InputValues) => {
		const { password, email } = values;

		const { data } = await httpClient.post<AuthResponse>('/merchant/login', {
			password,
			email,
		});

		dispatch(accessToken(data.token));
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;
			if (axiosError?.response?.data.type === 'USER_BLOCKED') {
				setTimeLeft(axiosError.response.data?.info?.timeLeft);
			}
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center md:h-screen'>
			<div className='w-11/12 xl:w-7/12 mx-auto mt-5 md:mt-0'>
				<AuthImageTitle logo={logo} title={t('auth.sign_in.title')} />
				<SignInForm mutate={mutate} isLoading={isLoading} timeLeft={timeLeft} />
				<div className='flex flex-col lg:flex-row'>
					<p className='mr-2'>{t('auth.sign_in.account_text')}</p>
					<Link
						to='/auth/register'
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						{t('auth.sign_in.account_link')}
					</Link>
				</div>
			</div>
		</div>
	);
}
