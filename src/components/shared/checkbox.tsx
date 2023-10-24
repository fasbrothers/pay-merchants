import { Form } from 'antd';
import Checkbox from 'antd/es/checkbox';

export const CheckBox = ({ title, name }: { title: string; name: string }) => {
	return (
		<Form.Item valuePropName='checked' name={name}>
			<Checkbox>{title}</Checkbox>
		</Form.Item>
	);
};
