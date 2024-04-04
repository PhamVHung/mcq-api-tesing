import User from '../models/user.model.js';
import sequelize from "sequelize";

export const generateUserID = async (privilege) => {
    try {
        let count;
        const currentYear = new Date().getFullYear().toString().slice(-2);
        if (privilege === 'student') {
            count = await User.count({
                where: {
                    privilege: 'student',
                    userID: {
                        [sequelize.Op.like]: `B${currentYear}%`
                    }
                }
            });
            const majorCode = 'CS';
            const nextCount = count + 1;
            return `B${currentYear}${majorCode}${String(nextCount).padStart(3, '0')}`;
        } else if (privilege === 'admin') {
            count = await User.count({
                where: {
                    privilege: 'admin',
                    userID: {
                        [sequelize.Op.like]: 'AD%'
                    }
                }
            });
            const nextCount = count + 1;
            return `AD${String(nextCount).padStart(3, '0')}`;
        } else {
            throw new Error('Invalid privilege');
        }
    } catch (error) {
        throw new Error('Error generating UserID: ' + error.message);
    }
};
