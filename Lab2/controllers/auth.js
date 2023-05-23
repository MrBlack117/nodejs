const User = require('../models/User');
const usersData = require('../data').users;
const jwt = require('jsonwebtoken');
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


module.exports.login = function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    const user = usersData.find(u => u.email === email);

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({
                    email: user.email,
                    admin: user.isAdmin,
                    name: user.name
                }, key, {expiresIn: '1h'}
            );

            res.status(200).json({
                message: 'Успішний вхід!',
                token: 'Bearer ' + token,
                name: user.name,
                email: user.email
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

module.exports.register = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const user = usersData.find(u => u.email === email);
    if (user) {
        res.status(409).json({
            message: 'Користувач вже існує!'
        });

    } else {
        const newUser = new User(email, password, name);
        usersData.push(newUser);
        res.status(201).json({
            message: 'Реєстрація успішна!',
            user: newUser
        });
    }

}