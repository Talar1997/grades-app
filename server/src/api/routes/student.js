const express = require('express')
const router = express.Router()
const studentController = require('./../../controllers/studentController')
const {authorization, authentication} = require('../middleware/authMiddleware')
const {roles} = require("../../config/constants/roles")

//--Route security
router.use(authentication.protect)
router.use(authorization.restrictTo(roles.ADMIN, roles.USER))

router
    .route('/')
    .get(studentController.getAll)
    .post(studentController.createOne)

router
    .route('/:id')
    .get(studentController.getOne)

router
    .route('/:id')
    .patch(studentController.updateOne)
    .delete(studentController.deleteOne)

module.exports = router;