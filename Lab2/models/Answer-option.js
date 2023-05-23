module.exports = class AnswerOption{
    constructor(id, questionId, answerText){
        this.id = id;
        this.questionId = questionId;
        this.answerText = answerText;
        this.votes = [];
    }
}