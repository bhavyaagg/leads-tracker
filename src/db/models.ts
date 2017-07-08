const Sequelize = require('sequelize');

var secrets;
try {
    secrets = require('./../secrets.json')
} catch (e) {
    console.error('Create your own secrets file lazybones');
    secrets = require('./../secret-sample.json')
}

const DATABASE_URL = process.env.DATABASE_URL || ('postgres://' + secrets.DB_USER + ":" + secrets.DB_PASSWORD + "@" + secrets.DB_HOST + ":5432/" + secrets.DATABASE);

const db = new Sequelize(DATABASE_URL);

db.sync({force: false}).then(() => {
    console.log('Database configured')
});

const models = {};

export default {models:models};
module.exports = {models:models};