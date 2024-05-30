const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/', productsController.addSneakers);
router.get('/', productsController.getUserSneakers);
router.delete('/delete/sneakers/:sneakerId', productsController.deleteSneaker);
router.put('/edit/sneakers/:sneakerId', productsController.updateSneaker);

module.exports = router;
