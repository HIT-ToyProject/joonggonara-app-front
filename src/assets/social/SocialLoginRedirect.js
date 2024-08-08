import axios from "axios";

export default function SocialLoginRedirect({ navigation, route }) {
  console.log("aaa");
  const { uri } = route.params;

  const redirectUri = uri.split("?")[0];
  const code = uri.split("code=")[1];

  console.log(redirectUri);
  console.log(code);
  if (!redirectUri.trim() && !code.trim()) {
    alert("서버 오류입니다. 잠시후 다시 시도 바랍니다.");
    navigation.navigate("Login");
  }
  try {
    const response = axios.get(redirectUri, { code: code });

    console.log();
  } catch (error) {
    console.error(error);
  }
}
