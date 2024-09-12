import messaging from "@react-native-firebase/messaging";
const BackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (msg) => {
    console.log("Message handled in the background!", remoteMessage);
  });
};

export default BackgroundMessageHandler;
