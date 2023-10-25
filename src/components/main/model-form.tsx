import { Form, Input, Modal } from 'antd';
import { InputValues } from '../../@types/auth.types';
import { ButtonPrimary } from '../shared/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastSuccessMessage } from '../../utils/toast-message';
import { httpClient } from '../../api';
import { ModelFormProps } from '../../@types/profile.types';
import { useTranslation } from 'react-i18next';

export const ModelForm = ({
	setIsModalOpen,
	isModalOpen,
	profile,
}: ModelFormProps) => {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

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
			title={t('modal_profile_update.title')}
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
					label={t('modal_profile_update.name')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: t('modal_profile_update.name_error'),
							whitespace: true,
						},
						{
							min: 2,
							message: t('modal_profile_update.name_error_length'),
						},
					]}
				>
					<Input className='input__style' value={profile?.name} name='name' />
				</Form.Item>
				<Form.Item>
					<ButtonPrimary
						isLoading={isLoading}
						title={t('modal_profile_update.button')}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
