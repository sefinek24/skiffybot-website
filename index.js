const express = require('express');
const helmet = require('helmet');
const ejs = require('ejs');
const path = require('path');
const { port } = require('./config.js');
const { version, lastUpdate } = require('./versions.json');

const app = express();

app.use(helmet.hidePoweredBy());
app.use(express.static('public'));

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(express.json());


/* Functions */
const render = (file, req, res, data = {}) => res.render(path.resolve(`./templates/${file}.ejs`), data);

/* Next */
app.get('*', (req, res, next) => {
	console.log(`GET ${req.path}`);
	next();
});

/* URLs */
app.get('/', (req, res) => render('index', req, res, { version, lastUpdate }));

app.get('/server', (req, res) => render('server', req, res));

app.get('/add', (req, res) => render('add', req, res));

app.get('/labybot', (req, res) => render('labybot', req, res));

app.get('/version', (req, res) => res.json({ version: version }));


/* Short URLs */
app.get('/serverUrl', (req, res) => res.redirect('https://discord.gg/uV6HsqxBBC'));
app.get('/serverOld', (req, res) => res.redirect('https://discord.gg/YZmjrTgpDP'));


/* Errors */
const renderError = (res, req, code, type, err, data = {}) => {
	if (err) console.error(err);

	const id = Math.floor(Math.random() * 999999 + 1);
	res.status(code).render(path.resolve(`./templates/errors/${code}.ejs`), Object.assign({ code, id, err, url: req.originalUrl, shortUrl: req._parsedOriginalUrl.pathname, type: type ? 'POST' : 'GET' }, data));

	console.log(`WebERR » Cannot GET: ${req.originalUrl} [${code}] [${id}]`);
};

app.use((req, res) => {
	renderError(res, req, 404, false);
});

app.use((err, req, res, next) => {
	renderError(res, req, 500, false, err);
	return next;
});

app.listen(port, null, null, () => console.log(`Strona https://skiffybot.xyz została uruchomiona na http://127.0.0.1:${port}.`));