import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', form);
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login inválido');
        }
    };

    return (
        <div className="page">
            <form onSubmit={handleSubmit} className="form-box">
                <h2>Login</h2>
                <br />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button type="submit">Entrar</button>
                    <p style={{ marginTop: '0.4rem', marginLeft: '0.6rem' }}>
                        Não tem conta? <a href="/register">Cadastre-se</a>
                    </p>
                </div>
            </form>
        </div>
    );
}