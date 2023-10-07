import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddTitle = ({
	title,
	url,
	weight,
}: {
	title: string;
	url: string;
	weight: string;
}) => {
	return (
		<Link
			to={url}
			className={`flex items-center font-semibold gap-2 w-[${weight}px]}`}
		>
			<AddCircleOutlineIcon />
			{title}
		</Link>
	);
};
