import express from "express";

import { newChat, getChat, updateChat, deleteChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/newchat", newChat);
router.get("/getchat", getChat);
router.put("/updatechat", updateChat);
router.delete("/deletechat", deleteChat);

export default router;
