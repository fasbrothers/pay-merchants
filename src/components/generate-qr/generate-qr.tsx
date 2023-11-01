import { QRCode } from 'antd';
import { ButtonPrimary } from '../shared/button';
import { GenerateQrProps } from '../../@types/qr.types';
import { useTranslation } from 'react-i18next';

export const GenerateQr = ({ url, name }: GenerateQrProps) => {
	const { t } = useTranslation();
	const downloadQRCode = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const canvas = document
			.getElementById('myqrcode')
			?.querySelector<HTMLCanvasElement>('canvas');
		if (canvas) {
			const url = canvas.toDataURL();
			const a = document.createElement('a');
			a.download = `${name}.png`;
			a.href = url;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};
	return (
		<div id='myqrcode'>
			<QRCode value={url} bgColor='#fff' />
			<form onSubmit={e => downloadQRCode(e)} className='mt-4'>
				<ButtonPrimary title={t('services.download_text')} />
			</form>
		</div>
	);
};
