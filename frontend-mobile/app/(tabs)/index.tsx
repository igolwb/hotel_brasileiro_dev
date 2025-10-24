import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/fundo.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* CONTEÚDO PRINCIPAL (logo, estrelas, textos) */}
        <View style={styles.contentContainer}>
          <View style={styles.hotel}>
            <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
          </View>

          <View style={styles.starsContainer}>
            <Image source={require("../../assets/images/star.png")} style={styles.star} />
            <Image source={require("../../assets/images/star.png")} style={styles.star} />
            <Image source={require("../../assets/images/star.png")} style={styles.star} />
            <Image source={require("../../assets/images/star.png")} style={styles.star} />
            <Image source={require("../../assets/images/star.png")} style={styles.star} />
          </View>

          <Text style={styles.slogan}>
            Aqui, o relógio se rende ao seu compasso
          </Text>
          <Text style={styles.subtitle}>
            Um hotel que é menos lugar, mais estado de espírito
          </Text>
        </View>

        {/* DIV SEPARADA PARA OS BOTÕES */}
        <View style={styles.buttonsContainer}>
          {/* Ir para Login */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/auth/Login")}
          >
            <Text style={styles.buttonText}>Prosseguir para login</Text>
          </TouchableOpacity>

          {/* Ir para Cadastro */}
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => router.push("/auth/Cadastro")}
          >
            <Text style={styles.buttonTextRegister}>Criar minha conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonAltRoute}
            onPress={() => router.push("/reservas/reservaConfirm")}
          >
            <Text style={styles.buttonTextRegister}>rota:</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    justifyContent: "space-between", // Alterado para distribuir espaço entre as divs
    alignItems: "center",
    padding: 20,
  },

  hotel: {
    marginTop: 0,
    marginBottom: 0,
  },

  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },

  buttonsContainer: {
    width: "100%",
    marginBottom: 30,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: -50, // Ajuste para descer as estrelas
    gap: 8,
    marginLeft: 35,
  },

  star: {
    width: 25,
    height: 25,
    marginHorizontal: 2,
  },

  slogan: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 40,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#006494",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",

  },
  buttonRegister: {
    backgroundColor: "#00405C",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
    buttonAltRoute: {
      marginTop: 20,
      marginBottom: 20,
    backgroundColor: "#00405C",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonTextRegister: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

    buttonRegister2: {
      justifyContent: "center",
    backgroundColor: "#6cadc9ff",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonTextRegister2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});