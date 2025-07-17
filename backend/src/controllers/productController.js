const Product = require('../models/Product');

// Criar produto
exports.create = async (req, res) => {
    try {
        const produto = await Product.create(req.body);
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar produto', details: err });
    }
};

// Listar todos os produtos
exports.getAll = async (req, res) => {
    const produtos = await Product.find().populate('empresaId', 'nome');
    res.json(produtos);
};

// Buscar por ID
exports.getById = async (req, res) => {
    try {
        const produto = await Product.findById(req.params.id).populate('empresaId');
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json(produto);
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
};

// Atualizar produto
exports.update = async (req, res) => {
    try {
        const produto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(produto);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar produto' });
    }
};

// Deletar produto
exports.remove = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao remover produto' });
    }
};