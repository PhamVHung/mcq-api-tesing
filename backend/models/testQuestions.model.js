import connectToDB from "../database/connectToDB.js";
import {DataTypes} from "sequelize";
import Questions from "./question.model.js";
import Tests from "./test.model.js";

const TestQuestions = await connectToDB.define('testquestions', {
    TestQuestionID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
    },
    TestID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Tests,
            key: 'TestID',
        },
    },
    QuestionID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Questions,
            key: 'QuestionID',
        },
    },
    QuestionOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
    },
});

export default TestQuestions;