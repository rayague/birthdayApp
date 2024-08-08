import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  RefreshControl,
  Platform,
  Alert
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";
import * as Linking from "expo-linking";
import * as Contacts from "expo-contacts";
import axios from "axios";

export default function CelebrationsScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    console.log("Fetching contacts...");
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        const allContacts = JSON.parse(storedContacts);
        console.log("Stored contacts:", allContacts);

        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 5);

        const filtered = allContacts.filter((contact) => {
          const [month, day, year] = contact.date.split("/").map(Number);
          const contactDate = new Date(year, month - 1, day);
          return contactDate >= today && contactDate <= endDate;
        });

        setContacts(allContacts);
        setFilteredContacts(filtered);
        console.log("Contacts fetched:", filtered);
      } else {
        console.log("No contacts found in storage.");
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const onRefresh = useCallback(() => {
    console.log("Refreshing contacts...");
    fetchContacts();
  }, [fetchContacts]);

  const openContacts = async () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "We need permission to access your contacts."
        );
        return;
      }

      if (Platform.OS === "android") {
        Linking.openURL("content://contacts/people/");
      } else if (Platform.OS === "ios") {
        Linking.openURL("contacts://");
      }
    }
  };

  return (
    <View style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground
        imageStyle={{
          elevation: 10,
          resizeMode: "cover",
          justifyContent: "center"
        }}
        source={image}
        style={styles.image}
      />
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: "#fff" }]}>
          Check your contacts
        </Text>
      </BlurView>

      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log(`Date for contact ${item.username}: ${item.date}`);
          return (
            <Pressable
              style={styles.itemRadius}
              onPress={() =>
                navigation.navigate("GeneratedTextScreen", {
                  prompt: "Generate text for " + item.username
                })
              }
            >
              <BlurView intensity={90} tint="dark" style={styles.itemContainer}>
                <View style={styles.group}>
                  <View>
                    <Text style={styles.itemHeader}>{item.username}</Text>
                    <Text style={styles.itemText}> {item.relationship}</Text>
                  </View>
                  <Image
                    style={styles.imageStyle}
                    source={{ uri: item.image }}
                    transition={1000}
                  />
                </View>

                <Pressable style={styles.generateButton}>
                  <Text style={styles.buttonText}>GENERATE</Text>
                </Pressable>

                <Pressable style={styles.callButton} onPress={openContacts}>
                  <Text style={styles.buttonText}>CALL</Text>
                </Pressable>
              </BlurView>
            </Pressable>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      />
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
    fontWeight: "bold"
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    marginVertical: 10,
    textAlign: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  itemRadius: {
    borderRadius: 20
  },
  listContainer: {
    width: "95%",
    marginHorizontal: 10,
    marginBottom: 40,
    borderRadius: 20
  },
  itemHeader: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
  },
  itemText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
  },
  imageStyle: {
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    borderRadius: 100,
    objectFit: "cover"
  },
  generateButton: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "dodgerblue",

    marginHorizontal: "5%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10
  },
  callButton: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#28a745",

    marginHorizontal: "5%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    marginVertical: 5,
    textAlign: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});
