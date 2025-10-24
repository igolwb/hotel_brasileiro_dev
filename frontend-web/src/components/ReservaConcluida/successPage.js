import React, { useState, useEffect, useCallback } from "react";
import "./successPage.css";
import { Link } from "react-router-dom";

const SuccessPage = ({ selectedRoom, paymentReferenceId }) => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Ensure `room` is properly initialized
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

  // Function to verify payment status
  const verifyPaymentStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/status/${paymentReferenceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPaymentConfirmed(data.success && data.status === "CONFIRMED");
      } else {
        console.error("Failed to verify payment status");
      }
    } catch (error) {
      console.error("Error verifying payment status:", error);
    }
  }, [paymentReferenceId]);

  // Function to create a reservation in the database
  const createReservation = useCallback(async () => {
    if (!room || !paymentConfirmed) {
      console.warn("Missing reservation data or payment not confirmed.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          quarto_id: room.id,
          hospedes: room.guests,
          inicio: room.checkInDate,
          fim: room.checkOutDate,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to create reservation:", error);
        alert("Failed to create reservation. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("An error occurred while creating the reservation. Please try again later.");
    }
  }, [room, paymentConfirmed]);

  useEffect(() => {
    verifyPaymentStatus();
  }, [verifyPaymentStatus]);

  useEffect(() => {
    if (paymentConfirmed) {
      createReservation();
    }
  }, [paymentConfirmed, createReservation]);

  if (!room) {
    return (
      <div className="success-container">
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
    <div className="success-container">
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
