const express = require('express')
const router = express.Router()
const subjectController = require('./../../controllers/subjectController')
const {authorization, authentication} = require('../middleware/authMiddleware')
const {roles} = require("../../config/constants/roles")

//--Route security
router.use(authentication.protect)
router.use(authorization.restrictTo(roles.ADMIN, roles.USER))

router
    .route('/')
    .get(subjectController.getAll)
    .post(subjectController.createOne)

router
    .route('/:id')
    .get(subjectController.getOne)

router
    .route('/:id')
    .patch(subjectController.updateOne)
    .delete(subjectController.deleteOne)

module.exports = router;