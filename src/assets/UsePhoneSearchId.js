/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

const UsePhoneSearchId = ({ navigation }) => {
  const [nameInput, setNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sendVerificationCodeStatus, setSendVerificationCodeStatus] =
    useState(false);

  const [errorStatus, setErrorStatus] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const requestVerificationCode = async () => {
    if (!phoneNumberInput || !nameInput) {
      setErrorStatus(true);
      return;
    }

    const url = "http://localhost:9090/user/login/findId/sms";
    const findUserIdBySmsRequest = {
      name: nameInput,
      phoneNumber: phoneNumberInput,
    };
    try {
      const response = await axios.post(url, findUserIdBySmsRequest);
      if (response && response.data) {
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
      "http://localhost:9090/user/login/checkVerificationCode/userId?verificationType=SMS";
    const verificationRequest = {
      verificationKey: phoneNumberInput,
      verificationCode: verificationCode,
    };

    try {
      const response = await axios.post(url, verificationRequest);

      if (response && response.data) {
        Alert.alert(
          "회원 ID",
          `${nameInput}님의 아이디는 ${response.data.userId} 입니다.`,
          [
            {
              text: "확인",
            },
            {
              text: "로그인",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } else {
        Alert.alert("알림", "인증코드가 일치하지 않습니다.");
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
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#000" }}>휴대전화</Text>
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
                !phoneNumberInput && {
                  borderBottomColor: "red",
                  borderBottomWidth: 1,
                },
            ]}
            onChangeText={setPhoneNumberInput}
            inputMode="tel"
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
            alignContent: "center",
            justifyContent: "center",
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
          phoneNumberInput &&
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
    direction: "row",
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

export default UsePhoneSearchId;
