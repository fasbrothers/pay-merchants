import BackToPreviousPage from '../../components/back-to-previous-page/back-to-previous-page';
import { ButtonPrimary } from '../../components/button';
import { CheckBox } from '../../components/checkbox';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Form, Input, Select, Upload } from 'antd';
import {
	Categories,
	ErrorResponse,
	ServiceResponse,
} from '../../@types/inputs-type';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import toastMessage, { toastSuccessMessage } from '../../utils/toast-message';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface InputValues {
	name: string;
	price: string;
	categoryId: number;
	isActive: boolean;
	image: any;
}

function AddService() {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const { isLoading, data: category } = useDataFetching<Categories>(
		'categories',
		'/category'
	);

	const { isLoading: loading, mutate } = useMutation(
		async (values: InputValues) => {
			const formData = new FormData();
			values.image && formData.append('image', values.image.file.originFileObj);
			values.isActive &&
				formData.append('isActive', values.isActive.toString());
			formData.append('name', values.name);
			formData.append('price', values.price);
			formData.append('categoryId', values.categoryId.toString());

			const { data } = await httpClient.post<ServiceResponse>(
				'/service',
				formData
			);
			return data;
		},
		{
			onError: (error: AxiosError<ErrorResponse>) => {
				toastMessage(
					error?.response?.data.message || error?.message || 'Error'
				);
			},
			onSuccess: () => {
				navigate('/cabinet/services');
				toastSuccessMessage('Service added successfully');
			},
		}
	);

	const handleSubmit = (values: InputValues) => {
		console.log(values);
		mutate(values);
	};

	return (
		<div>
			<div>
				<BackToPreviousPage title='All Services' />
			</div>
			<Form
				form={form}
				name='create-service'
				onFinish={handleSubmit}
				scrollToFirstError
				className='create__service--form w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
			>
				<Form.Item
					className='avatar-uploader'
					name='image'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Upload listType='picture-circle' maxCount={1} accept='image/*'>
						<div>
							<AddCircleOutlineIcon />
						</div>
					</Upload>
				</Form.Item>
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
							message: 'Please enter minimum to 2 letters',
						},
					]}
				>
					<Input name='name' className='input__style' />
				</Form.Item>

				<Form.Item
					name='price'
					label='Price'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[{ required: true, message: 'Please input your price!' }]}
				>
					<Input className='input__style' name='phone' />
				</Form.Item>
				<Form.Item
					label='Select'
					name='categoryId'
					className='categoryId'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[{ required: true, message: 'Please select a category!' }]}
				>
					<Select loading={isLoading} placeholder='Select a category'>
						{category?.categories.map(item => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<CheckBox title='Active' name='isActive' />
				<Form.Item>
					<ButtonPrimary isLoading={loading} title='Create service' />
				</Form.Item>
			</Form>
		</div>
	);
}

export default AddService;
