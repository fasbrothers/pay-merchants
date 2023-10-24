import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { LoadingLazy } from '../components/shared/loading-lazy';
import { setLanguage } from '../utils/cookies';
import { useDataFetching } from '../hooks/useDataFetching';
import { ProfileResponse } from '../@types/profile.types';
import { FooterMain, HeaderMain, SidebarInMain } from '../components/main';
import useGetPathName from '../hooks/useGetPathName';

export default function MainLayout() {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const title = useGetPathName({ num: 2 })
		?.split('-')
		?.map(el => el[0].toUpperCase() + el.slice(1))
		.join(' ');

	const { data: profile, isLoading } = useDataFetching<ProfileResponse>(
		'profile',
		'/merchant/profile'
	);

	!isLoading && setLanguage('language', profile?.lang as string);
	
	return (
		<div className='w-full flex min-h-screen'>
			<SidebarInMain
				showNavbar={showNavbar}
				setShowNavbar={setShowNavbar}
				title={title}
				balance={profile?.balance || ''}
			/>
			<div
				className={`${
					showNavbar && 'blur-sm'
				} w-full md:w-5/6 px-5 md:px-10 lg:px-20 flex flex-col`}
			>
				<HeaderMain
					setShowNavbar={setShowNavbar}
					showNavbar={showNavbar}
					title={title}
				/>
				<Suspense fallback={<LoadingLazy />}>
					<div className='grow'>
						<Outlet />
					</div>
				</Suspense>
				<FooterMain language={profile?.lang as string} />
			</div>
		</div>
	);
}
