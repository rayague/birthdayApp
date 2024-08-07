// RegisterForPushNotificationsAsync.js
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Register for push notifications and return the token
export const RegisterForPushNotificationsAsync = async () => {
  let token;

  // Configure notification channel for Android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  // Get the existing notification permissions status
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request notification permissions if not already granted
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Alert if permission is not granted
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  // Get the Expo push token
  token = (await Notifications.getExpoPushTokenAsync()).data;

  // Configure the notification channel again if needed
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  return token;
};
