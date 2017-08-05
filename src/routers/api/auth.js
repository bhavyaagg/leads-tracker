/**
 * Created by bhavyaagg on 05/08/17.
 */

const router = require('express').Router();
const models = require('../../db/models').models;
const axois = require('axios');

router.post('/',function (req, res) {
  axios.post('http://accounts.codingblocks.com/oauth/token')
});