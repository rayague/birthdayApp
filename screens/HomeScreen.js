import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  Alert,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";

const backgroundImage = require("../assets/images/picture10.jpg");

export default function HomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      setDate(selectedDate || date);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const fetchContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      const contacts = storedContacts ? JSON.parse(storedContacts) : [];
      console.log("Fetched contacts:", contacts);
      // Par exemple, si tu as un état pour les contacts
      // setContacts(contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const saveContact = async () => {
    if (!username || !date || !image || !selectedLanguage) {
      Alert.alert("Error", "All fields are required");
      console.log("Error", "All fields are required");
      return;
    }
    try {
      setLoading(true);

      const contactData = {
        id: new Date().getTime().toString(),
        username,
        date: date.toLocaleDateString(),
        relationship: selectedLanguage,
        image
      };

      let storedContacts = await AsyncStorage.getItem("contacts");
      storedContacts = storedContacts ? JSON.parse(storedContacts) : [];

      const contactExists = storedContacts.some(
        (contact) =>
          contact.username === contactData.username &&
          contact.date === contactData.date &&
          contact.relationship === contactData.relationship &&
          contact.image === contactData.image
      );

      if (contactExists) {
        Alert.alert("Error", "Contact already exists");
        console.log("Error", "Contact already exists");
        setLoading(false);
        return;
      }

      storedContacts.unshift(contactData);

      await AsyncStorage.setItem("contacts", JSON.stringify(storedContacts));

      Alert.alert("Success", "Contact saved successfully!");
      console.log("Contact saved successfully:", contactData);

      setUsername("");
      setDate(new Date());
      setImage(null);
      setSelectedLanguage("");
      fetchContacts();
      navigation.navigate("LIST");
    } catch (error) {
      Alert.alert("Error", "Failed to save contact. Please try again.");
      console.error("Failed to save contact:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground
        imageStyle={{
          elevation: 10,
          justifyContent: "center"
        }}
        source={backgroundImage}
        style={styles.image}
      />
      <ScrollView>
        <View style={styles.contentContainer}>
          <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
            <Text style={[styles.text, { color: "#fff" }]}>
              SAVE YOUR CONTACTS HERE
            </Text>
          </BlurView>
          <BlurView
            intensity={85}
            tint="dark"
            style={styles.blurInputContainer}
          >
            <View style={styles.inputContainer}>
              <Icon
                name="account"
                size={24}
                color="white"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="USERNAME"
                placeholderTextColor="#fff"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="cake" size={24} color="white" style={styles.icon} />
              <Pressable
                style={styles.inputDatepicker}
                onPress={showDatepicker}
              >
                <Text style={styles.datePickerText}>
                  {date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long"
                  })}
                </Text>
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="playlist-check"
                size={24}
                color="white"
                style={styles.icon}
              />
              <Pressable style={styles.inputStatusPicker}>
                <Picker
                  style={styles.statusColor}
                  placeholderTextColor="#fff"
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                >
                  <Picker.Item label="SON" value="SON" />
                  <Picker.Item label="DAUGHTER" value="DAUGHTER" />
                  <Picker.Item label="SISTER" value="SISTER" />
                  <Picker.Item label="BROTHER" value="BROTHER" />
                  <Picker.Item label="FRIEND" value="FRIEND" />
                  <Picker.Item label="NEIGHBOR" value="NEIGHBOR" />
                  <Picker.Item label="BESTFRIEND" value="BESTFRIEND" />
                  <Picker.Item label="BOYFRIEND" value="BOYFRIEND" />
                  <Picker.Item label="GIRLFRIEND" value="GIRLFRIEND" />
                  <Picker.Item label="HUSBAND" value="HUSBAND" />
                  <Picker.Item label="FATHER" value="FATHER" />
                  <Picker.Item label="MOTHER" value="MOTHER" />
                  <Picker.Item label="AUNTIE" value="AUNTIE" />
                  <Picker.Item label="UNCLE" value="UNCLE" />
                  <Picker.Item label="COUSIN" value="COUSIN" />
                  <Picker.Item label="NIECE" value="NIECE" />
                  <Picker.Item label="NEPHEW" value="NEPHEW" />
                  <Picker.Item label="GRAND-SON" value="GRAND-SON" />
                  <Picker.Item label="GRAND-DAUGHTER" value="GRAND-DAUGHTER" />
                  <Picker.Item label="GRAND-FATHER" value="GRAND-FATHER" />
                  <Picker.Item label="GRAND-MOTHER" value="GRAND-MOTHER" />
                  <Picker.Item label="GOD-FATHER" value="GOD-FATHER" />
                  <Picker.Item label="GOD-MOTHER" value="GOD-MOTHER" />
                </Picker>
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <Icon name="image" size={24} color="white" style={styles.icon} />
              <Pressable style={styles.ImagePicker} onPress={pickImage}>
                <Text style={styles.imagePickerText}>PICK AN IMAGE</Text>
              </Pressable>
              {image && (
                <Image source={{ uri: image }} style={styles.imagePicked} />
              )}
            </View>

            <Pressable style={styles.onSubmitButton} onPress={saveContact}>
              <Text style={styles.onSubmitText}>SAVE</Text>
            </Pressable>
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Your styles here...
  container: {
    flex: 1,
    justifyContent: "center",
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
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  imagePicked: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    marginHorizontal: "5%",
    position: "absolute"
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
  blurInputContainer: {
    width: "95%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    marginBottom: 100
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "sans-serif",
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10
  },
  icon: {
    marginRight: 10
  },
  onSubmitButton: {
    backgroundColor: "dodgerblue",
    borderColor: "dodgerblue",
    borderWidth: 1,
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  onSubmitText: {
    color: "white",
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17
  },
  showContactsButton: {
    backgroundColor: "dodgerblue",
    borderColor: "dodgerblue",
    borderWidth: 1,
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49
  },
  showContactsText: {
    color: "white",
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  contactText: {
    fontSize: 16
  },
  ImagePicker: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "sans-serif",
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    alignContent: "center",
    justifyContent: "center"
  },
  imagePickerText: {
    textAlign: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 17
  },
  inputStatusPicker: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "sans-serif",
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    backgroundColor: "transparent"
  },
  inputDatepicker: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    borderRadius: 10,
    marginVertical: 5,
    padding: "auto",
    fontFamily: "sans-serif",
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  datePickerText: {
    textAlign: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 17
  },
  statusColor: {
    color: "white",
    fontWeight: "bold"
  }
});
