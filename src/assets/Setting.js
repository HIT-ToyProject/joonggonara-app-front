/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Icon_AntDesign from "react-native-vector-icons/AntDesign";
import { getStorage, removeStorage } from "./TokenStorage";
import { api, setupApi } from "./Interceptor";

const Setting = ({ navigation }) => {
  const [useInfo, setUseInfo] = useState("");

  useEffect(() => {
    const saveUseInfo = async () => {
      setUseInfo(await getStorage("useInfo"));
    };
    setupApi(navigation);
    saveUseInfo();
  }, []);

  const logoutHandle = async () => {
    const url = "/user/logout";

    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "로그아웃",
        onPress: async () => {
          try {
            const response = await api.delete(url);
            if (response && response.data) {
              console.log(response.data);
              Alert.alert("알림", "로그아웃 되었습니다.", [
                {
                  text: "확인",
                  onPress: async () => {
                    removeStorage("accessToken");
                    removeStorage("userInfo");
                    navigation.navigate("Home");
                  },
                },
              ]);
            }
          } catch (error) {
            Alert.alert("에러", error.response.data.message);
          }
        },
      },
    ]);
  };

  const moveUpdateUserInfo = () => {
    navigation.navigate("UpdateUserInfo");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
          <View>
            <Text style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>
              설정
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            width: "90%",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>알림 설정</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30,
            }}
          >
            <TouchableOpacity style={{ width: "100%" }}>
              <Text style={{ fontSize: 16 }}>알림 수신 설정</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "90%",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>사용자 설정</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30,
              gap: 30,
            }}
          >
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={moveUpdateUserInfo}
            >
              <Text style={{ fontSize: 16 }}>계정 / 정보 설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "100%" }} onPress={logoutHandle}>
              <Text style={{ fontSize: 16 }}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "100%" }}>
              <Text style={{ fontSize: 16 }}>회원탈퇴</Text>
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
});

export default Setting;
