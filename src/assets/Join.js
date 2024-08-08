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

const Join = ({ navigation }) => {
  const [idInput, setIdInput] = useState("");
  const [duplicateId, setDuplicateId] = useState("");
  const [nickName, setNickName] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorText, setErrorText] = useState(false);
  const [pwdErrorText, setPwdErrorText] = useState("");
  const [checkPwdErrorText, setCheckPwdErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");

  const nickNameRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const checkPasswordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const checkNumberRef = useRef();

  const [checkNickName, setCheckNickName] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [eye, setEye] = useState("false");

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [sendVerificationCodeStatus, setSendVerificationCodeStatus] =
    useState(false);
  const [checkVerificationCodeStatus, setCheckVerificationCodeStatus] =
    useState(false);
  const [verificaationCodeDisable, setVerificationCodeDisable] =
    useState(false);

  const eyeToggle = () => {
    setEye(!eye);
  };

  const handleCheckText = (text, duplicateText, setduplicateText) => {
    if (text !== duplicateText) {
      setduplicateText(false);
      return;
    }
  };

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

  const handleFoucus = (setTouced) => {
    setTouced(true);
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
        idRef.current.focus();
        return;
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const handleCheckId = async () => {
    if (!idInput.trim()) {
      setErrorText(true);
      return;
    }
    setErrorText(false);
    const url = "http://localhost:9090/user/signUp/duplicateUserId";

    try {
      const response = await axios.get(url, { params: { userId: idInput } });

      if (response.data) {
        Alert.alert("중복검사", "사용 가능한 닉네임입니다.");
        setCheckId(true);
        setDuplicateId(idInput);
        return;
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const handleValidatePwd = () => {
    if (!pwdErrorText) {
      checkPasswordRef.current.focus();
    }
  };

  const onChangePwd = (text) => {
    setPassword(text);
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

  const onchangeCheckPwd = (text) => {
    setCheckPassword(text);
    if (!password.trim()) {
      return;
    }
    if (password === text) {
      setCheckPwdErrorText("");
      return;
    } else {
      setCheckPwdErrorText("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  const handleCheckPassword = () => {
    if (!checkPwdErrorText) {
      emailRef.current.focus();
    }
  };

  const handleEmail = () => {
    if (!emailErrorText) {
      nameRef.current.focus();
    }
  };

  const onChangeEmail = (text) => {
    setEmail(text);
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

  const handleName = () => {
    if (!name) {
      phoneRef.current.focus();
    }
  };

  const sendVerificationCode = async () => {
    if (!phone.trim()) return;
    else {
      const url = "http://localhost:9090/user/signUp/sms/verification";
      try {
        const response = await axios.post(url, { phoneNumber: phone });
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
    if (!phone.trim() && !sendVerificationCodeStatus) {
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
    } else if (
      !idInput ||
      !duplicateId ||
      idInput !== duplicateId ||
      !checkId
    ) {
      idRef.current.focus();
      setErrorText(true);
      setIdInput("");
      return;
    } else if (!password) {
      passwordRef.current.focus();
      setPassword("");
      setErrorText(true);
      return;
    } else if (!checkPassword) {
      checkPasswordRef.current.focus();
      setCheckPassword("");
      setErrorText(true);
      return;
    } else if (!email || emailErrorText) {
      setEmail("");
      setErrorText(true);
      emailRef.current.focus();
    } else if (!name) {
      setName("");
      setErrorText(true);
      nameRef.current.focus();
    }
    // else if (!phone) {
    //   setPhone("");
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
      const url = "http://localhost:9090/user/signUp";
      const signUpRequest = {
        userId: idInput,
        email: email,
        password: password,
        name: name,
        nickName: nickName,
        phoneNumber: phone,
        loginType: "GENERAL",
        isNotification: "true",
      };
      const response = await axios.post(url, signUpRequest, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data) {
        Alert.alert("회원가입", "정상적으로 회원가입 되었습니다!", [
          {
            text: "확인",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
    } catch (error) {
      console.error(error.response);
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
                  <Text style={{ fontSize: 16, color: "#000" }}>아이디</Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TextInput
                      style={[
                        styles.joinInputOverlab,
                        errorText &&
                          !idInput.trim() && { borderBottomColor: "red" },
                      ]}
                      value={idInput}
                      onChangeText={(text) =>
                        onChangeText(
                          text,
                          setIdInput,
                          duplicateId,
                          checkId,
                          setCheckId
                        )
                      }
                      ref={idRef}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.overlap}
                      onPress={handleCheckId}
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
                  <Text style={{ fontSize: 16, color: "#000" }}>비밀번호</Text>
                  <TextInput
                    style={[
                      styles.joinInputOverlab,
                      errorText &&
                        !password.trim() && { borderBottomColor: "red" },
                    ]}
                    value={password}
                    onChangeText={(text) => onChangePwd(text)}
                    secureTextEntry={eye}
                    ref={passwordRef}
                    onSubmitEditing={handleValidatePwd}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  {pwdErrorText ? (
                    <Text style={{ color: "red" }}>{pwdErrorText}</Text>
                  ) : null}
                </View>
                <View style={{ gap: 15, paddingTop: 20 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>
                    비밀번호 확인
                  </Text>
                  <TextInput
                    style={[
                      styles.joinInputOverlab,
                      errorText &&
                        !checkPassword.trim() && { borderBottomColor: "red" },
                    ]}
                    value={checkPassword}
                    onChangeText={(text) => onchangeCheckPwd(text)}
                    secureTextEntry={eye}
                    ref={checkPasswordRef}
                    onSubmitEditing={handleCheckPassword}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  {checkPwdErrorText ? (
                    <Text style={{ color: "red" }}>{checkPwdErrorText}</Text>
                  ) : null}
                </View>
                <View style={{ gap: 15, paddingTop: 20 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>이메일</Text>
                  <TextInput
                    style={[
                      styles.joinInputOverlab,
                      errorText &&
                        !email.trim() && { borderBottomColor: "red" },
                    ]}
                    value={email}
                    onChangeText={(text) => onChangeEmail(text)}
                    ref={emailRef}
                    onSubmitEditing={handleEmail}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    returnKeyType="next"
                    inputMode="email"
                  />
                  {emailErrorText ? (
                    <Text style={{ color: "red" }}>{emailErrorText}</Text>
                  ) : null}
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
                          !phone.trim() && { borderBottomColor: "red" },
                      ]}
                      value={phone}
                      onChangeText={setPhone}
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

export default Join;
