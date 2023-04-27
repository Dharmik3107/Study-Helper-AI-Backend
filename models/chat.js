import { Schema, model } from "mongoose";

const COLLECTION_NAME = "chatHistory";

const chatHistorySchema = new Schema(
	{
		email: {
			type: String,
			// ref: "users",
			required: true,
		},
		chatId: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		chatTitle: {
			type: String,
			required: true,
			unique: true,
		},
		subject: {
			type: String,
			required: true,
		},
		chatData: [
			{
				timestamp: Date,

				message: String,
				response: String,
			},
		],
	},
	{ collection: COLLECTION_NAME }
);

const Chat = model("chatHistory", chatHistorySchema);

export default Chat;
