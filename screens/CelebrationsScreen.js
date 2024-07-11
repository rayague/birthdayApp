import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  RefreshControl,
  Modal,
  Button
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = require("../assets/images/picture10.jpg");

export default function CelebrationsScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to get and filter contacts
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    console.log("Fetching contacts...");
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        const allContacts = JSON.parse(storedContacts);
        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        // Filter contacts based on date
        const filteredContacts = allContacts.filter((contact) => {
          const contactDate = new Date(contact.date);
          return contactDate >= threeDaysAgo && contactDate <= today;
        });

        // Sort contacts with the most recent date first
        filteredContacts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setContacts(filteredContacts);
        console.log("Contacts fetched and filtered:", filteredContacts);
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

  // Refresh control handler
  const onRefresh = useCallback(() => {
    console.log("Refreshing contacts...");
    fetchContacts();
  }, [fetchContacts]);

  return (
    <View style={styles.container}>
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
          Consultez vos contacts ici
        </Text>
      </BlurView>

      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={contacts}
        keyExtractor={(item) => item.id} // Ensure each item has a unique key
        renderItem={({ item }) => (
          <>
            <Pressable
              style={styles.itemRadius}
              onPress={() => navigation.navigate("Page", { name: "NextPage" })}
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
                <Pressable
                  style={styles.generateButton}
                  onPress={() =>
                    navigation.navigate("Home", { name: "HomeComponent" })
                  }
                >
                  <Text style={styles.buttonText}>GENERATE</Text>
                </Pressable>
                <Pressable
                  style={styles.callButton}
                  onPress={() =>
                    navigation.navigate("Home", { name: "HomeComponent" })
                  }
                >
                  <Text style={styles.buttonText}>CALL</Text>
                </Pressable>
              </BlurView>
            </Pressable>
          </>
        )}
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
    // padding: 20,
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
    marginHorizontal: "auto",
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
