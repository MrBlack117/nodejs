const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');
const key = 'super_secret_key'

module.exports.l_page = function (req, res) {
    res.format({
        html: function () {
            res.render('login', {
                user: req.user
            });
        }
    });
}

module.exports.r_page = function (req, res) {
    res.format({
        html: function () {
            res.render('register', {
                user: req.user
            });
        }
    });
}


module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                name: candidate.name
            }, key, {expiresIn: '1h'});
            res.status(200).json({
                message: 'Успішний вхід!',
                token: 'Bearer ' + token,
                name: candidate.name,
                email: candidate.email
            });
        } else {
            res.status(401).json({
                message: 'Невірний пароль!'
            });
        }
    } else {
        res.status(404).json({
            message: 'Користувача не знайдено!'
        });
    }

}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(409).json({
            message: 'Користувач вже існує!'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'Реєстрація успішна!',
                user: result
            });
        }).catch(err => {
            errorHandler(res, err);
        });
    }

}