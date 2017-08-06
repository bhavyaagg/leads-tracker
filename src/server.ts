import * as express from 'express'
import {Application} from 'express-serve-static-core'
import * as bp from 'body-parser'
import {default as db} from './db/models'
import apirouters = require('./routers/api');

const app: Application = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use('/api', apirouters);
app.use('/',express.static(__dirname+'./../public_html'));

export {
    db, app
}