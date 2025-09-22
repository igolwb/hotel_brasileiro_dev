import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/header";
import BottomNav from "../../components/bottomNav";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const rooms = [
  {
    id: "1",
    title: "Quarto Aconchegante & Moderno",
    description:
      "Conforto e elegância em um ambiente acolhedor.\n\n- Cama confortável\n- Decoração moderna\n- Iluminação suave\n- Ar-condicionado\n- Janela ampla",
    image: require("../../assets/images/quartoimg.png"),
  },
  {
    id: "2",
    title: "Quarto Aconchegante & Moderno",
    description:
      "Conforto e elegância em um ambiente acolhedor.\n\n- Cama confortável\n- Decoração moderna\n- Iluminação suave\n- Ar-condicionado\n- Janela ampla",
    image: require("../../assets/images/quartoimg.png"),
  },
];

// --- NOVOS DADOS DA SEÇÃO DE ENCONTROS ---
const encontros = [
  {
    id: "1",
    title: "Alvorada Secreta",
    time: "04h30 – 06h00",
    description:
      "Um pacto com a madrugada. Seguiremos, em silêncio, até o forno de barro onde o pão nasce sob as últimas estrelas.",
    image: require("../../assets/images/horario1.png"), // placeholder
  },
  {
    id: "2",
    title: "Passeio Surpresa",
    time: "19h00 – 21h00",
    description: "Uma caminhada para encontrar o inesperado ao cair da noite.",
    image: require("../../assets/images/horario2.png"), // placeholder
  },
];

export default function Home() {
const router = useRouter();

  const renderRoom = ({ item, index }) => (
    <View style={styles.card} key={item.id || index}>
      <Image source={item.image} style={styles.roomImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.roomTitle}>{item.title}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>
        <TouchableOpacity onPress={() => router.push("/reservas/quartoDesc")} style={styles.button}>
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEncontro = ({ item, index }) => (
    <View style={styles.encontroCard} key={item.id || index}>
      <ImageBackground
        source={item.image}
        style={styles.encontroImage}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.encontroOverlay}>
          <Text style={styles.encontroTime}>{item.time}</Text>
          <Text style={styles.encontroTitle}>{item.title}</Text>
          <Text style={styles.encontroDescription}>{item.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Top Image with Overlay */}
        <ImageBackground
          source={require("../../assets/images/homeBack.png")}
          style={styles.topImage}
        >
          <View style={styles.overlayTextContainer}>
            <Text style={styles.overlayText}>
              Aqui, o relógio se rende ao seu {'\n'}compasso
            </Text>
          </View>
        </ImageBackground>

        {/* Rooms Section */}
        <View style={[styles.section, { marginBottom: 4 }]}>
          <Text style={styles.sectionTitle}>Quartos</Text>
          <Text style={styles.sectionSubtitle}>
            Clique em um quarto e agende sua estadia
          </Text>

          <Carousel
            width={width * 0.7}
            height={500}
            data={rooms}
            renderItem={renderRoom}
            style={{ marginTop: 25, alignSelf: "center", gap: 20 }}
            loop={false}
            autoPlay={false}
            panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
          />
        </View>

        {/* --- NOVA SEÇÃO DE ENCONTROS --- */}
        <View style={[styles.sectionencontros, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Programamos encontros {'\n'}com o inesperado</Text>

          <Carousel
            width={width * 0.7}
            height={500}
            data={encontros}
            renderItem={renderEncontro}
            style={{ marginTop: 20, alignSelf: "center" }}
            loop={false}
            autoPlay={false}
            panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
          />
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13293D",
  },
  topImage: {
    width: "100%",
    height: 215,
    justifyContent: "flex-start",
  },
  overlayTextContainer: {
    padding: 20,
  },
  overlayText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "Poppins",
  },
  section: {
    paddingHorizontal: 20,
    height: 525,
  },

  sectionencontros: {
    paddingHorizontal: 20,
    height: 600,
  },
  sectionTitle: {
    display: "flex",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    marginTop: 15,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  roomImage: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 19,
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  roomDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#006494",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // --- Estilos para os cards de encontros ---
  encontroCard: {
    borderRadius: 12,
    overflow: "hidden",
  },
  encontroImage: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end",
  },
  encontroOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  encontroTime: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  encontroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  encontroDescription: {
    color: "#fff",
    fontSize: 14,
  },
});
