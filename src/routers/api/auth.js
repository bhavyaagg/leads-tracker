/**
 * Created by bhavyaagg on 05/08/17.
 */

const router = require('express').Router();
const models = require('../../db/models').models;
const axios = require('axios');
var secrets;
try {
  secrets = require('./../../../secrets.json')
} catch (e) {
  console.error('Create your own secrets file lazybones');
  secrets = require('./../../../secret-sample.json');
}


router.post('/', function (req, res) {
  // TODO: Oneauth ID
  // console.log(1)
  console.log(req.body.code);
  console.log(secrets.CLIENT_ID);
  console.log(secrets.REDIRECT_URI)
  console.log(secrets.CLIENT_SECRET);
  console.log(secrets.GRANT_TYPE);
  axios.post('https://account.codingblocks.com/oauth/token',
    {
      "client_id" : secrets.CLIENT_IDI,
      "redirect_uri" : secrets.REDIRECT_URI,
      "client_secret" : secrets.CLIENT_SECRET,
      "grant_type" : secrets.GRANT_TYPE,
      "code"  : req.body.code
    })
    .then(function (authtoken) {
      console.log("2")
      models.Oneauth.findOne({
        where: {
          oneauthToken: authtoken.access_token
        }
      }).then(function (oneauth) {
        if (oneauth !== null) {
          res.status(200).send({
            success: true,
            token: oneauth.token
          })
        }
        else {
          axios.get('https://account.codingblocks.com/api/users/me', {
            headers: {'Authorization': `Bearer ${authtoken.access_token}`}
          }).then(function (user) {
            console.log(user);
          }).catch(function (err) {
            console.log(err);
            res.status(500).send({
              success: false
              , code: "500"
              , error: {
                message: "Could not find in Oneauth(Internal Server Error)."
              }
            })
          })
          //
          // models.Oneauth.create({
          //   user: {
          //     name: req.body.name,
          //     email: req.body.email,
          //     contact: req.body.contact,
          //     designation: req.body.designation,
          //     centre: req.body.centre
          //   }
          //   , oneauthToken: oneauth.access_token
          //   , token: uid(30)
          // }).then(function (oneauthFinal) {
          //   res.status(201).send({
          //     success: true,
          //     token: oneauthFinal.token
          //   })
          // }).catch(function (err) {
          //   console.log(err);
          //   res.status(500).send({
          //     success: false
          //     , code: "500"
          //     , error: {
          //       message: "Could not add to Oneauth(Internal Server Error)."
          //     }
          //   })
          // })
        }
      }).catch(function (err) {
        console.log(err);
        res.status(500).send({
          success: false
          , code: "500"
          , error: {
            message: "Could not find in Oneauth(Internal Server Error)."
          }
        })
      })
    }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: "Could not find in Oneauth(Internal Server Error)."
      }
    })
  })
});

module.exports = router;