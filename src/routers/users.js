const router = require('express').Router();
const models = require('./../db/models').models;

// get all the users
router.get('/', function (req, res) {
  models.User.findAll().then(function (users) {
    if (users) {
      return res.send({success: true, data: users})
    } else {
      return res.send({success: false, message: "No users are present"})
    }
  }).catch(function (err) {
    console.log(err);
    return res.send({success: false, message: "Could not get all the users"})
  })
});

// get details of a particular user
router.get('/:id', function () {
  models.User.findOne({
    where: {id: parseInt(req.params.id)}
  }).then(function (user) {
    if (user)
      return res.send({success: true, data: user})
    else
      return res.send({success: false, message: "No user with the given id is present"})
  }).catch(function (err) {
    console.log(err);
    return res.send({success: false, message: "Could not get the details of the user"})
  })
});

//add any user
router.post('/add', function () {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    centre: req.body.centre,
    designation: req.body.designation
  }).then(function (user) {
    if (user) {
      return res.send({success: true, message: "Successfully added the user"})
    } else {
      return res.send({success: false, message: "Could not add the user"})
    }
  }).catch(function (err) {
    console.log(err);
    return res.send({success: false, message: "Could not add the user"})
  })
});

//edit details of the user
router.put('/:id', function () {
  models.User.update({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    centre: req.body.centre,
    designation: req.body.designation
  }, {
    where: {id: parseInt(req.params.id)},
    returning: true
  }).then(function (rows) {
    if (rows[0] === 0) {
      res.send({success: false, data: 'User Does Not Exist'})
    } else {
      res.send({success: true, data: rows[1][0].get()});
    }
  }).catch(function (error) {
    console.error(error);
    res.send({success: false, data: 'Could not update the user details'})
  });
});

// delete any user
router.delete('/:id', function () {
  models.Tutor.destroy({
    where: {id: parseInt(req.params.id)},
    returning: true
  }).then(function (noOfUsersDeleted) {
    if (noOfUsersDeleted === 0) {
      res.send({success: false, data: 'User Does Not Exists'})
    } else {
      res.send({success: true, data: 'User Deleted'});
    }
  }).catch(function (error) {
    console.error(error);
    res.send({success: false, data: 'Could nnot delete the user'})
  });

});

module.export = router;