import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Layout() {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <header style={{
                backgroundColor: '#1e1e2f',
                color: 'white',
                padding: '1rem',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>📦 VenderGas</h1>

                    <nav style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        <Link to="/empresas" style={linkStyle}>Empresas</Link>
                        <Link to="/produtos" style={linkStyle}>Produtos</Link>
                        <Link to="/clientes" style={linkStyle}>Clientes</Link>
                        <Link to="/pedidos" style={linkStyle}>Pedidos</Link>
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>👤 {user?.name}</span>
                        <button onClick={handleLogout} style={logoutStyle}>Sair</button>
                    </div>
                </div>
            </header>

            <div style={{ height: '90px' }} />

            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
}

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.2s',
};

const logoutStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
};