import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
    const navigate = useNavigate();
    const [transacoes, setTransacoes] = useState([]);
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [resGastos, resReceitas] = await Promise.all([
                    api.get('/api/gastos'),
                    api.get('/api/receitas')
                ]);

                // Normaliza Receitas
                const receitas = resReceitas.data.map(r => ({
                    id: r.id || r.idReceita || r.id_receita,
                    descricao: r.descricao || r.rctDescricao || r.rct_descricao || 'Receita',
                    valor: Number(r.valor ?? r.rctValor ?? r.rct_valor ?? 0),
                    tipo: 'Receita'
                }));

                // Normaliza Gastos (cobrindo todas as variações de nomes do Spring/Jackson)
                const gastos = resGastos.data.map(g => ({
                    id: g.id || g.idGasto || g.id_gasto,
                    descricao: g.descricao || g.gstDescricao || g.gst_descricao || g.descricaoGasto || 'Gasto',
                    valor: Number(g.valor ?? g.gstValor ?? g.gst_valor ?? g.valorGasto ?? 0),
                    tipo: 'Gasto'
                }));

                // Junta as duas listas para a tabela
                setTransacoes([...receitas, ...gastos]);

                // Calcula os totais exatos para o gráfico de barras
                const totalReceitas = receitas.reduce((acc, cur) => acc + cur.valor, 0);
                const totalGastos = gastos.reduce((acc, cur) => acc + cur.valor, 0);

                setDadosGrafico([
                    { categoria: 'Total', Receitas: totalReceitas, Gastos: totalGastos }
                ]);

            } catch (error) {
                console.error("Erro ao carregar dados do Oracle:", error);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

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

            {carregando ? (
                <p>A carregar dados da base de dados...</p>
            ) : (
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {/* Gráfico de Barras */}
                    <div style={{ flex: '2', minWidth: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '20px', color: '#555' }}>Balanço: Receitas vs Gastos</h3>
                        <div style={{ height: 300, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dadosGrafico} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="categoria" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Receitas" fill="#28a745" />
                                    <Bar dataKey="Gastos" fill="#dc3545" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tabela de Transações */}
                    <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '20px', color: '#555' }}>Últimas Transações</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #eee' }}>
                                    <th style={{ padding: '10px 0', color: '#666' }}>Descrição</th>
                                    <th style={{ padding: '10px 0', color: '#666' }}>Valor (R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transacoes.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" style={{ padding: '10px 0', color: '#999' }}>Nenhuma transação registada.</td>
                                    </tr>
                                ) : (
                                    transacoes.map((t, index) => (
                                        /* Chave única combinando o tipo, ID e índice para eliminar o aviso do console */
                                        <tr key={`${t.tipo}-${t.id}-${index}`} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '10px 0' }}>{t.descricao}</td>
                                            <td style={{ padding: '10px 0', color: t.tipo === 'Receita' ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                                                {t.tipo === 'Receita' ? '+' : '-'} {t.valor}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;