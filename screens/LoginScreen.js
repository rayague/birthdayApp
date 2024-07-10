import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bcrypt from "react-native-bcrypt";
import LoadingScreen from "./LoadingScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const image = require("../assets/images/picture7.jpg");

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      console.log("Invalid email format");
      Alert.alert("Error", "Invalid email format");
      return;
    }
  
    try {
      setLoading(true);
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];
  
      const user = users.find((user) => user.email === email);
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log("User logged in successfully!", user);
        await AsyncStorage.setItem("currentUser", JSON.stringify(user)); // Store current user data
        Alert.alert("Success", "User logged in successfully!");
        navigation.navigate("Home", { name: "HomeScreen" });
      } else {
        console.log("User does not exist or incorrect credentials");
        Alert.alert("Error", "User does not exist or incorrect credentials");
      }
    } catch (error) {
      console.log("Error logging in user:", error);
      Alert.alert("Error", "Error logging in user");
    }
    setLoading(false);
  };
  


  return (

    <View style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.inputContainer}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
            <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
              <Text style={styles.registerText}>LOGIN</Text>

              <TextInput
                style={styles.input}
                placeholder="YOUR EMAIL"
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="#ddd"
              />
              <TextInput
                style={styles.input}
                placeholder="YOUR PASSWORD"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="#ddd"
              />

              <Text
                style={styles.forgottenText}
                onPress={() =>
                  navigation.navigate("Second Page", { name: "SecondScreen" })
                }
              >
                Mot de Passe oublié ?
              </Text>

              <Pressable style={styles.registerButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </Pressable>
              <Pressable
                style={styles.loginButton}
                onPress={() =>
                  navigation.navigate("Inscription", { name: "RegisterScreen" })
                }
              >
                <Text style={styles.loginText}>REGISTER</Text>
              </Pressable>
            </BlurView>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    resizeMode: "cover",
    position: "absolute"
  },
  inputContainer: {
    height: 400,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ccc"
  },
  input: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    color: "white",
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  registerText: {
    fontFamily: "sans-serif",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "dodgerblue"
  },
  registerButton: {
    backgroundColor: "dodgerblue",
    padding: 15,
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  loginButton: {
    backgroundColor: "white",
    borderColor: "dodgerblue",
    borderWidth: 1,
    padding: 15,
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17
  },
  loginText: {
    color: "dodgerblue",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17
  },
  forgottenText: {
    fontSize: 16,
    textAlign: "right",
    marginHorizontal: 20,
    marginTop: 20,
    color: "dodgerblue"
  },
  blurContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  }
});
