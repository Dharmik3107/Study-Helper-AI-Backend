import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
	host: "smtp.gmail.com",
	service: "Gmail",
	auth: {
		user: process.env.NODE__MAILER_EMAIL,
		pass: process.env.NODE__MAILER_PASSWORD,
	},
}); //Mail services configuration

const sendEmail = (email, otp) => {
	try {
		transport.sendMail({
			from: process.env.NODE__MAILER_EMAIL,
			to: email,
			subject: "StudyHelperAI - Verify your email address",
			html: `<p>Use ${otp} as One Time Password (OTP) to login to your StudyHelperAI Account. OTP is valid for 2 minutes </p>`,
		});
		console.log("client mail done");
	} catch (error) {
		console.error("client error", error.message);
	}
}; //Util function to send generated otp on email

export default sendEmail;
