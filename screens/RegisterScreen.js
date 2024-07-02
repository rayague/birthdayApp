import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

const image = require("../assets/images/picture7.jpg");

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
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
              <Pressable
                style={styles.registerButton}
                onPress={() =>
                  navigation.navigate("Home", { name: "HomeComponent" })
                }
              >
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
    // elevation: 20
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
