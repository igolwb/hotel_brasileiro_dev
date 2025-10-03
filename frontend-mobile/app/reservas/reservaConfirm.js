import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import BottomNav from '../../components/bottomNav';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReservaConfirm() {
  const router = useRouter();
  const {
    quartoId,
    quartoNome,
    quartoImage,
    checkInDate,
    checkOutDate,
    checkInDateISO,
    checkOutDateISO,
    guests,
    preco,
  } = useLocalSearchParams();

  const handleConfirmReserva = async () => {
    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.105.75.25:3000';
      const token = await AsyncStorage.getItem('authToken');

      const res = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          quarto_id: quartoId,
          hospedes: guests,
          inicio: checkInDateISO,
          fim: checkOutDateISO,
        }),
      });

      if (res.ok) {
        router.push({
          pathname: '/reservas/reservaFinish',
          params: {
            quartoNome,
            quartoImage,
            checkInDate,
            checkOutDate,
            guests,
          },
        });
      } else {
        const err = await res.json();
        console.error("Erro ao criar reserva:", err);
        Alert.alert('Erro', err.error || 'Erro ao criar reserva');
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
          source={{ uri: quartoImage }}
          style={styles.imagem}
          resizeMode="cover"
      />
      <ScrollView style={styles.info}>
          <Text style={styles.titulo}>Checkout</Text>
          <Text style={styles.roomName}>{quartoNome}</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Check-in:</Text>
            <Text style={styles.value}>{checkInDate}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Check-out:</Text>
            <Text style={styles.value}>{checkOutDate}</Text>
          </View>
          
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Hóspedes:</Text>
            <Text style={styles.value}>{guests}</Text>
          </View>

          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Investimento Total: R$ {preco}</Text>

          <TouchableOpacity style={styles.botao} onPress={handleConfirmReserva}>
              <Text style={styles.textoBotao}>Confirmar reserva</Text>
          </TouchableOpacity>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#13293D',
  },
  imagem: {
      width: '100%',
      height: '40%',
  },
  info: {
      flex: 1,
      backgroundColor: '#142c42',
      padding: 20,
      marginTop: -20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
  },
  titulo: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 8,
  },
  roomName: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 15,
  },
  label: {
      color: '#a0aec0',
      fontSize: 16,
      marginBottom: 4,
  },
  value: {
      color: '#fff',
      fontSize: 18,
  },
  totalLabel: {
    color: '#a0aec0',
    fontSize: 16,
    marginTop: 20,
  },
  totalValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  botao: {
      backgroundColor: '#006494',
      borderRadius: 12,
      paddingVertical: 14,
      marginTop: 40,
      alignItems: 'center',
  },
  textoBotao: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
});