import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNav from '../../components/bottomNav';
import { useLocalSearchParams } from 'expo-router';

const ProfileScreen = () => {
  const { UserId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require('../../assets/images/voltarBtn.png')}
            style={{ width: 48, height: 48 }}
          />
        </TouchableOpacity>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.username}>{UserId}</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="event" size={24} color="#fff" />
          <Text style={styles.optionText}>Reservas feitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="logout" size={24} color="#fff" />
          <Text style={styles.optionText}>Sair da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="edit" size={24} color="#fff" />
          <Text style={styles.optionText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
};

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