const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);
router.delete('/:id', orderController.remove);

module.exports = router;