import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import { AuthResponse, InputValues } from '../../@types/auth.types';
import { httpClient } from '../../api';
import { AuthImageTitle, SignUpForm } from '../../components/auth';

export default function SignUp() {
	const dispatch = useAppDispatch();

	const handleSubmit = async (values: InputValues) => {
		if (values.otp === undefined) {
			await httpClient.post('/merchant/sendcode', {
				email: values.email,
				resend: values.resend ? true : undefined,
			});
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
	});

	return (
		<div className='w-full md:w-1/2 flex items-center'>
			<div className='w-11/12 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title='Sign Up' />
				<SignUpForm mutate={mutate} isLoading={isLoading} />
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
