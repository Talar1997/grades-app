const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authController = require('./../controllers/authController');

//--Route security
router.use(authController.protect);
router.use(authController.restrictTo('user', 'admin'));

router
    .route('/')
    .get(studentController.getAll)
    .post(studentController.createOne);

router
    .route('/:id')
    .get(studentController.getOne);

router
    .route('/:id')
    .patch(studentController.updateOne)
    .delete(studentController.deleteOne);


module.exports = router;