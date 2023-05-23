const AnswerOption = require('../models/answer-option');
const answerOptionsData = require('../data').answerOptions;
const questionsData = require('../data').questions;


module.exports.getById = function (req, res) { // get by questionId or answerOptionId
    const id = req.params.id;
    const answerOption = answerOptionsData.find(a => a.id === id);
    if (answerOption) {
        res.status(200).json(answerOption);
    } else {
        const question = questionsData.find(q => q.id === id);
        if (question) {
            const answerOptions = question.answerOptions;
            res.status(200).json(answerOptions);
        } else {
            res.status(404).json({
                message: 'Answer option not found'
            });
        }
    }
}


module.exports.create = function (req, res) {
    const id = Math.random().toString(36).substr(2, 9);
    const answerText = req.body.answerText;
    const questionId = req.body.questionId;
    const answerOption = new AnswerOption(id, questionId, answerText);
    const question = questionsData.find(q => q.id === questionId);
    if (question) {
        question.answerOptions.push(answerOption);
    } else {
        res.status(404).json({
            message: 'Question for which you want to add an answer option not found'
        });
    }
    answerOptionsData.push(answerOption);
    res.status(201).json(answerOption);
}

module.exports.update = function (req, res) {
    const id = req.params.id;
    const answerOption = answerOptionsData.find(a => a.id === id);
    if (answerOption) {
        answerOption.answerText = req.body.answerText;
        res.status(200).json(answerOption);
    } else {
        res.status(404).json({
            message: 'Answer option not found'
        });
    }
}

module.exports.delete = function (req, res) {
    const id = req.params.id;
    const index = answerOptionsData.findIndex(a => a.id === id);
    if (index !== -1) {
        answerOptionsData.splice(index, 1);
        const question = questionsData.find(q => q.answerOptions.find(a => a.id === id));
        if (question) {
            const answerOptionIndex = question.answerOptions.findIndex(a => a.id === id);
            if (answerOptionIndex !== -1) {
                question.answerOptions.splice(answerOptionIndex, 1);
            }
        }
        res.status(200).json({
            message: 'Answer option deleted'
        });
    } else {
        res.status(404).json({
            message: 'Answer option not found'
        });
    }
}