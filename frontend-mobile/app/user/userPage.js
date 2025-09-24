import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNav from '../../components/bottomNav';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.username}>Yasmin</Text>
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
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 30, // Adjusted space for the options
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Adjusted padding for the buttons
    paddingHorizontal: 20,
    marginBottom: 10, // Margin between buttons
    borderRadius: 10, // Rounded corners for the button
    backgroundColor: '#1F2C3C', // Button background color
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
  },
});

export default ProfileScreen;