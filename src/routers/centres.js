const router = require('express').Router();
const models = require('./../db/models').models;

// get all the centers
router.get('/', function (req, res) {
  models.Centre.findAll().then(function (centres) {
    if (centres) {
      res.status(200).send(centres.map((centre) => centre.get()));
    } else {
      res.status(404).send({
        code: "404",
        error: {
          message: "There are no centres."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      code: "500",
      error: {
        message: "Could not get all the centres(Internal Server Error)."
      }
    })
  })
});

//add any center
router.post('/add', function () {
  const centreData = req.body.centreData || {
      name: req.body.name
    };

  models.Centre.create(centreData).then(function (centre) {
    if (centre) {
      res.status(201).send(centre.get());
    } else {
      res.status(400).send({
        code: "400",
        error: {
          message: "Could not add the centre(Incorrect Details)."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      code: "500",
      error: {
        message: "Could not add the centre(Internal Server Error)."
      }
    })
  })
});

router.get('/:id', function () {
  const centreId = +req.params.id;
  models.Centre.findByPrimary(centreId).then(function (centre) {
    if (centre) {
      res.status(200).send(centre.get());
    } else {
      res.status(404).send({
        code: "404",
        error: {
          message: `No Centre found for the id ${centreId}.`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      code: "500",
      error: {
        message: `Could not get the centre with id ${centreId} (Internal Server Error).`
      }
    })
  })
});

// delete any center
router.delete('/:id', function () {
  const centreId = +req.params.id;
  models.Centre.destroy({
    where: {id: centreId}
  }).then(function (noOfCentresDeleted) {
    if (noOfCentresDeleted !== 0) {
      res.status(200).send({"success": true})
    } else {
      res.status(404).send({
        code: "404",
        error: {
          message: `Could not delete the centre with id ${centreId} (Centre not found).`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      code: "500",
      error: {
        message: `Could not delete the centre with id ${centreId} (Internal Server Error).`
      }
    })
  })
});

module.exports = router;
