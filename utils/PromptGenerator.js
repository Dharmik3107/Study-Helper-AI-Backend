export function generateTitlePrompt(message) {
	return `Generate title for given sentence in 5 words, sentence: ${message}`;
}

export function generateSubjectPrompt(message, subject) {
	switch (subject) {
		case "physics":
			return `As my physics teacher, you have to solve my given doubt but if it is not related to physics then reply me with same sentence written in double quote, "This is not physics related question, Please me ask something related to physics.". Doubt: ${message}`;
		case "chemistry":
			return `As my chemistry teacher, you have to solve my given doubt but if it is not related to chemistry then reply me with the same sentence written in double quotes, "This is not chemistry related question, Please ask me something related to chemistry.". Doubt: ${message}`;
		case "mathematics":
			return `As my mathematics teacher, you have to solve my given doubt but if it is not related to mathematics then reply me with the same sentence written in double quotes, "This is not mathematics related question, Please ask me something related to mathematics.". Doubt: ${message}`;
		case "history":
			return `As my history teacher, you have to solve my given doubt but if it is not related to history then reply me with the same sentence written in double quotes, "This is not history related question, Please ask me something related to history.". Doubt: ${message}`;
		case "science":
			return `As my science teacher, you have to solve my given doubt but if it is not related to science then reply me with the same sentence written in double quotes, "This is not science related question, Please ask me something related to science.". Doubt: ${message}`;
		default:
			return `Reply me with the same sentence written in double quote "This is not subject relateed question. Please ask me something any subject related."`;
	}
}
