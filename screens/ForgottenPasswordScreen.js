import React, { useState } from "react";
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
import bcrypt from "react-native-bcrypt";
import { BlurView } from "expo-blur";
import LoadingScreen from "./LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const backgroundImage = require("../assets/images/picture10.jpg");

export default function ForgottenPasswordScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1 for email verification, 2 for password reset

  const handleEmailVerification = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email.");
      console.log("Email field is empty.");
      return;
    }

    try {
      setLoading(true);
      console.log("Verifying email:", email);

      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        console.log("Email exists:", email);
        Alert.alert("Success", "Verification link sent to your email!");
        // Simulate sending a verification link
        setTimeout(() => {
          setStep(2); // Move to password reset step after verification
        }, 2000);
      } else {
        console.log("Email does not exist:", email);
        Alert.alert("Error", "Email does not exist in our records.");
      }
    } catch (error) {
      console.log("Error verifying email:", error);
      Alert.alert("Error", "Error verifying email");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please enter both password fields.");
      console.log("Password fields are empty.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      console.log("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      console.log("Resetting password for:", email);

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: hashedPassword } : user
      );

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

      console.log("Password reset successfully for:", email);
      Alert.alert("Success", "Password has been reset!");
      // Navigate to login or home screen here
      navigation.navigate("Connexion");
    } catch (error) {
      console.log("Error resetting password:", error);
      Alert.alert("Error", "Error resetting password");
    } finally {
      setLoading(false);
    }
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
      {step === 1 ? (
        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
          <Text style={[styles.text, { color: "#fff" }]}>
            ENTER YOUR EMAIL TO RESET PASSWORD
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#fff"
          />
          <Pressable style={styles.button} onPress={handleEmailVerification}>
            <Text style={styles.buttonText}>SEND</Text>
          </Pressable>
        </BlurView>
      ) : (
        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
          <Text style={[styles.text, { color: "#fff" }]}>
            ENTER YOUR NEW PASSWORD
          </Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#fff"
          />
          <Pressable style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>RESET PASSWORD</Text>
          </Pressable>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
