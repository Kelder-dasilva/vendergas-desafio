import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [form, setForm] = useState({
        nome: '',
        codigo: '',
        descricao: '',
        preco: '',
        empresaId: ''
    });
    const [editId, setEditId] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProdutos();
        fetchEmpresas();
    }, []);

    const fetchProdutos = async () => {
        const res = await api.get('/produtos');
        setProdutos(res.data);
    };

    const fetchEmpresas = async () => {
        const res = await api.get('/empresas');
        setEmpresas(res.data);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'preco') {
            value = value.replace(/[^\d]/g, '');
            value = (parseInt(value) / 100).toFixed(2).replace('.', ',');
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const precoFormatado = parseFloat(form.preco.replace(',', '.'));
            const payload = { ...form, preco: precoFormatado };

            if (editId) {
                await api.put(`/produtos/${editId}`, payload);
            } else {
                await api.post('/produtos', payload);
            }

            setForm({ nome: '', codigo: '', descricao: '', preco: '', empresaId: '' });
            setEditId(null);
            setError('');
            fetchProdutos();
        } catch (err) {
            setError(err?.response?.data?.error || 'Erro ao salvar produto');
        }
    };

    const handleEdit = (produto) => {
        setForm({
            nome: produto.nome,
            codigo: produto.codigo,
            descricao: produto.descricao,
            preco: produto.preco.toFixed(2).replace('.', ','),
            empresaId: produto.empresaId || ''
        });
        setEditId(produto._id);
    };

    const handleDelete = async (id) => {
        if (confirm('Deseja remover este produto?')) {
            await api.delete(`/produtos/${id}`);
            fetchProdutos();
        }
    };

    const produtosFiltrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        p.codigo.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <form onSubmit={handleSubmit} style={{ width: '320px' }}>
                <h2>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                />
                <input
                    name="codigo"
                    placeholder="Código"
                    value={form.codigo}
                    onChange={handleChange}
                />
                <textarea
                    name="descricao"
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={handleChange}
                    rows={3}
                />
                <input
                    name="preco"
                    placeholder="Preço (R$)"
                    value={form.preco}
                    onChange={handleChange}
                />
                <select name="empresaId" value={form.empresaId} onChange={handleChange}>
                    <option value="">Selecione a empresa</option>
                    {empresas.map((e) => (
                        <option key={e._id} value={e._id}>
                            {e.nomeFantasia || e.nomeFantasia}
                        </option>
                    ))}
                </select>
                <button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
                {editId && (
                    <button type="button" onClick={() => {
                        setEditId(null);
                        setForm({ nome: '', codigo: '', descricao: '', preco: '', empresaId: '' });
                    }}>Cancelar</button>
                )}
            </form>

            <div style={{ flex: 1 }}>
                <h2>Produtos Cadastrados</h2>
                <input
                    placeholder="Filtrar por nome ou código"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
                />
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {produtosFiltrados.map((produto) => (
                        <li key={produto._id} style={{
                            background: '#f1f1f1',
                            marginBottom: '1rem',
                            padding: '1rem',
                            borderRadius: '6px'
                        }}>
                            <strong>{produto.nome}</strong><br />
                            Código: {produto.codigo}<br />
                            Descrição: {produto.descricao}<br />
                            Preço: R$ {produto.preco.toFixed(2).replace('.', ',')}<br />
                            Empresa: {empresas.find(e => e._id === produto.empresaId)?.nomeFantasia || 'N/A'}<br />
                            <button onClick={() => handleEdit(produto)}>Editar</button>{' '}
                            <button onClick={() => handleDelete(produto._id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}