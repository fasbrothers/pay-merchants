import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './sign-up.scss';
import { AuthImageTitle } from '../../components/auth-image-title';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import SignUpForm from './components/sign-up-form';
import { IResponse, InputValues } from '../../@types/inputs-type';
import { httpClient } from '../../api';

export default function SignUp() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = async (values: InputValues) => {
		const { name, email, password } = values;
		const { data } = await httpClient.post<IResponse>('/merchant/register', {
			name,
			email,
			password,
		});

		navigate('/cabinet');
		dispatch(accessToken(data.token));
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
