import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // 👈 novo

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', form);
            login(res.data.token);
            navigate('/dashboard'); // 👈 redireciona sem recarregar o app
        } catch (err) {
            alert('Login inválido');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
            <button type="submit">Entrar</button>
        </form>
    );
}