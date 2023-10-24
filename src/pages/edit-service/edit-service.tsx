import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import useGetPathName from '../../hooks/useGetPathName';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Service, ServiceInputValues } from '../../@types/service.types';
import { ServiceForm } from '../../components/service';

function EditService() {
	const navigate = useNavigate();

	const id = useGetPathName({ num: 3 });
	const query = useQueryClient();

	const { isLoading: loadService, data: service } = useDataFetching<Service>(
		'serviceById',
		`/service/${id}`,
		id
	);

	const { isLoading: loading, mutate } = useMutation(
		async (values: ServiceInputValues) => {
			const formData = new FormData();
			values.image && formData.append('image', values.image.file.originFileObj);
			values.deleteImage && formData.append('deleteImage', 'true');
			formData.append('isActive', values.isActive.toString());
			formData.append('name', values.name);
			formData.append('price', values.price);
			formData.append('categoryId', values.categoryId.toString());
			formData.append('id', id.toString());

			const { data } = await httpClient.put<Service>('/service', formData);
			return data;
		},
		{
			onSuccess: () => {
				navigate('/cabinet/services/' + id);
				query.invalidateQueries(['serviceById']);
				toastSuccessMessage('Service updated successfully');
			},
		}
	);
	return (
		<ServiceForm
			loading={loading}
			mutate={mutate}
			title='Service'
			buttonText='Update service'
			service={service}
			loadService={loadService}
			deleteImage={true}
		/>
	);
}

export default EditService;
