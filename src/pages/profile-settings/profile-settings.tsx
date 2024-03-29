import { ButtonPrimary } from '../../components/shared/button';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { useDataFetching } from '../../hooks/useDataFetching';
import { ProfileResponse } from '../../@types/profile.types';
import { ModelForm } from '../../components/main';
import { useTranslation } from 'react-i18next';

function ProfileSettings() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { t } = useTranslation();

	const { isLoading, data: profile } = useDataFetching<ProfileResponse>(
		'profile',
		'merchant/profile'
	);

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<div className={`${isModalOpen && 'blur'}`}>
			<h4 className='font-bold text-xl mb-3'>
				{t('profile_settings.information')}
			</h4>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 4 }} />
			) : (
				<>
					<div className={`flex flex-col-reverse md:flex-row `}>
						<div className='bg-gray-100 w-full md:w-2/3 p-6 pb-0 rounded-xl'>
							<div className='border-b-2 pb-3 border-gray-200'>
								<p className='text-sm'>{t('profile_settings.name')}</p>
								<h3 className='mt-1 font-bold'>{profile?.name}</h3>
							</div>
							<div className='border-b-2 py-3 border-gray-200'>
								<p className='text-sm'>{t('profile_settings.email')}</p>
								<h3 className='mt-1 font-bold'>{profile?.email}</h3>
							</div>
							<div className='py-3'>
								<p className='text-sm'>{t('profile_settings.status')}</p>
								<h3 className='mt-1 font-bold'>
									{t('profile_settings.active')}
								</h3>
							</div>
						</div>
					</div>
					<form className='mt-10' onSubmit={showModal}>
						<ButtonPrimary
							title={t('profile_settings.update_button')}
							weight='250px'
						/>
					</form>
					<ModelForm
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						profile={profile}
					/>
				</>
			)}
		</div>
	);
}

export default ProfileSettings;
