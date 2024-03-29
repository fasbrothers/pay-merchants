import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React from 'react';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';

const Main = React.lazy(() => import('../pages/main'));
const NotFound = React.lazy(() => import('../pages/not-found'));
const MainLayout = React.lazy(() => import('../layouts/main-layout'));
const RootLayout = React.lazy(() => import('../layouts/root-layout'));
const SignInUpLayout = React.lazy(() => import('../layouts/sign-in-up-layout'));
const Services = React.lazy(() => import('../pages/services'));
const AddService = React.lazy(() => import('../pages/add-service'));
const SingleService = React.lazy(() => import('../pages/single-service'));
const EditService = React.lazy(() => import('../pages/edit-service'));
const ProfileSettings = React.lazy(() => import('../pages/profile-settings'));

const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Navigate to='cabinet' />,
			},
			{
				path: 'cabinet',
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='services' />,
					},
					{
						children: [
							{ path: 'dashboard', element: <Main /> },
							{ path: 'profile-settings', element: <ProfileSettings /> },
							{
								path: 'services',
								children: [
									{
										index: true,
										element: <Services />,
									},
									{
										path: 'add-service',
										element: <AddService />,
									},
									{
										path: ':id',
										element: <SingleService />,
									},
									{
										path: ':id/edit',
										element: <EditService />,
									},
								],
							},
						],
					},
				],
			},
			{
				path: 'auth',
				element: <SignInUpLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='login' />,
					},
					{
						children: [
							{ path: 'login', element: <SignIn /> },
							{ path: 'register', element: <SignUp /> },
							{ path: '*', element: <SignIn /> },
						],
					},
				],
			},
			{ path: '*', element: <NotFound /> },
		],
	},
];

export function Routes() {
	return useRoutes(routes);
}
