module.exports = class Voting{
    constructor(id, name, description, date){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.questions = [];
    }
}