const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: String, unique: true, required: true },
    endereco: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);