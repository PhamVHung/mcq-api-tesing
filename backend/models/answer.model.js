import connectToDB from "../database/connectToDB.js";
import {DataTypes} from "sequelize";
import Questions from "./question.model.js";

const Answers = await connectToDB.define('answers', {
    AnswerID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    QuestionID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Questions,
            key: 'QuestionID',
        },
    },
    AnswerText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    IsCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
    {timestamps: false},
);

export default Answers;