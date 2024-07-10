import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  ImageBackground,
  FlatList,
  Item,
  Pressable
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

const image = require("../assets/images/picture10.jpg");

const users = [
  {
    id: "1",
    name: "John Green",
    phone: "9876543210",
    uri: "https://picsum.photos/seed/696/3000/2000"
  },
  {
    id: "2",
    name: "Ranson Kons",
    phone: "6876553210",
    uri: "https://picsum.photos/seed/picsum/200/300"
  },
  {
    id: "3",
    name: "Remity Sons",
    phone: "6376943210",
    uri: "https://picsum.photos/id/237/200/300"
  },
  {
    id: "4",
    name: "Randy Samsun",
    phone: "6473823910",
    uri: "https://picsum.photos/200/300?grayscale"
  },
  {
    id: "5",
    name: "Rose Cane",
    phone: "6352938476",
    uri: "https://picsum.photos/id/26/367/267"
  },
  {
    id: "6",
    name: "Zimmy Jang",
    phone: "7264029008",
    uri: "https://picsum.photos/id/25/367/267"
  },
  {
    id: "7",
    name: "Jessieca Johnson",
    phone: "4539287263",
    uri: "https://picsum.photos/id/19/367/267"
  },
  {
    id: "8",
    name: "Julian Gulgowski",
    phone: "4234234343",
    uri: "https://picsum.photos/id/29/367/267"
  },
  {
    id: "9",
    name: "Ellen Veum",
    phone: "6543987253",
    uri: "https://picsum.photos/id/16/367/267"
  },
  {
    id: "10",
    name: "Lorena Rice",
    phone: "6321936476",
    uri: "https://picsum.photos/id/43/367/267"
  }
];

export default function CelebrationsScreen() {
  const navigation = useNavigation();
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
      ></ImageBackground>
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: "#fff" }]}>
          Consultez vos contats ici
        </Text>
      </BlurView>
      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({ item }) => (
          <>
            <Pressable
              style={styles.itemRadius}
              onPress={() => navigation.navigate("Page", { name: "NextPage" })}
            >
              <BlurView intensity={90} tint="dark" style={styles.itemContainer}>
                <View style={styles.group}>
                  <View>
                    <Text style={styles.itemHeader}>{item.name}</Text>
                    <Text style={styles.itemText}> {item.phone}</Text>
                  </View>
                  <Image
                    style={styles.imageStyle}
                    source={item.uri}
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
    marginHorizontal: 20,
    marginBottom: 70,
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
