import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  RefreshControl,
  Platform,
  Alert,
  Modal,
  Animated,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import * as Notifications from "expo-notifications";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";
import * as Linking from "expo-linking";
import * as Contacts from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const image = require("../assets/images/picture10.jpg");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function CelebrationsScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openContacts = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening dialer:", err)
    );
  };

  // Fonction pour planifier une notification locale
  const scheduleNotification = async (contactName, daysRemaining) => {
    const message = `${contactName}'s birthday is in ${daysRemaining} days!`;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Birthday Reminder 🎉",
        body: message
      },
      trigger: {
        hour: 9, // Notification à 9h
        minute: 0,
        repeats: true
      }
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Birthday Reminder 🎉",
        body: message
      },
      trigger: {
        hour: 18, // Notification à 18h
        minute: 0,
        repeats: true
      }
    });

    console.log(`Notification scheduled for ${contactName}: ${message}`);
  };

  // Fonction pour afficher un ToastAndroid
  const showToast = (contactName, daysRemaining) => {
    const message = `${contactName}'s birthday is in ${daysRemaining} days!`;
    ToastAndroid.show(message, ToastAndroid.LONG);
    console.log(`Toast shown: ${message}`);
  };

  // Fonction pour filtrer les contacts dans les 5 jours et programmer les notifications
  const filterAndNotifyContacts = async (allContacts) => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 5);

    const filtered = allContacts.filter((contact) => {
      const [month, day, year] = contact.date.split("/").map(Number);
      const contactDate = new Date(year, month - 1, day);
      const daysRemaining = Math.ceil(
        (contactDate - today) / (1000 * 60 * 60 * 24)
      );
      if (contactDate >= today && contactDate <= endDate) {
        if (daysRemaining > 0) {
          scheduleNotification(contact.username, daysRemaining);
          if (Platform.OS === "android") {
            showToast(contact.username, daysRemaining);
          }
        }
        return true;
      }
      return false;
    });

    setFilteredContacts(filtered);
    console.log("Filtered contacts for notification:", filtered);
  };

  // Fonction pour récupérer les contacts et filtrer ceux qui ont un anniversaire proche
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    console.log("Fetching contacts...");
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        const allContacts = JSON.parse(storedContacts);
        console.log("Stored contacts:", allContacts);
        setContacts(allContacts);
        filterAndNotifyContacts(allContacts);
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

  const generateMessage = async (relationship) => {
    console.log(`Generating message for relationship: ${relationship}`);
    try {
      const storedMessages = await AsyncStorage.getItem(relationship);
      const messages = storedMessages ? JSON.parse(storedMessages) : [];
      console.log(`Messages retrieved for ${relationship}:`, messages);

      if (messages.length > 0) {
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        console.log(`Random message selected: ${randomMessage.content}`);
        setGeneratedMessage(randomMessage.content);
        setModalVisible(true); // Ouvre le modal
      } else {
        console.log(`No messages found for ${relationship}.`);
        Alert.alert(
          "No messages found",
          "No messages available for this relationship."
        );
      }
    } catch (error) {
      console.error("Error retrieving messages: ", error);
    }
  };

  const copyToClipboard = () => {
    if (generatedMessage) {
      Clipboard.setString(generatedMessage);
      console.log("Copied to clipboard!", generatedMessage);
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
          CHECK YOUR CONTACTS HERE
        </Text>
      </BlurView>

      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log(
            `Rendering item: ${item.username}, relationship: ${item.relationship}`
          );
          return (
            <Pressable
              style={styles.itemRadius}
              onPress={() => {
                navigation.navigate("GeneratedTextScreen", {
                  prompt: "Generate text for " + item.username
                });
              }}
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
                  onPress={() => {
                    console.log(`Generate button pressed for ${item.username}`);
                    generateMessage(item.relationship.toUpperCase());
                  }}
                >
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
      {/* Afficher le message généré avec animation */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <BlurView intensity={90} tint="dark" style={styles.modalContent}>
            <Text style={styles.generatedText}>{generatedMessage}</Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={styles.copyButton}
            >
              <Text style={styles.buttonText}>COPY TEXT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  modalContent: {
    width: 300,
    padding: 30,
    borderRadius: 10,
    alignItems: "center"
  },
  generatedText: {
    fontSize: 19,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#fff"
  },
  copyButton: {
    backgroundColor: "#9Bd35A",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    textTransform: "capitalize",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    textAlign: "center",
    textTransform: "capitalize",
    padding: 10,
    borderRadius: 5,
    width: "100%"
  },
  // copyButton: {
  //   marginTop: 10, // Marges pour l'icône de copie
  //   padding: 5
  // },
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
    fontWeight: "bold",
    textAlign: "center"
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
    fontSize: 18,
    textAlign: "center"
  }
});
