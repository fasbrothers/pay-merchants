import { Skeleton } from 'antd';
import { AddTitle } from '../../components/add-title';
import { useDataFetching } from '../../hooks/useDataFetching';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

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
									<div className='w-2/3 flex flex-col justify-between pt-5 pr-2'>
										<div>
											<h3 className='font-bold xl:text-lg truncate'>
												{service.name}
											</h3>
											<h5 className='text-sm'>{service.category_name}</h5>
										</div>
										<p className='font-bold xl:text-lg'>
											Price: {service.price}
										</p>
									</div>
									<div className='w-1/3 flex flex-col items-center'>
										{service.image_url === null ? (
											<AccountCircleIcon
												fontSize='large'
												sx={{
													fontSize: {
														xs: 80,
														lg: 90,
														xl: 100,
													},
												}}
												className='text-gray-600'
											/>
										) : (
											<img
												src={service.image_url}
												alt=''
												className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain rounded-full'
											/>
										)}
										<p className='mt-2'>
											{service.is_active ? (
												<span className='text-green-400 font-medium'>
													Active
												</span>
											) : (
												<span className='text-red-400 font-medium'>
													Not Active
												</span>
											)}
										</p>
									</div>
								</Link>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export interface ResponseServices {
	count: number;
	services: Service[];
}

interface Service {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	price: number;
	image_url?: string;
	is_active: boolean;
	category_code: string;
	category_name: string;
}
