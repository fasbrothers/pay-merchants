import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Service } from '../../@types/service.types';
import { useTranslation } from 'react-i18next';

export const ServiceCard = ({ service }: { service: Service }) => {
	const { t } = useTranslation();
	return (
		<>
			<div className='w-2/3 flex flex-col justify-between pt-5 pr-2'>
				<div>
					<h3 className='font-bold xl:text-lg truncate'>{service.name}</h3>
					<h5 className='text-sm'>{service.category_name}</h5>
					<p className='mt-2'>
						{service.is_active ? (
							<span className='text-green-400 font-medium'>
								{t('services.status.1.title')}
							</span>
						) : (
							<span className='text-red-400 font-medium'>
								{t('services.status.2.title')}
							</span>
						)}
					</p>
				</div>
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
			</div>
		</>
	);
};
