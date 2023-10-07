import { Skeleton } from 'antd';
import { AddTitle } from '../../components/add-title';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Link } from 'react-router-dom';
import { ResponseServices } from '../../@types/inputs-type';
import { ServiceCard } from '../../components/service-card';

export default function Services() {
	const { isLoading, data } = useDataFetching<ResponseServices>(
		'services',
		'/service/merchant'
	);

	const style =
		'w-full sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%] border border-gray-200 flex p-4 rounded-xl hover:shadow-xl transition duration-300 hover:border-none';

	return (
		<div>
			<div className='flex flex-wrap gap-3 justify-between mt-4'>
				<h4 className='text-lg'>
					Total number of services:{' '}
					<span className='font-bold'>{data?.count ? data?.count : '0'}</span>
				</h4>
				<div>
					<AddTitle url='add-service' title='Create a service' weight='200' />
				</div>
			</div>
			<div className='my-10'>
				<div className='flex flex-wrap gap-5'>
					{isLoading ? (
						[...Array(6)].map((_, index) => (
							<Skeleton
								key={index}
								active
								paragraph={{ rows: 4 }}
								className={style}
							/>
						))
					) : (
						<>
							{data?.services.map(service => (
								<Link key={service.id} className={style} to={service.id}>
									<ServiceCard service={service} />
								</Link>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
