const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');
const verifyToken = require('../Middleware/Auth');

//http://localhost:3000/api/v1/user/signup
router.post('/login',UserController.logIn);//
router.post('/signup', UserController.signUp);//
router.get('/all-users',verifyToken(['Sales','PM','BA','Developer', 'Admin']), UserController.getAllUsers);//
router.get('/user-by',verifyToken(['Sales','PM','BA','Developer', 'Admin']),UserController.getByUserId);//
router.put('/update-user',verifyToken(['Sales','PM','BA','Developer', 'Admin']),UserController.updateUser);//
router.delete('/delete-user/:id',verifyToken(['Admin']),UserController.deleteUser);//
router.post('/forgot-password', UserController.forgotPassword);
router.put('/reset-password/:token', UserController.resetPassword);
router.put('/update-user-by/:id',verifyToken(['Admin']) , UserController.updateUserById);
router.post('/google-login', UserController.googleLogin);
module.exports = router;