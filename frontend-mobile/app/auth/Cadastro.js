import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Componente principal da tela de cadastro
export default function Cadastro() {
  // Estados dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Imagem de topo */}
      <View>
        <ImageBackground
          source={require("../../assets/images/imagemCadastro.png")}
          style={styles.topImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#0B2A3A" }}
      >
        <View style={styles.formContainer}>
          {/* Logo e nome do hotel */}
          <View style={styles.headerRow}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={styles.inputs}>
          {/* Campo Nome */}
          <Text style={styles.label}>Nome</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={15}
              color="#000"
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
              placeholder="Digite seu nome"
              placeholderTextColor="#000"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* Campo Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="alternate-email"
              size={15}
              color="#000"
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
              placeholder="Digite seu email"
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Campo Telefone */}
          <Text style={styles.label}>Telefone</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="call-outline"
              size={15}
              color="#000"
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
              placeholder="Digite seu telefone"
              placeholderTextColor="#000"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Campo Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock-outline"
              size={15}
              color="#000"
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
              placeholder="Digite sua senha"
              placeholderTextColor="#000"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>
        </View>
        {/* Botão Criar Conta */}
        <TouchableOpacity onPress={() => router.push("/src/principal/Home")} style={styles.button}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#0B2A3A",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -60,
    paddingTop: 40,
  },
  inputs: {
    padding: 15,
    backgroundColor: "#0B2A3A",
    marginTop: -600,
    marginBottom: -20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 167,
    height: 170,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "medium",
    fontSize: 22,
    lineHeight: 24,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 2,
    fontWeight: "Light",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15.08,
    marginBottom: 22,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#006494",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 70,
    marginHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
