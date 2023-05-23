const express = require('express');
const router = express.Router();
const controller = require('../controllers/vote');
const passport = require('passport');

router.get('/:id', controller.find); // Get all votes for answer option or get vote by id (if id is not answer option id) or get all votes for user
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete);

module.exports = router;