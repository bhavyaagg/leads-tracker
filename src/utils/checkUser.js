/**
 * Created by bhavyaagg on 05/08/17.
 */

const models = require('../db/models').models;

module.exports = function () {
  return function (req, res, next) {
    models.Oneauth.findOne({
      where: {
        token: req.header('Authorization').split('Bearer ')[1]
      }
    }).then(function (oneauth) {
      if (oneauth !== null) {
        return next();
      } else {
        res.status(401).send({
          success: false,
          code: "401",
          error: {
            message: "Unauthorized"
          }
        })
      }
    })
  }
};