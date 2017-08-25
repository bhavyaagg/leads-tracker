/**
 * Created by bhavyaagg on 05/08/17.
 */

const router = require('express').Router();
const models = require('../../db/models').models;
const axios = require('axios');
const uid = require('uid2');

var secrets;
try {
  secrets = require('./../../../secrets.json');
} catch (e) {
  console.error('Create your own secrets file lazybones');
  secrets = require('./../../../secret-sample.json');
}

/**
 *
 * @api {post} /auth/ POST /auth/
 * @apiName PostAuth
 * @apiGroup Auth
 *
 * @apiParam {string} code The request code we get from 1st part of explicit Oauth2
 *
 * @apiErrorExample {json} ErrorResponse
 *      {
 *        "success": false,
 *        "code": "500",
 *        "error": {
 *            "message": "Could not post data to Oneauth API(Internal Server Error)."
 *        }
 *      }
 */
router.post('/', function (req, res) {
  axios.post('https://account.codingblocks.com/oauth/token',
    {
      "client_id": secrets.CLIENT_ID,
      "redirect_uri": secrets.REDIRECT_URI,
      "client_secret": secrets.CLIENT_SECRET,
      "grant_type": secrets.GRANT_TYPE,
      "code": req.body.code
    })
    .then(function (authtoken) {
      models.Oneauth.findOne({
        where: {
          oneauthToken: authtoken.data.access_token
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
            headers: {'Authorization': `Bearer ${authtoken.data.access_token}`}
          }).then(function (user) {
            if (user.data.role === 'admin' || user.data.role === 'employee') {
              models.Oneauth.create({
                user: {
                  name: user.data.firstname + " " + user.data.lastname,
                  email: user.data.email,
                  role: user.data.role
                }
                , oneauthToken: authtoken.data.access_token
                , token: uid(30)
              },{
                include: [models.User]
              }).then(function (oneauthFinal) {
                res.status(201).send({
                  success: true,
                  token: oneauthFinal.token
                })
              }).catch(function (err) {
                console.log(err);
                res.status(500).send({
                  success: false
                  , code: "500"
                  , error: {
                    message: "Could not create in Oneauth Table(Internal Server Error)."
                  }
                })
              })
            } else {
              return res.status(403).send({error: "Accessible to only CB employees"})
            }

          }).catch(function (err) {
            console.log(err);
            res.status(500).send({
              success: false
              , code: "500"
              , error: {
                message: "Could not get details from Oneauth API(Internal Server Error)."
              }
            })
          })
          //
          //
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
        message: "Could not post data to Oneauth API(Internal Server Error)."
      }
    })
  })
});

module.exports = router;