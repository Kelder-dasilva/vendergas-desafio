import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Pedidos() {
    const [clientes, setClientes] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    console.log('pedidos', pedidos);
    

    const [clienteId, setClienteId] = useState('');
    const [empresaId, setEmpresaId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [itens, setItens] = useState([]);

    useEffect(() => {
        api.get('/clientes').then(res => setClientes(res.data));
        api.get('/empresas').then(res => setEmpresas(res.data));
        api.get('/produtos').then(res => setProdutos(res.data));
        api.get('/pedidos').then(res => setPedidos(res.data));
    }, []);

    const adicionarItem = () => {
        const produto = produtos.find(p => p._id === produtoId);
        if (!produto || quantidade <= 0) return;

        setItens(prev => [...prev, { produtoId, nome: produto.nome, preco: produto.preco, quantidade }]);
        setProdutoId('');
        setQuantidade(1);
    };

    const removerItem = (index) => {
        const novos = [...itens];
        novos.splice(index, 1);
        setItens(novos);
    };

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    const salvarPedido = async () => {
        try {
            const payload = {
                clienteId,
                empresaId,
                itens: itens.map(i => ({ produtoId: i.produtoId, quantidade: i.quantidade })),
                total,
            };

            await api.post('/pedidos', payload);
            alert('Pedido salvo com sucesso');
            setClienteId('');
            setEmpresaId('');
            setItens([]);
            api.get('/pedidos').then(res => setPedidos(res.data));
        } catch (err) {
            alert('Erro ao salvar pedido');
        }
    };

    return (
        <div className="page">
            <div className="form-box">
                <h2>Novo Pedido</h2>

                <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
                    <option value="">Selecione o cliente</option>
                    {clientes.map(c => (
                        <option key={c._id} value={c._id}>{c.nome}</option>
                    ))}
                </select>

                <select value={empresaId} onChange={e => setEmpresaId(e.target.value)}>
                    <option value="">Selecione a empresa</option>
                    {empresas.map(e => (
                        <option key={e._id} value={e._id}>{e.nomeFantasia}</option>
                    ))}
                </select>

                <select value={produtoId} onChange={e => setProdutoId(e.target.value)}>
                    <option value="">Selecione um produto</option>
                    {produtos.map(p => (
                        <option key={p._id} value={p._id}>{p.nome} - R$ {p.preco.toFixed(2)}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Quantidade"
                    min={1}
                    value={quantidade}
                    onChange={e => setQuantidade(parseInt(e.target.value))}
                />

                <button type="button" onClick={adicionarItem}>Adicionar Item</button>

                <hr />
                <br />
                <h3>Itens do Pedido:</h3>
                <div className='list'>
                    <ul className='card'>
                        {itens.map((item, index) => (
                            <li key={index}>
                                {item.nome} x {item.quantidade} = R$ {(item.preco * item.quantidade).toFixed(2)}
                                <button style={{ marginLeft: '8px' }} onClick={() => removerItem(index)}>❌</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <p><strong>Total: R$ {total.toFixed(2)}</strong></p>
                <button onClick={salvarPedido} disabled={!clienteId || !empresaId || itens.length === 0}>
                    Salvar Pedido
                </button>
            </div>

            <div className="list">
                <h2>Pedidos Registrados</h2>
                {pedidos.map(p => (
                    <div key={p._id} style={{
                        background: '#eee',
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '8px'
                    }}>
                        <strong>Cliente:</strong> {clientes.find(c => c._id === p.clienteId._id)?.nome || 'N/A'}<br />
                        <strong>Empresa:</strong> {empresas.find(e => e._id === p.empresaId._id)?.nomeFantasia || 'N/A'}<br />
                        <strong>Itens:</strong>
                        <div className="card">
                            <ul>
                                {p.itens.map((i, idx) => {
                                    const prod = produtos.find(prod => prod._id === i.produtoId._id);
                                    return (
                                        <li key={idx}>
                                            {prod?.nome || 'Produto'} x {i.quantidade}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <strong>Total:</strong> R$ {p.valorTotal ? p.valorTotal.toFixed(2) : '0,00'}
                    </div>
                ))}
            </div>
        </div>
    );
}