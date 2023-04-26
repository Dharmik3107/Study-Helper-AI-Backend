import mongoose from "mongoose";

const parameters = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}; //mongoose.connect() function parameters

async function connectDatabase() {
	try {
		await mongoose.connect(process.env.DB_URL, parameters);
		console.log("Successfully Connected to Database");
	} catch (error) {
		console.error(error);
	}
} //Function to connect with database

export default connectDatabase;
