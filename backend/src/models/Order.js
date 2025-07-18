// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//     produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantidade: { type: Number, required: true }
// });

// const OrderSchema = new mongoose.Schema({
//     clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
//     empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//     itens: [ItemSchema],
//     valorTotal: { type: Number },
//     dataPedido: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', OrderSchema);
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