import { Form, Input, Modal } from 'antd';
import { IProfileResponse, InputValues } from '../../../@types/inputs-type';
import { ButtonPrimary } from '../../../components/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastSuccessMessage } from '../../../utils/toast-message';
import { httpClient } from '../../../api';

interface IModelForm {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	profile: IProfileResponse | undefined;
}

function ModelForm({ setIsModalOpen, isModalOpen, profile }: IModelForm) {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (values: InputValues) => {
		const formData = new FormData();
		values?.name && formData.append('name', values.name);

		await httpClient.put('/merchant/profile', formData);
		setIsModalOpen(false);
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onSuccess: () => {
			queryClient.invalidateQueries(['profile']);
			toastSuccessMessage('Profile updated successfully');
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
}

export default ModelForm;
