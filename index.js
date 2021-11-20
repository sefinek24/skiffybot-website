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
	res.render(path.resolve(file), data);
	console.log(`GET ${req.path}`);
};


/* URLs */
app.get('/', (req, res) => {
	render('./ejs/index.ejs', req, res, { version, lastUpdate });
});

app.get('/server', (req, res) => {
	render('./ejs/server.ejs', req, res);
});

app.get('/add', (req, res) => {
	render('./ejs/add.ejs', req, res);
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
app.use((req, res) => {
	res.status(404).send('<h1>ERROR 404</h1>Podana strona nie istnieje.<br><br><a href="/">Strona główna</a>');
	console.log(`Cannot GET: ${req.path} [404]`);
});

app.use((err, req, res, next) => {
	res.status(500).send('<h1>ERROR 500</h1>Coś poszło nie tak.');
	console.log(`Cannot GET: ${req.path} [500]\n${err}`);

	return next;
});

app.listen(port, null, null, () => console.log(`Strona https://skiffybot.xyz została uruchomiona na porcie ${port}.`));