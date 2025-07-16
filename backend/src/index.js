require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Teste inicial
app.get('/', (req, res) => {
    res.send('API Vendergas funcionando!');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });
