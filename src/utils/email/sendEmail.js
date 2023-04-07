import nodemailer from 'nodemailer'
// import jwt from('jsonwebtoken')
import { google } from "googleapis";
import text from './templateEmail.js';

const sendEmail = async ({ email, fullname, token }) => {
    try {
        // const accessToken = await oAuth2Client.getAccessToken();/
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const info = await transporter.sendMail({
            from: `"Belanjain Aja" <hatakekakasih2002@gmail.com>`,
            to: email,
            subject: `Hello ✔ ${fullname}`,
            html: text(token)
        })
        console.log(info)

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default sendEmail;