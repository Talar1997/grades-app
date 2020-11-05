const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/validate', authController.checkTokenValidation);

//--Route security
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

//Only for admin
router
    .route('/')
    .get(userController.getAllUsers);

router
    .route('/:id')
    .get(userController.getUser);

router
    .route('/:id')
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router
    .route('/')
    .post(authController.signUp);

module.exports = router;