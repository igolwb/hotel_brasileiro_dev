import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 140,
    backgroundColor: "#13293D",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 150,
    height: 60,
    marginBottom: 10,
  },
});
