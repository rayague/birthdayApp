import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SecondScreen() {
  return (
    <View style={styles.Container}>
      <View style={styles.FirstSection}>
        <ImageBackground
          source={image1}
          style={styles.image1}
        ></ImageBackground>
        <ImageBackground
          source={image2}
          style={styles.image2}
        ></ImageBackground>
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.WelcomeText}>
          🎉 Bienvenue sur notre application 🎉
        </Text>
        <Text style={styles.WelcomeText2}>
          Nous sommes enchantés de vous accueillir ! 😊 Ici, chaque jour est une
          occasion de célébrer 🎊 et de créer des souvenirs inoubliables 📸.
          Nous sommes là pour vous aider à rendre chaque anniversaire spécial.
          🎈
        </Text>
        <Pressable
          style={styles.NextButton}
          onPress={() =>
            navigation.navigate("Second Page", { name: "SecondScreen" })
          }
        >
          Suivant
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ccc",
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
    justifyContent: "center"
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
    justifyContent: "center"
  },
  TextContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    fontFamily: "monsera",
    fontSize: 20
  },
  WelcomeText: {
    fontFamily: "monsera",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold"
  },
  WelcomeText2: {
    fontFamily: "sans-serif",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20
  },
  NextButton: {
    backgroundColor: "dodgerblue",
    padding: 15,
    width: "95%",
    marginHorizontal: "auto",
    textAlign: "center",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    fontFamily: "sans-serif"
  }
});
