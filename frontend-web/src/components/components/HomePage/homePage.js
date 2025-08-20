import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './HomePage.css';
import divisao from '../../assets/Divisão.svg';
// Importe as imagens das experiências
import hora1 from '../../assets/hora1.svg';
import hora2 from '../../assets/hora2.svg';
import hora3 from '../../assets/hora3.svg';
import hora4 from '../../assets/hora4.svg';
import hora5 from '../../assets/hora5.svg';
import linha4 from '../../assets/linha4.svg';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } }
  ]
};

const experiences = [
  {
    image: hora1,
    title: 'Alvorada Secreta',
    time: '04h30 – 06h00',
    description: 'Um pacto com a madrugada. Seguiremos, em silêncio, até o forno de barro onde o pão nasce sob as últimas estrelas.'
  },
  {
    image: hora2,
    title: 'Anoitecer em Vértice',
    time: '16h00 – 18h00',
    description: 'Uma jornada baseada em uma pergunta que você nos fizer ao chegar. Exemplo: “O que há no pé das pedras?” A resposta virá em forma de trilha, jantar e um objeto misterioso.'
  },
  {
    image: hora3,
    title: 'Meio-Dia de Redemoinho',
    time: '11h30 – 12h30',
    description: 'Deite-se na rede suspensa sobre o rio e deixe que o vento escute o indivíduo. Opções: “Grande Serão-Vertedouro” sussurrado, passeio de Manoel de Barro, código Morse, ou o canto das cigarras em loop infinito.'
  },
  {
    image: hora4,
    title: 'Tarde Encantada',
    time: '14h00 – 16h00',
    description: 'Um momento mágico para contemplar a natureza e se conectar com o silêncio das árvores.'
  },
  {
    image: hora5,
    title: 'Noite Estrelada',
    time: '20h00 – 22h00',
    description: 'Observação das estrelas com histórias e música ao redor da fogueira.'
  }
];

const HomePage = () => {
  // Estado para armazenar os quartos buscados da API
  const [rooms, setRooms] = useState([]);

  // Busca os quartos do backend ao carregar a página
  useEffect(() => {
    fetch('http://localhost:3000/api/quartos')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setRooms(data.data);
      })
      .catch(err => console.error('Erro ao buscar quartos:', err));
  }, []);

  return (
    <div>
      {/* Seção principal */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Aqui, o relógio se rende ao <br /> seu compasso
          </h1>
          <p>Um hotel que é menos lugar, mais estado de espírito</p>
        </div>
      </section>

      <img src={divisao} alt="Divisao" className="divisao" />

      {/* Seção dos quartos */}
      <section id="quartos" className="rooms-section">
        <div className="rooms-stripes"></div>
        <div className="rooms-content">
          <h2>Quartos</h2>
          <p>Onde o sono vira ritual</p>
          <Slider {...settings}>
            {rooms.map(room => (
              <div className="room-card" key={room.id}>
                <img src={room.imagem_url} alt={room.nome} className="room-image" />
                <div className="room-info">
                  <h3>{room.nome}</h3>
                  <p>{room.descricao}</p>
                  <Link to={`/reserva/${room.id}`} className="reserve-btn">Detalhes</Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Seção de experiencias */}
      <section id="experiencias" className="experiences-section">
        <div className="experiences-content">
          <h2>Programamos encontros com o inesperado</h2>
          <p>Aqui, até o ócio tem roteiro.</p>
          <Slider {...settings}>
            {experiences.map((exp, idx) => (
              <div className="experience-card" key={idx}>
                <img src={exp.image} alt={exp.title} className="experience-image" />
                <div className="experience-overlay">
                  <div className="experience-time">Horário<br />{exp.time}</div>
                  <h3>{exp.title}</h3>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <img src={linha4} alt="Divisor" className="wave-divider" />
      </section>
    </div>
  );
};

export default HomePage;
