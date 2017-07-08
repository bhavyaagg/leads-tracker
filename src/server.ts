import * as express from 'express'
import {Application} from 'express-serve-static-core'
import * as bp from 'body-parser'
import db = require('./db/models');

console.log(db.models);

const app: Application = express();

app.listen(4000, function (req, res, next) {
    console.log('Server Listening at 4000');
});