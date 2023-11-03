import { Form, Input } from 'antd';
import EmailIcon from '@mui/icons-material/Email';
import { AuthProps, InputValues } from '../../@types/auth.types';
import { ButtonPrimary } from '../shared/button';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { useEffect } from 'react';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';

export const SignInForm = ({ mutate, isLoading, timeLeft }: AuthProps) => {
	const [form] = Form.useForm();

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
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password name='password' className='input__style' />
				</Form.Item>
				{seconds > 0 || minutes > 0 ? (
					<p className='mb-3 text-base'>
						Block time : {minutes < 10 ? `0${minutes}` : minutes}:
						{seconds < 10 ? `0${seconds}` : seconds}
					</p>
				) : null}
				<Form.Item>
					<ButtonPrimary
						disabled={seconds > 0 || minutes > 0}
						isLoading={isLoading}
						title={seconds > 0 || minutes > 0 ? 'Please wait...' : 'Sign In'}
					/>
				</Form.Item>
			</Form>
		</>
	);
};
