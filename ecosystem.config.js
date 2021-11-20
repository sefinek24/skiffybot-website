module.exports = {
	apps : [{
		name            : 'skiffybot-website-old',
		script          : './index.js',
		log_date_format : 'HH:mm:ss, DD.MM.YYYY',
		error_file      : '/home/ubuntu/discord/logs/skiffybot-website-old/error.log',
		out_file        : '/home/ubuntu/discord/logs/skiffybot-website-old/out.log',
	}],

	deploy : {
		production : {
			user        : 'node',
		},
	},
};