import { Button } from 'antd';

interface ButtonPrimaryProps {
	title: string;
	weight?: string;
	isLoading?: boolean;
	disabled?: boolean;
}

export const ButtonPrimary = ({
	title,
	weight,
	isLoading,
	disabled,
}: ButtonPrimaryProps) => {
	return (
		<Button
			disabled={disabled}
			className={`bg-blue-700 text-white h-full md:text-lg py-3 mx-auto text-center rounded-md hover:bg-white ${
				weight ? `w-[${weight}]` : 'w-full'
			} `}
			htmlType='submit'
			name='submit'
			loading={isLoading}
			style={{ fontFamily: 'Inter, sans-serif' }}
		>
			{title}
		</Button>
	);
};
