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

/* Functions */
const render = (file, req, res, data = {}) => {
	res.render(path.resolve(`./templates/${file}.ejs`), data);
	console.log(`GET ${req.path}`);
};


/* URLs */
app.get('/', (req, res) => {
	render('index', req, res, { version, lastUpdate });
});

app.get('/server', (req, res) => {
	render('server', req, res);
});

app.get('/add', (req, res) => {
	render('add', req, res);
});

app.get('/version', (req, res) => {
	res.send(version);
	console.log('GET /ver');
});


/* Short URLs */
app.get('/serverUrl', (req, res) => {
	res.redirect('https://discord.gg/uV6HsqxBBC');
	console.log('REDIRECT /serverUrl');
});


/* Errors */
const renderError = (res, req, code, type, err, data = {}) => {
	if (err) console.error(err);

	const id = Math.floor(Math.random() * 999999 + 1);
	res.status(code).render(path.resolve(`./templates/errors/${code}.ejs`), Object.assign({ code, id, url: req.originalUrl, shortUrl: req._parsedOriginalUrl.pathname, type: type ? 'POST' : 'GET', err }, data));

	console.log(`WebERR » Cannot GET: ${req.originalUrl} [${code}] [${id}]`);
};

app.use((req, res) => {
	renderError(res, req, 404, false);
});

app.use((err, req, res, next) => {
	renderError(res, req, 500, false, err);
	console.log(`Cannot GET: ${req.path} [500]\n${err}`);

	return next;
});

app.listen(port, null, null, () => console.log(`Strona https://skiffybot.xyz została uruchomiona na porcie ${port}.`));