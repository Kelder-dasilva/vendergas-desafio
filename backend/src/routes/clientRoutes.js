const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middlewares/auth');

// Protege todas as rotas com JWT
router.use(auth);

router.post('/', clientController.create);
router.get('/', clientController.getAll);
router.get('/:id', clientController.getById);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.remove);

module.exports = router;