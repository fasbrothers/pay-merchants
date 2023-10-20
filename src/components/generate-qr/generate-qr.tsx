import { QRCode } from 'antd';
import { ButtonPrimary } from '../button';

interface GenerateQrProps {
	publicKey: string;
	name: string;
}

export const GenerateQr = ({ publicKey, name }: GenerateQrProps) => {
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
			<QRCode
				value={`https://atto-pay.vercel.app/qr/${publicKey}`}
				bgColor='#fff'
				style={{ marginBottom: 16 }}
			/>
			<form onSubmit={e => downloadQRCode(e)} className='mt-6'>
				<ButtonPrimary title='Download' />
			</form>
		</div>
	);
};
