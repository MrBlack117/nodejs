const Question = require('../models/question');
const questionsData = require('../data').questions;
const votingData = require('../data').votings;

module.exports.getById = function (req, res) { //get by VotingId or questionId
    const id = req.params.id;
    const question = questionsData.find(q => q.id === id);
    if (question) {
        res.status(200).json(question);
    } else {
        const voting = votingData.find(v => v.id === id);
        if (voting) {
            const questions = voting.questions;
            res.status(200).json(questions);
        } else {
            res.status(404).json({
                message: 'Question not found'
            });
        }
    }
}


module.exports.create = function (req, res) {
    const id = Math.random().toString(36).substr(2, 9);
    const questionText = req.body.questionText;
    const votingId = req.body.votingId;
    const question = new Question(id, votingId, questionText);
    const voting = votingData.find(v => v.id === votingId);
    if (voting) {
        voting.questions.push(question);
    } else {
        res.status(404).json({
            message: 'Voting for which you want to add a question not found'
        });
    }
    questionsData.push(question);
    res.status(201).json(question);
}

module.exports.update = function (req, res) {
    const id = req.params.id;
    const question = questionsData.find(q => q.id === id);
    if (question) {
        question.questionText = req.body.questionText;
        res.status(200).json(question);
    } else {
        res.status(404).json({
            message: 'Question not found'
        });
    }
}

module.exports.delete = function (req, res) {
    const id = req.params.id;
    const question = questionsData.find(q => q.id === id);
    const index = questionsData.findIndex(q => q.id === id);
    if (index !== -1) {
        const voting = votingData.find(v => v.id === question.votingId);
        if (voting) {
            const index = voting.questions.findIndex(q => q.id === id);
            if (index !== -1) {
                voting.questions.splice(index, 1);
            }
        }
        questionsData.splice(index, 1);
        res.status(200).json({
            message: 'Question deleted'
        });
    } else {
        res.status(404).json({
            message: 'Question not found'
        });
    }

}

