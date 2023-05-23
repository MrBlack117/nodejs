const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votingSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    questions: [{ref: 'questions', type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('votings', votingSchema);
