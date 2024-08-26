import nodemailer from 'nodemailer';
import text from '../../../utils/email/templateEmail.js';

const sendEmail = async ({ email, fullname, token }) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		const info = await transporter.sendMail({
			from: `"Belanjain Aja" <taryana2525@gmail.com>`,
			to: email,
			subject: `Hello ✔ ${fullname}`,
			html: text(token),
		});
		console.log(info);
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export default sendEmail;
