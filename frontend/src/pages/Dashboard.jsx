import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../services/api';

export default function Dashboard() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('Gasto');
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const carregarTransacoes = async () => {
    let gastos = [];
    let receitas = [];

    // Procura Receitas
    try {
      const resReceitas = await api.get('/api/receitas');
      receitas = (resReceitas.data || []).map(r => ({ ...r, tipo: 'Receita' }));
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
    }

    // Procura Gastos
    try {
      const resGastos = await api.get('/api/gastos');
      gastos = (resGastos.data || []).map(g => ({ ...g, tipo: 'Gasto' }));
    } catch (error) {
      console.error("Erro ao carregar gastos:", error);
    }

    setTransacoes([...gastos, ...receitas]);
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        descricao,
        valor: parseFloat(valor)
      };

      if (tipo === 'Gasto') {
        await api.post('/api/gastos', payload);
      } else {
        await api.post('/api/receitas', payload);
      }

      setDescricao('');
      setValor('');
      await carregarTransacoes();
    } catch (error) {
      alert("Erro ao gravar na base de dados Oracle.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, tipoItem) => {
    try {
      if (tipoItem === 'Gasto') {
        await api.delete(`/api/gastos/${id}`);
      } else {
        await api.delete(`/api/receitas/${id}`);
      }
      await carregarTransacoes();
    } catch (error) {
      alert("Erro ao apagar transação.");
    }
  };

  const totalGastos = transacoes
    .filter(t => t.tipo === 'Gasto')
    .reduce((acc, t) => acc + (t.valor || 0), 0);

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'Receita')
    .reduce((acc, t) => acc + (t.valor || 0), 0);

  const chartData = [
    { name: 'Gastos', total: totalGastos },
    { name: 'Receitas', total: totalReceitas }
  ];

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '32px', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', margin: '0 auto 32px auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Visão Geral - Prisma Fintech</h1>
        <button 
          onClick={handleLogout}
          style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Sair
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Card Formulário Nova Transação */}
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151', marginTop: 0, marginBottom: '16px' }}>Nova Transação</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              style={{ flex: '2', minWidth: '200px', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              style={{ flex: '1', minWidth: '120px', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' }}
            >
              <option value="Gasto">Gasto</option>
              <option value="Receita">Receita</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              style={{ 
                backgroundColor: tipo === 'Receita' ? '#22c55e' : '#ef4444', 
                color: '#ffffff', 
                border: 'none', 
                padding: '10px 24px', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                cursor: 'pointer', 
                opacity: loading ? 0.7 : 1 
              }}
            >
              {loading ? 'A guardar...' : (tipo === 'Receita' ? 'Entrada' : 'Adicionar')}
            </button>
          </form>
        </div>

        {/* Gráfico + Tabela */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          
          {/* Card Gráfico */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151', marginTop: 0, marginBottom: '20px' }}>Balanço: Receitas vs Gastos</h2>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(val) => `R$ ${val}`} />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                    <Cell fill="#ef4444" /> {/* Gastos - Vermelho */}
                    <Cell fill="#22c55e" /> {/* Receitas - Verde */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card Tabela */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151', marginTop: 0, marginBottom: '20px' }}>Últimas Transações</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '14px' }}>
                    <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Descrição</th>
                    <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Valor (R$)</th>
                    <th style={{ paddingBottom: '12px', fontWeight: '600', textAlign: 'right' }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoes.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ padding: '16px 0', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                        Nenhuma transação registada.
                      </td>
                    </tr>
                  ) : (
                    transacoes.map((t) => (
                      <tr key={`${t.tipo}-${t.id}`} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>{t.descricao}</td>
                        <td style={{ padding: '12px 0', fontWeight: '600', fontSize: '14px', color: t.tipo === 'Gasto' ? '#ef4444' : '#16a34a' }}>
                          {t.tipo === 'Gasto' ? `- ${t.valor}` : `+ ${t.valor}`}
                        </td>
                        <td style={{ padding: '12px 0', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDelete(t.id, t.tipo)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}