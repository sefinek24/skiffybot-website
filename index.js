const express = require('express');
const dd_options = {
	'response_code':true,
	'tags': ['app:my_app'],
};

const connect_datadog = require('connect-datadog')(dd_options);
const { hidePoweredBy } = require('helmet');
const morgan = require('morgan');
const { notFound, catchErrors } = require('./middlewares/errors.js');
const { version, lastUpdate } = require('./package.json');
require('dotenv').config();

const app = express();

app.use(hidePoweredBy());
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(connect_datadog);

// Logger
app.use(morgan(':method :url HTTP/:http-version [:status] :response-time ms - :user-agent'));

// Endpoints
app.get('/', (req, res) => res.render('index', { version, lastUpdate }));
app.get('/labybot', (req, res) => res.render('labybot'));
app.get('/server', (req, res) => res.render('server'));
app.get('/add', (req, res) => res.render('add'));
app.get('/version', (req, res) => res.json({ version }));

// Links
app.get('/support', (req, res) => res.redirect('https://discord.gg/YZmjrTgpDP'));
app.get('/supportOld', (req, res) => res.redirect('https://discord.gg/uV6HsqxBBC'));

// Errors
app.use(notFound);
app.use(catchErrors);

app.listen(process.env.PORT, () => {
	console.log(`Strona https://skiffybot.xyz została uruchomiona na http://127.0.0.1:${process.env.PORT}.`);
	if (process.env.NODE_ENV === 'production') process.send('ready');
});
