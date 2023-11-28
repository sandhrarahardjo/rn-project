import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Linking } from 'react-native';

const RegistrationScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    if (!email.trim()) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');

    if (!password.trim()) {
      setPasswordError('Please enter a valid password.');
      return;
    }

    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})/.test(password)) {
      setPasswordError(
        'Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.'
      );
      return;
    }

    setPasswordError('');

    Linking.openURL('https://www.jenius.com').catch((err) =>
      console.error('An error occurred: ', err)
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://t4.ftcdn.net/jpg/06/00/61/39/360_F_600613991_wy7mmJihme0g9WKMOiCz8ubcJK98whzi.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Registration Form</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <Text style={styles.errorText}>{emailError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.errorText}>{passwordError}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 27,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: 'white', 
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  },
  button: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegistrationScreen;