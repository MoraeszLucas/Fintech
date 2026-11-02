import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f4f9' }}>
            {/* Menu Lateral */}
            <div style={{ width: '250px', backgroundColor: '#1a1a2e', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>Prisma Fintech</h2>
                <ul style={{ listStyle: 'none', padding: 0, flex: 1 }}>
                    <li style={{ marginBottom: '15px', cursor: 'pointer', fontWeight: 'bold' }}>Dashboard</li>
                    <li style={{ marginBottom: '15px', cursor: 'pointer', opacity: 0.7 }}>Receitas</li>
                    <li style={{ marginBottom: '15px', cursor: 'pointer', opacity: 0.7 }}>Despesas</li>
                    <li style={{ marginBottom: '15px', cursor: 'pointer', opacity: 0.7 }}>Categorias</li>
                </ul>
                <button onClick={() => navigate('/login')} style={{ padding: '10px', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Sair
                </button>
            </div>

            {/* Conteúdo Principal */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <h1>Visão Geral</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>Bem-vindo ao seu painel de controlo financeiro.</p>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ margin: 0, color: '#666' }}>Saldo Atual</h3>
                        <h2 style={{ margin: '10px 0 0 0', color: '#0056b3' }}>R$ 0,00</h2>
                    </div>
                    <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ margin: 0, color: '#666' }}>Receitas (Mês)</h3>
                        <h2 style={{ margin: '10px 0 0 0', color: '#28a745' }}>R$ 0,00</h2>
                    </div>
                    <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ margin: 0, color: '#666' }}>Despesas (Mês)</h3>
                        <h2 style={{ margin: '10px 0 0 0', color: '#dc3545' }}>R$ 0,00</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;