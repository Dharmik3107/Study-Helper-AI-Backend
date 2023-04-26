import { Schema, model } from "mongoose";

const COLLECTION_NAME = "users";

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
		},
		otp: {
			type: String,
			required: true,
		},
	},
	{ collection: COLLECTION_NAME }
);

const User = model("user", userSchema);

export default User;
