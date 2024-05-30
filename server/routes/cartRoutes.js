const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:userId/:productId', cartController.removeFromCart);
router.get('/check/:userId/:productId', cartController.checkCartItem);
router.post('/purchase', cartController.purchaseItem);
router.get('/purchase/:userId', cartController.getPurchaseDetails);

module.exports = router;
