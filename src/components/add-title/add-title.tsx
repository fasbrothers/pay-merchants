import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddTitle = ({ title, url }: { title: string; url: string }) => {
	return (
		<Link to={url} className='flex items-center font-semibold gap-2 w-[200px]'>
			<AddCircleOutlineIcon />
			{title}
		</Link>
	);
};
