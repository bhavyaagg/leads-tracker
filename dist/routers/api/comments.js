var router = require('express').Router();
var models = require('../../db/models').models;
// get all the comments of a lead
router.get('/:leadId', function (req, res) {
    var leadId = +req.params.leadId;
    models.Comment.findAll({
        where: { leadId: leadId },
        include: [models.User, models.Lead]
    }).then(function (comments) {
        if (comments) {
            res.status(200).send({ success: true, data: comments.map(function (comment) { return comment.get(); }) });
        }
        else {
            res.status(404).send({
                success: false,
                code: "404",
                error: {
                    message: "There are no comments for the lead with id " + leadId + "."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not get all the comments for the lead with id " + leadId + "(Internal Server Error)."
            }
        });
    });
});
//add a comment -- lead id will be there in the body
router.post('/add', function (req, res) {
    var userId = req.body.userId;
    var leadId = req.bodt.leadId;
    models.Comment.create({
        comment: req.body.comment,
        userId: userId,
        leadId: leadId
    }).then(function (comment) {
        if (comment) {
            res.status(201).send({
                success: true,
                data: comment.get()
            });
        }
        else {
            res.status(400).send({
                success: false,
                code: "400",
                error: {
                    message: "Could not add the Comment(Incorrect Details)."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not add the Comment(Internal Server Error)."
            }
        });
    });
});
// delete all comments of a lead
router.delete('/:leadId', function (req, res) {
    var leadId = +req.params.leadId;
    models.Comment.destroy({
        where: { leadId: leadId }
    }).then(function (noOfCommentsDeleted) {
        if (noOfCommentsDeleted !== 0) {
            res.status(200).send({ success: true });
        }
        else {
            res.status(404).send({
                success: false,
                code: "404",
                error: {
                    message: "Could not delete the Comments for the lead with id " + leadId + " (Comments not found)."
                }
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            code: "500",
            error: {
                message: "Could not delete the Comments for the lead with id " + leadId + " (Internal Server Error)."
            }
        });
    });
});
module.exports = router;
//# sourceMappingURL=comments.js.map