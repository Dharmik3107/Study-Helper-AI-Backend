import User from "../models/user.js";

import generateOTP from "../utils/OTPGenerator.js";
import sendEmail from "../utils/mailer.js";
import sendResponse from "./../utils/helperFunctions.js";

export async function login(req, res) {
	try {
		const { email } = req.body;

		//Checking user exist or not
		const isUserExist = await User.findOne({ email });

		//Generating OTP
		const otp = generateOTP();

		//Conditional Operations based on user existance - Update or create new
		if (isUserExist) {
			await User.findOneAndUpdate({ email }, { otp });
			sendEmail(email, otp);
		} else {
			const newUser = new User({
				email,
				otp,
			});
			await newUser
				.save()
				.then((result) => {
					sendEmail(email, otp);
					return sendResponse(res, 200, false, "User Created Successfully", { result });
				})
				.catch((error) => sendResponse(res, 500, true, error.message));
		}
	} catch (error) {
		console.error(error);
	}
}

export async function verify(req, res) {
	try {
		const { email, otp } = req.body;

		//Finding user document
		const isUserExist = await User.findOne({ email });

		//Conditional Operation based on user existance - verify otp or send error response to redirect at login
		if (isUserExist.otp === otp) {
			return sendResponse(res, 200, false, { verified: true });
		} else {
			return sendResponse(res, 404, false, { verified: false });
		}
	} catch (error) {
		console.error(error);
	}
}
