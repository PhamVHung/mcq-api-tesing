import connectToDB from "../database/connectToDB.js";
import {DataTypes} from "sequelize";
import Users from "./user.model.js";
import Tests from "./test.model.js";

const UserScores = await connectToDB.define('userscores', {
    UserScoreID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID',
        },
    },
    TestID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Tests,
            key: 'TestID',
        },
    },
    Score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
});

export default UserScores;