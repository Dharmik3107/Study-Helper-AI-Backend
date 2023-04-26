export default function sendResponse(res, statusCode, errorBoolean, message, otherData = {}) {
	return res.status(statusCode).json({
		error: errorBoolean,
		message: message,
		data: otherData,
	});
}
