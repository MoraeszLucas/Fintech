import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    // Dados fictícios para testar o gráfico
    const dadosGrafico = [
        { mes: 'Jan', Receitas: 4000, Gastos: 2400 },
        { mes: 'Fev', Receitas: 3000, Gastos: 1398 },
        { mes: 'Mar', Receitas: 4200, Gastos: 3800 },
        { mes: 'Abr', Receitas: 4780, Gastos: 3908 },
        { mes: 'Mai', Receitas: 5890, Gastos: 4800 },
        { mes: 'Jun', Receitas: 4390, Gastos: 3800 },
    ];

    // Dados fictícios para testar a tabela
    const transacoes = [
        { id: 1, descricao: 'Salário', valor: 4500.00, tipo: 'Receita', data: '01/11/2026' },
        { id: 2, descricao: 'Aluguel', valor: 1500.00, tipo: 'Gasto', data: '05/11/2026' },
        { id: 3, descricao: 'Mercado', valor: 850.00, tipo: 'Gasto', data: '10/11/2026' },
        { id: 4, descricao: 'Internet', valor: 120.00, tipo: 'Gasto', data: '12/11/2026' },
    ];

    return (
        <div style={{ padding: '30px', backgroundColor: '#f4f4f9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#333' }}>Visão Geral - Prisma Fintech</h1>
                <button 
                    onClick={() => navigate('/login')}
                    style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Sair
                </button>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Cartão do Gráfico */}
                <div style={{ flex: '2', minWidth: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '20px', color: '#555' }}>Receitas vs Gastos (Semestre)</h3>
                    <div style={{ height: 300, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dadosGrafico} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Receitas" fill="#28a745" />
                                <Bar dataKey="Gastos" fill="#dc3545" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cartão da Tabela */}
                <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '20px', color: '#555' }}>Últimas Transações</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '10px 0', color: '#666' }}>Descrição</th>
                                <th style={{ padding: '10px 0', color: '#666' }}>Valor (R$)</th>
                                <th style={{ padding: '10px 0', color: '#666' }}>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoes.map((t) => (
                                <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px 0' }}>{t.descricao}</td>
                                    <td style={{ padding: '10px 0', color: t.tipo === 'Receita' ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                                        {t.tipo === 'Receita' ? '+' : '-'} {t.valor}
                                    </td>
                                    <td style={{ padding: '10px 0', fontSize: '14px', color: '#888' }}>{t.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;