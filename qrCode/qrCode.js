const qrcode = require('qrcode');

const url = 'https://dipti.mahadia.dev';
const outputFile = 'qr_code.png';

const options = {
	errorCorrectionLevel: 'H',
	type: 'png',
	quality: 1,
	margin: 2,
	color: {
		dark: '#000000',
		light: '#FFFFFF'
	}
};

qrcode.toFile(outputFile, url, options, (err) => {
	if (err) throw err;
	console.log(`QR code saved as ${outputFile}`);
});
