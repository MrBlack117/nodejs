const mongoose = require("mongoose");
const client = require('../redisData');
const AnswerOption = mongoose.model('answerOptions');
const Question = mongoose.model('questions');
const errorHandler = require('../utils/errorHandler');


module.exports.getById = async function (req, res) {
    try {
        const answerOption = await AnswerOption.findById(req.params.id);
        let votesCount = await client.get(req.params.id);
        if (votesCount === null) {
            votesCount = 0;
        }
        res.status(200).json({
            option: answerOption,
            votesCount: votesCount
        });
    } catch (e) {
        errorHandler(res, e);
    }
}


module.exports.create = function (req, res) {
    const answerOption = new AnswerOption({
        answerText: req.body.answerText,
        questionId: req.body.questionId,
    });
    answerOption.save().then(result => {
            res.status(201).json({
                message: 'Відповідь створена!',
                answerOption: result
            });
            return Question.findByIdAndUpdate(req.body.questionId, {$push: {answerOptions: answerOption._id}})
        }
    ).then(result => {
        console.log('Відповідь додана до питання!');
       // client.set(result._id, 0);
    }).catch(err => {
        errorHandler(res, err);
    });
}

module.exports.delete = async function (req, res) {
    try {
        await Question.updateOne({answerOptions: req.params.id}, {$pull: {answerOptions: req.params.id}})
        await AnswerOption.remove({_id: req.params.id});
        await client.del(req.params.id);
        res.status(200).json({
            message: 'Відповідь видалена!'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    try {
        const answerOption = await AnswerOption.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(answerOption);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.vote = async function (req, res) {
    const answerOptionId = req.params.id;
    await client.incr(answerOptionId);
}
