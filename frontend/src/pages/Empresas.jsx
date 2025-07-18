import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Empresas() {
    const [empresas, setEmpresas] = useState([]);
    const [form, setForm] = useState({
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
        cep: '',
        endereco: ''
    });
    const [editId, setEditId] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [error, setError] = useState('');

    const fetchEmpresas = async () => {
        const res = await api.get('/empresas');
        setEmpresas(res.data);
    };

    useEffect(() => {
        fetchEmpresas();
    }, []);

    useEffect(() => {
        if (form.cep && form.cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${form.cep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.erro) {
                        setForm((prev) => ({
                            ...prev,
                            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}-${data.uf}`
                        }));
                    }
                });
        }
    }, [form.cep]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'cnpj') {
            value = value.replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/, '$1.$2')
                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d)/, '.$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .slice(0, 18);
        }

        if (name === 'cep') {
            value = value.replace(/\D/g, '').slice(0, 8);
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/empresas/${editId}`, form);
            } else {
                await api.post('/empresas', form);
            }
            setForm({
                nomeFantasia: '',
                razaoSocial: '',
                cnpj: '',
                cep: '',
                endereco: ''
            });
            setEditId(null);
            setError('');
            fetchEmpresas();
        } catch (err) {
            setError(err?.response?.data?.error || 'Erro ao salvar empresa');
        }
    };

    const handleEdit = (empresa) => {
        setForm({
            nomeFantasia: empresa.nomeFantasia,
            razaoSocial: empresa.razaoSocial,
            cnpj: empresa.cnpj,
            cep: empresa.cep || '',
            endereco: empresa.endereco || ''
        });
        setEditId(empresa._id);
    };

    const handleDelete = async (id) => {
        if (confirm('Deseja remover esta empresa?')) {
            await api.delete(`/empresas/${id}`);
            fetchEmpresas();
        }
    };

    const empresasFiltradas = empresas.filter((e) =>
        e.nomeFantasia?.toLowerCase().includes(filtro?.toLowerCase()) ||
        e.cnpj.includes(filtro)
    );

    return (
        <div className="page">
            <form onSubmit={handleSubmit} className="form-box">
                <h2>{editId ? 'Editar Empresa' : 'Cadastrar Empresa'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    name="nomeFantasia"
                    placeholder="Nome Fantasia"
                    value={form.nomeFantasia}
                    onChange={handleChange}
                />
                <input
                    name="razaoSocial"
                    placeholder="Razão Social"
                    value={form.razaoSocial}
                    onChange={handleChange}
                />
                <input
                    name="cnpj"
                    placeholder="CNPJ"
                    value={form.cnpj}
                    onChange={handleChange}
                />
                <input
                    name="cep"
                    placeholder="CEP"
                    value={form.cep}
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
                            setForm({
                                nomeFantasia: '',
                                razaoSocial: '',
                                cnpj: '',
                                cep: '',
                                endereco: ''
                            });
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <div className="list">
                <h2>Empresas Cadastradas</h2>
                <input
                    placeholder="Filtrar por nome ou CNPJ"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
                />

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {empresasFiltradas.map((empresa) => (
                        <div className="card">
                            <li key={empresa._id}>
                                <strong>{empresa.nomeFantasia}</strong><br />
                                Razão Social: {empresa.razaoSocial}<br />
                                CNPJ: {empresa.cnpj}<br />
                                CEP: {empresa.cep}<br />
                                Endereço: {empresa.endereco}
                                <br />
                                <br />
                                <button onClick={() => handleEdit(empresa)}>Editar</button>{' '}
                                <button onClick={() => handleDelete(empresa._id)}>Excluir</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}