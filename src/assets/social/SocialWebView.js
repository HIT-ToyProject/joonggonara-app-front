import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView, useWindowDimensions } from "react-native";

const SocialWebView = ({ navigation, route }) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const uri = route.params.uri;
  const loginType = route.params.loginType;
  const hasRedirect = useRef(false);

  const HandlerOAuth2Login = (e) => {
    const targetUri = "http://localhost:9090/user/login/oauth2/code/";

    if (hasRedirect.current || !e.url.startsWith(targetUri)) return;
    hasRedirect.current = true;
    navigation.navigate("SocialLoginRedirect", {
      uri: e.url,
      loginType: loginType,
    });
  };

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
