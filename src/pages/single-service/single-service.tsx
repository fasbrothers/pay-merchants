import { useLocation } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Skeleton } from 'antd';
import { ServiceCard } from '../../components/service-card';
import { ResponseService } from '../../@types/inputs-type';
import BackToPreviousPage from '../../components/back-to-previous-page/back-to-previous-page';
import { useState } from 'react';
import { ButtonPrimary } from '../../components/button';
import { DeleteCard } from '../../components/delete-card-modal';

function SingleService() {
	const id = useLocation().pathname.split('/')[3];
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const { isLoading, data: service } = useDataFetching<ResponseService>(
		'serviceById',
		`/service/${id}`,
		id
	);

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const style =
		'w-full sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%] border border-gray-200 flex p-4 rounded-xl hover:shadow-xl transition duration-300 hover:border-none';

	return (
		<div>
			<div className='my-10'>
				<BackToPreviousPage title='Back to services' />
				<div>
					{isLoading ? (
						<Skeleton active paragraph={{ rows: 4 }} className={style} />
					) : (
						<>
							<div key={service?.id} className={style}>
								<ServiceCard service={service as ResponseService} />
							</div>
							<form
								className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/4 mt-5'
								onSubmit={showModal}
							>
								<ButtonPrimary title={'Delete service'} />
							</form>
							<DeleteCard
								id={id}
								isModalOpen={isModalOpen}
								setIsModalOpen={setIsModalOpen}
								handleCancel={handleCancel}
								url='/service'
								successMessage='Service deleted successfully'
								navigateUrl='/cabinet/services'
								modalTitle='Delete service'
								modalMessage='Do you really want to delete this service?'
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default SingleService;
