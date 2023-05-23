const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.get('/login', controller.l_page);

router.get('/register', controller.r_page);

router.post('/login', controller.login);

router.post('/register', controller.register);


module.exports = router;