import * as express from 'express'
import {Application} from 'express-serve-static-core'
import * as bp from 'body-parser'
import db = require('./db/models');
import apirouters = require('./routers/api');
console.log(db);

const app: Application = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use('/api', apirouters);

app.listen(8000, function (req, res, next) {
    console.log('Server Listening at 8000');
});