const { Router } = require('express');
module.exports.Router = class Endpoint extends Router {
    constructor() {
        super();

        this.post('/discord/interactions', function (req, res) {
            res.status(200).end();
        });
        this.post('/discord/verify-user', function (req, res) {
            console.log(req.body);
        });
    }
};

module.exports.name = '/endpoint';