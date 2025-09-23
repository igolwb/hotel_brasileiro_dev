import React, { useEffect, useState } from 'react';
import './reservaGraphs.css';
import useAuthAdmin from '../../../hooks/adminAuth';
import useApiStore from '../../../services/web-api.js';
import AdminHeader from '../HeaderAdmin/adminHeader.js';
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
        grid: { drawOnChartArea: false,},

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
    
    <div>
      <AdminHeader />
      <p className="titulo-graph">Visualização Mensais</p>
      <div className="reserva-graphs-container">
        <div className="reserva-graphs-summary">

          <h3 className="reserva-graphs-title">Lucro e reservas acumulados</h3>

          <div className="reserva-graphs-period">
            <strong>Últimos 12 meses:</strong><br />
            R$ {stats?.profit_12m ?? '-'}<br />
            <span className="reserva-graphs-count">Reservas: {stats?.reservas_12m ?? '-'}</span>
          </div>

          <div className="reserva-graphs-period">
            <strong>Últimos 6 meses:</strong><br />
            R$ {stats?.profit_6m ?? '-'}<br />
            <span className="reserva-graphs-count">Reservas: {stats?.reservas_6m ?? '-'}</span>
          </div>

          <div className="reserva-graphs-period">
            <strong>Último mês:</strong><br />
            Lucro: R$ {stats?.profit_1m ?? '-'}<br />
            <span className="reserva-graphs-count">Reservas: {stats?.reservas_1m ?? '-'}</span>
          </div>

        </div>
        <div className="reserva-graphs-chart">
          <Line data={data} options={options} />  
        </div>

      </div>
    </div>
  );
};

export default ReservaGraphs;
