import { Link } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Skeleton } from 'antd';
import { useState } from 'react';
import useGetPathName from '../../hooks/useGetPathName';
import { GenerateQr } from '../../components/generate-qr';
import { Service } from '../../@types/service.types';
import { BackToPreviousPage, ButtonPrimary } from '../../components/shared';
import { DeleteService, ServiceCard } from '../../components/service';

function SingleService() {
	const id = useGetPathName({ num: 3 });

	const { isLoading, data: service } = useDataFetching<Service>(
		'serviceById',
		`/service/${id}`,
		id
	);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const style =
		'border border-gray-200 flex p-4 rounded-xl hover:shadow-xl transition duration-300 mb-5	';

	return (
		<div>
			<div className='my-10'>
				<BackToPreviousPage title='Service Details' />
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 4 }} className='w-2/3' />
				) : (
					<>
						{service && (
							<div className='flex gap-x-10 flex-wrap gap-y-3'>
								<div className='w-full sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%]'>
									<div>
										<div key={service.id} className={style}>
											<ServiceCard service={service as Service} />
										</div>
										<div className='flex justify-around '>
											<Link to='edit'>
												<ButtonPrimary title={'Edit service'} />
											</Link>
											<form onSubmit={showModal}>
												<ButtonPrimary title={'Delete service'} />
											</form>
										</div>
									</div>
									<DeleteService
										id={id}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
										handleCancel={handleCancel}
										url='/service'
										navigateUrl='/cabinet/services'
										modalTitle='Delete service'
										modalMessage='Do you really want to delete this service?'
									/>
								</div>
								<GenerateQr
									url={`https://atto-pay.vercel.app/cabinet/qr/${service.public_key}`}
									name={service.name}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default SingleService;
