import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
	organization: "org-Li9l90OYhluV0PKbmehYSLEe",
	apiKey,
});

const openai = new OpenAIApi(configuration);

export const generateTitle = async (inputText) => {
	// Generating a response using the OpenAI API
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: inputText,
		temperature: 0.3,
		max_tokens: 5,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
	});

	// Extracting the response text from the API result
	const responseData = response.data.choices[0].text.split(`"`)[1];

	return responseData;
};
