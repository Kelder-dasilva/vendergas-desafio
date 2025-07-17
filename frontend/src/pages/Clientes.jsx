import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({
        nome: '',
        documento: '',
        telefone: '',
        endereco: ''
    });
    const [editId, setEditId] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const res = await api.get('/clientes');
        setClientes(res.data);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'documento') {
            value = value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            } else {
                value = value
                    .replace(/^(\d{2})(\d)/, '$1.$2')
                    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                    .replace(/\.(\d{3})(\d)/, '.$1/$2')
                    .replace(/(\d{4})(\d)/, '$1-$2');
            }
        }

        if (name === 'telefone') {
            value = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{5})(\d{4})$/, '$1-$2')
                .slice(0, 15);
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/clientes/${editId}`, form);
            } else {
                await api.post('/clientes', form);
            }

            setForm({ nome: '', documento: '', telefone: '', endereco: '' });
            setEditId(null);
            setError('');
            fetchClientes();
        } catch (err) {
            setError(err?.response?.data?.error || 'Erro ao salvar cliente');
        }
    };

    const handleEdit = (cliente) => {
        setForm({
            nome: cliente.nome,
            documento: cliente.documento,
            telefone: cliente.telefone,
            endereco: cliente.endereco
        });
        setEditId(cliente._id);
    };

    const handleDelete = async (id) => {
        if (confirm('Deseja remover este cliente?')) {
            await api.delete(`/clientes/${id}`);
            fetchClientes();
        }
    };

    const clientesFiltrados = clientes.filter((c) =>
        c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        c.documento.includes(filtro)
    );

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <form onSubmit={handleSubmit} style={{ width: '320px' }}>
                <h2>{editId ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                />
                <input
                    name="documento"
                    placeholder="CPF ou CNPJ"
                    value={form.documento}
                    onChange={handleChange}
                />
                <input
                    name="telefone"
                    placeholder="Telefone"
                    value={form.telefone}
                    onChange={handleChange}
                />
                <input
                    name="endereco"
                    placeholder="Endereço"
                    value={form.endereco}
                    onChange={handleChange}
                />
                <button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setForm({ nome: '', documento: '', telefone: '', endereco: '' });
                        }}
                    >Cancelar</button>
                )}
            </form>

            <div style={{ flex: 1 }}>
                <h2>Clientes Cadastrados</h2>
                <input
                    placeholder="Filtrar por nome ou documento"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
                />
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {clientesFiltrados.map((cliente) => (
                        <li key={cliente._id} style={{
                            background: '#f1f1f1',
                            marginBottom: '1rem',
                            padding: '1rem',
                            borderRadius: '6px'
                        }}>
                            <strong>{cliente.nome}</strong><br />
                            Documento: {cliente.documento}<br />
                            Telefone: {cliente.telefone}<br />
                            Endereço: {cliente.endereco}<br />
                            <button onClick={() => handleEdit(cliente)}>Editar</button>{' '}
                            <button onClick={() => handleDelete(cliente._id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}