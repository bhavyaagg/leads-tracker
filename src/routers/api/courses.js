const router = require('express').Router();
const models = require('../../db/models').models;

// get all the courses
router.get('/', function (req, res) {
  models.Course.findAll().then(function (courses) {
    if (courses.length !== 0) {
      res.status(200).send({success: true, data: courses.map((course) => course.get())});
    } else {
      res.status(404).send({
        success: false
        , code: "404"
        , error: {
          message: "There are no courses."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: "Could not get all the courses(Internal Server Error)."
      }
    })
  })
});

//add any course
router.post('/add', function (req, res) {
  const courseData = req.body.courseData || {
      name: req.body.name
    };

  models.Course.create(courseData).then(function (course) {
    if (course) {
      res.status(201).send({success: true, data: course.get()});
    } else {
      res.status(400).send({
        success: false
        , code: "400"
        , error: {
          message: "Could not add the course(Incorrect Details)."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: "Could not add the course(Internal Server Error)."
      }
    })
  })
});

router.get('/:id', function (req, res) {
  const courseId = +req.params.id;
  models.Course.findByPrimary(courseId).then(function (course) {
    if (course) {
      res.status(200).send({success: true, data: course.get()});
    } else {
      res.status(404).send({
        success: false
        , code: "404"
        , error: {
          message: `No Course found for the id ${courseId}.`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: `Could not get the course with id ${courseId} (Internal Server Error).`
      }
    })
  })
});

// delete any course
router.delete('/:id', function (req, res) {
  const courseId = +req.params.id;
  models.Course.destroy({
    where: {id: courseId}
  }).then(function (noOfCoursesDeleted) {
    if (noOfCoursesDeleted !== 0) {
      res.status(200).send({success: true})
    } else {
      res.status(404).send({
        success: false
        , code: "404"
        , error: {
          message: `Could not delete the course with id ${courseId} (Course not found).`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: `Could not delete the course with id ${courseId} (Internal Server Error).`
      }
    })
  })
});

module.exports = router;

