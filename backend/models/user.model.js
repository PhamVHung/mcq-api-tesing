import sequelize, {DataTypes, ENUM} from "sequelize";
import connectToDB from "../database/connectToDB.js";

const Users = await connectToDB.define("users", {
    userID: {
        type: DataTypes.STRING(10),
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    privilege: {
        type: DataTypes.ENUM('student', 'admin'),
        defaultValue: 'student',
    }
}, {timestamps: false});

console.log('User model created:', Users);

export default Users;