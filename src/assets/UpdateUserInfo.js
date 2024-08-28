/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import { getStorage, removeStorage, setStorage } from "./TokenStorage";
import profileSample from "./image/user-profile-sample.png";
import { api, setupApi } from "./Interceptor";
const UpdateUserInfo = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState("");
  const [profile, setProfile] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [duplicatedNickName, setDuplicatedNickName] = useState(false);
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  const [checkVerificationCode, setCheckVerificationCode] = useState(false);

  const [updateNickName, setUpdateNickName] = useState(false);
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getStorage("userInfo");
      setUserInfo(user);
      setNickName(user.nickName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setProfile(user.profile);
    };
    getUserInfo();
    setupApi(navigation);
  }, []);
  const selectImages = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      selectionLimit: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const newImages = response.assets
          .map((asset) => ({
            uri: asset.uri,
            type: asset.type,
            fileName: asset.fileName,
          }))
          .filter((asset) => {
            return asset.type === "image/jpg" || asset.type === "image/png";
          });
        setProfile(newImages[0]);
      }
    });
  };
  const checkDuplicatedNickName = async () => {
    if (nickName === userInfo.nickName || duplicatedNickName) {
      Alert.alert("알림", "이미 수정된 닉네임입니다.");
      return;
    }
    const url = "/user/update/info/nickName/" + nickName;

    try {
      const response = await api.get(url);
      if (response && !response.data) {
        Alert.alert("알림", "사용 가능한 닉네임입니다.");
        setUpdateNickName(nickName);
        setDuplicatedNickName(true);
        return;
      } else {
        Alert.alert("알림", "이미 사용중인 닉네임입니다.");
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const requestVerificationCode = async () => {
    if (phoneNumber === userInfo.phoneNumber || checkPhoneNumber) {
      Alert.alert("알림", "이미 수정된 핸드폰 번호입니다.");
      return;
    }

    const signUpPhoneNumberRequest = {
      phoneNumber: phoneNumber,
    };

    const url = "/user/update/info/sms/verification";

    try {
      const response = await api.post(url, signUpPhoneNumberRequest, {
        headers: { "Content-Type": "application/json" },
      });
      if (response && response.data) {
        Alert.alert("알림", "인증 요청되었습니다.");
        setDuplicatedNickName(true);
        setUpdatePhoneNumber(phoneNumber);
        return;
      } else {
        Alert.alert(
          "알림",
          "인증 요청이 실패하였습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const updateUserInfoHandle = async () => {
    const url = "/user/update/info";
    const formData = new FormData();

    formData.append("profile", {
      uri: profile.uri,
      name: profile.fileName,
      type: profile.type,
    });

    const memberUpdateRequest = {
      nickName: nickName,
      email: email,
      phoneNumber: phoneNumber,
    };
    formData.append("memberUpdateRequest", {
      string: JSON.stringify(memberUpdateRequest),
      type: "application/json",
    });
    try {
      const response = await api.post(url, formData);
      if (response && response.data) {
        removeStorage("userInfo");
        setStorage("userInfo", response.data);
        Alert.alert("알림", "회원 수정되었습니다.", [
          {
            text: "확인",
            onPress: () => navigation.navigate("Home"),
          },
        ]);

        return;
      } else {
        Alert.alert(
          "알림",
          "인증 요청이 실패하였습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } catch (error) {
      Alert.alert("에러", error.response.data.message);
    }
  };

  const submitUpdateUserInfo = async () => {
    if (
      userInfo.profile === profile &&
      userInfo.nickName === nickName &&
      userInfo.email === email &&
      userInfo.phoneNumber === phoneNumber
    ) {
      Alert.alert("알림", "이미 수정된 회원 정보입니다.");
      return;
    } else if (userInfo.nickName !== nickName && !duplicatedNickName) {
      Alert.alert("알림", "닉네임 중복 검사해 주세요.");
      return;
    } else if (userInfo.phoneNumber !== phoneNumber && !checkPhoneNumber) {
      Alert.alert("알림", "핸드폰 인증 확인해 주세요.");
      return;
    } else if (
      userInfo.phoneNumber !== phoneNumber &&
      checkPhoneNumber &&
      !checkVerificationCode
    ) {
      Alert.alert("알림", "인증 코드를 확인해 주세요.");
      return;
    } else {
      Alert.alert("알림", "회원 정보를 변경하시겠습니까?", [
        {
          text: "취소",
        },
        {
          text: "수정하기",
          onPress: updateUserInfoHandle,
        },
      ]);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 0 }}
          >
            <Icon_AntDesign name="left" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {profile ? (
            <View style={{ position: "relative" }}>
              <Image style={styles.uploadImg} source={{ uri: profile }} />
            </View>
          ) : (
            <Image style={styles.uploadImg} source={profileSample} />
          )}
          <TouchableOpacity
            onPress={selectImages}
            style={styles.selectedImageText}
          >
            <Text style={{ color: "#FEDB37", fontSize: 16, fontWeight: 700 }}>
              사진 수정하기
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 20 }}>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 16 }}>닉네임</Text>
            <TextInput
              style={{
                width: 140,
                height: 40,
                borderRadius: 30,
                backgroundColor: "#F7F7F7",
                paddingLeft: 15,
                fontSize: 16,
                marginLeft: 10,
              }}
              autoCapitalize="none"
              blurOnSubmit={false}
              value={nickName}
              onChangeText={(text) => {
                if (text === updateNickName || text === userInfo.nickName) {
                  setDuplicatedNickName(true);
                } else {
                  setDuplicatedNickName(false);
                }
                setNickName(text);
              }}
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FEDB37",
                borderRadius: 30,
              }}
              onPress={checkDuplicatedNickName}
            >
              <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                중복 검사
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 16 }}>이메일</Text>
            <TextInput
              style={{
                width: 250,
                height: 40,
                borderRadius: 30,
                backgroundColor: "#F7F7F7",
                paddingLeft: 15,
                fontSize: 16,
                marginLeft: 10,
              }}
              autoCapitalize="none"
              blurOnSubmit={false}
              value={email}
              onChangeText={setEmail}
              inputMode="email"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 16 }}>전화번호</Text>
            <TextInput
              style={{
                width: 140,
                height: 40,
                borderRadius: 30,
                backgroundColor: "#F7F7F7",
                paddingLeft: 15,
                fontSize: 16,
              }}
              autoCapitalize="none"
              blurOnSubmit={false}
              value={phoneNumber}
              onChangeText={(text) => {
                if (
                  text === updatePhoneNumber ||
                  text === userInfo.phoneNumber
                ) {
                  setCheckPhoneNumber(true);
                } else {
                  setCheckPhoneNumber(false);
                }
                setPhoneNumber(text);
              }}
              inputMode="phone"
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FEDB37",
                borderRadius: 30,
              }}
              onPress={requestVerificationCode}
            >
              <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                인증 요청
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 16 }}>인증번호</Text>
            <TextInput
              style={{
                width: 140,
                height: 40,
                borderRadius: 30,
                backgroundColor: "#F7F7F7",
                paddingLeft: 15,
                fontSize: 16,
              }}
              autoCapitalize="none"
              blurOnSubmit={false}
              value={verificationCode}
              onChangeText={setVerificationCode}
              inputMode="decimal"
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FEDB37",
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                인증 확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={submitUpdateUserInfo}>
        <Text style={styles.buttonText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#F7F7F7",
    paddingBottom: 20,
  },
  content: {
    flex: 9,
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    gap: 40,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  uploadImg: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  selectedImageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  button: {
    width: 355,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FEDB37",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 27,
    letterSpacing: 0.3,
  },
});
export default UpdateUserInfo;
