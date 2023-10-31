import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import useGetPathName from '../../hooks/useGetPathName';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Service, ServiceInputValues } from '../../@types/service.types';
import { ServiceForm } from '../../components/service';
import { useTranslation } from 'react-i18next';

function EditService() {
	const navigate = useNavigate();
	const query = useQueryClient();
	const id = useGetPathName({ num: 3 });
	const { t } = useTranslation();

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
			formData.append('categoryId', values.categoryId.toString());
			formData.append('id', id.toString());
			values.fields !== undefined
				? formData.append('fields', JSON.stringify(values.fields))
				: formData.append('fields', JSON.stringify([]));

			values.deletedFields &&
				formData.append('deletedFields', JSON.stringify(values.deletedFields));

			const { data } = await httpClient.put('/service', formData);
			data.message ? toastSuccessMessage(data.message) : null;
		},
		{
			onSuccess: () => {
				navigate('/cabinet/services/' + id);
				query.invalidateQueries(['serviceById']);
			},
		}
	);
	return (
		<ServiceForm
			loading={loading}
			mutate={mutate}
			title={t('services.single_title')}
			buttonText={t('services.edit_button')}
			service={service}
			loadService={loadService}
			deleteImage={true}
		/>
	);
}

export default EditService;
