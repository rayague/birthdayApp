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

const image1 = require("../assets/images/picture2.jpg");
const image2 = require("../assets/images/picture1.jpg");
export default function FirstScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.Container}>
      {/* <Text style={[styles.text, { color: "#fff" }]}>This is a test</Text> */}
      <View style={styles.FirstSection}>
        <ImageBackground
          source={image1}
          imageStyle={{
            borderRadius: 6,
            elevation: 10,
            resizeMode: "cover",
            justifyContent: "center"
          }}
          style={styles.image1}
        ></ImageBackground>
        <ImageBackground
          imageStyle={{
            borderRadius: 6,
            elevation: 10,
            resizeMode: "cover",
            justifyContent: "center"
          }}
          source={image2}
          style={styles.image2}
        ></ImageBackground>
      </View>
      <View style={styles.TextContainer}>
        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
          <Text style={styles.WelcomeText}>
            🎉 Bienvenue sur notre application 🎉
          </Text>
          <Text style={styles.WelcomeText2}>
            Nous sommes enchantés de vous accueillir ! 😊 Ici, chaque jour est
            une occasion de célébrer 🎊 et de créer des souvenirs inoubliables
            📸. Nous sommes là pour vous aider à rendre chaque anniversaire
            spécial. 🎈
          </Text>
        </BlurView>
      </View>
      <Pressable
        style={styles.NextButton}
        onPress={() =>
          navigation.navigate("Second Page", { name: "SecondScreen" })
        }
      >
        <Text style={styles.ButtonText}>Suivant</Text>
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
    height: 320
    // width: "100%"
  },
  image1: {
    height: 230,
    width: 230,
    // backgroundColor: "blue",
    position: "relative",
    left: 0,
    top: 50,
    borderRadius: 50,
    transform: "rotate(-20deg)",
    elevation: 20,
    resizeMode: "cover",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  image2: {
    height: 230,
    width: 230,
    borderRadius: 10,
    position: "relative",
    rifgt: 100,
    top: 50,
    transform: "rotate(20deg)",
    elevation: 20,
    resizeMode: "cover",
    justifyContent: "center",
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
    marginHorizontal: 20,
    fontFamily: "sans-serif",
    fontSize: 20
  },
  WelcomeText: {
    fontFamily: "sans-serif",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
    fontWeight: "800"
  },
  WelcomeText2: {
    fontFamily: "sans-serif",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    fontWeight: "400"
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
    color: "dodgerblue",
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  blurContainer: {
    // flex: 1,
    // padding: 20,
    // margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    fontWeight: "600"
  }
});
