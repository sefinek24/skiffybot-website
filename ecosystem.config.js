module.exports = {
	apps: [{
		name            : 'skiffybot-website',
		script          : './index.js',
		log_date_format : 'HH:mm:ss, DD.MM.YYYY',
		error_file      : '/home/ubuntu/logs/www/main/error.log',
		out_file        : '/home/ubuntu/logs/www/main/out.log',

		max_restarts          : 10,
		restart_delay         : 6000,
		shutdown_with_message : true,
		wait_ready            : true,
		listen_timeout        : 10000,
	}],
};
