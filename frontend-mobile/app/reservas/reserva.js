import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomNav from "../../components/bottomNav";
import { useRouter } from "expo-router";

export default function ReservaHotel() {
  const router = useRouter();

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [pessoas, setPessoas] = useState("");

  return (
    <View style={styles.container}>
      {/* Imagem ocupa metade do topo da tela */}
      <Image
        source={require("../../../frontend-mobile/assets/images/reservaBg.png")}
        style={styles.imagem}
        resizeMode="cover"
      />

      {/* Área inferior com inputs */}
      <View style={styles.info}>
        <Text style={styles.titulo}>Escolha suas datas </Text>

        <Text style={styles.label}>Quando seu descanso começa?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 25/12/2025"
          placeholderTextColor="#000"
          value={inicio}
          onChangeText={setInicio}
        />

        <Text style={styles.label}>Quando a saudade vai bater?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30/12/2025"
          placeholderTextColor="#000"
          value={fim}
          onChangeText={setFim}
        />

        <Text style={styles.label}>Quantidade de pessoas</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={pessoas}
          onChangeText={setPessoas}
        />

        {/* Botão de reservar */}
        <TouchableOpacity
          onPress={() => router.push(`/reservas/reserva`)}
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>Reservar</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    fontWeight: "bold",
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
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "semibold",

  },
  input: {
    backgroundColor: "#fff",
    color: "#fff",
    padding: 16,
    borderRadius: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#006494",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 30,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
