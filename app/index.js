import "react-native-gesture-handler";
import React from "react";
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
    borderBottomWidth: 2, // Épaisseur de la bordure
    borderBottomColor: "dodgerblue"
  },
  headerTitleStyle: {
    color: "white", // Modifier la couleur du texte du titre du header ici
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
        name="LIST"
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
        component={SettingsScreen}
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
    <Stack.Navigator initialRouteName="See More" screenOptions={headerOpion}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="See More" component={InfosScreen} />
    </Stack.Navigator>
  );
}

export default function index() {
  return (
    <Stack.Navigator
      initialRouteName="First Page"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="First Page" component={FirstScreen} />
      <Stack.Screen name="Second Page" component={SecondScreen} />
      <Stack.Screen name="Home" component={HomeComponent} />
      <Stack.Screen name="Inscription" component={RegisterScreen} />
      <Stack.Screen name="Connexion" component={LoginScreen} />
      <Stack.Screen name="Page" component={NextPage} />
      <Stack.Screen
        name="ForgottenPassword"
        component={ForgottenPasswordScreen}
      />
    </Stack.Navigator>
  );
}
