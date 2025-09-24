import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import BottomNav from "../../components/bottomNav";
import { useRouter } from "expo-router";

export default function ReservaHotel() {
  
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Imagem ocupa metade do topo da tela */}
      <Image
        source={require("../../../frontend-mobile/assets/images/reservaBg.png")}
        style={styles.imagem}
        resizeMode="cover"
      />

      {/* Área inferior com informações do quarto */}
      <View style={styles.info}>
        <Text style={styles.titulo}>Quarto Aconchegante & {`\n`}Moderno</Text>
        <Text style={styles.subtitulo}>
          Conforto e elegância em um ambiente{`\n`} acolhedor.
        </Text>

        <Text style={styles.detalhesTitulo}>Detalhes</Text>
        <Text style={styles.detalhe}> Decoração com plantas e quadros artísticos</Text>
        <Text style={styles.detalhe}> Iluminação suave e moderna</Text>
        <Text style={styles.detalhe}> Ar-condicionado para seu bem-estar</Text>
        <Text style={styles.detalhe}> Janela ampla com luz natural</Text>
        <Text style={styles.detalhe}>Localizado em São Paulo - Rua das {`\n`} Palmeiras
        </Text>

        {/* Botão de confirmar reserva */}
        <TouchableOpacity onPress={() => router.push(`/reservas/reserva`)} 
        style={styles.botao}>
          <Text style={styles.textoBotao}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
}

// Estilos adaptáveis para mobile
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  imagem: {
    width: "100%",
    height: "40%",
  },
  info: {
    flex: 1,
    backgroundColor: "#142c42",
    padding: 20,
    marginTop: -20,
    borderRadius: 20, 
  },
  titulo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 5,
  },
  subtitulo: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 17,
  },
  detalhesTitulo: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    fontSize: 20,
  },
  detalhe: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "regular",
  },
  botao: {
    backgroundColor: "#006494",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 50,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
