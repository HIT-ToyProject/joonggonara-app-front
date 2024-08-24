/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import logo from "./image/logo.png";
import kakao from "./image/kakaotalk.png";
import naver from "./image/naver.png";
import google from "./image/google.png";
import axios from "axios";
import { getStorage, removeStorage, setStorage } from "./TokenStorage";
import api from "./Interceptor";

const Login = ({ navigation }) => {
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [eye, setEye] = useState("true");
  const [validInput, setValidInput] = useState("");
  const passwordInputRef = useRef();

  const loginType = {
    NAVER: "NAVER",
    GOOGLE: "GOOGLE",
    KAKAO: "KAKAO",
  };

  const eyeToggle = () => {
    setEye(!eye);
  };

  const headerChangeBtnJoin = () => {
    navigation.navigate("Join", { screen: "JoinScreenName" });
  };

  const headerChangeBtnSearch = () => {
    navigation.navigate("SearchIdPw", { screen: "SearchIdPwScreenName" });
  };

  const submitLogin = async () => {
    if (idInput.trim() === "" || pwInput.trim() === "") {
      setValidInput("아이디 또는 비밀번호를 입력해주세요.");
    } else {
      setValidInput("");

      const loginRequest = {
        userId: idInput,
        password: pwInput,
      };

      try {
        const response = await axios.post(
          "http://localhost:9090/user/login",
          loginRequest
        );
        let accessToken = response.headers.authorization;
        const userId = response.data.userId;
        if (response && response.data && accessToken) {
          setStorage(`accessToken`, accessToken);
          setStorage(`userInfo`, response.data);
          navigation.navigate("Home", { userId: userId });
        }
      } catch (error) {
        Alert.alert("에러", error.response.data.message);
      }
    }
  };

  const submitSocialLogin = async (type) => {
    try {
      const response = await axios.get(
        "http://localhost:9090/user/login/oauth2",
        { params: { loginType: type } }
      );
      navigation.navigate("WebView", { uri: response.data, loginType: type });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FEDB37" }}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <Image source={logo} style={styles.logoImg} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.login}>
          <View style={{ gap: 15 }}>
            <Text style={{ fontSize: 16, color: "#000" }}>아이디</Text>
            <TextInput
              style={styles.loginInput}
              value={idInput}
              onChangeText={setIdInput}
              autoCapitalize="none"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={{ gap: 15, paddingTop: 20 }}>
            <Text style={{ fontSize: 16, color: "#000" }}>비밀번호</Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.loginInput}
                value={pwInput}
                onChangeText={setPwInput}
                secureTextEntry={eye}
                ref={passwordInputRef}
                autoCapitalize="none"
                blurOnSubmit={false}
              />
              <TouchableOpacity
                onPress={eyeToggle}
                style={{ position: "absolute", top: 12, right: 15 }}
              >
                <Icon_AntDesign name={eye ? "eyeo" : "eye"} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ alignItems: "flex-end", paddingTop: 10 }}
            onPress={headerChangeBtnSearch}
          >
            <Text style={{ color: "#FEDB37", fontSize: 14 }}>
              아이디 / 비밀번호를 잊으셨나요?
            </Text>
          </TouchableOpacity>
          {validInput ? (
            <Text style={{ marginTop: 10, color: "red" }}>{validInput}</Text>
          ) : null}
          <TouchableOpacity style={styles.loginBtn} onPress={submitLogin}>
            <Text style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>
              로그인
            </Text>
          </TouchableOpacity>
          <View style={styles.easyLogin}>
            <TouchableOpacity
              onPress={() => submitSocialLogin(loginType.KAKAO)}
            >
              <Image source={kakao} style={styles.easyLoginImg} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={naver} style={styles.easyLoginImg} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={google} style={styles.easyLoginImg} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 40,
            }}
          >
            <Text style={{ fontSize: 15, color: "#000" }}>
              계정이 없으신가요?
            </Text>
            <TouchableOpacity
              style={{ paddingLeft: 5 }}
              onPress={headerChangeBtnJoin}
            >
              <Text style={{ fontSize: 15, color: "#FEDB37" }}>
                회원가입 하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logoImg: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#003",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
    elevation: 5,
  },
  login: {
    width: "90%",
  },
  loginInput: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
  },
  loginBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#FEDB37",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 2.84,
    elevation: 5,
    marginTop: 20,
  },
  easyLogin: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 60,
  },
  easyLoginImg: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
});

export default Login;
