import Answers from "../../models/answer.model.js";
import Questions from "../../models/question.model.js";

export const createAnswer = async (req, res) => {
    try {
        const {answers} = req.body;

        if (!Array.isArray(answers) || answers.length === 0) {
            return res.status(400).send("Invalid or empty answers array");
        }

        const newAnswer = await Answers.bulkCreate(answers);

        if (newAnswer) {
            res.status(201).json(
                newAnswer.map((answer, index) => ({
                        [`Answer ${index + 1}:`]: answer
                    })
                )
            );
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    } catch (error) {
        console.log("Error in creating answer: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const updateAnswer = async (req, res) => {
    try {
        const {answerID} = req.params;
        const {questionID, answerText, isCorrect} = req.body;

        const updateFields = {};
        switch (true) {
            case questionID !== undefined:
                updateFields.questionID = questionID;
                break;
            case answerText !== undefined:
                updateFields.answerText = answerText;
                break;
            case isCorrect !== undefined:
                updateFields.isCorrect = isCorrect;
                break;
            default:
                return res.status(400).send("No fields to update");
        }

        const updatedAnswer = await Answers.update(updateFields, {where: {answerID}});

        if (updatedAnswer) {
            res.status(200).json({
                message: "Answer updated successfully",
                answerID: answerID,
                questionID: questionID,
                answerText: answerText,
                isCorrect: isCorrect
            });
        } else {
            res.status(404).json({error: "Answer not found"});
        }
    } catch (error) {
        console.log("Error in updating answer: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deleteAnswer = async (req, res) => {
    try {
        const {answerID} = req.params;

        const deletedAnswer = await Answers.destroy({where: {answerID}});

        if (deletedAnswer) {
            res.status(200).json({
                message: "Answer deleted successfully"
            });
        } else {
            res.status(404).send("Answer not found");
        }
    } catch (error) {
        console.log("Error in deleting answer: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}