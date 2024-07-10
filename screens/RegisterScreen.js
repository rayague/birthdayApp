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


const image = require("../assets/images/picture7.jpg");

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      console.log("Invalid email format");
      Alert.alert("Error", "Invalid email format");
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "All fields are required");
      console.Console("Error", "All fields are required");
      return;
    }


    try {
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        console.log("User already exists with this email");
        Alert.alert("Error", "User already exists with this email");
        return;
      }
      
      setLoading(true);

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = { firstName, lastName, email, password: hashedPassword };
      users.push(newUser);

      await AsyncStorage.setItem("users", JSON.stringify(users));

      console.log("User registered successfully!", newUser);
      Alert.alert("Success", "User registered successfully!");
      navigation.navigate("Home", { name: "HomeComponent" });
    } catch (error) {
      console.log("Error registering user:", error);
      Alert.alert("Error", "Error registering user");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.inputContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={true}
          >
            <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
              <Text style={styles.registerText}>REGISTER</Text>
              <TextInput
                style={styles.input}
                placeholder="VOTRE FIRST NAME"
                onChangeText={setFirstName}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="#ddd"
              />
              <TextInput
                style={styles.input}
                placeholder="YOUR LAST NAME"
                onChangeText={setLastName}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="#ddd"
              />
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
              <Pressable style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </Pressable>
              <Pressable
                style={styles.loginButton}
                onPress={() =>
                  navigation.navigate("Connexion", { name: "LoginScreen" })
                }
              >
                <Text style={styles.loginText}>LOGIN</Text>
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
  blurContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  }
});
