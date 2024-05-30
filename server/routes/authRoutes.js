const express = require('express');
const authController = require('../controllers/authController');
const productsController = require('../controllers/productsController');


const router = express.Router();

router.post('/registration', authController.registerUser); 
router.post('/login', authController.loginUser); 
router.post('/', productsController.addSneakers);


module.exports = router;
