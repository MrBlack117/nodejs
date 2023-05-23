const Voting = require('../models/Voting');
const votingsData = require('../data').votings;

module.exports.creationPage = function (req, res) {
    res.render('votingCreation', {
        user: req.user
    });
}

module.exports.editPage = function (req, res) {
    const id = req.params.id;
    const voting = votingsData.find(v => v.id === id);
    if (voting) {
        res.format({
            html: function () {
                res.render('votingEdit', {
                    voting: voting,
                    user: req.user
                });
            }
        });
    } else {
        res.status(404).json({
            message: 'Voting not found'
        });
    }
}

module.exports.getAll = function (req, res) {
    res.format({
        html: function () {
            res.render('votings', {
                votings: votingsData,
                user: req.user
            });
        },
        json: function () {
            res.status(200).json(votingsData);
        }
    });
}

module.exports.getById = function (req, res) {
    const id = req.params.id;
    const voting = votingsData.find(v => v.id === id);
    if (voting) {
        res.format({
            html: function () {
                res.render('voting', {
                    voting: voting,
                    user: req.user
                });
            }
        });
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
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const date = (`${year}-${month}-${day} ${hours}:${minutes}`);

    const voting = new Voting(id, name, description, date);
    votingsData.push(voting);
    console.log(votingsData);
    res.status(201).json({
        message: 'Опитування створено успішно!',
        voting: voting
    });
}

module.exports.update = function (req, res) {
    const id = req.params.id;
    const voting = votingsData.find(v => v.id === id);
    if (voting) {
        voting.name = req.body.name;
        voting.description = req.body.description;
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        voting.date = (`${year}-${month}-${day} ${hours}:${minutes}`);
        res.status(200).json(voting);
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

module.exports.addVotingData = function (req, res) {
    let name = 'Voting';
    let description = 'Description description ';
    const id = Math.random().toString(36).substr(2, 9);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const date = (`${year}-${month}-${day} ${hours}:${minutes}`);
    for (let i = 0; i < 5; i++) {
        name = 'Voting' + i;
        description = 'Description description' + i;
        const voting = new Voting(id, name, description, date);
        votingsData.push(voting);
    }
    res.status(201).json(votingsData);
}

module.exports.getResults = function (req, res) {
    const id = req.params.id;
    const voting = votingsData.find(v => v.id === id);
    if (voting) {
        res.format({
            html: function () {
                res.render('votingResults', {
                    voting: voting,
                    user: req.user
                });
            }
        });
    } else {
        res.status(404).json({
            message: 'Voting not found'
        });
    }
}