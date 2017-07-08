"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var secrets;
try {
    secrets = require('./../secrets.json');
}
catch (e) {
    console.error('Create your own secrets file lazybones');
    secrets = require('./../secret-sample.json');
}
var DATABASE_URL = process.env.DATABASE_URL || ('postgres://' + secrets.DB_USER + ":" + secrets.DB_PASSWORD + "@" + secrets.DB_HOST + ":5432/" + secrets.DATABASE);
var db = new Sequelize(DATABASE_URL);
db.sync({ force: false }).then(function () {
    console.log('Database configured');
});
var models = {};
exports.default = { models: models };
module.exports = { models: models };
//# sourceMappingURL=models.js.map