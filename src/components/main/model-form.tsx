import { Form, Input, Modal } from 'antd';
import { InputValues } from '../../@types/auth.types';
import { ButtonPrimary } from '../shared/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastSuccessMessage } from '../../utils/toast-message';
import { httpClient } from '../../api';
import { ModelFormProps } from '../../@types/profile.types';

export const ModelForm = ({
	setIsModalOpen,
	isModalOpen,
	profile,
}: ModelFormProps) => {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (values: InputValues) => {
		const formData = new FormData();
		values.name && formData.append('name', values.name);

		const { data } = await httpClient.put('/merchant/profile', formData);
		data.message ? toastSuccessMessage(data.message) : null;
		setIsModalOpen(false);
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onSuccess: () => {
			queryClient.invalidateQueries(['profile']);
		},
	});

	return (
		<Modal
			title='Update User Profile'
			open={isModalOpen}
			onCancel={handleCancel}
			className='profile__modal'
		>
			<Form
				form={form}
				name='update'
				onFinish={mutate}
				scrollToFirstError
				className='profile__form'
				initialValues={{
					name: profile?.name,
				}}
			>
				<Form.Item
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
						{
							min: 2,
							message: 'Name must be minimum 2 characters',
						},
					]}
				>
					<Input className='input__style' value={profile?.name} name='name' />
				</Form.Item>
				<Form.Item>
					<ButtonPrimary isLoading={isLoading} title='Update' />
				</Form.Item>
			</Form>
		</Modal>
	);
};
