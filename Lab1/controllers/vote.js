const Vote = require('../models/vote');
const votesData = require('../data').votes;
const answerOptionsData = require('../data').answerOptions;


module.exports.find = function (req, res) {
    const id = req.params.id;
    const answerOption = answerOptionsData.find(a => a.id === id);
    if (answerOption) {
        const votes = answerOption.votes;
        res.status(200).json(votes);
    } else {
        const vote = votesData.find(v => v.id === id);
        if (vote) {
            res.status(200).json(vote);
        } else {
            const votes = votesData.filter(v => v.userEmail === id);
            if (votes.length !== 0) {
                res.status(200).json(votes);
            } else {
                res.status(404).json({
                    message: 'Vote not found'
                });
            }
        }
    }
}

module.exports.getByUser = function (req, res) {
    const userEmail = req.params.userEmail;
    const vote = votesData.find(v => v.userEmail === userEmail);
    if (vote) {
        res.status(200).json(vote);
    } else {
        res.status(404).json({
            message: 'Vote not found'
        });
    }

}


module.exports.create = function (req, res) {
    const id = Math.random().toString(36).substr(2, 9);
    const userEmail = req.body.userEmail;
    const answerId = req.body.answerOptionId;
    const vote = new Vote(id, userEmail, answerId);
    votesData.push(vote);
    const answerOption = answerOptionsData.find(a => a.id === answerId);
    answerOption.votes.push(vote);
    res.status(201).json(vote);
}


module.exports.delete = function (req, res) {
    const id = req.params.id;
    const vote = votesData.find(v => v.id === id);
    const index = votesData.findIndex(v => v.id === id);
    if (index !== -1) {
        const answerOption = answerOptionsData.find(a => a.id === vote.answerOptionId);
        answerOption.votes.splice(answerOption.votes.indexOf(vote), 1);
        votesData.splice(index, 1);
        res.status(200).json({
            message: 'Vote deleted'
        });
    } else {
        res.status(404).json({
            message: 'Vote not found'
        });
    }
}
