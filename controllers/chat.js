import Chat from "../models/chat.js";

import { generateSubjectPrompt, generateTitlePrompt } from "../utils/PromptGenerator.js";
import { generateTitle } from "../utils/titleGenerator.js";
import { generateResponse } from "./../utils/responseGenerator.js";
import sendResponse from "../utils/helperFunctions.js";

export const newChat = async (req, res) => {
	try {
		const { email, message, chatId, subject } = req.body;

		//Generating title in 5 words
		const titlePrompt = generateTitlePrompt(message);
		const chatTitle = await generateTitle(titlePrompt);
		console.log(chatTitle);
		//Generating response based on user input
		const chatPrompt = generateSubjectPrompt(message, subject);
		const response = await generateResponse(chatPrompt);
		//Creating new document to store in database
		const newChatDocument = new Chat({
			email,
			chatId,
			chatTitle,
			chatData: [{ timestamp: Date.now(), subject, message, response: response.replace(/^[\?\n\+]+|[\?\n\+]+$/g, "").trim() }],
		});

		//storing document in database
		const result = await newChatDocument.save();
		sendResponse(res, 200, false, result);
	} catch (error) {
		console.error(error);
		sendResponse(res, 500, true, error.message);
	}
};

export const getChat = async (req, res) => {
	try {
		const { email, chatId, chatTitle } = req.body;

		//Finding the document based on email, id, title
		const result = await Chat.findOne({ email, chatId, chatTitle });

		//conditional response
		if (!result) {
			sendResponse(res, 404, true, "Chat not found");
		} else {
			sendResponse(res, 200, false, result);
		}
	} catch (error) {
		console.error(error);
		sendResponse(res, 500, true, error.message);
	}
};

export const updateChat = async (req, res) => {
	try {
		const { email, message, chatId, chatTitle, subject } = req.body;

		//Generating response based on user input
		const chatPrompt = generateSubjectPrompt(message, subject);
		const response = await generateResponse(chatPrompt);

		//Finding the document based on email, id, title
		const result = await Chat.findOne({ email, chatId, chatTitle });

		//conditional response
		if (!result) {
			sendResponse(res, 404, true, "Chat not found");
		} else {
			//Adding new message and response into chatData array
			result.chatData.push({ timestamp: Date.now(), subject, message, response });

			//Storing the updated document
			const updatedResult = await result.save();
			sendResponse(res, 200, false, updatedResult);
		}
	} catch (err) {
		console.error(err);
		sendResponse(res, 500, true, err.message);
	}
};
