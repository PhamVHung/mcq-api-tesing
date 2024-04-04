import express from "express";
import {
    createAnswer,
    deleteAnswer,
    updateAnswer
} from "../../controllers/adminsControllers/answerManagement.controller.js";

const router = express.Router();

router.post("/create-answer", createAnswer);
router.delete("/delete-answer/:answerID", deleteAnswer);
router.put("/update-answer/:answerID", updateAnswer);

export default router