import express from "express";

import { newChat, getChat, updateChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/newchat", newChat);
router.get("/getchat", getChat);
router.post("/updatechat", updateChat);

export default router;
