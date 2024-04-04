import Tests from "../../models/test.model.js";

export const createTest = async (req, res) => {
    const {testID, testName, startTime, endTime, createdBy} = req.body;

    try {
        const existingTest = await Tests.findOne({where: {testID}});
        if (existingTest) {
            res.status(400).json({error: "Test already exists"});
        }

        const newTest = await Tests.create({testID, testName, startTime, endTime, createdBy});
        if (newTest) {
            res.status(201).json({
                testID: newTest.testID,
                testName: newTest.testName,
                startTime: newTest.startTime,
                endTime: newTest.endTime,
                createdBy: newTest.createdBy
            });
        }
    } catch (error) {
        console.log("Error creating test: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const updateTest = async (req, res) => {
    try {
        const {testID} = req.params;
        const {testName, startTime, endTime, createdBy} = req.body;

        const existingTest = await Tests.findOne({where: {testID}});
        if (!existingTest) {
            res.status(404).json({error: "Test not found"});
        }

        const updateFields = {}
        switch (true) {
            // case testID !== undefined:
            //     updateFields.testID = testID;
            //     break;
            case testName !== undefined:
                updateFields.testName = testName;
                break;
            case startTime !== undefined:
                updateFields.startTime = startTime;
                break;
            case endTime !== undefined:
                updateFields.endTime = endTime;
                break;
            case createdBy !== undefined:
                updateFields.createdBy = createdBy;
                break;
            default:
                res.status(400).json({error: "No fields to update"});
        }

        const updatedTest = await Tests.update(updateFields, {where: {testID}});
        if (updatedTest) {
            res.status(200).json({
                testID: existingTest.testID,
                testName: existingTest.testName,
                startTime: existingTest.startTime,
                endTime: existingTest.endTime,
                createdBy: existingTest.createdBy
            });
        } else {
            res.status(400).json({error: "Failed to update test"});
        }

    } catch (error) {
        console.log("Error in updating test: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deleteTest = async (req, res) => {
    try {
        const {testID} = req.params;

        const existingTest = await Tests.findOne({where: {testID}});

        if (!existingTest) {
            res.status(404).json({error: "Test not found"});
        }

        const deletedTest = await Tests.destroy({where: {testID}});
        if (deletedTest) {
            res.status(200).json({message: "Test deleted successfully"});
        } else {
            res.status(400).json({error: "Failed to delete test"});
        }

    } catch (error) {
        console.log("Error in deleting test: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}