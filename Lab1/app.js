const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const votingRoutes = require('./routes/voting');
const questionRoutes = require('./routes/question');
const answerOptionRoutes = require('./routes/answer-option');
const voteRoutes = require('./routes/vote');
const app = express();

app.use(passport.initialize()); // Initialize passport
require('./middleware/passport')(passport); // Passport configuration
app.use(require('morgan')('dev')); // Allows to see requests in console
app.use(bodyParser.urlencoded({ extended: true })); // Allows to parse data from forms
app.use(bodyParser.json()); // Allows to parse JSON data
app.use(require('cors')()); // Allows to make requests from one origin to another origin

app.use('/auth', authRoutes);
app.use('/voting', votingRoutes);
app.use('/question', questionRoutes);
app.use('/answer-option', answerOptionRoutes);
app.use('/vote', voteRoutes);


module.exports = app;