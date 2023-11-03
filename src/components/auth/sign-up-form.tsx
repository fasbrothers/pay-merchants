import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Form, Input } from 'antd';
import {
	AuthProps,
	InputValues,
	SendCodeResponse,
} from '../../@types/auth.types';
import { ButtonPrimary } from '../shared/button';
import { MouseEvent, useEffect } from 'react';
import { httpClient } from '../../api';
import { useMutation } from '@tanstack/react-query';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/error.types';

export const SignUpForm = ({
	mutate,
	isLoading,
	showOTP,
	timeLeft,
	setTimeLeft,
}: AuthProps) => {
	const [form] = Form.useForm();
	const showingOtp = showOTP ? 'hidden' : 'block';

	const { minutes, seconds, setMinutes, setSeconds }: TimerState = useTimer({
		initialSeconds: timeLeft,
	});

	useEffect(() => {
		const { minutes, remainingSeconds } = convertSecondsToMinutes(timeLeft);
		setMinutes(minutes);
		setSeconds(remainingSeconds);

		const timeoutId = setTimeout(() => {
			if (timeLeft > 0) {
				setTimeLeft && setTimeLeft(timeLeft - 1);
			}
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [timeLeft, setMinutes, setSeconds, setTimeLeft]);

	const handleSubmit = (values: InputValues) => {
		mutate(values);
	};

	const { mutate: resendOTP } = useMutation({
		mutationFn: async (email: string) => {
			const { data } = await httpClient.post<SendCodeResponse>(
				'/merchant/sendcode',
				{
					email,
				}
			);
			setTimeLeft && setTimeLeft(data.timeLeft);
		},
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.data.type === 'TRY_AGAIN_AFTER') {
				setTimeLeft && setTimeLeft(axiosError.response.data?.info?.timeLeft);
			}
		},
	});

	const handleResend = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
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
				<div className='flex justify-between text-base'>
					{seconds > 0 || minutes > 0 ? (
						<p>
							Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
							{seconds < 10 ? `0${seconds}` : seconds}
						</p>
					) : (
						<p>Didn't recieve code?</p>
					)}
					<button
						onClick={e => handleResend(e)}
						disabled={seconds > 0 || minutes > 0}
						className={`font-medium mb-2 w-1/10 ml-auto ${
							seconds > 0 || minutes > 0 ? 'text-[#a3a5a7]' : 'text-blue-700'
						} `}
					>
						Resend
					</button>
				</div>
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
