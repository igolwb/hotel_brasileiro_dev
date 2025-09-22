import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavegacaoStack from "./src/navegacao/NavegacaoStack";

export default function App() {
  return (
    <NavigationContainer>
      <NavegacaoStack />
    </NavigationContainer>
  );
}
