import { Form, Input } from 'antd';
import { ButtonPrimary } from '../../../components/button';
import { InputValues, AuthProps } from '../../../@types/inputs-type';
import EmailIcon from '@mui/icons-material/Email';

function SignInForm({ mutate, isLoading }: AuthProps) {
	const [form] = Form.useForm();

	function handleSubmit(values: InputValues) {
		values.phone = values.phone && values.phone.replace(/\s/g, '');
		mutate(values);
	}
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
				<Form.Item>
					<ButtonPrimary isLoading={isLoading} title='Sign In' />
				</Form.Item>
			</Form>
		</>
	);
}

export default SignInForm;
