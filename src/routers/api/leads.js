const router = require('express').Router();
const models = require('../../db/models').models;
// get all the leads
router.get('/', function (req, res) {
  models.Lead.findAll().then(function (leads) {
    if (leads.length !== 0) {
      res.status(200).send({success: true, data: leads.map((lead) => lead.get())});
    } else {
      res.status(404).send({
        success: false
        , code: "404"
        , error: {
          message: "There are no leads."
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: "Could not get all the leads(Internal Server Error)."
      }
    })
  })
});

// get details of a particular lead
router.get('/:id', function (req, res) {
  const leadId = +req.params.id;
  models.Lead.findByPrimary(leadId).then(function (lead) {
    if (lead) {
      res.status(200).send({success: true, data: lead.get()});
    } else {
      res.status(404).send({
        success: false
        , code: "404"
        , error: {
          message: `No lead found for the id ${leadId}.`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: `Could not get the lead with id ${leadId} (Internal Server Error).`
      }
    })
  })
});

//add any lead
router.post('/add', function (req, res) {
  req.body.coursesOfInterest = req.body.coursesOfInterest ? req.body.coursesOfInterest.map(Number) : req.body.coursesOfInterest;
  req.body.centresOfInterest = req.body.centresOfInterest ? req.body.centresOfInterest.map(Number) : req.body.centresOfInterest;
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
      res.status(201).send({success: true, data: lead.get()});
    } else {
      res.status(400).send({
        success: false
        , code: "400"
        , error: {
          message: "Could not add the lead(Incorrect Details)."
        }
      })
    }
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).send({
        success: false
        , code: "400"
        , error: {
          message: "Could not add the lead(Incorrect Details)."
        }
      })
    } else {
      console.log(err);
      res.status(500).send({
        success: false
        , code: "500"
        , error: {
          message: "Could not add the lead(Internal Server Error)."
        }
      })
    }
  })
});

//edit details of the lead
router.put('/:id', function (req, res) {
    const leadId = +req.params.id;
    const leadData = req.body.leadData || {
        dob: req.body.dob
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
    if (req.body.name) {
      leadData.name = req.body.name;
    }
    if (req.body.email) {
      leadData.email = req.body.email;
    }
    if (req.body.contact) {
      leadData.contact = req.body.contact;
    }
    models.Lead.update(leadData, {
      where: {id: leadId},
      returning: true
    }).then(function (rows) {
      const lead = rows[1][0];
      if (rows[0] !== 0 && lead) {
        res.status(200).send({success: true, data: lead.get()});
      } else {
        res.status(404).send({
          success: false
          , code: "404"
          , error: {
            message: `Could not update the lead with id ${leadId} (Lead not found).`
          }
        })
      }
    }).catch(function (err) {
      console.log(err);
      res.status(500).send({
        success: false
        , code: "500"
        , error: {
          message: `Could not update the lead with id ${leadId} (Internal Server Error).`
        }
      })
    })
  }
);

// delete any lead
router.delete('/:id', function (req, res) {
  const leadId = +req.params.id;
  models.Lead.destroy({
    where: {id: leadId}
  }).then(function (noOfLeadsDeleted) {
    if (noOfLeadsDeleted !== 0) {
      res.status(200).send({success: true})
    } else {
      res.status(404).send({
        success: false
        , code: "404"
        , error: {
          message: `Could not delete the lead with id ${leadId} (Lead not found).`
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send({
      success: false
      , code: "500"
      , error: {
        message: `Could not delete the lead with id ${leadId} (Internal Server Error).`
      }
    })
  })
});

module.exports = router;
