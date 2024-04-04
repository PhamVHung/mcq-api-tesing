import express from "express";
import {
    createQuestion,
    deleteQuestion,
    updateQuestion
} from "../../controllers/adminsControllers/questionManagement.controller.js";

const router = express.Router();

router.post('/create-question', createQuestion)
router.delete('/delete-question/:questionID', deleteQuestion)
router.post('/update-question/:questionID', updateQuestion)

export default router