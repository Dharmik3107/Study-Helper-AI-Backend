import express from "express";

import { newChat, getChat, updateChat, deleteChat, updateTitle } from "../controllers/chat.js";

const router = express.Router();

router.post("/newchat", newChat);
router.get("/getchat", getChat);
router.put("/updatechat", updateChat);
router.put("/updatetitle", updateTitle);
router.delete("/deletechat", deleteChat);

export default router;
