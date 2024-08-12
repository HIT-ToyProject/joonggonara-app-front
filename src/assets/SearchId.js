/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import UsePhoneSearchId from "./UsePhoneSearchId";
import UseEmailSearchId from "./UseEmailSearchId";

const SearchId = () => {
  const [phoneChecked, setPhoneChecked] = useState(false);
  const phoneCheckedToggle = () => {
    setPhoneChecked(!phoneChecked);
  };

  const [emailChecked, setEmailChecked] = useState(false);
  const emailCheckedToggle = () => {
    setEmailChecked(!emailChecked);
  };

  return (
    <View style={styles.content}>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.searchId}>
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
              <View>
                <BouncyCheckbox
                  size={22}
                  fillColor="#FEDB37"
                  text="회원정보에 등록된 휴대전화로 인증"
                  textStyle={{
                    fontSize: 16,
                    color: "#000",
                    textDecorationLine: "none",
                  }}
                  onPress={phoneCheckedToggle}
                  isChecked={true}
                />
                {phoneChecked}
              </View>
              {phoneChecked ? null : <UsePhoneSearchId />}
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
              <View>
                <BouncyCheckbox
                  size={22}
                  fillColor="#FEDB37"
                  text="본인확인 이메일로 인증"
                  textStyle={{
                    fontSize: 16,
                    color: "#000",
                    textDecorationLine: "none",
                  }}
                  onPress={emailCheckedToggle}
                />
                {emailChecked}
              </View>
              {emailChecked ? <UseEmailSearchId /> : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchId: {
    width: "90%",
  },
  joinInputOverlab: {
    flex: 3,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    paddingLeft: 20,
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

export default SearchId;
