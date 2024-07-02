import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  ImageBackground,
  FlatList,
  Item,
  Pressable,
  ScrollView,
  TextInput
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const backgroundImage = require("../assets/images/picture10.jpg");

export default function InfosScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{
          // elevation: 10,
          resizeMode: "cover",
          justifyContent: "center"
        }}
        source={backgroundImage}
        style={styles.image}
      ></ImageBackground>
      <ScrollView>
        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
          <Text style={[styles.text, { color: "#fff" }]}>
            Consultez vos contats ici
          </Text>
        </BlurView>
        <BlurView intensity={85} tint="dark" style={styles.blurInputContainer}>
          <View style={styles.inputContainer}>
            <Icon name="account" size={24} color="white" style={styles.icon} />
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
            <Pressable style={styles.inputDatepicker} onPress={showDatepicker}>
              <Text style={styles.datePickerText}>{date.toLocaleString()}</Text>
            </Pressable>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
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
            {/* <TextInput
                placeholder="STATUS"
                placeholderTextColor="#fff"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                /> */}
            <Picker
              style={styles.inputStatusPicker}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
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
          </View>
          <View style={styles.inputContainer}>
            <Icon name="image" size={24} color="white" style={styles.icon} />
            {/* <TextInput
                style={styles.input}
                placeholder="PHOTO"
                placeholderTextColor="#fff"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              /> */}
            <Pressable style={styles.ImagePicker} onPress={pickImage}>
              <Text style={styles.imagePickerText}> CHOISIR UNE IMAGE</Text>
            </Pressable>
            {image && (
              <Image source={{ uri: image }} style={styles.imagePicked} />
            )}
          </View>
          <Pressable
            style={styles.onSubmitButton}
            // onPress={() =>
            //   navigation.navigate("Inscription", { name: "RegisterScreen" })
            // }
          >
            <Text style={styles.onSubmitText}>SAVE</Text>
          </Pressable>
        </BlurView>
      </ScrollView>
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
    fontWeight: "bold"
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto",
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
  listContainer: {
    width: "95%",
    marginHorizontal: 20,
    marginBottom: 70
  },
  itemHeader: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
  },
  itemText: {
    color: "white",
    fontSize: 17,
    fontWeight: 500
  },
  imageStyle: {
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    borderRadius: 100,
    objectFit: "cover"
  },
  input: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    // marginHorizontal: "auto",
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "sans-serif",
    fontSize: 17,
    outlineStyle: "none",
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
  ImagePicker: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    height: 55,
    width: "90%",
    borderRadius: 10,
    marginVertical: 5,
    padding: "auto",
    fontFamily: "sans-serif",
    fontSize: 17,
    outlineStyle: "none",
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
    outlineStyle: "none",
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
    outlineStyle: "none",
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
  imagePicked: {
    width: 200,
    height: 200
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
    marginHorizontal: "auto",
    width: "95%",
    padding: 20,
    textAlign: "center",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    width: "100%"
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
  }
});
