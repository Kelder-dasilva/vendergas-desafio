const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    itens: [
        {
            produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantidade: Number
        }
    ],
    valorTotal: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);