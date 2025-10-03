import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import BottomNav from '../../components/bottomNav';

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const userId = await AsyncStorage.getItem('UserId');
        const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.106:3000';
        const res = await fetch(`${API_URL}/api/reservas/user/${userId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setReservas(data.data);
        } else {
          setReservas([]);
        }
      } catch (err) {
        setError('Erro ao buscar reservas');
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  const handleDelete = (reservaId) => {
    // Implement delete logic if needed
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Reservas</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={styles.loading}>Carregando...</Text>
        ) : reservas.length === 0 ? (
          <Text style={styles.empty}>Nenhuma reserva encontrada.</Text>
        ) : (
          reservas.map((reserva) => (
            <View style={styles.card} key={reserva.id}>
              <Image
                source={{ uri: reserva.quarto?.imagem_url || 'https://via.placeholder.com/300x180' }}
                style={styles.roomImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.roomTitle}>{reserva.quarto?.nome || 'Quarto'}</Text>
                <TouchableOpacity style={styles.trashBtn} onPress={() => handleDelete(reserva.id)}>
                  <Icon name="delete" size={24} color="#222" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13293D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#13293D',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  roomImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  roomTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  trashBtn: {
    padding: 4,
  },
  loading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});

export default MinhasReservas;
