import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Package, Users, ClipboardList } from 'lucide-react';

export default function Dashboard() {
    const [dataHora, setDataHora] = useState('');

    useEffect(() => {
        const updateDataHora = () => {
            const agora = new Date();
            const formatado = agora.toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
            });
            setDataHora(formatado);
        };

        updateDataHora();
        const timer = setInterval(updateDataHora, 60000);

        return () => clearInterval(timer);
    }, []);

    const cards = [
        { icon: <Building size={32} />, label: 'Empresas', link: '/empresas' },
        { icon: <Package size={32} />, label: 'Produtos', link: '/produtos' },
        { icon: <Users size={32} />, label: 'Clientes', link: '/clientes' },
        { icon: <ClipboardList size={32} />, label: 'Pedidos', link: '/pedidos' },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
        }}>
            <h2>📅 {dataHora}</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '800px'
            }}>
                {cards.map((card) => (
                    <Link to={card.link} key={card.label} style={cardStyle}>
                        {card.icon}
                        <span>{card.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const cardStyle = {
    background: '#f4f4f4',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s',
    cursor: 'pointer',
};