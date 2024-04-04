import express from "express";
import {login, logout, register} from "../controllers/auth.controller.js";
import Users from "../models/user.model.js";
import {protectedRoute} from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);


router.get('/protected', protectedRoute, async (req, res) => {
    const { email, username } = req.body;

    try {
        let user;
        if (!email) {
            user = await Users.findOne({ where: { username } });
        } else {
            user = await Users.findOne({ where: { email } });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { userID, lastName, middleName, firstName } = user;
        const fullName = `${lastName} ${middleName} ${firstName}`;

        res.json({
            message: "You are logged in",
            userID,
            email,
            username,
            fullName
        });
    } catch (error) {
        console.error('Error retrieving user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;