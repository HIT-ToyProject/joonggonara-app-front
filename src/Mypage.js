/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon_MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import sampleUserImg from "./assets/image/user-profile-sample.png";
import MypageSelling from "./assets/Mypage_selling";
import MypageSold from "./assets/Mypage_sold";
import { getStorage } from "./assets/TokenStorage";
import { api, setupApi } from "./assets/Interceptor";
import { useFocusEffect } from "@react-navigation/native";

const Mypage = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("selling");
  const [userInfo, setUserInfo] = useState("");
  const [products, setProducts] = useState([]);
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [soldOutProductsCount, setSoldOutProductsCount] = useState(0);
  const [availableProductsCount, setAvailableProductsCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const getProduct = async (item) => {
        if (item && item.nickName) {
          const url = "/product/" + item.nickName;
          try {
            const response = await api.get(url);

            if (response && response.data) {
              setProducts(response.data);
              setSoldOutProducts(
                response.data.filter((product) => product.isSoldOut)
              );
              setAvailableProducts(
                response.data.filter((product) => !product.isSoldOut)
              );
              setSoldOutProductsCount(
                response.data.filter((product) => product.isSoldOut).length
              );
              setAvailableProductsCount(
                response.data.filter((product) => !product.isSoldOut).length
              );
            }
          } catch (error) {
            Alert.alert("에러", error.response.data.message);
          }
        }
      };
      const saveUserInfo = async () => {
        const user = await getStorage("userInfo");
        setUserInfo(user);
        getProduct(user);
      };
      setupApi(navigation);
      saveUserInfo();
    }, [navigation])
  );

  const getStyle = (tabName) => {
    return tabName === selectedTab ? { ...styles.activeTab } : null;
  };

  const getTextStyle = (tabName) => {
    return tabName === selectedTab
      ? { ...styles.text, ...styles.activeTextTab }
      : styles.text;
  };

  const ChangeBtnSell = () => {
    navigation.navigate("ReadMoreSell", {
      screen: "ReadMoreSellScreenName",
      products: products,
    });
  };

  const ChangeBtnSetting = () => {
    navigation.navigate("Setting", { screen: "SettingScreenName" });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(254, 219, 55, 1)",
      }}
    >
      <View style={styles.header}>
        <View style={styles.setting}>
          <TouchableOpacity onPress={ChangeBtnSetting}>
            <Icon_MaterialCommunityIcons name="cog-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.user}>
          <Image
            source={
              userInfo.profile ? { uri: userInfo.profile } : sampleUserImg
            }
            style={styles.userImg}
          />
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              {`${userInfo.nickName},`}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              어서오세요!
            </Text>
          </View>
        </View>
        <View style={styles.information}>
          <View style={styles.informationItems}>
            <View style={{ alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>판매중</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(254, 219, 55, 1)",
                }}
              >
                {availableProductsCount}
              </Text>
            </View>
            <View style={{ alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>판매 개수</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(254, 219, 55, 1)",
                }}
              >
                {soldOutProductsCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ paddingTop: 70 }}>
          <View style={styles.sell}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => setSelectedTab("selling")}
                style={getStyle("selling")}
              >
                <Text style={getTextStyle("selling")}> 판매중 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("sold")}
                style={getStyle("sold")}
              >
                <Text style={getTextStyle("sold")}>판매 완료</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={ChangeBtnSell}>
              <Text style={styles.text}>자세히 보기 〉</Text>
            </TouchableOpacity>
          </View>
          {selectedTab === "selling" ? (
            <MypageSelling items={availableProducts} />
          ) : (
            <MypageSold items={soldOutProducts} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { flex: 2 },
  setting: {
    alignItems: "flex-end",
    padding: 10,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 50,
    paddingRight: 30,
    paddingLeft: 30,
  },
  userImg: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  information: {
    width: "50%",
    justifyContent: "center",
    position: "absolute",
    left: "50%",
    top: "80%",
    transform: [{ translateX: -100 }],
  },
  informationItems: {
    borderWidth: 1.3,
    borderColor: "rgba(254, 219, 55, 1)",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 29,
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 3,
    zIndex: -1,
    backgroundColor: "#fff",
  },
  sell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(245, 245, 245, 1)",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(254, 219, 55, 1)",
  },
  text: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activeTextTab: {
    color: "rgba(254, 219, 55, 1)",
    fontWeight: 600,
  },
  buy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(245, 245, 245, 1)",
    marginTop: 10,
  },
  buyTab: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(254, 219, 55, 1)",
  },
  buyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(254, 219, 55, 1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default Mypage;
