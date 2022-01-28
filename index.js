const express = require('express');
const { hidePoweredBy } = require('helmet');
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
app.get('/', (req, res) => res.render('index', { version, lastUpdate: process.env.LAST_UPDATE }));
app.get('/server', (req, res) => res.render('server'));
app.get('/add', (req, res) => res.render('add'));
app.get('/labybot', (req, res) => res.render('labybot'));
app.get('/version', (req, res) => res.json({ version }));

/* Short links */
app.get('/serverUrl', (req, res) => res.redirect('https://discord.gg/uV6HsqxBBC'));
app.get('/serverOld', (req, res) => res.redirect('https://discord.gg/YZmjrTgpDP'));

/* Errors */
const renderErr = (res, req, code, err, data = {}) => {
	if (err) console.error(err);

	const id = Math.floor(Math.random() * 999999 + 1);
	res.status(code).render(`./errors/${code}.ejs`, Object.assign({ code, id, err, url: req.originalUrl, shortUrl: req._parsedOriginalUrl.pathname }, data));

	console.log(`Cannot GET ${req.originalUrl} [HTTP ${code}] [ID ${id}]`);
};

app.use((req, res) => renderErr(res, req, 404));
app.use((err, req, res, next) => {
	renderErr(res, req, 500, err);
	return next;
});


app.listen(process.env.PORT, () => console.log(`Strona https://skiffybot.xyz została uruchomiona na http://127.0.0.1:${process.env.PORT}.`));