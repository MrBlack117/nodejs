const Voting = require('../models/Voting');
const votingsData = require('../data').votings;

module.exports.getAll = function (req, res) {
    res.status(200).json(votingsData);
}

module.exports.getById = function (req, res) {
    const id = req.params.id;
    const voting = votingsData.find(v => v.id === id);
    if (voting) {
        res.status(200).json(voting);
    } else {
        res.status(404).json({
            message: 'Voting not found'
        });
    }
}

module.exports.create = function (req, res) {
    const id = Math.random().toString(36).substr(2, 9);
    const name = req.body.name;
    const description = req.body.description;
    const date = new Date() // TODO: исправить показ даты. Сейчас показывает только день
    const voting = new Voting(id, name, description, date);
    votingsData.push(voting);
    res.status(201).json(voting);
}

module.exports.update = function (req, res) {
    const id = req.params.id;
    const voting = votingsData.find(v => v.id === id);
    if (voting) {
        const name = req.body.name;
        const description = req.body.description;
        console.log(req.body);
        const date = new Date().getDate();
        const updatedVoting = new Voting(id, name, description, date);
        const index = votingsData.findIndex(v => v.id === id);
        votingsData[index] = updatedVoting;
        res.status(200).json(updatedVoting);
    } else {
        res.status(404).json({
            message: 'Voting not found'
        });
    }
}

module.exports.delete = function (req, res) {
    const id = req.params.id;
    const index = votingsData.findIndex(v => v.id === id);
    if (index !== -1) {
        votingsData.splice(index, 1);
        res.status(200).json({
            message: 'Voting deleted'
        });
    } else {
        res.status(404).json({
            message: 'Voting not found'
        });
    }
}
