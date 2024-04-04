import connectToDB from "../database/connectToDB.js";
import {DataTypes} from "sequelize";
import Users from "./user.model.js";
import Tests from "./test.model.js";
import Questions from "./question.model.js";
import Answers from "./answer.model.js";

const UserResponses = await connectToDB.define('userresponses', {
    ResponseID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: Users,
            key: 'UserID',
        },
    },
    TestID: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: Tests,
            key: 'TestID',
        },
    },
    QuestionID: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: Questions,
            key: 'QuestionID',
        },
    },
    AnswerID: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: Answers,
            key: 'AnswerID',
        },
    },
});

export default UserResponses;