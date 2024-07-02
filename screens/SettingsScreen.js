import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const image = require("../assets/images/picture10.jpg");

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{
          elevation: 10,
          //   resizeMode: "cover",
          justifyContent: "center"
        }}
        source={image}
        style={styles.image}
      ></ImageBackground>
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: "#fff" }]}>Vos Paramètres ici</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  image: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    elevation: 20,
    resizeMode: "cover",
    justifyContent: "center"
  },
  blurContainer: {
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
    fontWeight: "600"
  }
});
