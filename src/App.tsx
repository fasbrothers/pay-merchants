import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import toastMessage from './utils/toast-message';
import { ErrorResponse } from './@types/error.types';
import './utils/generateUniqueId';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 10,
				refetchOnWindowFocus: false,
				keepPreviousData: true,
			},
		},
		mutationCache: new MutationCache({
			onError: (error: unknown) => {
				const axiosError = error as AxiosError<ErrorResponse>;
				toastMessage(
					axiosError?.response?.data.message || axiosError?.message || 'Error'
				);
			},
		}),
	});
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<Routes />
					<ToastContainer style={{ width: '400px' }} />
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
