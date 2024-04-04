import Tests from "../../models/test.model.js";
import TestQuestions from "../../models/testQuestions.model.js";
import UserTestHistory from "../../models/userTestHistory.model.js";

export const assignQuestionsToTest = async (req, res) => {
    const {testID} = req.params
    const {questionIDs} = req.body;
    try {
        const test = await Tests.findByPk(testID);

        if (!test) {
            return res.status(404).json({error: "Test not found"});
        }

        await TestQuestions.bulkCreate(
            questionIDs.map(
                questionID => ({testID: testID, questionID: questionID})
            )
        );

        res.status(200).json({
            message: "Question assigned to test",
            TestQuestions
        });

    } catch (error) {
        console.error("Error in assigning question to test: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const assignUsersToTest = async (req, res) => {
    const { testID } = req.params;
    const { userIDs } = req.body;

    try {
        const test = await Tests.findByPk(testID);
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        await Promise.all(userIDs.map(async ({ userID }) => {
            await UserTestHistory.create({
                TestID: testID,
                UserID: userID,
                StartTime: test.startTime,
                EndTime: test.endTime
            });
        }));

        res.status(200).json({
            message: "Users assigned to test"
        });
    } catch (error) {
        console.error("Error in assigning users to test: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
