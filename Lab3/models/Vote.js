const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    user: {ref: 'users', type: Schema.Types.ObjectId, required: true},
    answerOption: {ref: 'answerOptions', type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('votes', voteSchema);