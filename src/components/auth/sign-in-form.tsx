import { Form, Input } from 'antd';
import EmailIcon from '@mui/icons-material/Email';
import { AuthProps, InputValues } from '../../@types/auth.types';
import { ButtonPrimary } from '../shared/button';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { useEffect } from 'react';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';
import { useTranslation } from 'react-i18next';

export const SignInForm = ({ mutate, isLoading, timeLeft }: AuthProps) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	function handleSubmit(values: InputValues) {
		mutate(values);
	}

	const { minutes, seconds, setMinutes, setSeconds }: TimerState = useTimer({
		initialSeconds: timeLeft,
	});

	useEffect(() => {
		const { minutes, remainingSeconds } = convertSecondsToMinutes(timeLeft);
		setMinutes(minutes);
		setSeconds(remainingSeconds);
	}, [timeLeft, setMinutes, setSeconds]);

	return (
		<>
			<Form
				form={form}
				name='login'
				onFinish={handleSubmit}
				style={{ maxWidth: 700 }}
				scrollToFirstError
			>
				<Form.Item
					name='email'
					label={t('auth.sign_in.email.title')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{ required: true, message: t('auth.sign_in.email.error') },
						{ type: 'email', message: t('auth.sign_in.email.error') },
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
					label={t('auth.sign_in.password.title')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: t('auth.sign_in.password.error'),
						},
					]}
				>
					<Input.Password name='password' className='input__style' />
				</Form.Item>
				{seconds > 0 || minutes > 0 ? (
					<p className='mb-3 text-base'>
						{t('auth.sign_in.block.title')} :{' '}
						{minutes < 10 ? `0${minutes}` : minutes}:
						{seconds < 10 ? `0${seconds}` : seconds}
					</p>
				) : null}
				<Form.Item>
					<ButtonPrimary
						disabled={seconds > 0 || minutes > 0}
						isLoading={isLoading}
						title={
							seconds > 0 || minutes > 0
								? t('auth.sign_in.button_blocked')
								: t('auth.sign_in.button')
						}
					/>
				</Form.Item>
			</Form>
		</>
	);
};
