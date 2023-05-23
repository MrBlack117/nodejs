const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const votingRoutes = require('./routes/voting');
const questionRoutes = require('./routes/question');
const answerOptionRoutes = require('./routes/answer-option');
const voteRoutes = require('./routes/vote');
const jwt = require("jsonwebtoken");
const client = require('./redisData');
const app = express();
const key = 'super_secret_key';


mongoose.connect('mongodb+srv://Michael:11092002@nodelabs.btpzkm2.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));



app.use(passport.initialize()); // Initialize passport
require('./middleware/passport')(passport); // Passport configuration
app.use(require('morgan')('dev')); // Allows to see requests in console
app.use(bodyParser.urlencoded({extended: true})); // Allows to parse data from forms
app.use(bodyParser.json()); // Allows to parse JSON data
app.use(require('cors')()); // Allows to make requests from one origin to another origin
app.set('view engine', 'ejs'); // Allows to use ejs templates
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));
app.use('/js/bootstrap.js', express.static('node_modules/bootstrap/dist/js/bootstrap.js'));
app.use('/images', express.static('views/img')); // Logo
app.use('/style.css', express.static('views/style.css')); // Styles

app.use('/auth', authRoutes);
app.use('/voting', votingRoutes);
app.use('/question', questionRoutes);
app.use('/answer-option', answerOptionRoutes);
app.use('/vote', voteRoutes);

app.get('/', function (req, res) {
    res.render('main', {
        user: req.user
    });
});

module.exports = app;
