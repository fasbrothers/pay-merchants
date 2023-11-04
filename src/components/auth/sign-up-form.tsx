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
import { useTranslation } from 'react-i18next';

export const SignUpForm = ({
	mutate,
	isLoading,
	showOTP,
	timeLeft,
	setTimeLeft,
}: AuthProps) => {
	const [form] = Form.useForm();
	const showingOtp = showOTP ? 'hidden' : 'block';
	const { t } = useTranslation();

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
					label={t('auth.sign_up.otp.title')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: t('auth.sign_up.otp.error'),
						},
					]}
				>
					<Input className='input__style' />
				</Form.Item>
			)}

			<Form.Item
				className={showingOtp}
				name='name'
				label={t('auth.sign_up.name.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('auth.sign_up.name.error'),
						whitespace: true,
					},
					{ min: 2, message: t('auth.sign_up.name.error_length') },
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
				label={t('auth.sign_up.email.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: t('auth.sign_up.email.error') },
					{ type: 'email', message: t('auth.sign_up.email.error') },
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
				label={t('auth.sign_up.password.title')}
				className={showingOtp}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('auth.sign_up.password.error'),
					},
					{ min: 7, message: t('auth.sign_up.password.error_length') },
					{
						pattern: new RegExp('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'),
						message: t('auth.sign_up.password.error_pattern'),
					},
				]}
				hasFeedback
			>
				<Input.Password className='input__style' name='password' />
			</Form.Item>
			<Form.Item
				name='confirm'
				className={showingOtp}
				label={t('auth.sign_up.password_confirmation.title')}
				dependencies={['password']}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				hasFeedback
				rules={[
					{
						required: true,
						message: t('auth.sign_up.password_confirmation.error'),
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error(t('auth.sign_up.password_confirmation.error_match'))
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
							{t('auth.sign_up.block.title')}: {" "}
							{minutes < 10 ? `0${minutes}` : minutes}:
							{seconds < 10 ? `0${seconds}` : seconds}
						</p>
					) : (
						<p>{t('auth.sign_up.no_block')}</p>
					)}
					<button
						onClick={e => handleResend(e)}
						disabled={seconds > 0 || minutes > 0}
						className={`font-medium mb-2 w-2/10 ml-auto ${
							seconds > 0 || minutes > 0 ? 'text-[#a3a5a7]' : 'text-blue-700'
						} `}
					>
						{t('auth.sign_up.block.button')}
					</button>
				</div>
			)}
			<Form.Item>
				<ButtonPrimary
					isLoading={isLoading}
					title={
						showOTP ? t('auth.sign_up.button') : t('auth.sign_up.button_verify')
					}
				/>
			</Form.Item>
		</Form>
	);
};
