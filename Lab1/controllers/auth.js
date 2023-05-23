const User = require('../models/User');
const usersData = require('../data').users;
const jwt = require('jsonwebtoken');
const key = 'super_secret_key'

module.exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = usersData.find(u => u.email === email);

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({
                    email: user.email,
                    admin: user.isAdmin
                }, key, {expiresIn: '1h'}
            );
            res.status(200).json({
                token: 'Bearer ' + token
            });

        } else {
            res.status(401).json({message: 'Invalid password!'});
        }
    } else {
        res.status(404).json({message: 'User not found!'});
    }
}

module.exports.register = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = usersData.find(u => u.email === email);
    if (user) {
        res.status(409).json({message: 'User already exists!'});
    } else {
        const newUser = new User(email, password);
        usersData.push(newUser);
        res.status(201).json(newUser);
    }

}