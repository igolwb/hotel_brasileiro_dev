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
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// Componente principal da tela de login
export default function Login() {
    // Estados dos campos
    const [email, setEmail] = useState("");
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
                            style={styles.input}
                            placeholder="Digite seu email"
                            placeholderTextColor="#000"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
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
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#000"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                        />
                    </View>
                </View>

                {/* Botão para recuperar senha */}
                <TouchableOpacity
                    onPress={() => router.push("/auth/RecuperarSenha")}
                    style={styles.sa}
                >
                    <Text style={styles.texto}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                {/* Botão para entrar na home */}
                <TouchableOpacity
                    onPress={() => router.push("/home/home")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    topImage: {
        width: "100%",
        height: 381,
        resizeMode: "cover",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    texto: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "semibold",
        textAlign: "right",
        marginRight: 20,
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
        marginTop: -100,
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
        lineHeight: 26,
    },
    label: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        marginLeft: 2,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15.04,
        marginBottom: 18,
        paddingHorizontal: 14,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        backgroundColor: "transparent",
        borderRadius: 10,
        paddingVertical: 12,
        fontSize: 13,
    },
    button: {
        backgroundColor: "#006494",
        paddingVertical: 13,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 170,
        marginHorizontal: 14,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    sa: {
        // Adicione estilo para o botão de recuperar senha se quiser
    },
});
