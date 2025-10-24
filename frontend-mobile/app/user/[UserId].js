import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNav from '../../components/bottomNav';
import { useLocalSearchParams, useRouter, useSegments } from 'expo-router';

import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { UserId } = useLocalSearchParams();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const id = await AsyncStorage.getItem("UserId");
        setUserId(id);
        if (token) {
          const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.106:3000";
          const response = await fetch(`${API_URL}/api/clientes/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data && data.success && data.data && data.data.nome) {
            setUserName(data.data.nome);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const router = useRouter();

  // Sign out function: remove auth data and navigate to home
  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["authToken", "UserId"]);
      router.replace("/");
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image
            source={require('../../assets/images/voltarBtn.png')}
            style={{ width: 48, height: 48 }}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/user_pfp.png')} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userName}</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/user/MinhasReservas')}
        >
          <Icon name="event" size={24} color="#fff" />
          <Text style={styles.optionText}>Minhas Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('/user/editUser')}
        >
          <Icon name="edit" size={24} color="#fff" />
          <Text style={styles.optionText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={signOut}>
          <Icon name="logout" size={24} color="#fff" />
          <Text style={styles.optionText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
};

// Seus estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1C2B', // Dark background color
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 150,
  },
  backButton: {
    position: 'absolute',
    top: -75,
    left: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ccc',
    marginBottom: 25,
  },
  username: {
    fontSize: 31,
    color: '#fff',
    fontWeight: 'bold',
  },
  optionsContainer: {
    alignContent: 'center',
    marginTop:30,
    marginBottom: 30,
    width:460,
    height:80, // Adjusted space for the options
  },
  optionButton: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Adjusted padding for the buttons
    paddingHorizontal: 20,
    marginBottom: 23, // Margin between buttons
    borderRadius: 25, // Rounded corners for the; button
    backgroundColor: '#1F2C3C', // Button background color
  },
  optionText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 15,
  },
});

export default ProfileScreen;