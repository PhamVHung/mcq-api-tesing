import connectToDB from "../database/connectToDB.js";
import { DataTypes } from "sequelize";
import Tests from "./test.model.js";

const Questions = await connectToDB.define('questions', {
    QuestionID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
    },
    TestID: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: Tests,
            key: 'TestID',
        },
    },
    QuestionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {timestamps: false});

export default Questions;