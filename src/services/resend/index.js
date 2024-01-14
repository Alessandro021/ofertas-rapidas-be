/* eslint-disable no-undef */
import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.KEY_API_RESEND);

export const resendMail = async (verify) => {
	const { data, error } = await resend.emails.send({
		from:  "onboarding@resend.dev",
		to: [verify.to],
		subject: verify.subject,
		html: verify.html,
	});

	if (error) {
		return console.error({ error });
	}

	console.log({ data });
};