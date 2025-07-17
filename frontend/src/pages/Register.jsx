import { useState } from 'react';
import api from '../services/api';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações básicas
        if (!form.name || !form.email || !form.password) {
            setError('Preencha todos os campos.');
            return;
        }

        if (form.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            await api.post('/auth/register', form);
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/'; // Redireciona para login
        } catch (err) {
            setError(err?.response?.data?.error || 'Erro ao cadastrar');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input name="name" placeholder="Nome" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
            <button type="submit">Cadastrar</button>
            <p>Já tem conta? <a href="/">Faça login</a></p>
        </form>
    );
}
