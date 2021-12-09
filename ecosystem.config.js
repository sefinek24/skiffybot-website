module.exports = {
	apps: [{
		name            : 'skiffybot-website',
		script          : './index.js',
		log_date_format : 'HH:mm:ss, DD.MM.YYYY',
		error_file      : '/home/ubuntu/logs/www/main/error.log',
		out_file        : '/home/ubuntu/logs/www/main/out.log',
	}],

	deploy: { production: { user: 'node' } },
};