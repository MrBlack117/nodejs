const express = require('express');
const router = express.Router();
const controller = require('../controllers/voting');
const passport = require('passport');

router.get('/create', controller.creationPage);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/:id/results', controller.getResults);
router.get('/:id/edit', controller.editPage);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.put('/:id', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete);
router.post('/data',controller.addVotingData);


module.exports = router;

// TODO: add authentication
// router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
// passport.authenticate('jwt', {session: false})
