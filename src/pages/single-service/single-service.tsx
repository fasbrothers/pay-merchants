import { useLocation } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Skeleton } from 'antd';
import { ServiceCard } from '../../components/service-card';
import { ResponseService } from '../../@types/inputs-type';
import BackToPreviousPage from '../../components/back-to-previous-page/back-to-previous-page';

function SingleService() {
	const id = useLocation().pathname.split('/')[3];

	const { isLoading, data: service } = useDataFetching<ResponseService>(
		'serviceById',
		`/service/${id}`,
		id
	);
	const style =
		'w-full sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%] border border-gray-200 flex p-4 rounded-xl hover:shadow-xl transition duration-300 hover:border-none';

	return (
		<div>
			<div className='my-10'>
				<BackToPreviousPage title='Back to services' />
				<div className='flex flex-wrap gap-5'>
					{isLoading ? (
						<Skeleton active paragraph={{ rows: 4 }} className={style} />
					) : (
						<>
							<div key={service?.id} className={style}>
								<ServiceCard service={service as ResponseService} />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default SingleService;
