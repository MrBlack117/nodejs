const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionText: {type: String, required: true},
    votingId: {ref: 'votings', type: Schema.Types.ObjectId, required: true},
    answerOptions: [{ref: 'answerOptions', type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('questions', questionSchema);