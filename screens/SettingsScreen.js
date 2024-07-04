import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const image = require("../assets/images/picture10.jpg");

export default function SettingScreen() {
  const navigation = useNavigation();

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
        <View style={styles.itemContainer}>
          <Icon name="account" size={24} color="white" style={styles.icon} />
          <Text style={[styles.text, { color: "#fff" }]}>FIRST NAME</Text>
        </View>
        <View style={styles.itemContainer}>
          <Icon name="account" size={24} color="white" style={styles.icon} />

          <Text style={[styles.text, { color: "#fff" }]}>LAST NAME</Text>
        </View>
        <View style={styles.itemContainer}>
          <Icon name="account" size={24} color="white" style={styles.icon} />

          <Text style={[styles.text, { color: "#fff" }]}>EMAIL</Text>
        </View>
        <View style={styles.itemContainer}>
          <Icon name="account" size={24} color="white" style={styles.icon} />

          <Text style={[styles.text, { color: "#fff" }]}>PASSWORD</Text>
        </View>
        <Pressable
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("Profile", { name: "ProfileScreen" })
          }
        >
          <Text style={[styles.text, { color: "#fff" }]}>EDIT</Text>
        </Pressable>
        <Pressable style={styles.logoutBottom}>
          <Text style={[styles.text, { color: "#fff" }]}>LOGOUT</Text>
        </Pressable>
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
    fontWeight: "600"
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 25
  },
  editButton: {
    width: "100%",
    alignItems: "center",
    borderBottomColor: "dodgerblue",
    backgroundColor: "dodgerblue",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },
  logoutBottom: {
    width: "100%",
    alignItems: "center",
    borderBottomColor: "red",
    backgroundColor: "red",
    borderBottomWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10
  }
});
