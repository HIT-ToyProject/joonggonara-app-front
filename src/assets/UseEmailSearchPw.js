/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

const UseEmailSearchPw = () => {
  const [idInput, setIdInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sendVerificationCodeStatus, setSendVerificationCodeStatus] =
    useState(false);

  const [errorStatus, setErrorStatus] = useState(false);

  const [emailErrorText, setEmailErrorText] = useState("");

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const navigation = useNavigation();

  const onChangeEmail = (text) => {
    setEmailInput(text);
    const regex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    if (regex.test(text)) {
      setEmailErrorText("");
      return;
    } else {
      setEmailErrorText("이메일 형식이 올바르지 않습니다.");
      return;
    }
  };

  const requestVerificationCode = async () => {
    if (!idInput || !emailInput || !nameInput || emailErrorText) {
      setErrorStatus(true);
      return;
    }

    const url = "http://localhost:9090/user/login/findPassword/email";
    const findPasswordByEmailRequest = {
      name: nameInput,
      userId: idInput,
      email: emailInput,
    };
    try {
      const response = await axios.post(url, findPasswordByEmailRequest);
      console.log(response.data);
      if (response.data) {
        Alert.alert("인증 코드", "인증 코드가 전송되었습니다.");
        setMinutes(3);
        setSeconds(0);
        setSendVerificationCodeStatus(true);
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  useEffect(() => {
    const countDown = setInterval(() => {
      setSeconds(seconds);
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(countDown);
          setSendVerificationCodeStatus(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1800);
    return () => clearInterval(countDown);
  }, [seconds, minutes]);

  const checkVerificationCode = async () => {
    if (sendVerificationCodeStatus && !verificationCode) {
      setErrorStatus(true);
      return;
    }
    const url =
      "http://localhost:9090/user/login/checkVerificationCode/password?verificationType=EMAIL";
    const verificationRequest = {
      verificationKey: emailInput,
      verificationCode: verificationCode,
    };

    try {
      const response = await axios.post(url, verificationRequest);
      if (response.data) {
        navigation.navigate("ResetPwd", { userId: idInput });
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  return (
    <View>
      <View
        style={{
          gap: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#000" }}>아이디</Text>
        <TextInput
          style={[
            styles.joinInput,
            errorStatus &&
              !idInput && {
                borderBottomColor: "red",
                borderBottomWidth: 1,
              },
          ]}
          value={idInput}
          onChangeText={setIdInput}
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
        />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#000" }}>이름</Text>
        <TextInput
          style={[
            styles.joinInput,
            errorStatus &&
              !nameInput && { borderBottomColor: "red", borderBottomWidth: 1 },
          ]}
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          onChangeText={setNameInput}
        />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#000" }}>이메일</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "80%",
          }}
        >
          <TextInput
            style={[
              styles.joinInputOverlab,
              errorStatus &&
                !emailInput && {
                  borderBottomColor: "red",
                  borderBottomWidth: 1,
                },
            ]}
            onChangeText={(text) => onChangeEmail(text)}
            inputMode="email"
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
          />

          <TouchableOpacity
            style={styles.overlap}
            onPress={requestVerificationCode}
          >
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
              인증 요청
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {emailErrorText ? (
          <Text style={{ color: "red" }}>{emailErrorText}</Text>
        ) : null}
      </View>
      <View
        style={{
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#000" }}>인증번호</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "80%",
          }}
        >
          <TextInput
            style={[
              styles.joinInputOverlab,
              errorStatus &&
                sendVerificationCodeStatus &&
                !verificationCode && {
                  borderBottomColor: "red",
                  borderBottomWidth: 1,
                },
              { paddingRight: !sendVerificationCodeStatus ? 55 : 0 },
            ]}
            onChangeText={setVerificationCode}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
          />
          {sendVerificationCodeStatus &&
          emailInput &&
          minutes > 0 &&
          seconds > 0 ? (
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "40%",
                transform: [{ translateY: -8 }],
              }}
            >
              <Text style={{ color: "red" }}>
                {`${minutes < 10 ? `0${minutes}` : minutes}:${
                  seconds < 10 ? `0${seconds}` : seconds
                }`}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.overlap}
            onPress={checkVerificationCode}
          >
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
              인증 확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinInputOverlab: {
    height: 50,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
    width: 150,
  },
  joinInput: {
    width: "80%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
  },
  overlap: {
    flex: 2,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FEDB37",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UseEmailSearchPw;
