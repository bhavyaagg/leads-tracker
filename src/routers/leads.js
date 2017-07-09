const router = require('express').Router();
const models = require('/src/db/models.js').models;
// get all the leads
router.get('/', function (req, res) {
  models.Lead.findAll().then(function (leads) {
    if (leads) {
      res.status(200).send(leads.map((lead) => lead.get()));
    } else {
      res.status(404).send({
        "code": "404",
        "error": {
          "message": "There are no leads."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      "code": "500",
      "error": {
        "message": "Could not get all the leads(Internal Server Error)."
      }
    })
  })
});

// get details of a particular lead
router.get('/:id', function () {
  const leadId = +req.params.id;
  models.Lead.findByPrimary(leadId).then(function (lead) {
    if (lead) {
      res.status(200).send(lead.get());
    } else {
      res.status(404).send({
        "code": "404",
        "error": {
          "message": `No lead found for the id ${leadId}.`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      "code": "500",
      "error": {
        "message": `Could not get the leads with id ${leadId} (Internal Server Error).`
      }
    })
  })
});

//add any lead
router.post('/add', function () {
  const leadData = req.body.leadData || {
      name: req.body.name
      , email: req.body.email
      , contact: req.body.contact
      , dob: req.body.dob
      , gaurdianName: req.body.gaurdianName
      , gaurdianContact: req.body.gaurdianContact
      , gaurdianEmail: req.body.gaurdianEmail
      , college: req.body.college
      , branch: req.body.branch
      , university: req.body.university
      , collegeBatch: req.body.collegeBatch
      , address: req.body.address
      , city: req.body.city
      , state: req.body.state
      , pincode: req.body.pincode
      , coursesOfInterest: req.body.coursesOfInterest
      , centresOfInterest: req.body.centresOfInterest
      , whoToldYouAboutUs: req.body.whoToldYouAboutUs
      , VMCRollNumber: req.body.VMCRollNumber
      , CBRollNumber: req.body.CBRollNumber
      , cbStudentReferral: req.body.cbStudentReferral
      , status: req.body.status
    };

  models.Lead.create(leadData).then(function (lead) {
    if (lead) {
      res.status(201).send(lead.get());
    } else {
      res.status(400).send({
        "code": "400",
        "error": {
          "message": "Could not add the lead(Incorrect Details)."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      "code": "500",
      "error": {
        "message": "Could not add the lead(Internal Server Error)."
      }
    })
  })
});

//edit details of the lead
router.put('/:id', function () {
  const leadId = +req.params.id;
  const leadData = req.body.leadData || {
      name: req.body.name
      , email: req.body.email
      , contact: req.body.contact
      , dob: req.body.dob
      , gaurdianName: req.body.gaurdianName
      , gaurdianContact: req.body.gaurdianContact
      , gaurdianEmail: req.body.gaurdianEmail
      , college: req.body.college
      , branch: req.body.branch
      , university: req.body.university
      , collegeBatch: req.body.collegeBatch
      , address: req.body.address
      , city: req.body.city
      , state: req.body.state
      , pincode: req.body.pincode
      , coursesOfInterest: req.body.coursesOfInterest
      , centresOfInterest: req.body.centresOfInterest
      , whoToldYouAboutUs: req.body.whoToldYouAboutUs
      , VMCRollNumber: req.body.VMCRollNumber
      , CBRollNumber: req.body.CBRollNumber
      , cbStudentReferral: req.body.cbStudentReferral
      , status: req.body.status
    };

  models.Lead.update(leadData, {
    where: {id: leadId},
    returning: true
  }).then(function (rows) {
    const lead = rows[1];
    if (rows[0] !== 0 && lead) {
      res.status(201).send(lead.get());
    } else {
      res.status(404).send({
        "code": "404",
        "error": {
          "message": `Could not update the lead with id ${leadId} (Lead not found).`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      "code": "500",
      "error": {
        "message": `Could not update the lead with id ${leadId} (Internal Server Error).`
      }
    })
  })
});

// delete any lead
router.delete('/:id', function () {
  const leadId = +req.params.id;
  models.Lead.destroy({
    where: {id: leadId}
  }).then(function (noOfLeadsDestroyed) {
    if (noOfLeadsDestroyed !== 0) {
      res.status(200).send({"success": true})
    } else {
      res.status(404).send({
        "code": "404",
        "error": {
          "message": `Could not delete the lead with id ${leadId} (Lead not found).`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      "code": "500",
      "error": {
        "message": `Could not delete the lead with id ${leadId} (Internal Server Error).`
      }
    })
  })
});

module.exports = router;
