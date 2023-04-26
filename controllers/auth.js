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
			User.findOneAndUpdate({ email }, { otp });
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
			return res.status(200).json({
				message: "User verified successfully",
			});
		} else {
			return res.status(404).json({
				message: "User not found",
			});
		}
	} catch (error) {
		console.error(error);
	}
}
