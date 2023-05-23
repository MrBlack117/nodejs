module.exports = class Question {
    constructor(id, votingId, questionText) {
        this.id = id;
        this.votingId = votingId;
        this.questionText = questionText;
        this.answerOptions = [];
    }
}