import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import { ServiceInputValues } from '../../@types/service.types';
import { ServiceForm } from '../../components/service';
import { useTranslation } from 'react-i18next';

function AddService() {
	const navigate = useNavigate();
	const query = useQueryClient();
	const { t } = useTranslation();

	const { isLoading: loading, mutate } = useMutation(
		async (values: ServiceInputValues) => {
			console.log(values);
			const formData = new FormData();
			values.image && formData.append('image', values.image.file.originFileObj);
			values.isActive &&
				formData.append('isActive', values.isActive.toString());
			formData.append('name', values.name);
			formData.append('categoryId', values.categoryId.toString());
			values.fields !== undefined
				? formData.append('fields', JSON.stringify(values.fields))
				: formData.append('fields', JSON.stringify([]));

			const { data } = await httpClient.post('/service', formData);
			data.message ? toastSuccessMessage(data.message) : null;
		},

		{
			onSuccess: () => {
				navigate('/cabinet/services');
				query.invalidateQueries(['services']);
			},
		}
	);

	return (
		<ServiceForm
			loading={loading}
			mutate={mutate}
			title={t('services.add_title')}
			buttonText={t('services.add_button')}
		/>
	);
}

export default AddService;
