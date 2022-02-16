const express = require('express');
const { hidePoweredBy } = require('helmet');
const { notFound, catchErrors } = require('./middlewares/errors.js');
const { version } = require('./package.json');
require('dotenv').config();

const app = express();

app.use(hidePoweredBy());
app.use(express.static('public'));
app.use(express.json());

app.set('trust proxy', '1.1.1.1');
app.set('view engine', 'ejs');


/* Next */
app.get('*', (req, res, next) => {
	console.log(`GET ${req.originalUrl}`);
	next();
});

/* URLs */
app.get('/', (req, res) => res.render('index', { version }));
app.get('/labybot', (req, res) => res.render('labybot'));
app.get('/server', (req, res) => res.render('server'));
app.get('/add', (req, res) => res.render('add'));
app.get('/version', (req, res) => res.json({ version }));

/* Short links */
app.get('/serverUrl', (req, res) => res.redirect('https://discord.gg/uV6HsqxBBC'));
app.get('/serverOld', (req, res) => res.redirect('https://discord.gg/YZmjrTgpDP'));

/* Errors */
app.use(notFound);
app.use(catchErrors);

app.listen(process.env.PORT, () => {
	console.log(`Strona https://skiffybot.xyz została uruchomiona na http://127.0.0.1:${process.env.PORT}.`);
	if (process.env.NODE_ENV === 'production') process.send('ready');
});