/* eslint-disable no-undef */
import nodemailer from "nodemailer";
import {google} from "googleapis";
import "dotenv/config";

const oAuth2Client = new google.auth.OAuth2({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI

});

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});


export const sendmail = async (data) => {

	const ACCESS_TOKEN = await oAuth2Client.getAccessToken();

	let transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.MY_EMAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: ACCESS_TOKEN,
		},
		tls: {
			rejectUnauthorized: true,
		},
	});
	
	transport.sendMail({
		from: process.env.MY_EMAIL,
		to: data.to,
		subject: data.subject,
		html: data.html,
	});
};