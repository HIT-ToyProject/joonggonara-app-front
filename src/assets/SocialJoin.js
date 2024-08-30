/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsTranslate } from "react-icons/bs";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { typescale } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";

const SocialJoin = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [loginType, setLoginType] = useState("");
  const [nickName, setNickName] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [errorText, setErrorText] = useState(false);

  const nickNameRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const checkNumberRef = useRef();

  const [checkNickName, setCheckNickName] = useState(false);

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const [checkVerificationCodeStatus, setCheckVerificationCodeStatus] =
    useState(false);
  const [verificaationCodeDisable, setVerificationCodeDisable] =
    useState(false);
  const [sendVerificationCodeStatus, setSendVerificationCodeStatus] =
    useState(false);

  useEffect(() => {
    setEmail(route.params?.email);
    setProfile(route.params?.profile);
    setLoginType(route.params?.loginType);
  }, [route.params?.email, route.params?.profile, route.params?.loginType]);

  const onChangeText = (
    text,
    setText,
    duplicateText,
    checkText,
    setCheckText
  ) => {
    setText(text);
    if (text !== duplicateText && checkText) {
      setCheckText(false);
      return;
    }
  };

  const handlecheckDuplicateNickName = async () => {
    if (!nickName.trim()) {
      setErrorText(true);
      return;
    }

    setErrorText(false);
    const url = "http://localhost:9090/user/signUp/duplicateNickName";

    try {
      const response = await axios.get(url, { params: { nickName: nickName } });

      if (response.data) {
        Alert.alert("중복검사", "사용 가능한 닉네임입니다.");
        setCheckNickName(true);
        setDuplicateNickName(nickName);
        name.current.focus();
        return;
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };
  const handleName = () => {
    if (!name) {
      phoneRef.current.focus();
    }
  };

  const sendVerificationCode = async () => {
    if (!phoneNumber.trim()) return;
    else {
      const url = "http://localhost:9090/user/signUp/sms/verification";
      try {
        const response = await axios.post(url, { phoneNumber: phoneNumber });
        if (response.data) {
          Alert.alert("인증 코드", "인증 코드가 전송되었습니다.");
          setMinutes(3);
          setSeconds(0);
          setSendVerificationCodeStatus(true);
        }
      } catch (error) {
        Alert.alert("에러", error.response.data.message);
      }
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
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 180);
    return () => clearInterval(countDown);
  }, [seconds, minutes]);

  const checkverificationCode = async () => {
    if (!phoneNumber.trim() && !sendVerificationCodeStatus) {
      alert("인증코드를 발송해주세요.");
      return;
    } else {
      const url = "http://localhost:9090/user/signUp/sms/checkCode";

      const verificationRequest = {
        verificationKey: phoneNumber,
        verificationCode: verificationCode,
      };

      try {
        const response = await axios.post(url, verificationRequest);
        if (verificationCode === response.data) {
          Alert.alert("인증 검사", "인증 되었습니다.");
          setCheckVerificationCodeStatus(true);
          setVerificationCodeDisable(true);
        } else {
          Alert.alert("에러", "인증코드가 일치하지 않습니다.");
        }
      } catch (error) {
        Alert.alert("에러", error.response.data.message);
      }
    }
  };

  const handlerJoin = async () => {
    if (
      !nickName ||
      !duplicateNickName ||
      nickName !== duplicateNickName ||
      !checkNickName
    ) {
      nickNameRef.current.focus();
      setErrorText(true);
      setNickName("");
      return;
    } else if (!name) {
      setName("");
      setErrorText(true);
      nameRef.current.focus();
    }
    // else if (!phoneNumber) {
    //   setPhoneNumber("");
    //   setErrorText(true);
    //   phoneRef.current.focus();
    // } else if (!verificationCode || !checkVerificationCodeStatus) {
    //   setVerificationCode("");
    //   setErrorText(true);
    //   checkNumberRef.current.focus();
    // }
    else {
      Alert.alert("회원가입", "회원가입 하시겠습니까?", [
        { text: "취소", style: "destructive" },
        {
          text: "확인",
          onPress: () => {
            submitJoin();
          },
        },
      ]);
    }
  };

  const submitJoin = async () => {
    try {
      const url = "http://localhost:9090/user/social/signUp";
      const socialSignUpRequest = {
        email: email,
        profile: profile,
        name: name,
        nickName: nickName,
        phoneNumber: phoneNumber,
        loginType: loginType,
        isNotification: "true",
      };
      const response = await axios.post(url, socialSignUpRequest);
      if (response.data) {
        Alert.alert("회원가입", "정상적으로 회원가입 되었습니다!", [
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 10 }}
        >
          <Icon_AntDesign name="left" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.join}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#FEDB37",
                  borderRadius: 10,
                  marginTop: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}
              >
                <View style={{ gap: 15 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>닉네임</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      borderBottomColor: "red",
                    }}
                  >
                    <TextInput
                      style={[
                        styles.joinInputOverlab,
                        errorText &&
                          !nickName.trim() && { borderBottomColor: "red" },
                      ]}
                      value={nickName}
                      onChangeText={(text) =>
                        onChangeText(
                          text,
                          setNickName,
                          duplicateNickName,
                          checkNickName,
                          setCheckNickName
                        )
                      }
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize="none"
                      ref={nickNameRef}
                    />

                    <TouchableOpacity
                      style={styles.overlap}
                      onPress={handlecheckDuplicateNickName}
                    >
                      <Text
                        style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}
                      >
                        중복 확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ gap: 15, paddingTop: 20 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>이메일</Text>
                  <TextInput
                    style={styles.joinInputOverlab}
                    value={email}
                    editable={false}
                  />
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#FEDB37",
                  borderRadius: 10,
                  marginTop: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}
              >
                <View style={{ gap: 15 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>이름</Text>
                  <TextInput
                    style={[
                      styles.joinInputOverlab,
                      errorText && !name.trim() && { borderBottomColor: "red" },
                    ]}
                    value={name}
                    onChangeText={setName}
                    ref={nameRef}
                    onSubmitEditing={handleName}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                </View>
                <View style={{ gap: 10, paddingTop: 20 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>휴대전화</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <TextInput
                      style={[
                        styles.joinInputOverlab,
                        errorText &&
                          !phoneNumber.trim() && { borderBottomColor: "red" },
                      ]}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      ref={phoneRef}
                      onSubmitEditing={() => sendVerificationCode}
                      autoCapitalize="none"
                      blurOnSubmit={false}
                      returnKeyType="next"
                      inputMode="tel"
                      placeholder="01012345678"
                    />
                    <TouchableOpacity
                      style={styles.overlap}
                      onPress={sendVerificationCode}
                    >
                      <Text
                        style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}
                      >
                        {sendVerificationCodeStatus ? "재전송" : "인증 발송"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ gap: 15, paddingTop: 20 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>인증번호</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <TextInput
                      style={[
                        styles.joinInputOverlab,
                        errorText &&
                          !verificationCode.trim() && {
                            borderBottomColor: "red",
                          },
                      ]}
                      value={verificationCode}
                      onChangeText={setVerificationCode}
                      inputMode="numeric"
                      ref={checkNumberRef}
                      onSubmitEditing={() =>
                        handleSubmitEditing(verificationCode, checkNumberRef)
                      }
                      autoCapitalize="none"
                      blurOnSubmit={false}
                      returnKeyType="next"
                      editable={verificaationCodeDisable}
                    />

                    {sendVerificationCodeStatus && phone.trim() ? (
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
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
                      onPress={checkverificationCode}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        중복 확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.joinBtn} onPress={handlerJoin}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  join: {
    width: "90%",
  },
  joinInputOverlab: {
    flex: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#ffff",
  },
  joinInput: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
  },
  overlap: {
    flex: 1.5,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FEDB37",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    paddingBottom: 30,
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

export default SocialJoin;
