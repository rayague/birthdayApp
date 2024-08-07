import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GeneratedTextScreen = ({ route }) => {
  const prompt = route?.params?.prompt;

  if (!prompt) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No prompt provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{prompt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default GeneratedTextScreen;
