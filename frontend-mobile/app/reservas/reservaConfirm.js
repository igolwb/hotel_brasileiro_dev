import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomNav from "../../components/bottomNav";
import { useRouter } from "expo-router";

export default function ReservaConfirm({ navigation }) {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/reservaBg.png")}
      style={styles.background}
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/images/voltarBtn.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.room}>Quarto Aconchegante & Moderno</Text>

        <Text style={styles.label}>Experiência Adicional:</Text>
        <Text style={styles.value}>Alvorada Secreta</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Total</Text>
        <Text style={styles.value}>Investimento Total: R$ 2.300</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Pagamento - Pix</Text>
        <Text style={styles.value}>
          4fc206fb-cacb-4858-8d1e-06be251bdc78
        </Text>

        <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push("/reservas/reservaFinish")}>
          <Text style={styles.confirmText}>Confirmar reserva</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:500,
    height: 600,
    justifyContent: "flex-end", // keeps the sheet at the bottom
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    padding: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },

  backIcon: {
    width: 43,
    height: 40,
    tintColor: "#fff",
  },

  bottomSheet: {
    height: 500,
    maxWidth: "100%",
    backgroundColor: "rgba(12,34,63)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },

  room: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#a0aec0",
  },

  value: {
    fontSize: 16,
    color: "#fff",
  },

  confirmBtn: {
    backgroundColor: "#2bb2ff",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 70,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
