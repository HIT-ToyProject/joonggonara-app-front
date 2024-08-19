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
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";

import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ResetPwd = ({ route }) => {
  const [pwdInput, setPwdInput] = useState("");
  const [checkPwdInput, setCheckPwdInput] = useState("");
  const [pwdErrorText, setPwdErrorText] = useState("");
  const [checkPwdErrorText, setCheckPwdErrorText] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [eye, setEye] = useState(false);
  const pwdRef = useRef();
  const checkPwdRef = useRef();
  const navigation = useNavigation();

  const eyeToggle = () => {
    setEye(!eye);
  };

  const handleValidatePwd = () => {
    if (!pwdErrorText) {
      checkPwdRef.current.focus();
    }
  };

  const onChangePwd = (text) => {
    setPwdInput(text);
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (regex.test(text)) {
      setPwdErrorText("");
      return;
    } else {
      setPwdErrorText(
        "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용해 주세요."
      );
    }
  };

  const onChangeCheckPwd = (text) => {
    setCheckPwdInput(text);
    if (!pwdInput) {
      return;
    }
    if (pwdInput === text) {
      setCheckPwdErrorText("");
      return;
    } else {
      setCheckPwdErrorText("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  const submitUpdatePwd = async () => {
    if (!pwdInput || !checkPwdInput) {
      setErrorStatus(true);
      return;
    }
    setErrorStatus(false);
    const url = "http://localhost:9090/user/login/update/password";
    const updatePasswordRequest = {
      userId: route.params.userId,
      password: pwdInput,
    };
    try {
      const response = await axios.put(url, updatePasswordRequest);
      if (response.data) {
        Alert.alert("비밀번호 변경", "비밀번호가 변경되었습니다.", [
          {
            text: "확인",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
          }}
        >
          비밀번호 재설정
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "80%",
            backgroundColor: "#F7F7F7",
            borderRadius: 10,
            justifyContent: "center",
            paddingHorizontal: 10,
            gap: 2,
          }}
        >
          <Text style={{ fontSize: 16, paddingBottom: 5 }}>유의사항</Text>
          <Text style={{ color: "#aaa" }}>
            - 8자 ~ 10자 길이로 만들어주세요.
          </Text>
          <Text style={{ color: "#aaa" }}>
            - 영문 대/소문자, 숫자, 특수 문자를 조합해주세요.
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            borderWidth: 1,
            borderColor: "#FEDB37",
            borderRadius: 10,
            marginTop: 20,
            paddingHorizontal: 15,
            paddingVertical: 30,
            gap: 10,
          }}
        >
          <View
            style={{
              gap: 15,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, color: "#000" }}>비밀번호</Text>
              <TextInput
                style={[
                  styles.joinInput,
                  errorStatus &&
                    !pwdInput && {
                      borderBottomColor: "red",
                      borderBottomWidth: 1,
                    },
                ]}
                onChangeText={(text) => onChangePwd(text)}
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="next"
                ref={pwdRef}
                onSubmitEditing={handleValidatePwd}
                secureTextEntry={eye}
              />
            </View>
            {pwdErrorText ? (
              <Text style={{ color: "red" }}>{pwdErrorText}</Text>
            ) : null}
          </View>
          <View
            style={{
              gap: 15,
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, color: "#000" }}>비밀번호 확인</Text>
              <TextInput
                style={[
                  styles.joinInput,
                  errorStatus &&
                    !checkPwdInput && {
                      borderBottomColor: "red",
                      borderBottomWidth: 1,
                    },
                ]}
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="next"
                ref={checkPwdRef}
                onChangeText={(text) => onChangeCheckPwd(text)}
              />
            </View>
            {checkPwdErrorText ? (
              <Text style={{ color: "red", marginLeft: 50 }}>
                {checkPwdErrorText}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ width: "90%" }}>
          <TouchableOpacity style={styles.joinBtn} onPress={submitUpdatePwd}>
            <Text style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>
              변경하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  joinInputOverlab: {
    flex: 3,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
  },
  joinInput: {
    width: "70%",
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
  footer: {
    flex: 1,
    paddingBottom: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  joinBtn: {
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
});

export default ResetPwd;
