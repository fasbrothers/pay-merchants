import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import {
	ServiceInputValues,
	ServiceResponse,
} from '../../@types/service.types';
import { ServiceForm } from '../../components/service';

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
			title='Add Service'
			buttonText='Create service'
		/>
	);
}

export default AddService;
