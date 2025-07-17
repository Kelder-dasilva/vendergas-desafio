const Client = require('../models/Client');

// Criar cliente
exports.create = async (req, res) => {
    try {
        const cliente = await Client.create(req.body);
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar cliente', details: err });
    }
};

// Listar todos os clientes
exports.getAll = async (req, res) => {
    const clientes = await Client.find();
    res.json(clientes);
};

// Buscar cliente por ID
exports.getById = async (req, res) => {
    try {
        const cliente = await Client.findById(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(cliente);
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
};

// Atualizar cliente
exports.update = async (req, res) => {
    try {
        const cliente = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(cliente);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar cliente' });
    }
};

// Deletar cliente
exports.remove = async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente removido com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao remover cliente' });
    }
};