import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

const image = require("../assets/images/picture4.png");

export default function SecondScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.FirstSection}>
        <ImageBackground
          source={image}
          imageStyle={{
            borderRadius: 6,
            elevation: 10,
            resizeMode: "cover",
            justifyContent: "center"
          }}
          style={styles.image}
        ></ImageBackground>
      </View>
      <View style={styles.TextContainer}>
        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
          <Text style={styles.WelcomeText2}>
            🎁 Trouvez des idées cadeaux 🎉, planifiez des fêtes 🎂 et envoyez
            des vœux 💌 avec notre application. 🎊 Célébrons ensemble ! 🎈
          </Text>
        </BlurView>
      </View>
      <Pressable
        style={styles.NextButton}
        onPress={() =>
          navigation.navigate("Inscription", { name: "RegisterScreen" })
        }
      >
        <Text style={styles.ButtonText}>Commencer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    textAlign: "center"
  },
  FirstSection: {
    // alignItems: "center",
    flexDirection: "row",
    position: "relative",
    height: 350
    // width: "100%"
  },
  image: {
    height: 320,
    width: 340,
    position: "relative",
    left: 0,
    top: 30,
    borderRadius: 10,
    elevation: 20,
    resizeMode: "cover",
    justifyContent: "center",
    marginHorizontal: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  TextContainer: {
    alignItems: "center",
    marginHorizontal: "auto",
    fontFamily: "sans-serif",
    fontSize: 20,
    marginTop: 30
  },
  WelcomeText: {
    fontFamily: "sans-serif",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold"
  },
  WelcomeText2: {
    fontFamily: "sans-serif",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "400",
    color: "white"
  },
  NextButton: {
    backgroundColor: "white",
    padding: 15,
    width: "95%",
    marginHorizontal: "auto",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  ButtonText: {
    textAlign: "center",
    color: "dodgerblue",
    fontWeight: "800",
    fontFamily: "sans-serif",
    fontSize: 18
  },
  blurContainer: {
    // flex: 1,
    padding: 10,
    // margin: 16,
    textAlign: "center",
    justifyContent: "center",
    width: "95%",
    overflow: "hidden",
    borderRadius: 20,
    // elevation: 5,
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
    fontWeight: "bold"
  }
});
