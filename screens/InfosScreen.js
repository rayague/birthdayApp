import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Pressable
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Assurez-vous que cette bibliothèque est installée
import { Picker } from "@react-native-picker/picker"; // Assurez-vous que cette bibliothèque est installée

const backgroundImage = require("../assets/images/picture10.jpg");

export default function InfosScreen() {
  const navigation = useNavigation();

  const [contact, setContact] = useState(null);
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const fetchContact = async () => {
    try {
      const storedContact = await AsyncStorage.getItem("selectedContact");
      if (storedContact) {
        const contactData = JSON.parse(storedContact);
        setContact(contactData);
        setUsername(contactData.username);
        setMobile(contactData.mobile); // Assurez-vous que 'mobile' existe dans vos données
        setImage(contactData.image); // Assurez-vous que 'image' existe dans vos données
        setDate(new Date(contactData.date)); // Assurez-vous que 'date' existe dans vos données
        // Assurez-vous que la date soit valide
        const contactDate = new Date(contactData.date);
        if (!isNaN(contactDate.getTime())) {
          setDate(contactDate);
        } else {
          setDate(new Date()); // Ou utilisez une date par défaut
        }
        setSelectedLanguage(contactData.relationship); // Remplacez par la clé correspondante
      }
    } catch (error) {
      console.error("Failed to fetch contact:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveContact = async () => {
    console.log("Saving contact...");
    const updatedContact = {
      ...contact,
      username,
      mobile,
      image,
      date,
      relationship: selectedLanguage
    };

    let storedContacts = await AsyncStorage.getItem("contacts");
    storedContacts = storedContacts ? JSON.parse(storedContacts) : [];

    // Remplacer le contact existant par le mis à jour
    const updatedContacts = storedContacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c
    );

    await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    await AsyncStorage.setItem(
      "selectedContact",
      JSON.stringify(updatedContact)
    );

    console.log("Contact saved:", updatedContact);
    navigation.navigate("LISTS");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{
          resizeMode: "cover",
          justifyContent: "center"
        }}
        source={backgroundImage}
        style={styles.image}
      >
        <ScrollView>
          <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
            <Text style={[styles.text, { color: "#fff" }]}>
              Consultez vos contacts ici
            </Text>
          </BlurView>

          <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
            {/* Champ Username */}
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

            {/* Sélecteur de Date */}
            <View style={styles.inputContainer}>
              <Icon name="cake" size={24} color="white" style={styles.icon} />
              <Pressable
                style={styles.inputDatepicker}
                onPress={showDatepicker}
              >
                <Text style={styles.datePickerText}>
                  {date.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long"
                    // year: "numeric" // Vous pouvez ajouter l'année si nécessaire
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

            {/* Sélecteur de Statut */}
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

            {/* Choix d'Image */}
            <View style={styles.imageContainer}>
              <View style={styles.inputContainer}>
                <Icon
                  name="image"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
                <Pressable style={styles.ImagePicker} onPress={pickImage}>
                  <Text style={styles.imagePickerText}>CHOISIR UNE IMAGE</Text>
                </Pressable>
              </View>
              {image && (
                <Image source={{ uri: image }} style={styles.imagePicked} />
              )}
            </View>

            {/* Bouton de sauvegarde */}
            <Pressable style={styles.onSubmitButton} onPress={saveContact}>
              <Text style={styles.onSubmitText}>SAVE</Text>
            </Pressable>
          </BlurView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imagePicked: {
    height: 200,
    width: "95%",
    marginHorizontal: "auto",
    borderRadius: 10,
    borderWidth: 2
  },
  imageContainer: {
    flexDirection: "column"
    // alignItems: "center"
    // marginVertical: 10
  },
  statusColor: {
    color: "white",
    fontWeight: "bold"
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
    marginBottom: 100,
    marginHorizontal: "auto"
  },
  blurContainer: {
    padding: 10,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  icon: {
    marginRight: 10
  },
  input: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    color: "white"
  },
  inputDatepicker: {
    height: 55,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    color: "white",
    borderColor: "dodgerblue",
    borderWidth: 1,
    justifyContent: "center"
  },
  datePickerText: {
    color: "white"
  },
  inputStatusPicker: {
    height: 55,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    color: "white",
    borderColor: "dodgerblue",
    borderWidth: 1,
    justifyContent: "center"
  },
  ImagePicker: {
    height: 55,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    color: "white",
    borderColor: "dodgerblue",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imagePickerText: {
    color: "white"
  },
  // imagePicked: {
  //   height: 100,
  //   width: 100,
  //   borderRadius: 10
  //   // margin: 10
  // },
  onSubmitButton: {
    height: 55,
    width: "95%",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: "auto"
  },
  onSubmitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center"
  }
});
