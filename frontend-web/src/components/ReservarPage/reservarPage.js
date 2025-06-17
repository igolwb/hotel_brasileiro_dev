import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import './ReservarPage.css';

const ReservaPage = () => {
  // Obtém o ID do quarto da URL
  const { roomId } = useParams();
  // Estado para armazenar o quarto selecionado
  const [selectedRoom, setSelectedRoom] = useState(null);
  // Estado para datas de check-in e check-out
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  // Estado para quantidade de hóspedes
  const [guests, setGuests] = useState(1);
  // Estado de carregamento
  const [loading, setLoading] = useState(true);
  // Estado para mensagem de erro
  const [mensagemErro, setMensagemErro] = useState("");

  // Hooks de autenticação
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  // Função para calcular o número de diárias
  const getDiarias = () => {
    // Retorna 0 se datas não estiverem preenchidas
    if (!checkInDate || !checkOutDate) return 0;
    const dataInicio = new Date(checkInDate);
    const dataFim = new Date(checkOutDate);
    const diffTime = dataFim - dataInicio;
    const diarias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diarias > 0 ? diarias : 0;
  };

  // Calcula diárias e total
  const diarias = getDiarias();
  const total = selectedRoom && diarias > 0 ? (Number(selectedRoom.preco) * diarias) : 0;

  // Redireciona para login se usuário não estiver autenticado
  useEffect(() => {
    if (!authUser) {
      alert('Você precisa estar logado para fazer uma reserva.');
      navigate('/login');
      return;
    }
  }, [authUser, navigate]);

  // Busca os dados do quarto selecionado ao carregar a página
  useEffect(() => {
    fetch(`http://localhost:3000/api/quartos/${roomId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setSelectedRoom(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [roomId]);

  // Função para enviar a reserva para o backend
  const handleReserva = async () => {
    setMensagemErro(""); // Limpa mensagem anterior
    // Validação dos campos obrigatórios
    if (!checkInDate || !checkOutDate || !guests) {
      setMensagemErro('Preencha todos os campos!');
      return;
    }
    // Validação das datas
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setMensagemErro('A data de início deve ser anterior à data de fim.');
      return;
    }
    // Validação: não permitir reservas no passado
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataInicio = new Date(checkInDate);
    if (dataInicio < hoje) {
      setMensagemErro('Não é possível criar reservas no passado.');
      return;
    }
    try {
      // Envia a requisição de reserva
      const res = await fetch('http://localhost:3000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader
        },
        body: JSON.stringify({
          quarto_id: selectedRoom.id,
          hospedes: guests,
          inicio: checkInDate,
          fim: checkOutDate
        })
      });

      if (res.ok) {
        alert('Reserva criada com sucesso!');
        navigate('/minhas-reservas');
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao criar reserva');
      }
    } catch (error) {
      alert('Erro ao criar reserva');
    }
  };

  // Exibe carregamento ou mensagem de erro se necessário
  if (loading) return <div className="loading">Carregando...</div>;
  if (!selectedRoom) return <div className="loading">Quarto não encontrado.</div>;

  // Renderiza o formulário de reserva
  return (
    <div className="reservation-container">
      <div className="reservation-steps">
        {/* Step 1: Datas e Hóspedes */}
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2>Sua estadia vai além de uma reserva</h2>
            <h3>Escolha suas datas</h3>
            
            <div className="date-picker">
              <div className="date-field">
                <label>Quando seu descanso começa?</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              
              <div className="date-field">
                <label>Quando a saudade vai bater?</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
            </div>

            <div className="guest-counter">
              <h3>Quantidade de pessoas</h3>
              <select 
                value={guests} 
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3>Experiência Adicional:</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Alvorada Secreta</p>
            </div>
          </div>
        </div>

        {/* Step 2: Quarto Escolhido */}
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2>Quarto escolhido</h2>
            <div className="room-carda">
              <img 
                src={selectedRoom.imagem_url} 
                alt={selectedRoom.nome} 
                className="room-image" 
              />
              <div className="room-infoa">
                <h3>{selectedRoom.nome}</h3>
                <p>{selectedRoom.descricao}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Checkout */}
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h2>Checkout</h2>
            <div className="checkout-summary">
              <h3>Total</h3>
              
              {checkInDate && checkOutDate && (
                <div className="dates-summary">
                  <p>Check-in: {new Date(checkInDate).toLocaleDateString('pt-BR')}</p>
                  <p>Check-out: {new Date(checkOutDate).toLocaleDateString('pt-BR')}</p>
                  <p>Hóspedes: {guests}</p>
                  <p>Diárias: {diarias}</p>
                </div>
              )}

              <div className="price-total">
                <h2>Investimento Total: R$ {total.toFixed(2)}</h2>
              </div>

              <div className="payment-section">
                <h3>Pagamento</h3>
                <p>Faça seu pagamento via PIX</p>
                <div className="pix-key">
                  <h4>Chave aleatória</h4>
                  <code>4fc206fb-cacb-4858-8d1e-06be251bdc78</code>
                </div>
                {/* Mensagem de erro exibida acima do botão */}
                {mensagemErro && (
                  <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>{mensagemErro}</div>
                )}
                <button className="confirm-button" onClick={handleReserva}>
                  Confirmar reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservaPage;
