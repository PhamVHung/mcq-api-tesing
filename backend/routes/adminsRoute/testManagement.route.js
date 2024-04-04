import express from "express";
import {createTest, deleteTest, updateTest} from "../../controllers/adminsControllers/testMangement.controller.js";

const router = express.Router();

router.post('/create-test', createTest);
router.delete('/delete-test/:testID', deleteTest);
router.post('/update-test/:testID', updateTest);

export default router;