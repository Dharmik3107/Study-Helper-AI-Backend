import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateResponse = async (inputText) => {
	// Generating a response using the OpenAI API
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: inputText,
		temperature: 0.4,
		max_tokens: 100,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
	});

	// Extracting the response text from the API result
	// const responseData = response.data.choices[0].text.replace(/^[\?\n\+]+|[\?\n\+]+$/g, "").trim();
	return response.data.choices[0].text.replace(/^[\?\n\+]+|[\?\n\+]+$/g, "").trim();
};
