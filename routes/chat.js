import express from "express";

import { getResponse, getChat, deleteChat, updateTitle, getChatList } from "../controllers/chat.js";

const router = express.Router();

router.post("/getresponse", getResponse);
router.get("/getchat", getChat);
// router.put("/updatechat", updateChat);
router.put("/updatetitle", updateTitle);
router.delete("/deletechat", deleteChat);
router.get("/getallchat", getChatList);

export default router;
