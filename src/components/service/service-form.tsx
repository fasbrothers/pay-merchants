import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, Input, Select, Skeleton, Upload } from 'antd';
import { CheckBox } from '../shared/checkbox';
import { ButtonPrimary } from '../shared/button';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useState } from 'react';
import { Categories } from '../../@types/category.types';
import {
	ServiceFormProps,
	ServiceInputValues,
} from '../../@types/service.types';
import { BackToPreviousPage } from '../shared';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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
	const [deletedFields, setDeletedFields] = useState<string[]>([]);

	const { isLoading, data: category } = useDataFetching<Categories>(
		'categories',
		'/category'
	);

	const handleSubmit = (values: ServiceInputValues) => {
		mutate({ ...values, deletedFields });
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
						categoryId: service?.category_id,
						isActive: service?.is_active,
						fields: service?.fields,
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

					<Form.List name={['fields']}>
						{(subFields, subOpt) => (
							<div className='flex flex-col w-full '>
								{subFields.map((subField, index) => (
									<div
										key={subField.key}
										className='flex justify-between items-baseline gap-x-3 mt-4'
									>
										<Form.Item
											name={[subField.name, 'name']}
											className='grow'
											shouldUpdate
										>
											<Input
												placeholder='field name'
												className='input__style'
											/>
										</Form.Item>
										<Form.Item name={[subField.name, 'type']}>
											<Select
												placeholder='field type'
												disabled={
													form.getFieldValue('fields') &&
													form.getFieldValue('fields')[index]
														? true
														: false
												}
											>
												<Select.Option value='text'>Text</Select.Option>
												<Select.Option value='number'>Number</Select.Option>
												<Select.Option value='phone'>Phone</Select.Option>
											</Select>
										</Form.Item>
										<CloseOutlined
											onClick={() => {
												const id = form.getFieldValue('fields')[index].id;
												subOpt.remove(subField.name);
												id && setDeletedFields(prev => [...prev, id]);
											}}
										/>
									</div>
								))}
								<Button
									type='dashed'
									onClick={() => subOpt.add()}
									className='p-4 pb-8 my-4'
								>
									+ Add Field
								</Button>
							</div>
						)}
					</Form.List>

					<CheckBox title={t('services.status.1.title')} name='isActive' />
					<Form.Item>
						<ButtonPrimary isLoading={loading} title={buttonText} />
					</Form.Item>
				</Form>
			)}
		</div>
	);
};
