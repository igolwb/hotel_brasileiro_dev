import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import BottomNav from '../../components/bottomNav';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReservaPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [quarto, setQuarto] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchQuarto = async () => {
        try {
          const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.106:3000';
          const token = await AsyncStorage.getItem('authToken');
          const response = await fetch(`${API_URL}/api/quartos/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setQuarto(data.data);
          } else {
            setError(data.message);
          }
        } catch (err) {
          setError('Erro ao buscar detalhes do quarto.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchQuarto();
    }
  }, [id]);

  const formatInputDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const length = cleaned.length;

    if (length <= 2) {
      return cleaned;
    }
    if (length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  const handleCheckInChange = (text) => {
    const formattedDate = formatInputDate(text);
    setCheckInDate(formattedDate);
  };

  const handleCheckOutChange = (text) => {
    const formattedDate = formatInputDate(text);
    setCheckOutDate(formattedDate);
  };

  const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      // Month is 0-indexed in JavaScript Dates
      return new Date(year, month - 1, day);
  }

  const getDiarias = () => {
    if (!checkInDate || !checkOutDate || checkInDate.length < 10 || checkOutDate.length < 10) return 0;
    const dataInicio = parseDate(checkInDate);
    const dataFim = parseDate(checkOutDate);
    if (isNaN(dataInicio) || isNaN(dataFim) || dataInicio >= dataFim) return 0;
    const diffTime = dataFim.getTime() - dataInicio.getTime();
    const diarias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diarias;
  };

  const diarias = getDiarias();
  const total = quarto && diarias > 0 ? Number(quarto.preco) * diarias : 0;

  const handleReserva = () => {
    if (!checkInDate || !checkOutDate || !guests || checkInDate.length < 10 || checkOutDate.length < 10) {
      Alert.alert('Erro', 'Preencha todos os campos no formato DD/MM/AAAA!');
      return;
    }

    const dataInicio = parseDate(checkInDate);
    const dataFim = parseDate(checkOutDate)

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (isNaN(dataInicio) || dataInicio < hoje) {
      Alert.alert('Erro', 'A data de início não pode ser no passado.');
      return;
    }

    if (dataInicio >= dataFim) {
        Alert.alert('Erro', 'A data de início deve ser anterior à data de fim.');
        return;
    }

    const [dayIn, monthIn, yearIn] = checkInDate.split('/');
    const inicioISO = `${yearIn}-${monthIn}-${dayIn}`;

    const [dayOut, monthOut, yearOut] = checkOutDate.split('/');
    const fimISO = `${yearOut}-${monthOut}-${dayOut}`;

    const reservaDetails = {
      quartoId: id,
      quartoNome: quarto.nome,
      quartoImage: quarto.imagem_url,
      checkInDate: checkInDate, // DD/MM/YYYY for display
      checkOutDate: checkOutDate, // DD/MM/YYYY for display
      checkInDateISO: inicioISO, // YYYY-MM-DD for API
      checkOutDateISO: fimISO, // YYYY-MM-DD for API
      guests,
      preco: total.toFixed(2),
    };

    router.push({
      pathname: '/reservas/reservaConfirm',
      params: reservaDetails,
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !quarto) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error || 'Quarto não encontrado.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Image
            source={{ uri: quarto.imagem_url }}
            style={styles.imagem}
            resizeMode="cover"
        />
        <ScrollView style={styles.info}>
            <Text style={styles.titulo}>Escolha suas datas</Text>

            <Text style={styles.label}>Quando seu descanso começa?</Text>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={checkInDate}
                onChangeText={handleCheckInChange}
                maxLength={10}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Quando a saudade vai bater?</Text>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={checkOutDate}
                onChangeText={handleCheckOutChange}
                maxLength={10}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Quantidade de pessoas</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 2"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={guests}
                onChangeText={setGuests}
            />
            
            {total > 0 && (
                <Text style={styles.totalText}>
                    Total: R$ {total.toFixed(2)} ({diarias} diárias)
                </Text>
            )}

            <TouchableOpacity onPress={handleReserva} style={styles.botao}>
                <Text style={styles.textoBotao}>Reservar</Text>
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
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
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 6,
        marginTop: 10,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fff',
        color: '#333',
        padding: 16,
        borderRadius: 15,
        fontSize: 16,
    },
    totalText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
    },
    botao: {
        backgroundColor: '#006494',
        borderRadius: 12,
        paddingVertical: 12,
        marginTop: 30,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});