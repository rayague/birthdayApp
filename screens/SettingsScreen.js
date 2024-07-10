import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
  RefreshControl,
  ScrollView
} from "react-native";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";

const image = require("../assets/images/picture10.jpg");

export default function SettingScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await AsyncStorage.getItem("currentUser");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load user data.");
        console.error("Failed to load user data:", error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LoadingScreen visible={loading} />
      <ImageBackground
        imageStyle={{
          elevation: 10,
          justifyContent: "center"
        }}
        source={image}
        style={styles.image}
      />
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: "#fff" }]}>
          YOUR INFORMATIONS HERE
        </Text>
      </BlurView>
      {user && (
        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
          <View style={styles.itemContainer}>
            <Icon name="account" size={24} color="white" style={styles.icon} />
            <Text style={[styles.textButton, { color: "#fff" }]}>
              {user.firstName}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Icon name="account" size={24} color="white" style={styles.icon} />
            <Text style={[styles.textButton, { color: "#fff" }]}>
              {user.lastName}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Icon name="mail" size={24} color="white" style={styles.icon} />
            <Text style={[styles.textButton, { color: "#fff" }]}>
              {user.email}
            </Text>
          </View>
          <Pressable
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("Edit", {
                name: "EditScreen"
              })
            }
          >
            <Text style={[styles.textButton, { color: "#fff" }]}>EDIT</Text>
          </Pressable>
          <Pressable
            style={styles.logoutButton}
            onPress={async () => {
              setLoading(true);
              await AsyncStorage.removeItem("currentUser");
              console.log("User successfully logged out");
              setLoading(false);
              navigation.navigate("Inscription", {
                name: "RegisterScreen"
              });
            }}
          >
            <Text style={[styles.textButton, { color: "#fff" }]}>LOGOUT</Text>
          </Pressable>
        </BlurView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    fontWeight: "600",
    textAlign: "center"
  },
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center"
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
  logoutButton: {
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
