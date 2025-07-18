const Company = require('../models/Company');

// Criar empresa
exports.create = async (req, res) => {
    try {
        const empresa = await Company.create(req.body);
        res.status(201).json(empresa);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar empresa', details: err });
    }
};

// Listar empresas
exports.getAll = async (req, res) => {
    const empresas = await Company.find();
    res.json(empresas);
};

// Buscar por ID
exports.getById = async (req, res) => {
    try {
        const empresa = await Company.findById(req.params.id);
        if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
        res.json(empresa);
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
};

// Atualizar
exports.update = async (req, res) => {
    try {
        const empresa = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(empresa);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar empresa' });
    }
};

// Deletar
exports.remove = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.json({ message: 'Empresa removida com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao remover empresa' });
    }
};