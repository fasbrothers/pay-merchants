import { Skeleton } from 'antd';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AddTitle } from '../../components/shared';
import { ServiceCard } from '../../components/service';
import { ResponseServices, Service, Status } from '../../@types/service.types';
import { useTranslation } from 'react-i18next';

export default function Services() {
	const { isLoading, data } = useDataFetching<ResponseServices>(
		'services',
		'/service/merchant'
	);
	const { t } = useTranslation();
	const status: Status[] = t('services.status', {
		returnObjects: true,
	}) as Status[];

	const [activeStatus, setActiveStatus] = useState<string>(status[0].code);

	const style =
		'w-full sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%] border border-gray-200 flex p-4 rounded-xl hover:shadow-xl transition duration-300';

	return (
		<div>
			<div className='flex flex-wrap gap-3 justify-between mt-4'>
				<h4 className='text-lg'>
					{t('services.quantity_text')}:
					<span className='font-bold'> {data?.count ? data?.count : '0'}</span>
				</h4>
				<div>
					<AddTitle
						url='add-service'
						title={t('services.button_add')}
						weight='200'
					/>
				</div>
			</div>
			{data?.count && data?.count > 0 ? (
				<div className='h-16 bg-gray-100 rounded-2xl flex justify-around items-center w-[320px] sm:w-[340px] p-2 gap-x-2 mt-5'>
					{status.map(el => (
						<div
							key={el.id}
							onClick={() => setActiveStatus(el.code)}
							className={` rounded-[12px] hover:bg-black duration-200 hover:text-white cursor-pointer py-3 px-1 sm:px-2 ${
								activeStatus === el.code ? 'bg-black text-white' : 'bg-gray-100'
							}`}
						>
							{el.title}
						</div>
					))}
				</div>
			) : (
				''
			)}
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
							{filterServices(
								data?.services ? (data?.services as Service[]) : [],
								activeStatus
							).map(service => (
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

function filterServices(services: Service[], activeStatus: string): Service[] {
	if (activeStatus === 'Active') {
		return services.filter(service => service.is_active === true);
	} else if (activeStatus === 'Not Active') {
		return services.filter(service => service.is_active === false);
	}
	return services;
}
