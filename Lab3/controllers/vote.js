const mongoose = require('mongoose');
const Vote = require('../models/vote');
const AnswerOption = mongoose.model('answerOptions');
const errorHandler = require('../utils/errorHandler');


// module.exports.find = function (req, res) { // find all votes for a question or all votes for a user
//     const id = req.params.id;
//     const answerOption = answerOptionsData.find(a => a.id === id);
//     if (answerOption) {
//         const votes = answerOption.votes;
//         res.status(200).json(votes);
//     } else {
//         const vote = votesData.find(v => v.id === id);
//         if (vote) {
//             res.status(200).json(vote);
//         } else {
//             const votes = votesData.filter(v => v.userEmail === id);
//             if (votes.length !== 0) {
//                 res.status(200).json(votes);
//             } else {
//                 res.status(404).json({
//                     message: 'Vote not found'
//                 });
//             }
//         }
//     }
// }



module.exports.create = function (req, res) {
    const vote = new Vote({
        userEmail: req.body.userEmail,
        answerOptionId: req.body.answerOptionId,
    });
    vote.save().then(result => {
            res.status(201).json({
                message: 'Голос створений!',
            });
        }
    ).then(
        AnswerOption.findByIdAndUpdate(req.body.answerOptionId, {$push: {votes: vote._id}})
    ).catch(err => {
        errorHandler(res, err);
    });
}


module.exports.delete = async function (req, res) {
    try {
        await Vote.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Голос видалений!'
        }).then(() => {
            AnswerOption.updateOne({votes: req.params.id}, {$pull: {votes: req.params.id}})
        });
    } catch (e) {
        errorHandler(res, e);
    }
}
