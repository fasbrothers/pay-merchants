import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteToken } from '../../store/slices/authSlice';
import logo from '../../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { useQueryClient } from '@tanstack/react-query';
import { HeaderProps, Navigation } from '../../@types/profile.types';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';

export const HeaderMain = ({
	setShowNavbar,
	showNavbar,
	title,
}: HeaderProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const handleLogout = () => {
		dispatch(deleteToken());
		queryClient.removeQueries();
		navigate('/auth/login');
		console.log('logout');
	};
	const nav: Navigation[] = t('navigation', {
		returnObjects: true,
	}) as Navigation[];

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link to='/cabinet/profile-settings'>{t('main.profile')}</Link>,
		},
		{
			key: '2',
			label: <button onClick={() => handleLogout()}>{t('main.logout')}</button>,
		},
	];

	return (
		<div className='h-[8vh] flex justify-between items-center'>
			<div className='hidden sm:block md:hidden'>
				<Link to='/cabinet' className='flex items-center h-full'>
					<img src={logo} alt='logo' className='w-4/5 h-4/5' />
				</Link>
			</div>
			<h4 className='text-xl font-extrabold'>
				{nav
					.filter(el => (el.name === title ? el.title : ''))
					.map(el => (
						<Fragment key={el.name}>{el.title}</Fragment>
					))}
			</h4>
			<div className='flex items-center'>
				<Dropdown menu={{ items }} placement='bottom'>
					<Button className='flex items-center border-none shadow-none'>
						<AccountCircleIcon className='text-gray-600' fontSize='large' />
					</Button>
				</Dropdown>
				<Button
					className='md:hidden h-auto'
					onClick={() => setShowNavbar(!showNavbar)}
				>
					<MenuIcon />
				</Button>
			</div>
		</div>
	);
};
