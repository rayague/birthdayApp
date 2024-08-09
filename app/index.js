import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ListScreen from "../screens/ListScreen";
import ForgottenPasswordScreen from "../screens/ForgottenPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InfosScreen from "../screens/InfosScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import EditScreen from "../screens/EditScreen";
import CelebrationsScreen from "../screens/CelebrationsScreen";
import LoadingScreen from "../screens/LoadingScreen";
import GeneratedTextScreen from "../screens/GeneratedTextScreen";
import { RegisterForPushNotificationsAsync } from "../screens/RegisterForPushNotificationsAsync"; // Assurez-vous que le chemin est correct
// import seedData from "../screens/TextGenerator"; // Assure-toi que le chemin est correct
// import FirstScreen from "../screens/FirstScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    elevation: 1,
    height: 60,
    backgroundColor: "dodgerblue",
    borderWidth: 0
  },
  headerStyle: {
    backgroundColor: "dodgerblue",
    borderBottomWidth: 2,
    borderBottomColor: "dodgerblue"
  },
  headerTitleStyle: {
    color: "white",
    fontWeight: 900,
    fontSize: 30
  }
};

const headerOpion = {
  headerStyle: {
    backgroundColor: "dodgerblue"
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

function HomeComponent() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home-outline" : "home"}
              size={size}
              color={color}
              style={{ color: focused ? "white" : "white" }}
            />
          )
        }}
      />
      <Tab.Screen
        name="LISTS"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "list-outline" : "list"}
              size={size}
              color={color}
              style={{ color: focused ? "white" : "white" }}
            />
          )
        }}
      />
      <Tab.Screen
        name="CELEBRATIONS"
        component={CelebrationsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "calendar-outline" : "calendar"}
              size={size}
              color={color}
              style={{ color: focused ? "white" : "white" }}
            />
          )
        }}
      />
      <Tab.Screen
        name="PROFILE"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person-outline" : "person"}
              size={size}
              color={color}
              style={{ color: focused ? "white" : "white" }}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function NextPage() {
  return (
    <Stack.Navigator initialRouteName="DETAILS" screenOptions={headerOpion}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="DETAILS" component={InfosScreen} />
    </Stack.Navigator>
  );
}

function EditPage() {
  return (
    <Stack.Navigator initialRouteName="EDIT" screenOptions={headerOpion}>
      <Stack.Screen name="EDIT" component={EditScreen} />
    </Stack.Navigator>
  );
}

function Generated() {
  return (
    <Stack.Navigator
      initialRouteName="GeneratedText"
      screenOptions={headerOpion}
    >
      <Stack.Screen name="GeneratedText" component={GeneratedTextScreen} />
    </Stack.Navigator>
  );
}

function ForgottenPasswordManagement() {
  return (
    <Stack.Navigator
      initialRouteName="ForgottenPassword"
      screenOptions={headerOpion}
    >
      <Stack.Screen
        name="ForgottenPassword"
        component={ForgottenPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default function index() {
  useEffect(() => {
    const registerForPushNotifications = async () => {
      const token = await RegisterForPushNotificationsAsync();
      console.log("Expo Push Token:", token);
    };

    registerForPushNotifications();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="First Page"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="First Page" component={FirstScreen} />
      <Stack.Screen name="Second Page" component={SecondScreen} />
      <Stack.Screen name="Home" component={HomeComponent} />
      <Stack.Screen name="Inscription" component={RegisterScreen} />
      <Stack.Screen name="Connexion" component={LoginScreen} />
      <Stack.Screen name="Page" component={NextPage} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Edit" component={EditPage} />
      <Stack.Screen name="GeneratedTextScreen" component={Generated} />
      <Stack.Screen
        name="ForgottenPasswordManagement"
        component={ForgottenPasswordManagement}
      />
    </Stack.Navigator>
  );
}
