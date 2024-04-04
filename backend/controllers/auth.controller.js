import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateUserID} from "../utils/generateUserID.js";
import generateToken from "../utils/jwtToken.js";

export const login = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        if (!(email || username) || !password) {
            return res.status(400).json({error: 'All fields are required'});
        }

        let user;
        if (email) {
            user = await Users.findOne({where: {email}});
        } else if (username) {
            user = await Users.findOne({where: {username}});
        }

        console.log('User:', user);
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect || !user) {
            res.status(400).json({error: 'Invalid credentials'});
        }

        generateToken(Users.userID, res);
        res.status(200).json({
            message: 'Login successful',
            userID: user.userID,
            email: user.email,
            username: user.username,
            lastName: user.lastName,
            middleName: user.middleName,
            firstName: user.firstName,
            privilege: user.privilege
        });
    } catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const register = async (req, res) => {
    try {
        const {email, username, lastName, middleName, firstName, password, verifyPassword, privilege} = req.body;

        if (!email || !username || !lastName || !middleName || !firstName || !password || !verifyPassword) {
            return res.status(400).json({error: 'All fields are required'});
        }
        if (password !== verifyPassword) {
            return res.status(400).json({error: 'Passwords do not match'});
        }
        if (!password) {
            return res.status(400).json({error: 'Password is required'});
        }

        const findUserByEmail = await Users.findOne({where: {email}});
        const findUserByUsername = await Users.findOne({where: {username}});
        const existingUser = findUserByEmail || findUserByUsername;
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }

        const userID = await generateUserID(privilege);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            userID,
            email,
            username,
            lastName,
            middleName,
            firstName,
            password: hashedPassword,
            privilege
        });

        if (user) {
            generateToken(Users.userID, res)
            res.status(201).json({
                message: 'User created successfully',
                userID, email, username, lastName, middleName, firstName, password, hashedPassword, privilege
            });
            // res.status(201).json(user);
        } else {
            res.status(400).json({error: 'Invalid user data'});
        }
    } catch (error) {
        console.error("Error registering user", error)
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const logout = async (req, res) => {
    try {
        res
            .clearCookie('jwt', "", {maxAge: 0})
            .status(200)
            .json({message: "Logged out"})
    } catch (error) {
        console.log("Error logging out: ", error.message);
        res.status(500).json({error: 'Internal server error'});
    }
}