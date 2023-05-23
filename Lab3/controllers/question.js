
const mongoose = require('mongoose');
const Question = mongoose.model('questions');
const Voting = mongoose.model('votings');
const errorHandler = require('../utils/errorHandler');

module.exports.getById = async function (req, res) { //get by VotingId or questionId
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch (e) {
        errorHandler(res, e);
    }
}


module.exports.create = function (req, res) {
    const question = new Question({
        questionText: req.body.questionText,
        votingId: req.body.votingId,
    });
    question.save().then(result => {
            res.status(201).json({
                message: 'Питання створено!',
                question: result,
            });
            return Voting.findByIdAndUpdate(req.body.votingId, {$push: {questions: result._id}});
        })
        .then(() => {
            console.log('Питання додано до опитування!');
        })
        .catch(err => {
            errorHandler(res, err);
        });
};


module.exports.delete = async function (req, res) {
    try {
        await Voting.updateOne({questions: req.params.id}, {$pull: {questions: req.params.id}})
        await Question.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Питання видалено!'
        });
    } catch (e) {
        errorHandler(res, e);
    }

}

module.exports.update = async function (req, res) {
    try {
        const question = await Question.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(question);
    } catch (e) {
        errorHandler(res, e);
    }
}



