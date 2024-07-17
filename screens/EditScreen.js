import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ImageBackground
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import bcrypt from "react-native-bcrypt";
import { BlurView } from "expo-blur";
import LoadingScreen from "./LoadingScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const backgroundImage = require("../assets/images/picture10.jpg");

export default function EditScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("currentUser");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setPassword(userData.password); // Set the hashed password here
          setOriginalPassword(userData.password); // Save the original hashed password
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  const saveUserData = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      let hashedPassword = originalPassword;

      // If the password is different from the original hashed password, hash the new password
      if (password !== originalPassword) {
        const salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(password, salt);
      }

      const userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword
      };

      await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
      Alert.alert("Success", "Your information has been updated");
      navigation.navigate("Edit");
    } catch (error) {
      console.error("Failed to save user data", error);
      Alert.alert("Error", "Failed to save user data");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground
        imageStyle={{
          elevation: 10,
          justifyContent: "center"
        }}
        source={backgroundImage}
        style={styles.image}
      />
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: "#fff" }]}>
          YOUR INFORMATIONS HERE
        </Text>
      </BlurView>
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#fff"
        />
        <Pressable style={styles.button} onPress={saveUserData}>
          <Text style={styles.buttonText}>SAVE</Text>
        </Pressable>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  image: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    resizeMode: "cover",
    justifyContent: "center"
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 1,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  blurContainer: {
    width: "95%",
    padding: 20,
    margin: 10,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center"
  },
  button: {
    backgroundColor: "dodgerblue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
