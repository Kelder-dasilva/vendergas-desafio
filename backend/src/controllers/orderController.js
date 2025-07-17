const Order = require('../models/Order');
const Product = require('../models/Product');

// Calcular valor total do pedido
async function calcularTotal(itens) {
    let total = 0;
    for (let item of itens) {
        const produto = await Product.findById(item.produtoId);
        if (!produto) throw new Error('Produto não encontrado');
        total += produto.preco * item.quantidade;
    }
    return total;
}

// Criar pedido
exports.create = async (req, res) => {
    try {
        const total = await calcularTotal(req.body.itens);
        const pedido = await Order.create({ ...req.body, valorTotal: total });
        res.status(201).json(pedido);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar pedido', details: err.message });
    }
};

// Listar todos
exports.getAll = async (req, res) => {
    const pedidos = await Order.find()
        .populate('clienteId', 'nome')
        .populate('empresaId', 'nome')
        .populate('itens.produtoId', 'nome preco');
    res.json(pedidos);
};

// Buscar por ID
exports.getById = async (req, res) => {
    try {
        const pedido = await Order.findById(req.params.id)
            .populate('clienteId')
            .populate('empresaId')
            .populate('itens.produtoId');
        if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
        res.json(pedido);
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
};

// Deletar pedido
exports.remove = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pedido removido com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao remover pedido' });
    }
};