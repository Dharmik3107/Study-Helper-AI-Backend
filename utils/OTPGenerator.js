export default function generateOTP() {
	let OTP = "";
	for (let index = 0; index < 6; index++) {
		OTP += Math.floor(Math.random() * 10);
	}
	return OTP;
} //OTP Generator function
