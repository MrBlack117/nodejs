module.exports = class Vote{
    constructor(id, userEmail, answerOptionId) {
        this.id = id;
        this.userEmail = userEmail;
        this.answerOptionId = answerOptionId;
    }
}