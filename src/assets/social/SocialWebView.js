import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView, useWindowDimensions } from "react-native";

const SocialWebView = ({ navigation, route }) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const { uri } = route.params;

  const HandlerOAuth2Login = (e) => {
    console.log("e", e);
    if (e.navigationType === "other" && e.url.split("code")[1]) {
      navigation.navigate("SocialLoginRedirect", { uri: e.url });
    }
  };

  console.log(route.params.uri);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <WebView
        style={{ flex: 1, width: width, height: height }}
        originWhitelist={"*"}
        source={{ uri: uri }}
        onNavigationStateChange={HandlerOAuth2Login}
      />
    </SafeAreaView>
  );
};

export default SocialWebView;
