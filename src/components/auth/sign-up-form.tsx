import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Form, Input } from 'antd';
import { AuthProps, InputValues } from '../../@types/auth.types';
import { ButtonPrimary } from '../shared/button';
import { MouseEvent } from 'react';
import { useState } from 'react';
import { httpClient } from '../../api';
import { useMutation } from '@tanstack/react-query';

export const SignUpForm = ({ mutate, isLoading }: AuthProps) => {
	const [form] = Form.useForm();
	const [showOTP, setShowOTP] = useState(false);
	const showingOtp = showOTP ? 'hidden' : 'block';

	const handleSubmit = (values: InputValues) => {
		setShowOTP(true);
		mutate(values);
	};

	const { mutate: resendOTP } = useMutation({
		mutationFn: (email: string) => {
			return httpClient.post('/merchant/sendcode', {
				email,
				resend: true,
			});
		},
	});

	const handleResend = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowOTP(true);
		
		const { email } = form.getFieldsValue(['email']);
		resendOTP(email);
	};

	return (
		<Form
			form={form}
			name='register'
			onFinish={handleSubmit}
			scrollToFirstError
		>
			{showOTP && (
				<Form.Item
					name='otp'
					label='Verification Code'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Please input your OTP!',
						},
					]}
				>
					<Input className='input__style' />
				</Form.Item>
			)}

			<Form.Item
				className={showingOtp}
				name='name'
				label='Name'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: 'Please input your name!',
						whitespace: true,
					},
					{ min: 2, message: 'Name must be minimum 2 characters.' },
				]}
			>
				<Input
					name='name'
					className='input__style'
					suffix={<AccountCircleIcon className='text-gray-500' />}
				/>
			</Form.Item>
			<Form.Item
				name='email'
				className={showingOtp}
				label='Email'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: 'Please input your email!' },
					{ type: 'email' },
				]}
			>
				<Input
					className='input__style'
					name='email'
					suffix={<EmailIcon className='text-gray-500' />}
				/>
			</Form.Item>
			<Form.Item
				name='password'
				label='Password'
				className={showingOtp}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
					{ min: 7, message: 'Password must be minimum 7 characters.' },
					{
						pattern: new RegExp('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'),
						message: 'Password must be at least one number and letter.',
					},
				]}
				hasFeedback
			>
				<Input.Password className='input__style' name='password' />
			</Form.Item>
			<Form.Item
				name='confirm'
				className={showingOtp}
				label='Confirm Password'
				dependencies={['password']}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error('The new password that you entered do not match!')
							);
						},
					}),
				]}
			>
				<Input.Password className='input__style' />
			</Form.Item>
			{showOTP && (
				<button
					onClick={e => handleResend(e)}
					className='text-blue-700 font-medium mb-2 flex justify-end w-1/10 ml-auto'
				>
					Resend
				</button>
			)}
			<Form.Item>
				<ButtonPrimary
					isLoading={isLoading}
					title={showOTP ? 'Complete' : 'Verify Email'}
				/>
			</Form.Item>
		</Form>
	);
};
