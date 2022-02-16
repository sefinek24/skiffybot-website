const error = (res, req, code, err, data = {}) => {
	if (err) console.error(err);

	const id = Math.floor(Math.random() * 999999 + 1);
	res.status(code).render(`./errors/${code}.ejs`, Object.assign({ code, id, err, url: req.originalUrl, shortUrl: req.originalUrl }, data));

	console.log(`Cannot GET ${req.originalUrl} [HTTP ${code}] [ID ${id}]`);
};

exports.notFound = (req, res) => error(res, req, 404);
exports.catchErrors = (err, req, res, _next) => error(res, req, 500, err);
