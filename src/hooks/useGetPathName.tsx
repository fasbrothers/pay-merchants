import { useLocation } from 'react-router-dom';

function useGetPathName({ num }: { num: number }) {
	return useLocation().pathname.split('/')[num];
}

export default useGetPathName;
