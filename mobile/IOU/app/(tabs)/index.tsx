import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to use camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome! Upload the image!</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // ensures white background instead of black
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 8,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
