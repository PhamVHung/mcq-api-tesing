import express from "express";
import {protectedRoute} from "../middlewares/protectedRoute.js";
import userManagementRoute from "./adminsRoute/userManagement.route.js";
import testManagementRoute from "./adminsRoute/testManagement.route.js";
import questionManagementRoute from "./adminsRoute/questionManagement.route.js";
import answerManagementRoute from "./adminsRoute/answerManagement.route.js";
import testAssignmentRoute from "./adminsRoute/testAssignment.route.js";

const router = express.Router();

router.use('/user-management', protectedRoute, userManagementRoute);
router.use('/test-management', protectedRoute, testManagementRoute);
router.use('/question-management', protectedRoute, questionManagementRoute);
router.use('/answer-management', protectedRoute, answerManagementRoute);
router.use('/test-assignment', protectedRoute, testAssignmentRoute);
// router.use()

export default router;