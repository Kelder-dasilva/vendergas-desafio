const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String },
    telefone: { type: String },
    endereco: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);