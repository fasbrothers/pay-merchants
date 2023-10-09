import {
	ErrorResponse,
	ServiceInputValues,
	ServiceResponse,
} from '../../@types/inputs-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import toastMessage, { toastSuccessMessage } from '../../utils/toast-message';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ServiceForm } from '../../components/service-form';

function AddService() {
	const navigate = useNavigate();
	const query = useQueryClient();

	const { isLoading: loading, mutate } = useMutation(
		async (values: ServiceInputValues) => {
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
				query.invalidateQueries(['services']);
				toastSuccessMessage('Service added successfully');
			},
		}
	);

	return (
		<ServiceForm
			loading={loading}
			mutate={mutate}
			title='All Services'
			buttonText='Create service'
		/>
	);
}

export default AddService;
