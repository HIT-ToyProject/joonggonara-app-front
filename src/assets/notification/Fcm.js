import messaging from "@react-native-firebase/messaging";
import { setStorage } from "../TokenStorage";


export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setStorage("fcmToken", fcmToken);
    }
  }
};
export const handleForegroundMessage = () => {
  const unsubscribe = messaging().onMessage(async (msg) => {
    Alert.alert("새 메시지!", msg.notification?.title || "No Title", [
      { text: "확인" },
    ]);
  });
  return unsubscribe;
};
