import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
    const { logout, user } = useContext(AuthContext);

    return (
        <div>
            <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white' }}>
                <h2>Bem-vindo, {user?.id}</h2>
                <button onClick={logout}>Sair</button>
            </header>

            <nav style={{ margin: '1rem 0' }}>
                <Link to="/empresas" style={{ marginRight: '1rem' }}>Empresas</Link>
                <Link to="/produtos" style={{ marginRight: '1rem' }}>Produtos</Link>
                <Link to="/clientes" style={{ marginRight: '1rem' }}>Clientes</Link>
                <Link to="/pedidos">Pedidos</Link>
            </nav>
        </div>
    );
}