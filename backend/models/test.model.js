import sequelize, {DataTypes} from "sequelize";
import connectToDB from "../database/connectToDB.js";
import Users from "./user.model.js";

const Tests = await connectToDB.define("tests", {
    testID: {
        type: DataTypes.STRING(10),
        autoIncrement: true,
        primaryKey: true
    },
    testName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: "userID"
        }
    }
}, {timestamps: false});

// Tests.addHook('beforeValidate', async (tests, option) => {
//     const user = await Users.findByPk(tests.createdBy);
//     if (!user || user.privilege !== 'admin') {
//         throw new Error('Unauthorized');
//     }
// })
//
// Tests.belongsTo(Users, {foreignKey: 'createdBy', targetKey: 'userID'});
export default Tests;