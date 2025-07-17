const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    nomeFantasia: { type: String, required: true },
    razaoSocial: { type: String },
    cnpj: { type: String, unique: true, required: true },
    cep: { type: String },
    endereco: { type: String },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // opcional
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);