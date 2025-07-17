const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middlewares/auth'); // Protege rotas

// Todas as rotas abaixo exigem login
router.use(auth);

router.post('/', companyController.create);
router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.remove);

module.exports = router;