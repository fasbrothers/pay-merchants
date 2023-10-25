import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, Input, Select, Skeleton, Upload } from 'antd';
import { CheckBox } from '../shared/checkbox';
import { ButtonPrimary } from '../shared/button';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useState } from 'react';
import { MaskedInput } from 'antd-mask-input';
import { Categories } from '../../@types/category.types';
import {
	ServiceFormProps,
	ServiceInputValues,
} from '../../@types/service.types';
import { BackToPreviousPage } from '../shared';
import { useTranslation } from 'react-i18next';

export const ServiceForm = ({
	loading,
	mutate,
	title,
	buttonText,
	service,
	loadService = false,
	deleteImage = false,
}: ServiceFormProps) => {
	const [form] = Form.useForm();
	const [image, setImage] = useState(false);
	const { t } = useTranslation();

	const { isLoading, data: category } = useDataFetching<Categories>(
		'categories',
		'/category'
	);

	const handleSubmit = (values: ServiceInputValues) => {
		mutate(values);
	};

	const style =
		'create__service--form w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5';

	return (
		<div>
			<div>
				<BackToPreviousPage title={title} />
			</div>
			{loadService ? (
				<Skeleton active paragraph={{ rows: 12 }} className={style} />
			) : (
				<Form
					form={form}
					name='create-service'
					onFinish={handleSubmit}
					scrollToFirstError
					className={style}
					initialValues={{
						name: service?.name,
						price: service?.price && Number(service?.price).toFixed(0),
						categoryId: service?.category_id,
						isActive: service?.is_active,
					}}
				>
					{!image && service?.image_url && (
						<div className='flex justify-center -mb-10'>
							<img
								src={service?.image_url}
								className='w-[200px] h-[200px]  object-contain rounded-full'
							/>
						</div>
					)}
					<Form.Item
						className='avatar-uploader'
						name='image'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
					>
						<Upload
							listType='picture-circle'
							maxCount={1}
							accept='image/*'
							onChange={e => setImage(e.fileList.length > 0)}
						>
							<div>
								<AddCircleOutlineIcon />
							</div>
						</Upload>
					</Form.Item>
					{deleteImage && service?.image_url && (
						<CheckBox title={t('services.delete_image')} name='deleteImage' />
					)}
					<Form.Item
						name='name'
						label={t('services.service_name')}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: t('services.name_error'),
								whitespace: true,
							},
							{
								min: 2,
								message: t('services.name_error_length'),
							},
						]}
					>
						<Input name='name' className='input__style' />
					</Form.Item>
					<Form.Item
						name='price'
						label={t('services.price_name')}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{ required: true, message: t('services.price_error') },
							{
								pattern: /^[1-9]\d*$/,
								message: t('services.price_error_for_valid'),
							},
						]}
					>
						<MaskedInput
							maskOptions={{ lazy: true }}
							mask={'000000000000'}
							className='input__style'
						/>
					</Form.Item>
					<Form.Item
						label={t('services.category_name')}
						name='categoryId'
						className='categoryId'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{ required: true, message: t('services.category_name_error') },
						]}
					>
						<Select
							loading={isLoading}
							placeholder={t('services.category_name')}
						>
							{category?.categories.map(item => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<CheckBox title={t('services.status.1.title')} name='isActive' />
					<Form.Item>
						<ButtonPrimary isLoading={loading} title={buttonText} />
					</Form.Item>
				</Form>
			)}
		</div>
	);
};
