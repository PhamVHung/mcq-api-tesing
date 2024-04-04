import Users from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/jwtToken.js";
import {generateUserID} from "../../utils/generateUserID.js";

export const createUser = async (req, res) => {
    try {
        const {userID, email, username, password, verifyPassword, lastName, middleName, firstName} = req.body;

        if (!userID || !email || !username || !password || !verifyPassword || !lastName || !middleName || !firstName) {
            return res.status(400).send("All fields are required");
        }
        if (password !== verifyPassword) {
            return res.status(400).send("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            userID,
            email,
            username,
            password: hashedPassword,
            lastName,
            middleName,
            firstName
        });
        if (newUser) {
            generateToken(userID, res)
            res.status(201).json({
                message: "User created successfully",
                userID: userID,
                email: newUser.email,
                username: newUser.username,
                lastName: newUser.lastName,
                middleName: newUser.middleName,
                firstName: newUser.firstName
            });
        }

    } catch (error) {
        console.log("Error while creating user", error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const updateUser = async (req, res) => {
    try {
        let {userID} = req.params;
        let {email, username, password, lastName, middleName, firstName} = req.body;

        const updateFields = {}

        switch (true) {
            case email !== undefined:
                updateFields.email = email;
                break;
            case username !== undefined:
                updateFields.username = username;
                break;
            case password !== undefined:
                const hashedPassword = await bcrypt.hash(password, 10);
                updateFields.password = hashedPassword;
                break;
            case lastName !== undefined:
                updateFields.lastName = lastName;
                break;
            case middleName !== undefined:
                updateFields.middleName = middleName;
                break;
            case firstName !== undefined:
                updateFields.firstName = firstName;
                break;
            default:
                return res.status(400).send("No fields to update");
        }

        const updatedUser = await Users.update(updateFields, {
            where: {userID}
        })

        if (updatedUser) {
            res.status(200).json({
                message: "User updated successfully",
                userID: userID,
                email: email,
                username: username,
                lastName: lastName,
                middleName: middleName,
                firstName: firstName
            });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log("Error while updating user", error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {userID} = req.params;
        const deletedUser = await Users.destroy({
            where: {userID}
        });
        if (deletedUser) {
            res.status(200).json({
                message: "User deleted successfully"
            });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log("Error while deleting user", error.message);
        res.status(500).send("Internal Server Error");
    }
}