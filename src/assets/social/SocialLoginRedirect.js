import axios from "axios";
import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { setStorage } from "../TokenStorage";

function SocialLoginRedirect({ route, navigation }) {
  const uri = route.params.uri;
  const loginType = route.params.loginType;
  const oAuth2Login = async (uri) => {
    const redirectUri = uri.split("?")[0];
    let code = uri.split("code=")[1];

    if (loginType === "NAVER") {
      code = code.split("&")[0];
    }
    if (!code) return;
    console.log("code: ", code);
    console.log("loginType: ", uri);
    try {
      const response = await axios.get(redirectUri, {
        params: { code: code },
      });
      const accessToken = response.headers.authorization;
      console.log("response: ", response.data);

      if (response && response.data && accessToken) {
        setStorage("userInfo", response.data);
        setStorage("accessToken", accessToken);
        navigation.navigate("Home");
      } else {
        Alert.alert("알림", "회원가입이 필요합니다", [
          {
            text: "확인",
            onPress: () => {
              navigation.navigate("SocialJoin", {
                email: response.data.email,
                profile: response.data.profile,
                loginType: response.data.loginType,
              });
            },
          },
        ]);
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert(
        "에러",
        error.response?.data?.message || "오류가 발생했습니다."
      );
    }
  };
  useEffect(() => {
    oAuth2Login(uri);
  }, [uri]); // uri가 변경될 때만 실행
}

export default SocialLoginRedirect;
