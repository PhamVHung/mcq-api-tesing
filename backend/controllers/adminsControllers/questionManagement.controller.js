import Questions from "../../models/question.model.js";

export const createQuestion = async (req, res) => {
    try {
        const {questions} = req.body;

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).send("Invalid or empty questions array");
        }

        const newQuestion = await Questions.bulkCreate(questions);

        if (newQuestion.length > 0) {
            res.status(201).json(
                newQuestion.map((question, index) => ({
                        [`Question ${index + 1}:`]: question
                    })
                )
            );
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    } catch (error) {
        console.log("Error in creating question: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        const {questionID} = req.params;

        const deletedQuestion = await Questions.destroy({
            where: {questionID}
        });

        if (deletedQuestion) {
            res.status(200).json({
                message: "Question deleted successfully"
            });
        } else {
            res.status(404).json({error: "Question not found"});
        }
    } catch (error) {
        console.log("Error in deleting question: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const {questionID} = req.params;
        const {testID, questionText} = req.body;

        const updateFields = {};
        switch (true) {
            case testID !== undefined:
                updateFields.TestID = testID;
                break;
            case questionText !== undefined:
                updateFields.questionText = questionText;
                break;
            default:
                return res.status(400).send("No fields to update");
        }

        const updatedQuestion = await Questions.update(updateFields, {where: {questionID}});

        if (updatedQuestion) {
            res.status(200).json({
                message: "Question updated successfully",
                questionID: questionID,
                testID: testID,
                questionText: questionText
            });
        } else {
            res.status(404).json({error: "Question not found"});
        }
    } catch (error) {
        console.log("Error in updating question: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}