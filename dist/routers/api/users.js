var router = require('express').Router();
var models = require('../../db/models').models;
// get all the users
router.get('/', function (req, res) {
    models.User.findAll().then(function (users) {
        if (users.length !== 0) {
            return res.status(200).send({ success: true, data: users.map(function (user) { return user.get(); }) });
        }
        else {
            res.status(404).send({
                success: false,
                code: "404",
                error: {
                    message: "There are no Users."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not get all the Users(Internal Server Error)."
            }
        });
    });
});
// get details of a particular user
router.get('/:id', function (req, res) {
    models.User.findOne({
        where: { id: parseInt(req.params.id) }
    }).then(function (user) {
        if (user) {
            return res.status(200).send({ success: true, data: user.get() });
        }
        else {
            res.status(404).send({
                success: false,
                code: "404",
                error: {
                    message: "No User found for the id " + (+req.params.id) + "."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not get the User with id " + (+req.params.id) + " (Internal Server Error)."
            }
        });
    });
});
//add any user
router.post('/add', function (req, res) {
    var userData = req.body.userData || {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        centre: req.body.centre,
        designation: req.body.designation
    };
    models.User.create(userData).then(function (user) {
        if (user) {
            return res.status(201).send({ success: true, data: user.get() });
        }
        else {
            res.status(400).send({
                success: false,
                code: "400",
                error: {
                    message: "Could not add the User(Incorrect Details)."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not add the User(Internal Server Error)."
            }
        });
    });
});
//edit details of the user
router.put('/:id', function (req, res) {
    var userData = req.body.userData || {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        centre: req.body.centre,
        designation: req.body.designation
    };
    models.User.update(userData, {
        where: { id: parseInt(req.params.id) },
        returning: true
    }).then(function (rows) {
        var user = rows[1][0];
        if (rows[0] !== 0 && user) {
            res.status(200).send({ success: true, data: user.get() });
        }
        else {
            res.status(404).send({
                success: false,
                code: "404",
                error: {
                    message: "Could not update the user with id " + (+req.params.id) + " (User not found)."
                }
            });
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not update the user with id " + (+req.params.id) + " (Internal Server Error)."
            }
        });
    });
});
// delete any user
router.delete('/:id', function (req, res) {
    models.Tutor.destroy({
        where: { id: parseInt(req.params.id) },
        returning: true
    }).then(function (noOfUsersDeleted) {
        if (noOfUsersDeleted !== 0) {
            res.status(200).send({ success: true });
        }
        else {
            res.status(404).send({
                success: false,
                code: "404",
                error: {
                    message: "Could not delete the user with id " + (+req.params.id) + " (User not found)."
                }
            });
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not delete the lead with id " + (+req.params.id) + " (Internal Server Error)."
            }
        });
    });
});
module.exports = router;
//# sourceMappingURL=users.js.map