const Voting = require('../models/Voting');
const Question = require('../models/question');
const AnswerOption = require('../models/answer-option');
const errorHandler = require('../utils/errorHandler');

module.exports.getById = async function (req, res) {
    try {
        const voting = await Voting.findById(req.params.id);
        res.render('voting', {
            voting: voting,
            user: req.user
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const votings = await Voting.find();
        res.render('votings', {
            votings: votings,
            user: req.user
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.creationPage = async function (req, res) {
    res.render('votingCreation', {
        user: req.user
    });
}

module.exports.create = function (req, res) {

    const voting = new Voting({
        name: req.body.name,
        description: req.body.description,
    });
    voting.save().then(result => {
        res.status(201).json({
            message: 'Опитування створено!',
            voting: result
        });
    }).catch(err => {
        errorHandler(res, err);
    });
}

module.exports.delete = async function (req, res) {
    try {
        const voting = await Voting.findByIdAndDelete({_id: req.params.id});

        for (const questionID of voting.questions) {
            const question = await Question.findOneAndDelete({_id: questionID});

            for (const answerOptionID of question.answerOptions) {
                await AnswerOption.findByIdAndDelete({_id: answerOptionID})
            }
        }
        res.status(200).json({
            message: 'Опитування видалено!'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.editPage = async function (req, res) {
    const voting = await Voting.findById(req.params.id);
    if (voting) {
        res.format({
            html: function () {
                res.render('votingEdit', {
                    voting: voting,
                    user: req.user
                });
            }
        });
    } else {
        res.status(404).json({
            message: 'Voting not found'
        });
    }
}

module.exports.update = async function (req, res) {
    try {
        const voting = await Voting.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(voting);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getResults = async function (req, res) {
    try {
        const voting = await Voting.findById(req.params.id);
        if (voting) {
            res.format({
                html: function () {
                    res.render('votingResults', {
                        voting: voting,
                        user: req.user
                    });
                }
            });
        } else {
            res.status(404).json({
                message: 'Voting not found'
            });
        }
    }catch (e) {
        errorHandler(res, e);
    }
}
