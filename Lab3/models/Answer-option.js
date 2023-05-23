const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerOptionSchema = new Schema({
    answerText: {type: String, required: true},
    // votes: [{ref: 'votes', type: Schema.Types.ObjectId}],
    questionId: {ref: 'questions', type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('answerOptions', answerOptionSchema);