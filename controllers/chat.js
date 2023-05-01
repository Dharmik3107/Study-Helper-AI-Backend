import Chat from "../models/chat.js";

import { generateSubjectPrompt, generateTitlePrompt } from "../utils/PromptGenerator.js";
import { generateTitle } from "../utils/titleGenerator.js";
import { generateResponse } from "./../utils/responseGenerator.js";
import sendResponse from "../utils/helperFunctions.js";

export const getResponse = async (req, res) => {
	try {
		const { email, message, chatId, messageId, subject } = req.body;

		if (email && message && chatId && subject && messageId) {
			//Generating response based on user input
			const chatPrompt = generateSubjectPrompt(message, subject);
			const response = await generateResponse(chatPrompt);

			const user = await Chat.findOne({ chatId: chatId });

			if (user) {
				const isMessageIdExist = Chat.findOne({ chatData: { messageId: messageId } });

				if (!isMessageIdExist) {
					//Adding chat object to chat Data
					user.chatData.push({ timestamp: Date.now(), messageId, message, response: response.replace(/^[\?\n\+]+|[\?\n\+]+$/g, "").trim() });

					//Storing the updated document
					const updatedResult = await user.save();

					sendResponse(res, 200, false, updatedResult);
				} else sendResponse(res, 406, true, "Message already exist");
			} else {
				//Generating title in 5 words
				const titlePrompt = generateTitlePrompt(message);
				const chatTitle = await generateTitle(titlePrompt);

				//Creating new document to store in database
				const newChatDocument = new Chat({
					email,
					chatId,
					chatTitle,
					subject,
					chatData: [{ timestamp: Date.now(), messageId, message, response: response.replace(/^[\?\n\+]+|[\?\n\+]+$/g, "").trim() }],
				});

				//storing document in database
				const result = await newChatDocument.save();
				sendResponse(res, 200, false, result);
			}
		} else sendResponse(res, 400, true, "All parameters are not found to perform add new chat");
	} catch (error) {
		console.error(error);
		sendResponse(res, 500, true, error.message);
	}
};

export const getChat = async (req, res) => {
	try {
		const { email, chatId } = req.query;

		if (email && chatId) {
			//Finding the document based on email, id, title
			const result = await Chat.findOne({ email, chatId });

			//conditional response
			if (!result) {
				sendResponse(res, 404, true, "Chat not found");
			} else {
				sendResponse(res, 200, false, result);
			}
		} else sendResponse(res, 400, true, "All parameters are not found");
	} catch (error) {
		console.error(error);
		sendResponse(res, 500, true, error.message);
	}
};

export const deleteChat = async (req, res) => {
	try {
		const { email, chatId } = req.body;

		//Finding the document based on email, id, title and deleting it
		if (email && chatId) {
			await Chat.findOneAndDelete({ email, chatId })
				.then((result) => sendResponse(res, 200, false, "Chat deleted Successfully"))
				.catch((error) => sendResponse(res, 500, true, error.message));
		} else sendResponse(res, 400, true, "All parameters are not found to perform delete chat");
	} catch (err) {
		console.error(err);
		sendResponse(res, 500, true, err.message);
	}
};

export const updateTitle = async (req, res) => {
	try {
		const { email, chatId, chatTitle } = req.body;

		//Finding the document based on email, id, title and deleting it
		if (email && chatId && chatTitle) {
			await Chat.findOneAndUpdate({ email, chatId }, { chatTitle }, { new: true })
				.then((result) => sendResponse(res, 200, false, result))
				.catch((error) => sendResponse(res, 500, true, error.message));
		} else sendResponse(res, 400, true, "All parameters are not found to perform delete chat");
	} catch (err) {
		console.error(err);
		sendResponse(res, 500, true, err.message);
	}
};

export const getChatList = async (req, res) => {
	try {
		const { email } = req.query;

		//Finding all Documents
		if (email) {
			await Chat.find({ email })
				.then((result) => sendResponse(res, 200, false, result))
				.catch((error) => sendResponse(res, 500, true, error.message));
		} else {
			sendResponse(res, 400, true, "Email id required to find all chat");
		}
	} catch (error) {
		console.error(err);
		sendResponse(res, 500, true, err.message);
	}
};
