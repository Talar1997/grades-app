const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authController = require('./../controllers/authController');

//--Route security
router.use(authController.protect);
router.use(authController.restrictTo('user', 'admin'));

router
    .route('/')
    .get(subjectController.getAll)
    .post(subjectController.createOne);

router
    .route('/:id')
    .get(subjectController.getOne);

router
    .route('/:id')
    .patch(subjectController.updateOne)
    .delete(subjectController.deleteOne);


module.exports = router;