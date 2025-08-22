import React, { useEffect, useState } from 'react';
import useAuthAdmin from '../../../hooks/adminAuth';
import useApiStore from '../../../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReservaGraphs = () => {
  const { authHeader } = useAuthAdmin();
  const getReservasEstatisticas = useApiStore((state) => state.getReservasEstatisticas);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const result = await getReservasEstatisticas(authHeader);
        setStats(result);
      } catch (err) {
        setError('Erro ao buscar estatísticas');
      }
      setLoading(false);
    }
    fetchStats();
  }, [getReservasEstatisticas, authHeader]);

  // Prepare data for Chart.js
  const monthlyData = stats && stats.monthly_income ? stats.monthly_income : [];
  const labels = monthlyData.map((item) => item.month);
  const data = {
    labels,
    datasets: [
      {
        label: 'Lucro Mensal (R$)',
        data: monthlyData.map((item) => Number(item.income)),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Reservas por mês',
        data: monthlyData.map((item) => Number(item.count)),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
        type: 'line',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lucro e Reservas por Mês (Últimos 12 meses)',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const idx = context.dataIndex;
            const profit = monthlyData[idx]?.income ?? 0;
            const count = monthlyData[idx]?.count ?? 0;
            if (context.dataset.label === 'Lucro Mensal (R$)') {
              return `Lucro: R$ ${profit} | Reservas: ${count}`;
            } else if (context.dataset.label === 'Reservas por mês') {
              return `Reservas: ${count} | Lucro: R$ ${profit}`;
            }
            return context.formattedValue;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        position: 'left',
        title: {
          display: true,
          text: 'Lucro (R$)'
        },
        ticks: {
          callback: function(value) {
            return 'R$ ' + value;
          }
        }
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Reservas'
        },
      },
    },
  };

  if (loading) return <div>Carregando gráfico...</div>;
  if (error) return <div>{error}</div>;
  if (!monthlyData.length) return <div>Nenhum dado disponível.</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', alignItems: 'flex-start', margin: '2rem 0' }}>
      <div style={{ minWidth: 250, maxWidth: 300, background: '#f8f8f8', borderRadius: 8, padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Lucro Acumulado</h3>
        <div style={{ marginBottom: '0.7rem' }}>
          <strong>Últimos 12 meses:</strong><br />
          R$ {stats?.profit_12m ?? '-'}
        </div>
        <div style={{ marginBottom: '0.7rem' }}>
          <strong>Últimos 6 meses:</strong><br />
          R$ {stats?.profit_6m ?? '-'}
        </div>
        <div>
          <strong>Último mês:</strong><br />
          R$ {stats?.profit_1m ?? '-'}
        </div>
      </div>
      <div style={{ maxWidth: 700, flex: 1 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ReservaGraphs;
