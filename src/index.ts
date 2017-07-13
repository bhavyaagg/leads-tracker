/**
 * Created by championswimmer on 13/07/17.
 */
import {app, db} from './server'

db.sync({force: false}).then(() => {
  console.log('Database configured')

  app.listen(8000, function (req, res, next) {
    console.log('Server Listening at 8000');
  });
});