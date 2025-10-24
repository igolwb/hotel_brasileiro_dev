import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import './ReservarPage.css';

const ReservaPage = () => {
  const { roomId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");

  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const getDiarias = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const dataInicio = new Date(checkInDate);
    const dataFim = new Date(checkOutDate);
    const diffTime = dataFim - dataInicio;
    const diarias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diarias > 0 ? diarias : 0;
  };

  const diarias = getDiarias();
  const total = selectedRoom && diarias > 0 ? (Number(selectedRoom.preco) * diarias) : 0;

  // Redirect if not logged in
  useEffect(() => {
    if (!authUser) {
      alert('Você precisa estar logado para fazer uma reserva.');
      navigate('/login');
    }
  }, [authUser, navigate]);

  // Fetch room data
  useEffect(() => {
    fetch(`http://localhost:3000/api/quartos/${roomId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setSelectedRoom(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [roomId]);

  // Create PagBank Checkout
const handlePaymentCheckout = async () => {
  setMensagemErro("");

  if (!checkInDate || !checkOutDate || !guests) {
    setMensagemErro('Preencha todos os campos!');
    return;
  }

  if (new Date(checkInDate) >= new Date(checkOutDate)) {
    setMensagemErro('A data de início deve ser anterior à data de fim.');
    return;
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataInicio = new Date(checkInDate);
  if (dataInicio < hoje) {
    setMensagemErro('Não é possível criar reservas no passado.');
    return;
  }

  try {
    const items = [
      {
        name: selectedRoom.nome,
        quantity: 1,
        unit_amount: Math.round(total * 100), // convert to cents
      },
    ];

    const user = authUser; // Use authUser directly if it's an object
    const customer = {
      name: user?.nome || 'Cliente',
      email: user?.email || 'cliente@teste.com',
      tax_id: '12345678909',
      phones: [
        { country: '55', area: '11', number: '999999999', type: 'MOBILE' },
      ],
    };

    const redirectUrls = {
      success: `${window.location.origin}/reserva/concluida`,
      failure: `${window.location.origin}/reserva/erro`,
    };

    const authorizationHeader = authHeader; // Use authHeader directly if it's a string
    const res = await fetch('http://localhost:3000/api/payments/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      body: JSON.stringify({
        referenceId: `reserva_${Date.now()}`,
        customer,
        items,
        redirectUrls,
      }),
    });

    const data = await res.json();

    if (data.success && data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert('Erro ao iniciar o pagamento.');
      console.error('Checkout error:', data);
    }
  } catch (error) {
    alert('Erro ao criar checkout.');
    console.error(error);
  }
};

  if (loading) return <div className="loading">Carregando...</div>;
  if (!selectedRoom) return <div className="loading">Quarto não encontrado.</div>;

  return (
    <div className="reservation-container">
      <div className="reservation-steps">
        {/* Step 1: Dates & Guests */}
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2>Sua estadia vai além de uma reserva</h2>
            <h3>Escolha suas datas</h3>
            <div className="date-picker">
              <div className="date-field">
                <label>Quando seu descanso começa?</label>
                <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
              </div>
              <div className="date-field">
                <label>Quando a saudade vai bater?</label>
                <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
              </div>
            </div>
            <div className="guest-counter">
              <h3>Quantidade de pessoas</h3>
              <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
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

        {/* Step 2: Selected Room */}
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2>Quarto escolhido</h2>
            <div className="room-carda">
              <img src={selectedRoom.imagem_url} alt={selectedRoom.nome} className="room-image" />
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
                {mensagemErro && (
                  <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>{mensagemErro}</div>
                )}
                <button className="confirm-button" onClick={handlePaymentCheckout}>
                  Prosseguir para o Pagamento
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
