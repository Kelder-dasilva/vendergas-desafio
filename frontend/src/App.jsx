import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Empresas from './pages/Empresas';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './context/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />

          <Route path="/empresas" element={
            <PrivateRoute><Empresas /></PrivateRoute>
          } />

          {/* futuras rotas protegidas para produtos, clientes, pedidos */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
