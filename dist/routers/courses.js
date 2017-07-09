var router = require('express').Router();
var models = require('./../db/models').models;
// get all the courses
router.get('/', function (req, res) {
    models.Course.findAll().then(function (courses) {
        if (courses) {
            res.status(200).send(courses.map(function (course) { return course.get(); }));
        }
        else {
            res.status(404).send({
                code: "404",
                error: {
                    message: "There are no courses."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            code: "500",
            error: {
                message: "Could not get all the courses(Internal Server Error)."
            }
        });
    });
});
//add any course
router.post('/add', function () {
    var courseData = req.body.courseData || {
        name: req.body.name
    };
    models.Course.create(centreData).then(function (course) {
        if (course) {
            res.status(201).send(course.get());
        }
        else {
            res.status(400).send({
                code: "400",
                error: {
                    message: "Could not add the course(Incorrect Details)."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            code: "500",
            error: {
                message: "Could not add the course(Internal Server Error)."
            }
        });
    });
});
router.get('/:id', function () {
    var courseId = +req.params.id;
    models.Course.findByPrimary(courseId).then(function (course) {
        if (course) {
            res.status(200).send(course.get());
        }
        else {
            res.status(404).send({
                code: "404",
                error: {
                    message: "No Centre found for the id " + courseId + "."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            code: "500",
            error: {
                message: "Could not get the centre with id " + courseId + " (Internal Server Error)."
            }
        });
    });
});
// delete any course
router.delete('/:id', function () {
    var courseId = +req.params.id;
    models.Centre.destroy({
        where: { id: centreId }
    }).then(function (noOfCoursesDeleted) {
        if (noOfCoursesDeleted !== 0) {
            res.status(200).send({ "success": true });
        }
        else {
            res.status(404).send({
                code: "404",
                error: {
                    message: "Could not delete the centre with id " + courseId + " (Course not found)."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            code: "500",
            error: {
                message: "Could not delete the centre with id " + courseId + " (Internal Server Error)."
            }
        });
    });
});
module.exports = router;
//# sourceMappingURL=courses.js.map