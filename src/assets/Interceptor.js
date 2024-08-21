import axios from "axios";
import { getStorage, reissueToken, removeStorage } from "./TokenStorage";
import { Alert } from "react-native";

const api = axios.create({
  baseURL: "http://localhost:9090",
  timeout: 1000,
});
const setupApi = (navigation) => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = await getStorage("accessToken");
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.message;
        console.log(errorType);
        switch (errorType) {
          case "INVALID_TOKEN":
          case "UNSUPPORTED_TOKEN":
          case "AUTHENTICATION_ERROR":
          case "ALREADY_LOGGED_OUT_USER":
          case "NOT_EXIST_AUTHORIZATION":
          case "NOT_EXIST_USER": {
            Alert.alert("에러", errorMessage, [
              {
                text: "확인",
                onPress: () => navigation.navigate("Login"),
              },
            ]);
            return;
          }
          case "EXPIRED_TOKEN": {
            try {
              const accessToken = await reissueToken();
              if (accessToken) {
                error.config.headers.Authorization = accessToken;
                return api(error.config);
              }
            } catch (error) {
              return Promise.reject(error);
            }
          }
          case "REFRESH_TOKEN_EXPIRED_TOKEN": {
            removeStorage("accessToken");
            Alert.alert(
              "알림",
              "자동 로그인 기간이 만료되었습니다. 다시 로그인해 주세요.",
              [
                {
                  text: "확인",
                  onPress: () => navigation.navigate("Login"),
                },
              ]
            );
          }
        }
        return Promise.reject(error);
      }
    }
  );
};
export { api, setupApi };
