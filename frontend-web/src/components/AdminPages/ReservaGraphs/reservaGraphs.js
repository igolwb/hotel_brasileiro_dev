
import React, { useEffect, useState } from 'react';
import useApiStore from '../../../services/api';
import useAuthAdmin from '../../../hooks/adminAuth';

const ReservaGraphs = () => {
  const { authHeader } = useAuthAdmin();
  const getReservasEstatisticas = useApiStore((state) => state.getReservasEstatisticas);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const data = await getReservasEstatisticas(authHeader);
      setStats(data);
      setLoading(false);
    }
    if (authHeader) fetchStats();
  }, [authHeader, getReservasEstatisticas]);

  if (loading) return <div>Carregando estatísticas...</div>;
  if (!stats) return <div>Erro ao carregar estatísticas.</div>;

  return ( 
    <div style={{ padding: '2rem' }}>
      <h2>Estatísticas das Reservas</h2>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <strong>Lucro total:</strong> R$ {stats.total_profit}
        </div>
        <div>
          <strong>Últimos 12 meses:</strong> R$ {stats.profit_12m}
        </div>
        <div>
          <strong>Últimos 6 meses:</strong> R$ {stats.profit_6m}
        </div>
        <div>
          <strong>Último mês:</strong> R$ {stats.profit_1m}
        </div>
      </div>
      <h3>Receita mensal (últimos 12 meses)</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Mês</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Receita (R$)</th>
          </tr>
        </thead>
        <tbody>
          {stats.monthly_income.map((row) => (
            <tr key={row.month}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.month}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.income}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservaGraphs;
