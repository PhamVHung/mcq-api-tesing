import express  from "express";
import {protectedRoute} from "../../middlewares/protectedRoute.js";
import {createUser, deleteUser, updateUser} from "../../controllers/adminsControllers/userManagement.controller.js";

const router = express.Router();

router.post('/create-user', createUser);
router.delete('/delete-user/:userID', deleteUser);
router.post('/update-user/:userID', updateUser);

export default router