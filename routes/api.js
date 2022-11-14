const { Router } = require('express');
const CheckAuth = require('../middlewares/CheckAuth');
module.exports.Router = class Chatbot extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			res.status(200).json({
				data: {
					apiVersion: '7.0',
					apiAuthor: 'Vakea <leona.leroy@free.fr>',
					apiName: 'GHIDORAH',
				}
			});
		});
	}
};

module.exports.name = '/api';
