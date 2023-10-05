import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 5,
				refetchOnWindowFocus: false,
				keepPreviousData: true,
			},
		},
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
