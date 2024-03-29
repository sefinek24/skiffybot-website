const express = require('express');
const { hidePoweredBy } = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { notFound, catchErrors } = require('./middlewares/errors.js');
const { version, lastUpdate } = require('./package.json');
require('dotenv').config();

const app = express();

app.use(hidePoweredBy());
app.use(favicon('public/images/menu_icon-min.png'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Logger
app.use(morgan(':method :url [:status] :response-time ms - :user-agent'));

// Endpoints
app.get('/', (req, res) => res.render('index', { version, lastUpdate }));
app.get('/labybot', (req, res) => res.render('labybot'));
app.get('/server', (req, res) => res.render('server'));
app.get('/datadog', (req, res) => res.render('datadog'));
app.get('/version', (req, res) => res.json({ version }));

// Add bots
app.get('/add', (req, res) => res.render('add'));
app.get('/6obcy', (req, res) => res.send('Bot od 6obcy został wyłączony. Więcej informacji uzyskasz na naszym serwerze wsparcia.'));

// Links
app.get('/support', (req, res) => res.redirect('https://discord.gg/YZmjrTgpDP'));
app.get('/supportOld', (req, res) => res.redirect('https://discord.gg/uV6HsqxBBC'));

// Errors
app.use(notFound);
app.use(catchErrors);

app.listen(process.env.PORT, () => {
	console.log(`Strona https://skiffy.sefinek.fun została uruchomiona na http://127.0.0.1:${process.env.PORT}.`);
	if (process.env.NODE_ENV === 'production') process.send('ready');
});
