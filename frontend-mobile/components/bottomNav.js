import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={route.name === "home" ? styles.active : styles.button}
        onPress={() => navigation.navigate("home/home")}
      >
        <Image
          source={require("../assets/images/home-img.png")}
          style={styles.iconhome}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={route.name === "Chat" ? styles.active : styles.button}
        onPress={() => navigation.navigate("chat/chatPage")}
      >
        <Image
          source={require("../assets/images/chat-img.png")}
          style={styles.iconchat}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={route.name === "usuario" ? styles.active : styles.button}
        onPress={() => navigation.navigate("user/userPage")}
      >
        <Image
          source={require("../assets/images/user-img.png")}
          style={styles.iconuser}
        />
      </TouchableOpacity>
      {/* Add more buttons with images as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#004F70",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 60,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 30, // Rounded corners for floating effect
  },
  button: {
    padding: 10,
  },
  active: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  iconuser: {
    width: 34,
    height: 36,
  },
  iconhome: {
    width: 39,
    height: 36,
  },
  iconchat: {
    width: 41,
    height: 36,
  },
});
