const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const verifyToken = require('../middleware/auth');

//http://localhost:3000/api/v1/user/signup
router.post('/login',UserController.logIn);//
router.post('/signup', UserController.signUp);//
router.get('/all-users',verifyToken(['Admin']), UserController.getAllUsers);//
router.get('/user-by',verifyToken(['Admin']),UserController.getByUserId);//
router.put('/update-user',verifyToken(['Admin']),UserController.updateUser);//
router.delete('/delete-user/:id',verifyToken(['Admin']),UserController.deleteUser);//
router.post('/forgot-password', UserController.forgotPassword);
router.put('/reset-password/:token', UserController.resetPassword);


module.exports = router;