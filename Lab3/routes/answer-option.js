const express = require('express');
const router = express.Router();
const controller = require('../controllers/answer-option');
const passport = require('passport');

router.get('/:id', controller.getById); //get by questionId or answerOptionId
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete);
router.post('/:id/vote', passport.authenticate('jwt', {session: false}), controller.vote);

module.exports = router;