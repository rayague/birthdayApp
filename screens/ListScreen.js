import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const image = require("../assets/images/picture10.jpg");

export default function ListScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      let storedContacts = await AsyncStorage.getItem("contacts");
      storedContacts = storedContacts ? JSON.parse(storedContacts) : [];
      setContacts(storedContacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchContacts();
    }
  }, [isFocused]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  };

  const renderContact = ({ item }) => (
    <Pressable
      style={styles.itemRadius}
      onPress={() => navigation.navigate("Page", { name: "NextPage" })}
    >
      <BlurView intensity={90} tint="dark" style={styles.itemContainer}>
        <View>
          <Text style={styles.itemHeader}>{item.username}</Text>
          <Text style={styles.itemText}>{item.relationship}</Text>
        </View>
        <Image
          style={styles.imageStyle}
          source={{ uri: item.image }}
          transition={1000}
        />
      </BlurView>
    </Pressable>
  );

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
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    fontWeight: "bold",
    textAlign: "center"
  },
  item: {
    padding: 20,
    fontSize: 10,
    marginTop: 5
  },
  itemContainer: {
    flexDirection: "row",
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
    fontSize: 15,
    fontWeight: "bold"
  },
  imageStyle: {
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    borderRadius: 100,
    objectFit: "cover"
  }
});
