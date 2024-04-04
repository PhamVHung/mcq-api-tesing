import connectToDB from "../database/connectToDB.js";
import {DataTypes} from "sequelize";
import Users from "./user.model.js";
import Tests from "./test.model.js";

const UserTestHistory =await connectToDB.define('usertesthistory', {
    UserTestHistoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Users,
            key: 'userID',
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
    Status: {
        type: DataTypes.ENUM('Completed', 'In Progress', 'Not Started'),
        defaultValue: 'Not Started',
        allowNull: true,
    },
    StartTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EndTime: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    // ,createdAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     defaultValue: DataTypes.NOW,
    // },
    // updatedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     defaultValue: DataTypes.NOW,
    // },
}, {timestamps: false});

export default UserTestHistory
