/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon_EvilIcons from "react-native-vector-icons/EvilIcons";
import sampleImg from "./image/sample2.jpg";
import { useNavigation } from "@react-navigation/native";
import { getStorage } from "./TokenStorage";

const MypageSold = ({ items }) => {
  const navigation = useNavigation();
  const checkToken = async () => {
    const token = await getStorage(`accessToken`);
    if (!token) {
      Alert.alert("알림", "로그인 후 이용해주세요!", [
        {
          text: "로그인 창으로 이동",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
      return false;
    } else {
      return true;
    }
  };
  const moveDetailPage = async (item) => {
    const userInfo = await getStorage("userInfo");
    if (await checkToken()) {
      navigation.navigate("Detail", {
        screen: "DetailScreenName",
        data: item,
        nickName: userInfo.nickName,
      });
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          marginLeft: 15,
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          style={styles.content_item}
          onPress={() => moveDetailPage(item)}
        >
          <View>
            <Image
              style={styles.content_img}
              source={{
                uri: `${item.photos[0].filePath}${item.photos[0].fileName}`,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                marginLeft: 5,
                color: "#000",
              }}
            >
              {item.title.length <= 15
                ? item.title
                : item.title.slice(0, 16) + "..."}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon_EvilIcons name="location" size={20} color={"#FEDB37"} />
              <Text
                style={{
                  fontSize: 13,
                  color: "#9EA1A9",
                }}
              >
                {item.school}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                marginLeft: 5,
                color: "#000",
              }}
            >
              {`${item.price}元`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content_item: {
    width: 120,
    height: 240,
    padding: 5,
    gap: 5,
    borderRadius: 10,
  },
  content_img: {
    width: 120,
    height: 140,
    borderRadius: 10,
    objectFit: "cover",
  },
});

export default MypageSold;
