import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthResponse, InputValues } from '../../@types/auth.types';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import logo from '../../assets/logo.svg';
import { httpClient } from '../../api';
import { AuthImageTitle, SignInForm } from '../../components/auth';

export default function SignIn() {
	const dispatch = useAppDispatch();

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
