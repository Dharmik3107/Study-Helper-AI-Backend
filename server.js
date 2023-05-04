import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./database/database.js";

import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "https://chat-study-helper.netlify.app"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/chat", chatRouter);

async function startServer() {
	await connectDatabase();
	app.listen(process.env.PORT, () => {
		console.log(`Server started successfully on port ${process.env.PORT}`);
	});
}

startServer();
