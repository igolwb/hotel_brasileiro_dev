import { Link } from "react-router-dom";
import "./successPage.css";


const SuccessPage = ({ selectedRoom }) => {
  // Se selectedRoom não for passado via props, tenta recuperar do localStorage
  let room = selectedRoom;
  if (!room) {
    try {
      const stored = localStorage.getItem("successRoom");
      if (stored) {
        room = JSON.parse(stored);
      }
    } catch (e) {
      room = null;
    }
  }

  if (!room) {
    return (
      <div
        className="success-container"

      >
        <h1 className="success-title">Reserva não encontrada</h1>
        <Link to="/" className="back-button">
          Voltar para o início
        </Link>
      </div>
    );
  }

  // Compatibilidade: aceita tanto 'imagem' quanto 'imagem_url'
  const imagem = room.imagem || room.imagem_url;
  const nome = room.nome || "Quarto";
  const descricao = room.descricao || "";
  const caracteristicas = room.caracteristicas || [];
  const preco = room.preco || room.preco_total || "";

  return (
    <div
      className="success-container"
    >
      <h1 className="success-title">Quarto reservado com sucesso</h1>
      <div className="success-content">
        <div className="room-cardb">
          <img
            src={imagem}
            alt={nome}
            className="room-image"
          />
          <div className="room-infob">
            <h3>{nome}</h3>
            <p className="room-desc">{descricao}</p>
            {caracteristicas.length > 0 && (
              <ul className="room-features">
                {caracteristicas.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="success-summary">
          <h2>Total</h2>
          <p className="success-price">
            Investimento Total: R$ {preco}
          </p>
          <p className="success-message">
            A lua já sabe que você vem.
            <br />
            Prepare-se para um banho de estrelas.
          </p>
          <Link to="/" className="back-button">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
