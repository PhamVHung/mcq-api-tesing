import express from "express";
import {
    assignQuestionsToTest,
    assignUsersToTest
} from "../../controllers/adminsControllers/testAssignment.controller.js";

const router = express.Router();

router.post("/assign-questions-to-test/:testID", assignQuestionsToTest);
router.post("/assign-users-to-test/:testID", assignUsersToTest);

export default router